import { OracleBriefData } from '@/types/oracle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuickSummaryProps {
  summary: OracleBriefData['summary'];
  homeTeamName: string;
  awayTeamName: string;
}

export function QuickSummary({ summary, homeTeamName, awayTeamName }: QuickSummaryProps) {
  return (
    <Card className="bg-[#111623] border-slate-800 text-slate-100 flex-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-300">
          Resumen Rápido
        </CardTitle>
        <div className="text-xs text-slate-500">Panorama general del enfrentamiento</div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6 mt-4">
          <div className="flex flex-col items-center gap-1">
            <div className="text-4xl font-bold text-blue-500">{summary.homeStrength}%</div>
            <div className="text-[10px] uppercase text-slate-500">Fortaleza General</div>
            <div className="text-sm text-blue-400">{homeTeamName}</div>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-slate-800 flex items-center justify-center bg-slate-900">
              <span className="font-bold text-slate-300 text-lg">
                {summary.edge === 'HOME' ? 'HOM' : summary.edge === 'AWAY' ? 'ARS' : 'EMP'}
              </span>
            </div>
            <div className="text-xs text-slate-400 mt-2">Ligera ventaja</div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="text-4xl font-bold text-red-500">{summary.awayStrength}%</div>
            <div className="text-[10px] uppercase text-slate-500">Fortaleza General</div>
            <div className="text-sm text-red-400">{awayTeamName}</div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-md p-3 text-sm text-slate-300 text-center">
          {summary.textAnalysis}
        </div>
      </CardContent>
    </Card>
  );
}
