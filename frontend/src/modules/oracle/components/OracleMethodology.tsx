import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

interface OracleMethodologyProps {
  score: number;
}

export function OracleMethodology({ score }: OracleMethodologyProps) {
  return (
    <Card className="bg-[#0e1526] border-slate-800 text-slate-100 flex-1 rounded-xl shadow-lg h-full">
      <CardHeader className="pb-3 pt-6 px-6">
        <div>
          <CardTitle className="text-lg font-bold text-slate-100">
            ORACLE METHODOLOGY
          </CardTitle>
          <p className="text-xs text-slate-400 mt-1">¿Cómo se calcula este análisis?</p>
        </div>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 pt-2">
        <div className="flex flex-col mb-4">
          <span className="text-sm font-semibold text-slate-300">Strength Score local: <span className="text-white font-black">{score}/100</span></span>
          <div className="h-0.5 w-full bg-slate-800 my-3 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${score}%` }}></div>
          </div>
        </div>

        <Accordion className="w-full">
          <AccordionItem value="methodology" className="border-b-0">
            <AccordionTrigger className="hover:no-underline py-2 rounded-md hover:bg-slate-800/50 px-2 -mx-2 transition-colors">
              <span className="text-sm font-semibold text-slate-300">Mostrar detalles del algoritmo</span>
            </AccordionTrigger>
            <AccordionContent className="pt-3 pb-1 px-2 -mx-2 text-slate-400">
              <ul className="space-y-3 mb-2">
                <li className="flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-slate-200">Rendimiento en liga (PPG)</span>
                    <span className="text-xs font-bold text-emerald-400">50%</span>
                  </div>
                  <span className="text-xs">Mide los Puntos Por Partido. Es el indicador más estable y con mayor peso matemático para determinar la calidad base.</span>
                </li>
                <li className="flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-slate-200">Forma reciente</span>
                    <span className="text-xs font-bold text-emerald-400">30%</span>
                  </div>
                  <span className="text-xs">Se evalúan los últimos 5 partidos, asignando 3 puntos a victoria y 1 a empate. Penaliza o premia rachas.</span>
                </li>
                <li className="flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-slate-200">Posición en tabla</span>
                    <span className="text-xs font-bold text-emerald-400">20%</span>
                  </div>
                  <span className="text-xs">Ventaja de posición comparativa. El líder obtiene el máximo de puntos y el colista 0 puntos.</span>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
