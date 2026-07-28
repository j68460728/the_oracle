import { TeamBrief } from '@/types/oracle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GoalsAndAttackProps {
  homeTeam: TeamBrief;
  awayTeam: TeamBrief;
}

export function GoalsAndAttack({ homeTeam, awayTeam }: GoalsAndAttackProps) {
  return (
    <Card className="bg-[#111623] border-slate-800 text-slate-100 flex-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-300">
          Goles y Ataque
        </CardTitle>
        <div className="text-xs text-slate-500">Estadísticas ofensivas (Liga)</div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-xs font-semibold mb-4 text-slate-400 border-b border-slate-800 pb-2">
          <span className="text-blue-400">{homeTeam.shortName}</span>
          <span className="text-red-400">{awayTeam.shortName}</span>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between items-center">
            <span className="w-10 font-bold">{homeTeam.attack.goalsPerMatch}</span>
            <span className="text-xs text-slate-500 flex-1 text-center">Goles por partido</span>
            <span className="w-10 font-bold text-right">{awayTeam.attack.goalsPerMatch}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="w-10 font-bold">{homeTeam.attack.shotsPerMatch}</span>
            <span className="text-xs text-slate-500 flex-1 text-center">Tiros por partido</span>
            <span className="w-10 font-bold text-right">{awayTeam.attack.shotsPerMatch}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="w-10 font-bold">{homeTeam.attack.shotConversion}%</span>
            <span className="text-xs text-slate-500 flex-1 text-center">% Efectividad de tiro</span>
            <span className="w-10 font-bold text-right">{awayTeam.attack.shotConversion}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="w-10 font-bold">{homeTeam.attack.expectedGoals}</span>
            <span className="text-xs text-slate-500 flex-1 text-center">Goles esperados (xG)</span>
            <span className="w-10 font-bold text-right">{awayTeam.attack.expectedGoals}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="w-10 font-bold">{homeTeam.attack.bigChances}</span>
            <span className="text-xs text-slate-500 flex-1 text-center">Grandes ocasiones por partido</span>
            <span className="w-10 font-bold text-right">{awayTeam.attack.bigChances}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
