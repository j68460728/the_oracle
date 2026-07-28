from fastapi import APIRouter, Depends, HTTPException
from app.application.dto.brief import OracleBrief
from app.application.use_cases.generate_oracle_brief import GenerateOracleBriefUseCase
from app.api.dependencies import get_generate_oracle_brief_use_case
from app.domain.exceptions import ProviderIntegrationException, TeamNotFoundException, ProviderRateLimitExceededException

router = APIRouter()

@router.get("/brief/{competition_code}/{home_team_id}/{away_team_id}", response_model=OracleBrief)
async def generate_brief(
    competition_code: str,
    home_team_id: int,
    away_team_id: int,
    use_case: GenerateOracleBriefUseCase = Depends(get_generate_oracle_brief_use_case)
):
    try:
        brief = await use_case.execute(
            competition_code=competition_code,
            home_team_id=home_team_id,
            away_team_id=away_team_id,
            season="2024" # Default for now
        )
        return brief
    except ProviderRateLimitExceededException as e:
        raise HTTPException(status_code=429, detail=str(e))
    except TeamNotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))
    except ProviderIntegrationException as e:
        raise HTTPException(status_code=502, detail=f"Data provider error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
