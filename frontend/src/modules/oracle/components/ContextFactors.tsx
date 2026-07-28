import { ContextFactor } from '@/types/domain/oracle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, CalendarClock, UserX, AlertCircle, CloudRain, Target, Shield } from 'lucide-react';

interface ContextFactorsProps {
  factors: ContextFactor[];
}

export function ContextFactors({ factors }: ContextFactorsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'home': return <Home className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />;
      case 'rest': return <CalendarClock className="w-5 h-5 text-sky-400" strokeWidth={1.5} />;
      case 'injuries': return <UserX className="w-5 h-5 text-rose-450" strokeWidth={1.5} />;
      case 'suspensions': return <AlertCircle className="w-5 h-5 text-amber-500" strokeWidth={1.5} />;
      case 'weather': return <CloudRain className="w-5 h-5 text-slate-400" strokeWidth={1.5} />;
      case 'motivation': return <Target className="w-5 h-5 text-indigo-400" strokeWidth={1.5} />;
      default: return <Shield className="w-5 h-5 text-slate-400" strokeWidth={1.5} />;
    }
  };

  const renderText = (factor: ContextFactor) => {
    if (factor.text) {
      return (
        <div className="text-xs text-slate-400 mt-2 leading-relaxed space-y-1">
          {factor.text.split('\\n').map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </div>
      );
    }
    return (
      <div className="text-xs text-slate-400 mt-2 leading-relaxed space-y-1">
        {factor.homeText && <span className="block border-l-2 border-emerald-500/30 pl-1.5"><span className="text-[10px] uppercase font-bold text-slate-500 block">Local</span>{factor.homeText}</span>}
        {factor.awayText && <span className="block border-l-2 border-rose-500/30 pl-1.5 mt-2.5"><span className="text-[10px] uppercase font-bold text-slate-500 block">Visitante</span>{factor.awayText}</span>}
      </div>
    );
  };

  return (
    <Card className="bg-[#0e1526] border-slate-800 text-slate-100 rounded-xl shadow-lg w-full">
      <CardHeader className="pb-4 pt-6 px-6">
        <div>
          <CardTitle className="text-lg font-bold text-slate-100">
            Contexto y factores adicionales
          </CardTitle>
          <p className="text-xs text-slate-400 mt-1">Elementos contextuales externos que influyen en el partido</p>
        </div>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {factors.map((factor, i) => (
            <div key={i} className="bg-[#070b14]/50 p-4 rounded-lg border border-slate-850 hover:bg-[#070b14] hover:border-slate-800 transition-all duration-200 flex flex-col gap-1.5 hover:shadow-md cursor-default">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center border border-slate-800 shrink-0">
                  {getIcon(factor.type)}
                </div>
                <span className="font-bold text-xs text-slate-200 capitalize truncate">
                  {factor.title.toLowerCase()}
                </span>
              </div>
              {renderText(factor)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

