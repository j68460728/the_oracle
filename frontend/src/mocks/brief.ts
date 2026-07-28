import { OracleBriefData } from '../types/oracle';

export const mockOracleBrief: OracleBriefData = {
  matchInfo: {
    competition: 'Premier League',
    matchday: 'Jornada 36',
    date: '11 de mayo, 2025',
    time: '17:30 (GMT+2)',
    stadium: 'Etihad Stadium',
    city: 'Manchester',
    weather: {
      temp: '16°C',
      condition: 'Parcialmente nublado'
    }
  },
  homeTeam: {
    id: 'mci',
    name: 'Manchester City',
    shortName: 'Man City',
    crest: 'https://crests.football-data.org/65.png',
    position: 3,
    form: ['V', 'V', 'E', 'D', 'V'],
    league: {
      played: 35,
      points: 67,
      goalsFor: 67,
      goalsAgainst: 32,
      goalDifference: 35,
      pointsPerGame: 1.91
    },
    attack: {
      goalsPerMatch: 1.91,
      shotsPerMatch: 16.3,
      shotConversion: 15.2,
      expectedGoals: 1.82,
      bigChances: 2.4
    },
    defense: {
      goalsAgainstPerMatch: 0.91,
      shotsAgainstPerMatch: 8.7,
      cleanSheets: 48.6,
      interceptions: 9.1,
      tackles: 13.2
    },
    keyPlayer: {
      name: 'E. Haaland',
      position: 'Delantero',
      photo: 'https://ui-avatars.com/api/?name=E+H&background=random',
      goals: 21,
      assists: 5,
      rating: 7.89
    },
    recentMatches: [
      { opponent: 'CRY', crest: 'https://crests.football-data.org/354.png', result: 'V', score: '2-1' },
      { opponent: 'FUL', crest: 'https://crests.football-data.org/63.png', result: 'V', score: '4-2' },
      { opponent: 'WHU', crest: 'https://crests.football-data.org/563.png', result: 'E', score: '1-1' },
      { opponent: 'ARS', crest: 'https://crests.football-data.org/57.png', result: 'D', score: '0-1' },
      { opponent: 'LIV', crest: 'https://crests.football-data.org/64.png', result: 'V', score: '3-1' },
    ]
  },
  awayTeam: {
    id: 'ars',
    name: 'Arsenal',
    shortName: 'Arsenal',
    crest: 'https://crests.football-data.org/57.png',
    position: 1,
    form: ['V', 'V', 'V', 'E', 'V'],
    league: {
      played: 35,
      points: 80,
      goalsFor: 77,
      goalsAgainst: 26,
      goalDifference: 51,
      pointsPerGame: 2.29
    },
    attack: {
      goalsPerMatch: 2.20,
      shotsPerMatch: 15.7,
      shotConversion: 16.8,
      expectedGoals: 2.05,
      bigChances: 2.7
    },
    defense: {
      goalsAgainstPerMatch: 0.74,
      shotsAgainstPerMatch: 7.9,
      cleanSheets: 54.3,
      interceptions: 10.3,
      tackles: 14.8
    },
    keyPlayer: {
      name: 'B. Saka',
      position: 'Extremo',
      photo: 'https://ui-avatars.com/api/?name=B+S&background=random',
      goals: 13,
      assists: 9,
      rating: 7.72
    },
    recentMatches: [
      { opponent: 'WOL', crest: 'https://crests.football-data.org/76.png', result: 'V', score: '3-0' },
      { opponent: 'NEW', crest: 'https://crests.football-data.org/67.png', result: 'V', score: '2-0' },
      { opponent: 'CHE', crest: 'https://crests.football-data.org/61.png', result: 'V', score: '1-0' },
      { opponent: 'TOT', crest: 'https://crests.football-data.org/73.png', result: 'E', score: '2-2' },
      { opponent: 'MCI', crest: 'https://crests.football-data.org/65.png', result: 'V', score: '4-1' },
    ]
  },
  summary: {
    homeStrength: 64,
    awayStrength: 72,
    edge: 'AWAY',
    textAnalysis: 'Arsenal llega en mejor forma y con mayor solidez defensiva.'
  },
  headToHead: {
    matches: [
      { date: '08/10/24', homeTeam: 'Arsenal', homeCrest: 'https://crests.football-data.org/57.png', awayTeam: 'Man City', awayCrest: 'https://crests.football-data.org/65.png', homeScore: 1, awayScore: 2 },
      { date: '31/03/24', homeTeam: 'Man City', homeCrest: 'https://crests.football-data.org/65.png', awayTeam: 'Arsenal', awayCrest: 'https://crests.football-data.org/57.png', homeScore: 0, awayScore: 0 },
      { date: '08/10/23', homeTeam: 'Arsenal', homeCrest: 'https://crests.football-data.org/57.png', awayTeam: 'Man City', awayCrest: 'https://crests.football-data.org/65.png', homeScore: 1, awayScore: 0 },
      { date: '26/04/23', homeTeam: 'Man City', homeCrest: 'https://crests.football-data.org/65.png', awayTeam: 'Arsenal', awayCrest: 'https://crests.football-data.org/57.png', homeScore: 4, awayScore: 1 },
      { date: '15/02/23', homeTeam: 'Arsenal', homeCrest: 'https://crests.football-data.org/57.png', awayTeam: 'Man City', awayCrest: 'https://crests.football-data.org/65.png', homeScore: 1, awayScore: 3 },
      { date: '27/01/23', homeTeam: 'Man City', homeCrest: 'https://crests.football-data.org/65.png', awayTeam: 'Arsenal', awayCrest: 'https://crests.football-data.org/57.png', homeScore: 1, awayScore: 0 },
    ],
    summary: {
      homeWins: 4,
      draws: 1,
      awayWins: 1
    }
  },
  contextFactors: [
    { type: 'home', title: 'LOCALÍA', homeText: 'Man City ha ganado el 71% de sus partidos en casa esta temporada.' },
    { type: 'rest', title: 'DESCANSO', homeText: 'Man City tuvo 3 días más de descanso que Arsenal.' },
    { type: 'injuries', title: 'LESIONES', text: 'Man City: 2 jugadores importantes.\\nArsenal: 3 jugadores importantes.' },
    { type: 'suspensions', title: 'SANCIONES', text: 'Ningún jugador clave suspendido para este partido.' },
    { type: 'weather', title: 'CLIMA', text: '16°C\\nCondiciones ideales para jugar al fútbol.' },
    { type: 'motivation', title: 'MOTIVACIÓN', text: 'Ambos equipos luchan por objetivos importantes en la recta final.' },
  ]
};
