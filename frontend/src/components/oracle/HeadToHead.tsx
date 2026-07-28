import { MatchHistory, TeamBrief } from '@/types/oracle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TeamCrest } from './TeamCrest';

interface HeadToHeadProps {
  history: {
    matches: MatchHistory[];
    summary: { homeWins: number; draws: number; awayWins: number; };
  };
  homeTeam: TeamBrief;
  awayTeam: TeamBrief;
}

export function HeadToHead({ history, homeTeam, awayTeam }: HeadToHeadProps) {
  const isHomeDominant = history.summary.homeWins > history.summary.awayWins;
  const isAwayDominant = history.summary.awayWins > history.summary.homeWins;

  return (
    <Card className="bg-[#0e1526] border-slate-800 text-slate-100 flex-1 rounded-xl shadow-lg">
      <CardHeader className="pb-4 pt-6 px-6">
        <div>
          <CardTitle className="text-lg font-bold text-slate-100">
            Enfrentamientos directos
          </CardTitle>
          <p className="text-xs text-slate-400 mt-1">Últimos {history.matches.length} enfrentamientos históricos</p>
        </div>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 pt-2">
        <div className="space-y-1 mb-6 border-b border-slate-850 pb-5">
          {history.matches.map((match, i) => (
            <div key={i} className="flex justify-between items-center text-sm hover:bg-[#070b14]/50 px-2 py-2 rounded transition-colors duration-200 group">
              <span className="text-xs text-slate-500 w-16 group-hover:text-slate-400 transition-colors">{match.date}</span>
              <div className="flex items-center gap-2 w-24 justify-end">
                <span className="text-slate-300 font-medium text-xs md:text-sm">{match.homeTeam}</span>
                <TeamCrest src={match.homeCrest} alt={match.homeTeam} className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2 font-bold px-3 py-1 bg-[#070b14] border border-slate-850 rounded text-slate-100">
                <span>{match.homeScore}</span>
                <span className="text-slate-600">-</span>
                <span>{match.awayScore}</span>
              </div>
              <div className="flex items-center gap-2 w-24 justify-start">
                <TeamCrest src={match.awayCrest} alt={match.awayTeam} className="w-4 h-4" />
                <span className="text-slate-300 font-medium text-xs md:text-sm">{match.awayTeam}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center bg-[#070b14]/40 p-4 rounded-lg border border-slate-850">
          <div className="flex flex-col items-center">
            <span className="text-slate-400 text-xs font-semibold">{homeTeam.shortName}</span>
            <span className={`font-black text-base mt-0.5 ${isHomeDominant ? 'text-emerald-400' : 'text-slate-300'}`}>
              {history.summary.homeWins} victorias
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Empates</span>
            <span className="text-slate-200 font-black text-base mt-0.5">{history.summary.draws}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-slate-400 text-xs font-semibold">{awayTeam.shortName}</span>
            <span className={`font-black text-base mt-0.5 ${isAwayDominant ? 'text-emerald-400' : 'text-slate-300'}`}>
              {history.summary.awayWins} victorias
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

