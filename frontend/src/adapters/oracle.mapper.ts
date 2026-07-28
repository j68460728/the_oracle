import { OracleBriefResponse, TeamBriefSchema } from '../types/api/oracle-response';
import { OracleBriefData, TeamBrief } from '../types/domain/oracle';
import { z } from 'zod';

export function mapOracleResponseToDomain(response: OracleBriefResponse): OracleBriefData {
  
  const mapTeam = (teamResp: z.infer<typeof TeamBriefSchema>): TeamBrief => {
    return {
      id: teamResp.identity.id.toString(),
      name: teamResp.identity.name,
      shortName: teamResp.identity.short_name,
      crest: teamResp.identity.logo_url,
      position: teamResp.league.position || 0,
      form: teamResp.form.form_array as ('V' | 'E' | 'D')[],
      league: {
        played: teamResp.league.played,
        points: teamResp.league.points,
        goalsFor: teamResp.league.goals_for,
        goalsAgainst: teamResp.league.goals_against,
        goalDifference: teamResp.league.goal_difference,
        pointsPerGame: teamResp.league.points_per_game,
      },
      attack: teamResp.attack ? {
        goalsPerMatch: (teamResp.attack as any).goalsPerMatch || 0,
        shotsPerMatch: (teamResp.attack as any).shotsPerMatch || 0,
        shotConversion: (teamResp.attack as any).shotConversion || 0,
        expectedGoals: (teamResp.attack as any).expectedGoals || 0,
        bigChances: (teamResp.attack as any).bigChances || 0,
      } : {
        goalsPerMatch: 0,
        shotsPerMatch: 0,
        shotConversion: 0,
        expectedGoals: 0,
        bigChances: 0,
      },
      defense: teamResp.defense ? {
        goalsAgainstPerMatch: (teamResp.defense as any).goalsAgainstPerMatch || 0,
        shotsAgainstPerMatch: (teamResp.defense as any).shotsAgainstPerMatch || 0,
        cleanSheets: (teamResp.defense as any).cleanSheets || 0,
        interceptions: (teamResp.defense as any).interceptions || 0,
        tackles: (teamResp.defense as any).tackles || 0,
      } : {
        goalsAgainstPerMatch: 0,
        shotsAgainstPerMatch: 0,
        cleanSheets: 0,
        interceptions: 0,
        tackles: 0,
      },
      keyPlayer: teamResp.key_player ? {
        name: (teamResp.key_player as any).name || 'Desconocido',
        position: (teamResp.key_player as any).position || 'N/A',
        photo: (teamResp.key_player as any).photo || '',
        goals: (teamResp.key_player as any).goals || 0,
        assists: (teamResp.key_player as any).assists || 0,
        rating: (teamResp.key_player as any).rating || 0,
      } : {
        name: 'Sin datos (Free Tier)',
        position: '-',
        photo: '',
        goals: 0,
        assists: 0,
        rating: 0,
      },
      recentMatches: teamResp.form.recent_matches.map(rm => ({
        opponent: rm.opponent,
        crest: rm.crest,
        result: rm.result as 'V' | 'E' | 'D',
        score: rm.score,
      }))
    };
  };

  return {
    matchInfo: {
      competition: response.header.competition,
      matchday: response.header.matchday || 'N/A',
      date: response.header.date || 'TBD',
      time: response.header.time || 'TBD',
      stadium: response.header.stadium || 'TBD',
      city: response.header.city || '',
      weather: response.header.weather ? {
        temp: (response.header.weather as any).temp || '',
        condition: (response.header.weather as any).condition || ''
      } : { temp: '', condition: '' }
    },
    homeTeam: mapTeam(response.home_team),
    awayTeam: mapTeam(response.away_team),
    summary: {
      homeStrength: response.summary.home_strength_score,
      awayStrength: response.summary.away_strength_score,
      edge: response.summary.edge as 'HOME' | 'AWAY' | 'EVEN',
      textAnalysis: response.summary.analysis,
    },
    headToHead: {
      matches: response.head_to_head.matches.map(m => ({
        date: m.date,
        homeTeam: m.home_team,
        homeCrest: m.home_crest,
        awayTeam: m.away_team,
        awayCrest: m.away_crest,
        homeScore: m.home_score,
        awayScore: m.away_score,
      })),
      summary: {
        homeWins: response.head_to_head.summary.home_wins,
        draws: response.head_to_head.summary.draws,
        awayWins: response.head_to_head.summary.away_wins,
      }
    },
    contextFactors: response.context.factors.map(f => ({
      type: f.type as any,
      title: f.title,
      homeText: f.home_text || undefined,
      awayText: f.away_text || undefined,
      text: f.text || undefined,
    }))
  };
}
