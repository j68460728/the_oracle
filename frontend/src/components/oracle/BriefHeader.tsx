import { MatchInfo, TeamBrief } from '@/types/oracle';
import { Share2, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BriefHeaderProps {
  matchInfo: MatchInfo;
  homeTeam: TeamBrief;
  awayTeam: TeamBrief;
}

export function BriefHeader({ matchInfo, homeTeam, awayTeam }: BriefHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#111623] p-4 md:p-6 rounded-lg mb-6 border border-slate-800">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="text-muted-foreground text-sm flex items-center gap-1">
            <span className="w-4 h-4 inline-block bg-slate-700 rounded-sm"></span>
            {matchInfo.competition}
          </div>
        </div>
        <div className="text-slate-400 text-sm">{matchInfo.matchday}</div>
        <div className="flex flex-col text-sm text-slate-500 mt-2">
          <div className="flex items-center gap-1">
            <span className="w-4 h-4 inline-block bg-slate-700 rounded-sm"></span>
            {matchInfo.date}
          </div>
          <div>{matchInfo.time}</div>
        </div>
      </div>

      <div className="flex items-center gap-6 my-6 md:my-0">
        <div className="flex flex-col items-end gap-2">
          <div className="font-semibold text-lg">{homeTeam.name}</div>
          <div className="text-sm text-slate-400">{homeTeam.position}º Posición</div>
          <div className="flex gap-1 mt-1">
            {homeTeam.form.map((result, i) => (
              <span key={i} className={`w-5 h-5 flex items-center justify-center rounded-sm text-[10px] font-bold ${
                result === 'V' ? 'bg-emerald-500/20 text-emerald-500' : 
                result === 'E' ? 'bg-amber-500/20 text-amber-500' : 'bg-red-500/20 text-red-500'
              }`}>
                {result}
              </span>
            ))}
          </div>
        </div>
        
        <img src={homeTeam.crest} alt={homeTeam.name} className="w-16 h-16 object-contain" />
        
        <div className="text-2xl font-bold text-slate-500 mx-2">VS</div>
        
        <img src={awayTeam.crest} alt={awayTeam.name} className="w-16 h-16 object-contain" />
        
        <div className="flex flex-col items-start gap-2">
          <div className="font-semibold text-lg">{awayTeam.name}</div>
          <div className="text-sm text-slate-400">{awayTeam.position}º Posición</div>
          <div className="flex gap-1 mt-1">
            {awayTeam.form.map((result, i) => (
              <span key={i} className={`w-5 h-5 flex items-center justify-center rounded-sm text-[10px] font-bold ${
                result === 'V' ? 'bg-emerald-500/20 text-emerald-500' : 
                result === 'E' ? 'bg-amber-500/20 text-amber-500' : 'bg-red-500/20 text-red-500'
              }`}>
                {result}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 md:items-end">
        <div className="flex items-center gap-2 mb-2">
          <Button variant="outline" size="sm" className="bg-transparent border-slate-700 text-slate-300">
            <Share2 className="w-4 h-4 mr-2" /> Compartir Brief
          </Button>
          <Button variant="outline" size="icon" className="bg-transparent border-slate-700 text-slate-300 h-9 w-9">
            <Moon className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-start gap-2 text-sm text-slate-400">
          <span className="w-4 h-4 inline-block bg-slate-700 rounded-sm mt-0.5"></span>
          <div className="flex flex-col">
            <span>{matchInfo.stadium}</span>
            <span>{matchInfo.city}</span>
          </div>
        </div>
        <div className="flex items-start gap-2 text-sm text-slate-400 mt-2">
          <span className="w-4 h-4 inline-block bg-slate-700 rounded-sm mt-0.5"></span>
          <div className="flex flex-col">
            <span>{matchInfo.weather.temp}</span>
            <span>{matchInfo.weather.condition}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
