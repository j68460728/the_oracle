"""
Redis client for The Oracle application.

This module provides a clean interface for Redis operations with caching
strategies specifically designed for Football-Data.org API responses
and rate limit compliance.
"""
import redis.asyncio as redis
from typing import Optional, Any, Dict, List
import json
from datetime import timedelta
import uuid
from contextlib import asynccontextmanager
from collections.abc import List as ListType
from typing import List as TypingList

from .config import get_settings

class RedisCache:
    """
    Redis cache client for The Oracle.
    
    This client handles all Redis operations including data storage,
    retrieval, and key management with support for TTL-based caching
    strategies.
    
    Key features:
    - Automatic JSON serialization/deserialization
    - TTL management for different data types
    - Connection pooling and health checks
    - Metrics collection for cache performance
    """
    
    def __init__(self, host: str = "redis", port: int = 6379, db: int = 0):
        self.host = host
        self.port = port
        self.db = db
        self.client: Optional[redis.Redis] = None
        self.metrics = {
            "hits": 0,
            "misses": 0,
            "sets": 0,
            "errors": 0
        }
        
    async def connect(self) -> bool:
        """
        Establish connection to Redis.
        
        Returns:
            True if connection successful, False otherwise
        """
        try:
            self.client = redis.Redis(
                host=self.host,
                port=self.port,
                db=self.db,
                decode_responses=True,
                socket_connect_timeout=2,
                socket_timeout=2,
                retry_on_timeout=True,
                health_check_interval=30
            )
            
            # Test connection
            await self.client.ping()
            return True
            
        except Exception as e:
            self.metrics["errors"] += 1
            return False
            
    async def disconnect(self):
        """Close Redis connection."""
        if self.client:
            await self.client.close()
            self.client = None
    
    async def get(self, key: str) -> Optional[Any]:
        """
        Get value from Redis cache.
        
        Args:
            key: Cache key
            
        Returns:
            Cached value or None if not found
        """
        if not self.client:
            return None
            
        try:
            self.metrics["misses"] += 1
            value = await self.client.get(key)
            
            if value:
                self.metrics["hits"] += 1
                return json.loads(value)
                
        except Exception as e:
            self.metrics["errors"] += 1
            
        return None
    
    async def set(
        self, 
        key: str, 
        value: Any, 
        ttl: Optional[int] = None
    ) -> bool:
        """
        Set value in Redis cache with optional TTL.
        
        Args:
            key: Cache key
            value: Value to cache
            ttl: Time to live in seconds (optional)
            
        Returns:
            True if successful, False otherwise
        """
        if not self.client:
            return False
            
        try:
            self.metrics["sets"] += 1
            serialized_value = json.dumps(value)
            
            if ttl:
                await self.client.setex(key, ttl, serialized_value)
            else:
                await self.client.set(key, serialized_value)
                
            return True
            
        except Exception as e:
            self.metrics["errors"] += 1
            return False
    
    async def setex(self, key: str, ttl: int, value: Any) -> bool:
        """
        Set value with TTL (expire after TTL).
        
        Args:
            key: Cache key
            ttl: Time to live in seconds
            value: Value to cache
            
        Returns:
            True if successful, False otherwise
        """
        return await self.set(key, value, ttl)
    
    async def delete(self, key: str) -> bool:
        """
        Delete value from Redis.
        
        Args:
            key: Cache key
            
        Returns:
            True if successful, False otherwise
        """
        if not self.client:
            return False
            
        try:
            await self.client.delete(key)
            return True
        except Exception as e:
            self.metrics["errors"] += 1
            return False
    
    async def exists(self, key: str) -> bool:
        """
        Check if key exists in Redis.
        
        Args:
            key: Cache key
            
        Returns:
            True if key exists, False otherwise
        """
        if not self.client:
            return False
            
        try:
            return await self.client.exists(key) > 0
        except Exception as e:
            self.metrics["errors"] += 1
            return False
    
    async def keys(self, pattern: str = "*") -> ListType[str]:
        """
        Get all keys matching pattern.
        
        Args:
            pattern: Key pattern to match (default: "*")
            
        Returns:
            List of matching keys
        """
        if not self.client:
            return []
            
        try:
            return await self.client.keys(pattern)
        except Exception as e:
            self.metrics["errors"] += 1
            return []
    
    async def flush_pattern(self, pattern: str):
        """
        Delete all keys matching pattern.
        
        Args:
            pattern: Key pattern to delete
        """
        if not self.client:
            return
            
        try:
            keys = await self.client.keys(pattern)
            if keys:
                await self.client.delete(*keys)
        except Exception as e:
            self.metrics["errors"] += 1
    
    async def get_metrics(self) -> Dict[str, Any]:
        """
        Get cache metrics.
        
        Returns:
            Dictionary with cache metrics
        """
        total_requests = self.metrics["hits"] + self.metrics["misses"]
        hit_rate = (self.metrics["hits"] / total_requests * 100) if total_requests > 0 else 0
        
        return {
            "hits": self.metrics["hits"],
            "misses": self.metrics["misses"],
            "sets": self.metrics["sets"],
            "errors": self.metrics["errors"],
            "hit_rate": round(hit_rate, 2),
            "total_requests": total_requests
        }
    
    async def health_check(self) -> bool:
        """
        Check Redis health.
        
        Returns:
            True if Redis is healthy, False otherwise
        """
        if not self.client:
            return False
            
        try:
            await self.client.ping()
            return True
        except Exception:
            return False

    async def get_request_id(self) -> str:
        """
        Generate a unique request ID for tracking.
        
        Returns:
            Unique request ID
        """
        return str(uuid.uuid4())
        
    def format_cache_key(self, template: str, **kwargs) -> str:
        """
        Format cache key from template and parameters.
        
        Args:
            template: Key template (e.g., "oracle:standings:{code}:{season}")
            **kwargs: Key parameters
            
        Returns:
            Formatted cache key
        """
        return template.format(**kwargs)

# Global Redis client instance
_redis_client: Optional[RedisCache] = None

async def get_redis_client() -> Optional[RedisCache]:
    """
    Get global Redis client instance.
    
    Returns:
        Redis client instance or None if not initialized
    """
    global _redis_client
    
    if _redis_client is None:
        settings = get_settings()
        _redis_client = RedisCache(
            host=settings.redis_host,
            port=settings.redis_port,
            db=settings.redis_db
        )
        await _redis_client.connect()
        
    return _redis_client

async def close_redis_client():
    """Close global Redis client."""
    global _redis_client
    if _redis_client:
        await _redis_client.disconnect()
        _redis_client = None
