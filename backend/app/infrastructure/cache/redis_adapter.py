import json
import logging
import redis.asyncio as redis
from typing import Optional

from app.domain.ports import CacheRepositoryPort

logger = logging.getLogger(__name__)

class RedisCacheAdapter(CacheRepositoryPort):
    """
    Redis implementation of the CacheRepositoryPort.
    Handles connection to Redis, JSON serialization/deserialization, and TTL.
    """
    def __init__(self, redis_url: str):
        self._redis = redis.from_url(redis_url, decode_responses=True)
        
    async def get(self, key: str) -> Optional[dict]:
        """
        Retrieves a JSON-deserialized dictionary from Redis if the key exists.
        Returns None on MISS or connection error.
        """
        try:
            val = await self._redis.get(key)
            if val:
                return json.loads(val)
            return None
        except Exception as e:
            logger.error(f"Redis GET error for key {key}: {str(e)}")
            return None

    async def set(self, key: str, value: object, ttl: int) -> None:
        """
        Serializes a Pydantic model (or dict) to JSON and stores it with TTL.
        Fails silently on connection errors to avoid breaking business logic.
        """
        try:
            # Check if value has model_dump_json (Pydantic V2)
            if hasattr(value, "model_dump_json"):
                json_str = value.model_dump_json()
            else:
                json_str = json.dumps(value)
                
            await self._redis.set(key, json_str, ex=ttl)
        except Exception as e:
            logger.error(f"Redis SET error for key {key}: {str(e)}")
