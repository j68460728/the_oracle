import { TeamBrief } from '@/types/domain/oracle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TeamCrest } from './TeamCrest';

interface RecentFormProps {
  homeTeam: TeamBrief;
  awayTeam: TeamBrief;
}

export function RecentForm({ homeTeam, awayTeam }: RecentFormProps) {
  const renderTeamForm = (team: TeamBrief, isHome: boolean) => (
    <div className="flex flex-col items-center flex-1 py-2">
      <div className="font-bold text-sm text-slate-100 mb-4 flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full ${isHome ? 'bg-emerald-500' : 'bg-red-500'}`} />
        {team.shortName}
      </div>
      <div className="flex gap-1.5 mb-5">
        {team.form.map((result, i) => (
          <span key={i} className={`w-6.5 h-6.5 flex items-center justify-center rounded text-xs font-bold shadow-sm ${
            result === 'V' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
            result === 'E' ? 'bg-slate-800 text-slate-400 border border-slate-700/60' : 
            'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {result}
          </span>
        ))}
      </div>
      <div className="text-[10px] text-slate-600 font-bold tracking-widest mb-4 uppercase">Últimos encuentros</div>
      <div className="flex justify-between w-full px-2 gap-3">
        {team.recentMatches.map((match, i) => (
          <div key={i} className="flex flex-col items-center flex-1 bg-[#070b14]/50 border border-slate-850 p-2 rounded hover:bg-[#070b14] transition-colors duration-200">
            <TeamCrest src={match.crest} alt={match.opponent} fallbackText={match.opponent} className="w-5 h-5 mb-1.5" />
            <span className="text-[10px] text-slate-300 font-semibold">{match.score}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="bg-[#0e1526] border-slate-800 text-slate-100 flex-1 rounded-xl shadow-lg">
      <CardHeader className="pb-4 pt-6 px-6">
        <CardTitle className="text-lg font-bold text-slate-100">
          Forma reciente
        </CardTitle>
        <p className="text-xs text-slate-400 mt-1">Últimos 5 partidos (todas las competiciones)</p>
      </CardHeader>
      <CardContent className="flex justify-between pt-2 px-6 pb-6 gap-6">
        {renderTeamForm(homeTeam, true)}
        <div className="w-[1px] bg-slate-850 self-stretch my-2"></div>
        {renderTeamForm(awayTeam, false)}
      </CardContent>
    </Card>
  );
}
