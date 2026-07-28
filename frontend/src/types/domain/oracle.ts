export interface MatchInfo {
  competition: string;
  matchday: string;
  date: string;
  time: string;
  stadium: string;
  city: string;
  weather: {
    temp: string;
    condition: string;
  };
}

export interface TeamBrief {
  id: string;
  name: string;
  shortName: string;
  crest: string;
  position: number;
  form: ('V' | 'E' | 'D')[];
  league: {
    played: number;
    points: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    pointsPerGame: number;
  };
  attack: {
    goalsPerMatch: number;
    shotsPerMatch: number;
    shotConversion: number; // percentage
    expectedGoals: number;
    bigChances: number;
  };
  defense: {
    goalsAgainstPerMatch: number;
    shotsAgainstPerMatch: number;
    cleanSheets: number; // percentage
    interceptions: number;
    tackles: number;
  };
  keyPlayer: {
    name: string;
    position: string;
    photo: string;
    goals: number;
    assists: number;
    rating: number;
  };
  recentMatches: {
    opponent: string;
    crest: string;
    result: 'V' | 'E' | 'D';
    score: string;
  }[];
}

export interface MatchHistory {
  date: string;
  homeTeam: string;
  homeCrest: string;
  awayTeam: string;
  awayCrest: string;
  homeScore: number;
  awayScore: number;
}

export interface ContextFactor {
  type: 'home' | 'rest' | 'injuries' | 'suspensions' | 'weather' | 'motivation';
  title: string;
  homeText?: string;
  awayText?: string;
  text?: string;
}

export interface OracleBriefData {
  matchInfo: MatchInfo;
  homeTeam: TeamBrief;
  awayTeam: TeamBrief;
  scoring: {
    home: {
      score: number;
      factors: Record<string, number>;
    };
    away: {
      score: number;
      factors: Record<string, number>;
    };
  };
  summary: {
    headline: string;
    keyFactors: string[];
    confidence: number;
    confidenceLabel: string;
  };
  availability: {
    h2h: { available: boolean; reason: string | null };
    advancedMetrics: { available: boolean; reason: string | null };
    injuries: { available: boolean; reason: string | null };
  };
  headToHead: {
    matches: MatchHistory[];
    summary: {
      homeWins: number;
      draws: number;
      awayWins: number;
    };
  };
  contextFactors: ContextFactor[];
}
