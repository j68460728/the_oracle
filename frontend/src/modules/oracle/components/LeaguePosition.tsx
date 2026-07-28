import { TeamBrief } from '@/types/domain/oracle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface LeaguePositionProps {
  homeTeam: TeamBrief;
  awayTeam: TeamBrief;
  competition: string;
}

export function LeaguePosition({ homeTeam, awayTeam, competition }: LeaguePositionProps) {
  const isHomeRankBetter = homeTeam.position < awayTeam.position;
  const isAwayRankBetter = awayTeam.position < homeTeam.position;

  const isHomePpgBetter = homeTeam.league.pointsPerGame > awayTeam.league.pointsPerGame;
  const isAwayPpgBetter = awayTeam.league.pointsPerGame > homeTeam.league.pointsPerGame;

  return (
    <Card className="bg-[#0e1526] border-slate-800 text-slate-100 md:col-span-2 xl:col-span-1 rounded-xl shadow-lg">
      <CardHeader className="pb-4 pt-6 px-6">
        <div>
          <CardTitle className="text-lg font-bold text-slate-100">
            Posición en liga
          </CardTitle>
          <p className="text-xs text-slate-400 mt-1">{competition}</p>
        </div>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 pt-2">
        <div className="flex justify-between items-center mb-6 bg-[#070b14]/40 border border-slate-850 p-4 rounded-lg">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 mb-0.5">Posición</span>
            <span className={`text-3xl font-black ${isHomeRankBetter ? 'text-emerald-400' : 'text-slate-300'}`}>
              {homeTeam.position}º
            </span>
          </div>
          <Badge className="bg-slate-850 border-slate-800 text-slate-400 hover:bg-slate-850 font-bold text-[10px]">VS</Badge>
          <div className="flex flex-col items-end">
            <span className="text-xs text-slate-400 mb-0.5">Posición</span>
            <span className={`text-3xl font-black ${isAwayRankBetter ? 'text-emerald-400' : 'text-slate-300'}`}>
              {awayTeam.position}º
            </span>
          </div>
        </div>

        <div className="flex justify-between text-xs font-semibold mb-3 text-slate-400 border-b border-slate-850 pb-2.5">
          <span>{homeTeam.shortName}</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Forma en liga</span>
          <span>{awayTeam.shortName}</span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-1.5">
            {homeTeam.form.map((result, i) => (
              <span key={i} className={`w-5.5 h-5.5 flex items-center justify-center rounded text-[10px] font-bold shadow-sm ${
                result === 'V' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                result === 'E' ? 'bg-slate-800 text-slate-400 border border-slate-700/60' : 
                'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {result}
              </span>
            ))}
          </div>
          <div className="flex gap-1.5">
            {awayTeam.form.map((result, i) => (
              <span key={i} className={`w-5.5 h-5.5 flex items-center justify-center rounded text-[10px] font-bold shadow-sm ${
                result === 'V' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                result === 'E' ? 'bg-slate-800 text-slate-400 border border-slate-700/60' : 
                'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {result}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3.5 text-sm">
          <div className="flex justify-between items-center text-slate-200">
            <span className="w-8 font-semibold">{homeTeam.league.played}</span>
            <span className="text-xs text-slate-400 flex-1 text-center font-medium">Partidos jugados</span>
            <span className="w-8 font-semibold text-right">{awayTeam.league.played}</span>
          </div>
          <div className="flex justify-between items-center text-slate-200">
            <span className={`w-8 font-bold ${homeTeam.league.points > awayTeam.league.points ? 'text-emerald-400' : homeTeam.league.points < awayTeam.league.points ? 'text-rose-450' : 'text-slate-200'}`}>{homeTeam.league.points}</span>
            <span className="text-xs text-slate-400 flex-1 text-center font-medium">Puntos</span>
            <span className={`w-8 font-bold text-right ${awayTeam.league.points > homeTeam.league.points ? 'text-emerald-400' : awayTeam.league.points < homeTeam.league.points ? 'text-rose-450' : 'text-slate-200'}`}>{awayTeam.league.points}</span>
          </div>
          <div className="flex justify-between items-center text-slate-200">
            <span className={`w-8 font-semibold ${homeTeam.league.goalsFor > awayTeam.league.goalsFor ? 'text-emerald-400' : 'text-slate-200'}`}>{homeTeam.league.goalsFor}</span>
            <span className="text-xs text-slate-400 flex-1 text-center font-medium">Goles a favor</span>
            <span className={`w-8 font-semibold text-right ${awayTeam.league.goalsFor > homeTeam.league.goalsFor ? 'text-emerald-400' : 'text-slate-200'}`}>{awayTeam.league.goalsFor}</span>
          </div>
          <div className="flex justify-between items-center text-slate-200">
            <span className={`w-8 font-semibold ${homeTeam.league.goalsAgainst < awayTeam.league.goalsAgainst ? 'text-emerald-400' : 'text-slate-200'}`}>{homeTeam.league.goalsAgainst}</span>
            <span className="text-xs text-slate-400 flex-1 text-center font-medium">Goles en contra</span>
            <span className={`w-8 font-semibold text-right ${awayTeam.league.goalsAgainst < homeTeam.league.goalsAgainst ? 'text-emerald-400' : 'text-slate-200'}`}>{awayTeam.league.goalsAgainst}</span>
          </div>
          <div className="flex justify-between items-center text-slate-200">
            <span className={`w-8 font-semibold ${homeTeam.league.goalDifference > awayTeam.league.goalDifference ? 'text-emerald-400' : 'text-slate-200'}`}>+{homeTeam.league.goalDifference}</span>
            <span className="text-xs text-slate-400 flex-1 text-center font-medium">Diferencia</span>
            <span className={`w-8 font-semibold text-right ${awayTeam.league.goalDifference > homeTeam.league.goalDifference ? 'text-emerald-400' : 'text-slate-200'}`}>+{awayTeam.league.goalDifference}</span>
          </div>
        </div>

        <div className="mt-7 pt-5 border-t border-slate-850">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
              Rendimiento (PPG)
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-3.5 h-3.5 text-slate-500" />
                </TooltipTrigger>
                <TooltipContent className="bg-slate-950 border-slate-800 text-slate-350 max-w-[200px]">
                  Puntos por partido (Points Per Game). El máximo teórico es 3.0.
                </TooltipContent>
              </Tooltip>
            </span>
          </div>
          
          <div className="flex justify-between items-center gap-4 bg-[#070b14]/50 border border-slate-850/80 p-3 rounded-lg">
            <div className="flex flex-col items-center">
              <span className={`text-xl font-extrabold ${isHomePpgBetter ? 'text-emerald-400' : 'text-slate-450'}`}>
                {homeTeam.league.pointsPerGame.toFixed(2)}
              </span>
            </div>
            
            <div className="flex-1">
              <div className="h-2 w-full bg-slate-800 rounded-full flex overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${(homeTeam.league.pointsPerGame / 3) * 50}%` }} />
                <div className="h-full bg-rose-500 transition-all duration-300" style={{ width: `${(awayTeam.league.pointsPerGame / 3) * 50}%` }} />
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <span className={`text-xl font-extrabold ${isAwayPpgBetter ? 'text-emerald-400' : 'text-slate-450'}`}>
                {awayTeam.league.pointsPerGame.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

