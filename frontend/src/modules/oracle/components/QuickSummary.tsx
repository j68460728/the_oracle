import { OracleBriefData } from '@/types/domain/oracle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowUpRight, TrendingUp, Info, CheckCircle2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface QuickSummaryProps {
  summary: OracleBriefData['summary'];
  scoring: OracleBriefData['scoring'];
  homeTeamName: string;
  awayTeamName: string;
}

export function QuickSummary({ summary, scoring, homeTeamName, awayTeamName }: QuickSummaryProps) {
  const isHomeStronger = scoring.home.score > scoring.away.score;
  const isAwayStronger = scoring.away.score > scoring.home.score;
  
  let edgeTeam = 'Empate';
  if (isHomeStronger) edgeTeam = homeTeamName;
  if (isAwayStronger) edgeTeam = awayTeamName;

  const confColor = summary.confidenceLabel === 'high' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    summary.confidenceLabel === 'moderate' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-slate-500/10 text-slate-400 border-slate-500/20';

  return (
    <Card className="bg-[#0e1526] border-slate-800 text-slate-100 flex-1 rounded-xl shadow-lg h-full">
      <CardHeader className="pb-4 pt-6 px-6">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold text-slate-100 leading-tight">
              {summary.headline}
            </CardTitle>
            <p className="text-xs text-slate-400 mt-1">Resumen estructurado</p>
          </div>
          <Badge className={`py-1 px-2.5 flex items-center gap-1 border shrink-0 ml-4 ${confColor}`}>
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold tracking-wider uppercase">
              Confianza: {summary.confidence}%
            </span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 pt-2 flex flex-col gap-6">
        {/* Interpretive Balance Bar */}
        <div className="flex flex-col gap-3.5">
          <div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              Balance de poder (Score)
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-3.5 h-3.5 text-slate-500" />
                </TooltipTrigger>
                <TooltipContent className="bg-slate-950 border-slate-800 max-w-[200px] text-slate-300">
                  Cálculo del poder actual de los equipos ponderando forma, historial y posición.
                </TooltipContent>
              </Tooltip>
            </span>
            <span className="text-slate-500 font-bold">Ventaja: {edgeTeam}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Home Power */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-slate-200">{homeTeamName}</span>
                <span className={`text-lg font-black ${isHomeStronger ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {scoring.home.score}
                </span>
              </div>
              <Progress value={scoring.home.score} className={`h-2.5 bg-slate-800 ${isHomeStronger ? '[&>div]:bg-emerald-500' : '[&>div]:bg-slate-600'}`} />
            </div>

            {/* Away Power */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-slate-200">{awayTeamName}</span>
                <span className={`text-lg font-black ${isAwayStronger ? 'text-rose-400' : 'text-slate-400'}`}>
                  {scoring.away.score}
                </span>
              </div>
              <Progress value={scoring.away.score} className={`h-2.5 bg-slate-800 ${isAwayStronger ? '[&>div]:bg-rose-500' : '[&>div]:bg-slate-600'}`} />
            </div>
          </div>
        </div>

        {/* Factors Breakdown */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
          <div className="text-xs text-slate-400 flex flex-col gap-2">
            <div className="flex justify-between"><span className="text-slate-500">Posición Liga:</span> <span>{scoring.home.factors.league_position} pts</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Rendimiento:</span> <span>{scoring.home.factors.points_per_game} pts</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Forma reciente:</span> <span>{scoring.home.factors.form} pts</span></div>
          </div>
          <div className="text-xs text-slate-400 flex flex-col gap-2">
            <div className="flex justify-between"><span className="text-slate-500">Posición Liga:</span> <span>{scoring.away.factors.league_position} pts</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Rendimiento:</span> <span>{scoring.away.factors.points_per_game} pts</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Forma reciente:</span> <span>{scoring.away.factors.form} pts</span></div>
          </div>
        </div>

        {/* Textual analysis - Key Factors */}
        <div className="bg-[#070b14] border border-slate-800/80 rounded-lg p-5 text-sm text-slate-300 leading-relaxed flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-1">
            <ArrowUpRight className="w-5 h-5 text-emerald-500 shrink-0" />
            <span className="font-semibold text-slate-200 uppercase text-xs tracking-wider">Factores Clave</span>
          </div>
          <ul className="space-y-2.5 flex flex-col">
            {summary.keyFactors.map((factor, i) => (
              <li key={i} className="flex gap-2.5 items-start text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500/80 shrink-0 mt-0.5" />
                <span className="leading-snug">{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

