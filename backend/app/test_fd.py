import asyncio
import httpx
from app.config import settings

async def main():
    async with httpx.AsyncClient() as client:
        res = await client.get(
            "https://api.football-data.org/v4/competitions/PL/standings",
            headers={"X-Auth-Token": settings.FOOTBALL_DATA_API_KEY}
        )
        data = res.json()
        table = data.get("standings", [{}])[0].get("table", [])
        team_65 = next((row for row in table if row.get("team", {}).get("id") == 65), None)
        print(team_65)

if __name__ == "__main__":
    asyncio.run(main())
