import { ContextFactor } from '@/types/oracle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Clock, PlusSquare, AlertTriangle, CloudRain, Flag } from 'lucide-react';

interface ContextFactorsProps {
  factors: ContextFactor[];
}

export function ContextFactors({ factors }: ContextFactorsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'home': return <Home className="w-6 h-6 text-slate-300" />;
      case 'rest': return <Clock className="w-6 h-6 text-slate-300" />;
      case 'injuries': return <PlusSquare className="w-6 h-6 text-red-400" />;
      case 'suspensions': return <AlertTriangle className="w-6 h-6 text-amber-400" />;
      case 'weather': return <CloudRain className="w-6 h-6 text-slate-300" />;
      case 'motivation': return <Flag className="w-6 h-6 text-red-500" />;
      default: return null;
    }
  };

  const renderText = (factor: ContextFactor) => {
    if (factor.text) {
      return (
        <div className="text-xs text-slate-400 mt-1">
          {factor.text.split('\\n').map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </div>
      );
    }
    return (
      <div className="text-xs text-slate-400 mt-1">
        {factor.homeText && <span className="block">{factor.homeText}</span>}
        {factor.awayText && <span className="block">{factor.awayText}</span>}
      </div>
    );
  };

  return (
    <Card className="bg-[#111623] border-slate-800 text-slate-100 col-span-1 md:col-span-2">
      <CardHeader className="pb-4">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-300">
          Contexto y Factores Adicionales
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {factors.map((factor, i) => (
            <div key={i} className="bg-slate-800/40 p-3 rounded-lg border border-slate-800 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center">
                  {getIcon(factor.type)}
                </div>
                <span className="font-semibold text-xs uppercase tracking-wider text-slate-300">
                  {factor.title}
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
