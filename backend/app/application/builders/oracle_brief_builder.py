from typing import Optional
from app.domain.models import Team, Standing, Head2Head
from app.application.dto.brief import (
    OracleBrief, BriefMetadata, MatchInfo, TeamIdentity, 
    LeaguePerformance, RecentForm, TeamBrief, 
    BriefSummary, MatchHistory, HeadToHeadSummary, HeadToHeadBrief, BriefContext
)
from app.application.scoring import strength, form, edge, summary

def build_oracle_brief(
    competition_code: str,
    home_team: Team,
    home_standing: Standing,
    away_team: Team,
    away_standing: Standing,
    h2h: Optional[Head2Head]
) -> OracleBrief:
    """Pure function to construct the OracleBrief DTO without holding internal state."""
    
    metadata = BriefMetadata(provider="football-data.org", cache="MISS", version="1.0", algorithm_version="strength-v1")
    
    match_info = MatchInfo(
        competition=competition_code,
        matchday="N/A", date="TBD", time="TBD", stadium=home_team.venue, city=None, weather=None
    )
    
    home_brief = _build_team_brief(home_team, home_standing)
    away_brief = _build_team_brief(away_team, away_standing)
    
    home_str = strength.calculate_strength(
        home_brief.league.points_per_game, 
        form.calculate_form_score(home_brief.form.form_array), 
        home_brief.league.position
    )
    away_str = strength.calculate_strength(
        away_brief.league.points_per_game, 
        form.calculate_form_score(away_brief.form.form_array), 
        away_brief.league.position
    )
    match_edge = edge.determine_edge(home_str, away_str)
    confidence = summary.calculate_confidence(home_str, away_str)
    analysis_text = summary.generate_insight_text(home_str, away_str, match_edge, home_team.short_name, away_team.short_name)
    
    brief_summary = BriefSummary(
        home_strength_score=home_str,
        away_strength_score=away_str,
        edge=match_edge,
        confidence=confidence,
        analysis=analysis_text
    )
    
    h2h_brief = _build_h2h_brief(h2h)
    
    context = BriefContext(
        stadium=home_team.venue,
        home_advantage="Strong" if home_str > 60 else "Average",
    )
    
    return OracleBrief(
        metadata=metadata,
        header=match_info,
        summary=brief_summary,
        home_team=home_brief,
        away_team=away_brief,
        head_to_head=h2h_brief,
        context=context
    )

def _build_team_brief(team: Team, standing: Standing) -> TeamBrief:
    identity = TeamIdentity(
        id=team.id, name=team.name, short_name=team.short_name, logo_url=team.logo_url
    )
    played = standing.played_games
    ppg = standing.points / played if played > 0 else 0.0
    league = LeaguePerformance(
        played=played, points=standing.points, goals_for=standing.goals_for,
        goals_against=standing.goals_against, goal_difference=standing.goal_difference,
        points_per_game=round(ppg, 2), position=standing.position
    )
    form_array = form.parse_recent_form(standing.recent_form)
    recent_form = RecentForm(form_array=form_array, recent_matches=[])
    
    return TeamBrief(identity=identity, league=league, form=recent_form)

def _build_h2h_brief(h2h: Optional[Head2Head]) -> HeadToHeadBrief:
    if not h2h:
        return HeadToHeadBrief(summary=HeadToHeadSummary(home_wins=0, draws=0, away_wins=0), matches=[])
        
    summary = HeadToHeadSummary(home_wins=h2h.home_team_wins, draws=h2h.draws, away_wins=h2h.away_team_wins)
    
    matches = []
    if h2h.matches:
        for m in h2h.matches[:5]:
            home_t = m.home_team.name if m.home_team else "Unknown"
            away_t = m.away_team.name if m.away_team else "Unknown"
            score_h = m.score.get("fullTime", {}).get("home", 0) if m.score else 0
            score_a = m.score.get("fullTime", {}).get("away", 0) if m.score else 0
            
            matches.append(MatchHistory(
                date=m.scheduled_at.strftime("%Y-%m-%d"),
                home_team=home_t, home_crest=m.home_team.logo_url if m.home_team else "",
                away_team=away_t, away_crest=m.away_team.logo_url if m.away_team else "",
                home_score=score_h, away_score=score_a
            ))
            
    return HeadToHeadBrief(matches=matches, summary=summary)
