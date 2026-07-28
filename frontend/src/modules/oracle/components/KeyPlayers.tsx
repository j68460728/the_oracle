import { TeamBrief } from '@/types/domain/oracle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface KeyPlayersProps {
  homeTeam: TeamBrief;
  awayTeam: TeamBrief;
}

export function KeyPlayers({ homeTeam, awayTeam }: KeyPlayersProps) {
  const renderPlayer = (player: TeamBrief['keyPlayer'], isHome: boolean) => (
    <div className="flex flex-col items-center flex-1 py-1">
      <div className="relative group mb-3">
        <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <div className="w-18 h-18 rounded-full overflow-hidden border-2 border-slate-850 bg-[#070b14] relative z-10 transition-transform duration-200 group-hover:scale-105">
          <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="font-bold text-sm text-slate-100 text-center">{player.name}</div>
      <div className="text-xs text-slate-400 mt-0.5 text-center">{player.position}</div>
      
      <div className="flex w-full justify-around mt-5 mb-4">
        <div className="flex flex-col items-center">
          <span className="text-lg font-black text-slate-100">{player.goals}</span>
          <span className="text-[10px] text-slate-500 uppercase font-medium mt-0.5">Goles</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-black text-slate-100">{player.assists}</span>
          <span className="text-[10px] text-slate-500 uppercase font-medium mt-0.5">Asistencias</span>
        </div>
      </div>
      
      <div className="bg-[#070b14]/50 rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 border border-slate-850 w-full mt-auto">
        <Star className="w-4 h-4 text-amber-500 fill-amber-500/20 shrink-0" />
        <div className="flex items-baseline gap-1">
          <span className="text-base font-black text-slate-100">{player.rating.toFixed(2)}</span>
          <span className="text-[10px] text-slate-500 font-semibold">Rating</span>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="bg-[#0e1526] border-slate-800 text-slate-100 flex-1 rounded-xl shadow-lg">
      <CardHeader className="pb-4 pt-6 px-6">
        <div>
          <CardTitle className="text-lg font-bold text-slate-100">
            Jugadores clave
          </CardTitle>
          <p className="text-xs text-slate-400 mt-1">Impacto esperado en el partido</p>
        </div>
      </CardHeader>
      
      <CardContent className="flex justify-between pt-2 px-6 pb-6 gap-6">
        {renderPlayer(homeTeam.keyPlayer, true)}
        <div className="w-[1px] bg-slate-850 self-stretch my-2"></div>
        {renderPlayer(awayTeam.keyPlayer, false)}
      </CardContent>
    </Card>
  );
}

