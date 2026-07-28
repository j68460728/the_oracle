import { MatchHistory, TeamBrief } from '@/types/oracle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HeadToHeadProps {
  history: {
    matches: MatchHistory[];
    summary: { homeWins: number; draws: number; awayWins: number; };
  };
  homeTeam: TeamBrief;
  awayTeam: TeamBrief;
}

export function HeadToHead({ history, homeTeam, awayTeam }: HeadToHeadProps) {
  return (
    <Card className="bg-[#111623] border-slate-800 text-slate-100 flex-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-300">
          Enfrentamientos Directos
        </CardTitle>
        <div className="text-xs text-slate-500">Últimos {history.matches.length} enfrentamientos</div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-6">
          {history.matches.map((match, i) => (
            <div key={i} className="flex justify-between items-center text-sm">
              <span className="text-xs text-slate-400 w-16">{match.date}</span>
              <div className="flex items-center gap-2 w-24 justify-end">
                <span>{match.homeTeam}</span>
                <img src={match.homeCrest} alt="" className="w-4 h-4 object-contain" />
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <span>{match.homeScore}</span>
                <span className="text-slate-600">-</span>
                <span>{match.awayScore}</span>
              </div>
              <div className="flex items-center gap-2 w-24 justify-start">
                <img src={match.awayCrest} alt="" className="w-4 h-4 object-contain" />
                <span>{match.awayTeam}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center bg-slate-800/40 p-3 rounded-md border border-slate-800/50">
          <div className="flex flex-col items-center">
            <span className="text-blue-400 text-xs">{homeTeam.shortName}</span>
            <span className="font-bold text-sm text-blue-500">{history.summary.homeWins} victorias</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-slate-300 font-bold">{history.summary.draws}</span>
            <span className="text-[10px] text-slate-500 uppercase">Empates</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-red-400 text-xs">{awayTeam.shortName}</span>
            <span className="font-bold text-sm text-red-500">{history.summary.awayWins} victorias</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
