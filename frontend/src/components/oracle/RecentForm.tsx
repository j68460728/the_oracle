import { TeamBrief } from '@/types/oracle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RecentFormProps {
  homeTeam: TeamBrief;
  awayTeam: TeamBrief;
}

export function RecentForm({ homeTeam, awayTeam }: RecentFormProps) {
  const renderTeamForm = (team: TeamBrief, isHome: boolean) => (
    <div className="flex flex-col items-center flex-1">
      <div className={`font-semibold mb-3 ${isHome ? 'text-blue-400' : 'text-red-400'}`}>
        {team.shortName}
      </div>
      <div className="flex gap-1 mb-4">
        {team.form.map((result, i) => (
          <span key={i} className={`w-6 h-6 flex items-center justify-center rounded-sm text-xs font-bold ${
            result === 'V' ? 'bg-emerald-500/20 text-emerald-500' : 
            result === 'E' ? 'bg-amber-500/20 text-amber-500' : 'bg-red-500/20 text-red-500'
          }`}>
            {result}
          </span>
        ))}
      </div>
      <div className="text-xs text-slate-500 mb-2">✦</div>
      <div className="flex justify-between w-full px-2 gap-2">
        {team.recentMatches.map((match, i) => (
          <div key={i} className="flex flex-col items-center">
            <img src={match.crest} alt={match.opponent} className="w-5 h-5 object-contain mb-1" title={match.opponent} />
            <span className="text-[10px] text-slate-400">{match.score}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="bg-[#111623] border-slate-800 text-slate-100 flex-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-300">
          Forma Reciente
        </CardTitle>
        <div className="text-xs text-slate-500">Últimos 5 partidos (Todas las competiciones)</div>
      </CardHeader>
      <CardContent className="flex justify-between pt-4 gap-4">
        {renderTeamForm(homeTeam, true)}
        <div className="w-[1px] bg-slate-800 self-stretch"></div>
        {renderTeamForm(awayTeam, false)}
      </CardContent>
    </Card>
  );
}
