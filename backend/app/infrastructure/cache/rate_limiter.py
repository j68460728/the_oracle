"""
Rate limiter implementation for Football-Data.org API compliance.

This module provides rate limiting functionality to ensure compliance
with Football-Data.org's Free plan constraints (10 requests/minute).
"""
import time
from typing import Dict, Any, Optional
from datetime import datetime, timedelta
import redis.asyncio as redis
from collections.abc import List as ListType

class RateLimitException(Exception):
    """Raised when rate limit would be exceeded."""
    pass

class RateLimiter:
    """
    Redis-backed rate limiter for Football-Data.org API.
    
    This rate limiter uses Redis to track request counts across
    multiple instances, ensuring consistent rate limiting in
    distributed environments.
    
    Features:
    - Per-key rate limiting (different rates for different endpoints)
    - Sliding window implementation
    - Distributed coordination
    - Detailed metrics and monitoring
    """
    
    def __init__(
        self,
        redis_client: redis.Redis,
        requests_per_minute: int = 10,
        burst_allowance: int = 2,
        key_prefix: str = "rate_limit"
    ):
        self.redis_client = redis_client
        self.requests_per_minute = requests_per_minute
        self.burst_allowance = burst_allowance
        self.key_prefix = key_prefix
        self.metrics = {
            "allowed": 0,
            "denied": 0,
            "cached": 0
        }
        
    async def allow_request(self, key: str) -> bool:
        """
        Check if a request is allowed for the given key.
        
        Args:
            key: Unique identifier for the rate limit (e.g., 'standings', 'matches')
            
        Returns:
            True if request is allowed, False otherwise
            
        Raises:
            RateLimitException: If the request would exceed rate limits
        """
        rate_limit_key = f"{self.key_prefix}:{key}"
        current_time = int(time.time())
        window_start = current_time - 60
        
        # Clean old requests from Redis
        await self.redis_client.zremrangebyscore(
            rate_limit_key,
            0,
            window_start
        )
        
        # Count current requests in window
        current_requests = await self.redis_client.zcard(rate_limit_key)
        
        # Check if request is allowed
        if current_requests + self.burst_allowance <= self.requests_per_minute:
            # Record this request
            await self.redis_client.zadd(
                rate_limit_key,
                {current_time: current_time}
            )
            await self.redis_client.expire(rate_limit_key, 60)
            
            self.metrics["allowed"] += 1
            return True
        else:
            self.metrics["denied"] += 1
            
            # Calculate time until reset
            oldest_request_time = await self.redis_client.zrange(
                rate_limit_key,
                0,
                0,
                withscores=True
            )
            
            if oldest_request_time:
                oldest_time = oldest_request_time[0][1]
                reset_time = oldest_time + 60 - current_time
                reset_time_str = datetime.fromtimestamp(reset_time).strftime("%H:%M:%S")
                
                raise RateLimitException(
                    f"Rate limit exceeded for '{key}'. "
                    f"Next request available at {reset_time_str}"
                )
                
            raise RateLimitException(f"Rate limit exceeded for '{key}'")
    
    async def get_status(self, key: str) -> Dict[str, Any]:
        """
        Get current rate limit status for the given key.
        
        Args:
            key: Rate limit key
            
        Returns:
            Dictionary with rate limit status and metrics
        """
        rate_limit_key = f"{self.key_prefix}:{key}"
        current_time = int(time.time())
        window_start = current_time - 60
        
        # Clean old requests
        await self.redis_client.zremrangebyscore(
            rate_limit_key,
            0,
            window_start
        )
        
        # Get current count
        current_requests = await self.redis_client.zcard(rate_limit_key)
        remaining_requests = max(0, self.requests_per_minute - current_requests)
        
        return {
            "key": key,
            "requests_used": current_requests,
            "requests_remaining": remaining_requests,
            "max_requests": self.requests_per_minute,
            "usage_percentage": round((current_requests / self.requests_per_minute) * 100, 2),
            "window_resets_in": f"{60 - (current_time - int(str(await self.redis_client.zrange(rate_limit_key, -1, -1, withscores=True))[0][0]))}s"
        }
    
    async def reset_key(self, key: str) -> bool:
        """
        Reset rate limit for the given key.
        
        Args:
            key: Rate limit key to reset
            
        Returns:
            True if key was reset, False otherwise
        """
        rate_limit_key = f"{self.key_prefix}:{key}"
        
        try:
            await self.redis_client.delete(rate_limit_key)
            return True
        except Exception:
            return False
    
    async def get_all_keys(self) -> ListType[str]:
        """
        Get all rate limit keys.
        
        Returns:
            List of rate limit keys
        """
        try:
            keys = await self.redis_client.keys(f"{self.key_prefix}:*")
            return [key.decode('utf-8') for key in keys]
        except Exception:
            return []
    
    async def get_metrics(self) -> Dict[str, Any]:
        """
        Get rate limiter metrics.
        
        Returns:
            Dictionary with rate limiter metrics
        """
        return {
            "allowed_requests": self.metrics["allowed"],
            "denied_requests": self.metrics["denied"],
            "cache_hits": self.metrics["cached"],
            "success_rate": round(
                (self.metrics["allowed"] / max(1, self.metrics["allowed"] + self.metrics["denied"])) * 100,
                2
            )
        }
    
    async def cleanup_expired_keys(self):
        """
        Clean up expired rate limit keys from Redis.
        
        This should be called periodically to prevent Redis from accumulating
        too many expired keys over time.
        """
        all_keys = await self.get_all_keys()
        
        for key in all_keys:
            try:
                await self.redis_client.persist(key)
            except Exception:
                pass
    
    async def configure_window(self, key: str, window_minutes: int = 60):
        """
        Configure rate limit window for a specific key.
        
        Args:
            key: Rate limit key
            window_minutes: Rate limit window in minutes
        """
        rate_limit_key = f"{self.key_prefix}:{key}"
        await self.redis_client.expire(rate_limit_key, window_minutes * 60)
        
    async def update_configuration(
        self,
        requests_per_minute: Optional[int] = None,
        burst_allowance: Optional[int] = None,
        key_prefix: Optional[str] = None
    ):
        """
        Update rate limiter configuration.
        
        Args:
            requests_per_minute: New requests per minute limit
            burst_allowance: New burst allowance
            key_prefix: New key prefix
        """
        if requests_per_minute is not None:
            self.requests_per_minute = requests_per_minute
            
        if burst_allowance is not None:
            self.burst_allowance = burst_allowance
            
        if key_prefix is not None:
            self.key_prefix = key_prefix
            
    def get_current_time(self) -> datetime:
        """
        Get current time.
        
        Returns:
            Current datetime
        """
        return datetime.now()
    
    def calculate_wait_time(self, key: str) -> int:
        """
        Calculate time to wait before next request can be made.
        
        Args:
            key: Rate limit key
            
        Returns:
            Seconds to wait
        """
        rate_limit_key = f"{self.key_prefix}:{key}"
        current_time = int(time.time())
        
        oldest_request = await self.redis_client.zrange(
            rate_limit_key,
            0,
            0,
            withscores=True
        )
        
        if oldest_request:
            oldest_time = oldest_request[0][1]
            wait_time = oldest_time + 60 - current_time
            return max(0, wait_time)
            
        return 0
    
    async def check_health(self) -> Dict[str, Any]:
        """
        Check rate limiter health and return status.
        
        Returns:
            Dictionary with health status and metrics
        """
        try:
            # Test Redis connection
            await self.redis_client.ping()
            
            # Get all keys to verify they're accessible
            keys = await self.get_all_keys()
            
            return {
                "status": "healthy",
                "redis_connected": True,
                "rate_limit_keys": len(keys),
                "configuration": {
                    "requests_per_minute": self.requests_per_minute,
                    "burst_allowance": self.burst_allowance,
                    "key_prefix": self.key_prefix
                },
                "metrics": await self.get_metrics()
            }
            
        except Exception as e:
            return {
                "status": "unhealthy",
                "error": str(e),
                "redis_connected": False
            }

# Singleton instance
_rate_limiter_instance: Optional[RateLimiter] = None

async def get_rate_limiter() -> RateLimiter:
    """
    Get or create singleton RateLimiter instance.
    
    Returns:
        RateLimiter instance
    """
    global _rate_limiter_instance
    
    if _rate_limiter_instance is None:
        from .config import get_settings
        settings = get_settings()
        
        redis_client = redis.Redis(
            host=settings.redis_host,
            port=settings.redis_port,
            db=settings.redis_db,
            decode_responses=True,
            socket_connect_timeout=5,
            socket_timeout=5
        )
        
        _rate_limiter_instance = RateLimiter(
            redis_client=redis_client,
            requests_per_minute=10,  # FD Free tier limit
            burst_allowance=2,
            key_prefix="oracle_rate_limit"
        )
        
    return _rate_limiter_instance

async def close_rate_limiter():
    """Close rate limiter and cleanup resources."""
    global _rate_limiter_instance
    if _rate_limiter_instance:
        if _rate_limiter_instance.redis_client:
            await _rate_limiter_instance.redis_client.close()
        _rate_limiter_instance = None
