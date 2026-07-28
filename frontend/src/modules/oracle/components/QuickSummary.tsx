import { OracleBriefData } from '@/types/domain/oracle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowUpRight, TrendingUp, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface QuickSummaryProps {
  summary: OracleBriefData['summary'];
  homeTeamName: string;
  awayTeamName: string;
}

export function QuickSummary({ summary, homeTeamName, awayTeamName }: QuickSummaryProps) {
  const isHomeStronger = summary.homeStrength > summary.awayStrength;
  const isAwayStronger = summary.awayStrength > summary.homeStrength;

  return (
    <Card className="bg-[#0e1526] border-slate-800 text-slate-100 flex-1 rounded-xl shadow-lg">
      <CardHeader className="pb-4 pt-6 px-6">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-bold text-slate-100">
              Resumen rápido
            </CardTitle>
            <p className="text-xs text-slate-400 mt-1">Panorama general del enfrentamiento</p>
          </div>
          <Badge className={`py-1 px-2.5 flex items-center gap-1 border ${
            summary.edge === 'HOME' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
            summary.edge === 'AWAY' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 
            'bg-slate-800 text-slate-400 border-slate-700'
          }`}>
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold tracking-wider uppercase">
              Ventaja: {summary.edge === 'HOME' ? homeTeamName : summary.edge === 'AWAY' ? awayTeamName : 'Empate'}
            </span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 pt-2 flex flex-col gap-6">
        {/* Interpretive Balance Bar */}
        <div className="flex flex-col gap-3.5">
          <div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              Balance de poder
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-3.5 h-3.5 text-slate-500" />
                </TooltipTrigger>
                <TooltipContent className="bg-slate-950 border-slate-800 max-w-[200px] text-slate-300">
                  Cálculo del poder actual de los equipos ponderando forma, historial y posición.
                </TooltipContent>
              </Tooltip>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Home Power */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-slate-200">{homeTeamName}</span>
                <span className={`text-lg font-black ${isHomeStronger ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {summary.homeStrength}%
                </span>
              </div>
              <Progress value={summary.homeStrength} className={`h-2.5 bg-slate-800 ${isHomeStronger ? '[&>div]:bg-emerald-500' : '[&>div]:bg-slate-600'}`} />
            </div>

            {/* Away Power */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-slate-200">{awayTeamName}</span>
                <span className={`text-lg font-black ${isAwayStronger ? 'text-rose-400' : 'text-slate-400'}`}>
                  {summary.awayStrength}%
                </span>
              </div>
              <Progress value={summary.awayStrength} className={`h-2.5 bg-slate-800 ${isAwayStronger ? '[&>div]:bg-rose-500' : '[&>div]:bg-slate-600'}`} />
            </div>
          </div>
        </div>

        {/* Home Advantage Indicator */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
            <span>Ventaja de localía</span>
            <span className="text-emerald-400 font-bold">58% de efectividad</span>
          </div>
          <div className="flex h-2 w-full rounded-full overflow-hidden bg-slate-800">
            <div className="h-full bg-emerald-500" style={{ width: '58%' }} />
            <div className="h-full bg-slate-700/80" style={{ width: '42%' }} />
          </div>
        </div>

        {/* Textual analysis */}
        <div className="bg-[#070b14] border border-slate-800/80 rounded-lg p-4 text-sm text-slate-300 leading-relaxed relative overflow-hidden flex items-start gap-3">
          <ArrowUpRight className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <p>{summary.textAnalysis}</p>
        </div>
      </CardContent>
    </Card>
  );
}

