import { TeamBrief } from '@/types/oracle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DefensiveSolidityProps {
  homeTeam: TeamBrief;
  awayTeam: TeamBrief;
}

export function DefensiveSolidity({ homeTeam, awayTeam }: DefensiveSolidityProps) {
  const getColors = (valHome: number, valAway: number, lowerIsBetter = false) => {
    const isHomeBetter = lowerIsBetter ? valHome < valAway : valHome > valAway;
    const isAwayBetter = lowerIsBetter ? valAway < valHome : valAway > valHome;
    if (isHomeBetter) return ['text-emerald-400 font-black', 'text-slate-500 font-medium'];
    if (isAwayBetter) return ['text-slate-500 font-medium', 'text-emerald-400 font-black'];
    return ['text-slate-200 font-bold', 'text-slate-200 font-bold'];
  };

  const goalsColors = getColors(homeTeam.defense.goalsAgainstPerMatch, awayTeam.defense.goalsAgainstPerMatch, true);
  const shotsColors = getColors(homeTeam.defense.shotsAgainstPerMatch, awayTeam.defense.shotsAgainstPerMatch, true);
  const cleanSheetsColors = getColors(homeTeam.defense.cleanSheets, awayTeam.defense.cleanSheets);
  const interceptionsColors = getColors(homeTeam.defense.interceptions, awayTeam.defense.interceptions);
  const tacklesColors = getColors(homeTeam.defense.tackles, awayTeam.defense.tackles);

  return (
    <Card className="bg-[#0e1526] border-slate-800 text-slate-100 flex-1 rounded-xl shadow-lg">
      <CardHeader className="pb-4 pt-6 px-6">
        <div>
          <CardTitle className="text-lg font-bold text-slate-100">
            Solidez defensiva
          </CardTitle>
          <p className="text-xs text-slate-400 mt-1">Estadísticas defensivas en liga</p>
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
            <span className={`w-12 text-sm ${goalsColors[0]}`}>{homeTeam.defense.goalsAgainstPerMatch.toFixed(2)}</span>
            <span className="text-xs text-slate-400 flex-1 text-center font-medium">Goles encajados p/p</span>
            <span className={`w-12 text-sm text-right ${goalsColors[1]}`}>{awayTeam.defense.goalsAgainstPerMatch.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-0.5">
            <span className={`w-12 text-sm ${shotsColors[0]}`}>{homeTeam.defense.shotsAgainstPerMatch.toFixed(1)}</span>
            <span className="text-xs text-slate-400 flex-1 text-center font-medium">Remates recibidos p/p</span>
            <span className={`w-12 text-sm text-right ${shotsColors[1]}`}>{awayTeam.defense.shotsAgainstPerMatch.toFixed(1)}</span>
          </div>
          <div className="flex justify-between items-center py-0.5">
            <span className={`w-12 text-sm ${cleanSheetsColors[0]}`}>{homeTeam.defense.cleanSheets}%</span>
            <span className="text-xs text-slate-400 flex-1 text-center font-medium">Porterías a cero</span>
            <span className={`w-12 text-sm text-right ${cleanSheetsColors[1]}`}>{awayTeam.defense.cleanSheets}%</span>
          </div>
          <div className="flex justify-between items-center py-0.5">
            <span className={`w-12 text-sm ${interceptionsColors[0]}`}>{homeTeam.defense.interceptions.toFixed(1)}</span>
            <span className="text-xs text-slate-400 flex-1 text-center font-medium">Intercepciones p/p</span>
            <span className={`w-12 text-sm text-right ${interceptionsColors[1]}`}>{awayTeam.defense.interceptions.toFixed(1)}</span>
          </div>
          <div className="flex justify-between items-center py-0.5">
            <span className={`w-12 text-sm ${tacklesColors[0]}`}>{homeTeam.defense.tackles.toFixed(1)}</span>
            <span className="text-xs text-slate-400 flex-1 text-center font-medium">Entradas exitosas p/p</span>
            <span className={`w-12 text-sm text-right ${tacklesColors[1]}`}>{awayTeam.defense.tackles.toFixed(1)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

