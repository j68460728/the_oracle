import { TeamBrief } from '@/types/domain/oracle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GoalsAndAttackProps {
  homeTeam: TeamBrief;
  awayTeam: TeamBrief;
}

export function GoalsAndAttack({ homeTeam, awayTeam }: GoalsAndAttackProps) {
  const getColors = (valHome: number, valAway: number) => {
    if (valHome > valAway) return ['text-emerald-400 font-black', 'text-slate-500 font-medium'];
    if (valAway > valHome) return ['text-slate-500 font-medium', 'text-emerald-400 font-black'];
    return ['text-slate-200 font-bold', 'text-slate-200 font-bold'];
  };

  const goalsColors = getColors(homeTeam.attack.goalsPerMatch, awayTeam.attack.goalsPerMatch);
  const shotsColors = getColors(homeTeam.attack.shotsPerMatch, awayTeam.attack.shotsPerMatch);
  const conversionColors = getColors(homeTeam.attack.shotConversion, awayTeam.attack.shotConversion);
  const xgColors = getColors(homeTeam.attack.expectedGoals, awayTeam.attack.expectedGoals);
  const bigChancesColors = getColors(homeTeam.attack.bigChances, awayTeam.attack.bigChances);

  return (
    <Card className="bg-[#0e1526] border-slate-800 text-slate-100 flex-1 rounded-xl shadow-lg">
      <CardHeader className="pb-4 pt-6 px-6">
        <div>
          <CardTitle className="text-lg font-bold text-slate-100">
            Goles y ataque
          </CardTitle>
          <p className="text-xs text-slate-400 mt-1">Estadísticas ofensivas en liga</p>
        </div>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 pt-2">
        <div className="flex justify-between text-xs font-bold mb-4 text-slate-400 border-b border-slate-850 pb-2.5">
          <span>{homeTeam.shortName}</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Comparación</span>
          <span>{awayTeam.shortName}</span>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between items-center py-0.5">
            <span className={`w-12 text-sm ${goalsColors[0]}`}>{homeTeam.attack.goalsPerMatch.toFixed(2)}</span>
            <span className="text-xs text-slate-400 flex-1 text-center font-medium">Goles por partido</span>
            <span className={`w-12 text-sm text-right ${goalsColors[1]}`}>{awayTeam.attack.goalsPerMatch.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-0.5">
            <span className={`w-12 text-sm ${shotsColors[0]}`}>{homeTeam.attack.shotsPerMatch.toFixed(1)}</span>
            <span className="text-xs text-slate-400 flex-1 text-center font-medium">Tiros por partido</span>
            <span className={`w-12 text-sm text-right ${shotsColors[1]}`}>{awayTeam.attack.shotsPerMatch.toFixed(1)}</span>
          </div>
          <div className="flex justify-between items-center py-0.5">
            <span className={`w-12 text-sm ${conversionColors[0]}`}>{homeTeam.attack.shotConversion}%</span>
            <span className="text-xs text-slate-400 flex-1 text-center font-medium">Efectividad de tiro</span>
            <span className={`w-12 text-sm text-right ${conversionColors[1]}`}>{awayTeam.attack.shotConversion}%</span>
          </div>
          <div className="flex justify-between items-center py-0.5">
            <span className={`w-12 text-sm ${xgColors[0]}`}>{homeTeam.attack.expectedGoals.toFixed(2)}</span>
            <span className="text-xs text-slate-400 flex-1 text-center font-medium">Goles esperados (xG)</span>
            <span className={`w-12 text-sm text-right ${xgColors[1]}`}>{awayTeam.attack.expectedGoals.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-0.5">
            <span className={`w-12 text-sm ${bigChancesColors[0]}`}>{homeTeam.attack.bigChances.toFixed(1)}</span>
            <span className="text-xs text-slate-400 flex-1 text-center font-medium">Grandes ocasiones</span>
            <span className={`w-12 text-sm text-right ${bigChancesColors[1]}`}>{awayTeam.attack.bigChances.toFixed(1)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

