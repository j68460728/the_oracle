import { MatchInfo, TeamBrief } from '@/types/domain/oracle';
import { Share2, Moon, Trophy, Calendar, MapPin, CloudSun, Clock, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TeamCrest } from './TeamCrest';

interface BriefHeaderProps {
  matchInfo: MatchInfo;
  homeTeam: TeamBrief;
  awayTeam: TeamBrief;
}

export function BriefHeader({ matchInfo, homeTeam, awayTeam }: BriefHeaderProps) {
  return (
    <div className="flex flex-col bg-[#0e1526] p-6 md:p-8 rounded-xl mb-8 border border-slate-800 shadow-xl gap-6 relative overflow-hidden">
       {/* Background soft glow effects */}
       <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -translate-x-12 -translate-y-12" />
       <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none translate-x-12 translate-y-12" />

       {/* Top Row: Meta info */}
       <div className="flex flex-wrap justify-between items-center border-b border-slate-800/80 pb-4 gap-4 relative z-10">
          <div className="flex flex-wrap items-center gap-3">
             <Badge className="bg-slate-800/80 text-slate-300 hover:bg-slate-800 border-slate-700/80 flex items-center gap-1.5 py-1 px-3">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-semibold text-xs tracking-wider uppercase">{matchInfo.competition}</span>
             </Badge>
             <span className="text-sm font-bold text-slate-100">{matchInfo.matchday}</span>
             <div className="flex items-center gap-1.5 text-slate-400 text-xs md:text-sm">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>{matchInfo.date}</span>
                <span className="text-slate-600">•</span>
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{matchInfo.time}</span>
             </div>
             <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 flex items-center gap-1 py-1 px-2.5">
                <Database className="w-3 h-3" />
                <span className="text-[10px] font-bold tracking-wider">Caché: 24h TTL</span>
             </Badge>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-slate-400">
             <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-semibold text-slate-300">{matchInfo.stadium}</span>
                <span className="text-slate-500 hidden sm:inline">, {matchInfo.city}</span>
             </div>
             <div className="flex items-center gap-1.5">
                <CloudSun className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-semibold text-slate-300">{matchInfo.weather.temp}</span>
                <span className="text-slate-500 hidden sm:inline">({matchInfo.weather.condition})</span>
             </div>
             
             <div className="flex items-center gap-2 ml-auto lg:ml-0">
               <Button variant="outline" size="sm" className="bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300 font-medium h-8 px-3">
                 <Share2 className="w-3.5 h-3.5 mr-2" /> Compartir
               </Button>
               <Tooltip>
                 <TooltipTrigger className="inline-flex items-center justify-center rounded-md border border-slate-800 hover:bg-slate-800 text-slate-300 h-8 w-8 cursor-pointer bg-slate-900">
                   <Moon className="w-4 h-4" />
                 </TooltipTrigger>
                 <TooltipContent className="bg-slate-950 text-slate-100 border-slate-800">Cambiar tema</TooltipContent>
               </Tooltip>
             </div>
          </div>
       </div>

       {/* Main Row: Teams */}
       <div className="flex items-start justify-center gap-4 md:gap-12 relative z-10 w-full max-w-4xl mx-auto py-2">
         {/* Home Team */}
         <div className="flex flex-col items-center gap-3 flex-1 text-center">
            <div className="relative group transition-all duration-300 hover:scale-105 shrink-0">
               <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
               <TeamCrest src={homeTeam.crest} alt={homeTeam.name} fallbackText={homeTeam.id} className="w-16 h-16 md:w-24 md:h-24 relative z-10" />
            </div>
            <div className="flex flex-col items-center gap-1.5">
               <h1 className="font-extrabold text-xl md:text-3xl text-slate-50 leading-tight">{homeTeam.name}</h1>
               <div className="text-xs md:text-sm text-slate-400 font-medium">{homeTeam.position}º Posición</div>
               <div className="flex gap-1 mt-1">
                 {homeTeam.form.map((result, i) => (
                    <span key={i} className={`w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded text-[10px] md:text-xs font-bold shadow-sm ${
                      result === 'V' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                      result === 'E' ? 'bg-slate-700/30 text-slate-400 border border-slate-700/50' : 
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {result}
                    </span>
                 ))}
               </div>
            </div>
         </div>

         {/* VS */}
         <div className="flex flex-col items-center justify-center mt-6 md:mt-8 shrink-0">
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shadow-lg relative">
               <div className="absolute inset-0 rounded-full border border-slate-700/30 animate-pulse pointer-events-none" />
               <span className="text-xs md:text-sm font-black text-slate-400 italic">VS</span>
            </div>
         </div>

         {/* Away Team */}
         <div className="flex flex-col items-center gap-3 flex-1 text-center">
            <div className="relative group transition-all duration-300 hover:scale-105 shrink-0">
               <div className="absolute inset-0 bg-red-500/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
               <TeamCrest src={awayTeam.crest} alt={awayTeam.name} fallbackText={awayTeam.id} className="w-16 h-16 md:w-24 md:h-24 relative z-10" />
            </div>
            <div className="flex flex-col items-center gap-1.5">
               <h1 className="font-extrabold text-xl md:text-3xl text-slate-50 leading-tight">{awayTeam.name}</h1>
               <div className="text-xs md:text-sm text-slate-400 font-medium">{awayTeam.position}º Posición</div>
               <div className="flex gap-1 mt-1">
                 {awayTeam.form.map((result, i) => (
                    <span key={i} className={`w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded text-[10px] md:text-xs font-bold shadow-sm ${
                      result === 'V' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                      result === 'E' ? 'bg-slate-700/30 text-slate-400 border border-slate-700/50' : 
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {result}
                    </span>
                 ))}
               </div>
            </div>
         </div>
       </div>
    </div>
  );
}

