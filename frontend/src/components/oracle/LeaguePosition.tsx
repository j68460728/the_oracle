import { TeamBrief } from '@/types/oracle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LeaguePositionProps {
  homeTeam: TeamBrief;
  awayTeam: TeamBrief;
  competition: string;
}

export function LeaguePosition({ homeTeam, awayTeam, competition }: LeaguePositionProps) {
  return (
    <Card className="bg-[#111623] border-slate-800 text-slate-100 md:col-span-2 xl:col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-300">
          Posición en Liga
        </CardTitle>
        <div className="text-xs text-slate-500">{competition}</div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-2xl font-bold mb-4">
          <span className="text-blue-500">{homeTeam.position}º</span>
          <span className="text-red-500">{awayTeam.position}º</span>
        </div>
        
        <div className="flex justify-between text-xs font-semibold mb-2 text-slate-400 border-b border-slate-800 pb-2">
          <span>{homeTeam.shortName}</span>
          <span className="uppercase text-[10px]">Forma en Liga</span>
          <span>{awayTeam.shortName}</span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-1">
            {homeTeam.form.map((result, i) => (
              <span key={i} className={`w-4 h-4 flex items-center justify-center rounded-sm text-[9px] font-bold ${
                result === 'V' ? 'bg-emerald-500/20 text-emerald-500' : 
                result === 'E' ? 'bg-amber-500/20 text-amber-500' : 'bg-red-500/20 text-red-500'
              }`}>
                {result}
              </span>
            ))}
          </div>
          <div className="flex gap-1">
            {awayTeam.form.map((result, i) => (
              <span key={i} className={`w-4 h-4 flex items-center justify-center rounded-sm text-[9px] font-bold ${
                result === 'V' ? 'bg-emerald-500/20 text-emerald-500' : 
                result === 'E' ? 'bg-amber-500/20 text-amber-500' : 'bg-red-500/20 text-red-500'
              }`}>
                {result}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="w-8 font-semibold">{homeTeam.league.played}</span>
            <span className="text-xs text-slate-500 uppercase flex-1 text-center">PJ</span>
            <span className="w-8 font-semibold text-right">{awayTeam.league.played}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="w-8 font-semibold">{homeTeam.league.points}</span>
            <span className="text-xs text-slate-500 uppercase flex-1 text-center">Puntos</span>
            <span className="w-8 font-semibold text-right">{awayTeam.league.points}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="w-8 font-semibold">{homeTeam.league.goalsFor}</span>
            <span className="text-xs text-slate-500 uppercase flex-1 text-center">Goles a favor</span>
            <span className="w-8 font-semibold text-right">{awayTeam.league.goalsFor}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="w-8 font-semibold">{homeTeam.league.goalsAgainst}</span>
            <span className="text-xs text-slate-500 uppercase flex-1 text-center">Goles en contra</span>
            <span className="w-8 font-semibold text-right">{awayTeam.league.goalsAgainst}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="w-8 font-semibold">+{homeTeam.league.goalDifference}</span>
            <span className="text-xs text-slate-500 uppercase flex-1 text-center">Diferencia</span>
            <span className="w-8 font-semibold text-right">+{awayTeam.league.goalDifference}</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800">
          <div className="text-[10px] text-center text-slate-500 uppercase mb-2">Rendimiento</div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-blue-400">{homeTeam.league.pointsPerGame}</span>
              <span className="text-[10px] text-slate-500">PPG</span>
            </div>
            <div className="flex-1 px-4">
              <div className="h-1 w-full bg-slate-800 rounded-full flex">
                <div className="h-full bg-blue-500 rounded-l-full" style={{ width: `${(homeTeam.league.pointsPerGame / 3) * 100}%` }}></div>
                <div className="h-full bg-red-500 rounded-r-full" style={{ width: `${(awayTeam.league.pointsPerGame / 3) * 100}%` }}></div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-red-400">{awayTeam.league.pointsPerGame}</span>
              <span className="text-[10px] text-slate-500">PPG</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
