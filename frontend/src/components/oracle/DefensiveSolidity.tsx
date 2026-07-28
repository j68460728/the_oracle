import { TeamBrief } from '@/types/oracle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DefensiveSolidityProps {
  homeTeam: TeamBrief;
  awayTeam: TeamBrief;
}

export function DefensiveSolidity({ homeTeam, awayTeam }: DefensiveSolidityProps) {
  return (
    <Card className="bg-[#111623] border-slate-800 text-slate-100 flex-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-300">
          Solidez Defensiva
        </CardTitle>
        <div className="text-xs text-slate-500">Estadísticas defensivas (Liga)</div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-xs font-semibold mb-4 text-slate-400 border-b border-slate-800 pb-2">
          <span className="text-blue-400">{homeTeam.shortName}</span>
          <span className="text-red-400">{awayTeam.shortName}</span>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between items-center">
            <span className="w-10 font-bold">{homeTeam.defense.goalsAgainstPerMatch}</span>
            <span className="text-xs text-slate-500 flex-1 text-center">Goles en contra por partido</span>
            <span className="w-10 font-bold text-right">{awayTeam.defense.goalsAgainstPerMatch}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="w-10 font-bold">{homeTeam.defense.shotsAgainstPerMatch}</span>
            <span className="text-xs text-slate-500 flex-1 text-center">Tiros en contra por partido</span>
            <span className="w-10 font-bold text-right">{awayTeam.defense.shotsAgainstPerMatch}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="w-10 font-bold">{homeTeam.defense.cleanSheets}%</span>
            <span className="text-xs text-slate-500 flex-1 text-center">% Porterías a 0</span>
            <span className="w-10 font-bold text-right">{awayTeam.defense.cleanSheets}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="w-10 font-bold">{homeTeam.defense.interceptions}</span>
            <span className="text-xs text-slate-500 flex-1 text-center">Intercepciones por partido</span>
            <span className="w-10 font-bold text-right">{awayTeam.defense.interceptions}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="w-10 font-bold">{homeTeam.defense.tackles}</span>
            <span className="text-xs text-slate-500 flex-1 text-center">Entradas exitosas por partido</span>
            <span className="w-10 font-bold text-right">{awayTeam.defense.tackles}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
