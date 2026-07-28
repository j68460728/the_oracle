import { TeamBrief } from '@/types/oracle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface KeyPlayersProps {
  homeTeam: TeamBrief;
  awayTeam: TeamBrief;
}

export function KeyPlayers({ homeTeam, awayTeam }: KeyPlayersProps) {
  const renderPlayer = (player: TeamBrief['keyPlayer'], isHome: boolean) => (
    <div className="flex flex-col items-center flex-1">
      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-700 bg-slate-800 mb-2">
        <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
      </div>
      <div className="font-semibold text-sm">{player.name}</div>
      <div className="text-xs text-slate-500 mb-4">{player.position}</div>
      
      <div className="flex w-full justify-around mb-4">
        <div className="flex flex-col items-center">
          <span className={`text-xl font-bold ${isHome ? 'text-blue-400' : 'text-red-400'}`}>{player.goals}</span>
          <span className="text-[10px] text-slate-500 uppercase">Goles</span>
        </div>
        <div className="flex flex-col items-center">
          <span className={`text-xl font-bold ${isHome ? 'text-blue-400' : 'text-red-400'}`}>{player.assists}</span>
          <span className="text-[10px] text-slate-500 uppercase">Asistencias</span>
        </div>
      </div>
      
      <div className="bg-slate-800/50 rounded-lg px-6 py-2 flex flex-col items-center border border-slate-700 w-full">
        <span className={`text-xl font-bold ${isHome ? 'text-blue-500' : 'text-red-500'}`}>{player.rating}</span>
        <span className="text-[10px] text-slate-500 uppercase">Rating</span>
      </div>
    </div>
  );

  return (
    <Card className="bg-[#111623] border-slate-800 text-slate-100 flex-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-300">
          Jugadores Clave
        </CardTitle>
        <div className="text-xs text-slate-500">Impacto esperado en el partido</div>
      </CardHeader>
      <CardContent className="flex justify-between pt-4 gap-4">
        {renderPlayer(homeTeam.keyPlayer, true)}
        <div className="w-[1px] bg-slate-800 self-stretch"></div>
        {renderPlayer(awayTeam.keyPlayer, false)}
      </CardContent>
    </Card>
  );
}
