import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, CircleSlash } from 'lucide-react';
import { OracleBriefData } from '@/types/domain/oracle';

interface DataAvailabilityProps {
  availability: OracleBriefData['availability'];
}

export function DataAvailability({ availability }: DataAvailabilityProps) {
  const getReasonText = (reason: string | null) => {
    if (reason === 'provider_not_supported') return 'No disponible con proveedor actual';
    if (reason === 'tier_limit') return 'Requiere plan superior del proveedor';
    if (reason === 'not_enough_data') return 'Datos insuficientes';
    return reason || 'No disponible';
  };

  const renderItem = (label: string, isAvailable: boolean, reason: string | null = null) => (
    <div className="flex flex-col gap-1 py-2">
      <div className="flex items-center gap-2">
        {isAvailable ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
        ) : (
          <CircleSlash className="w-4 h-4 text-slate-500 shrink-0" />
        )}
        <span className={`text-sm font-medium ${isAvailable ? 'text-slate-200' : 'text-slate-400'}`}>
          {label}
        </span>
      </div>
      {!isAvailable && (
        <span className="text-xs text-slate-500 ml-6 italic">
          {getReasonText(reason)}
        </span>
      )}
    </div>
  );

  return (
    <Card className="bg-[#0e1526] border-slate-800 text-slate-100 flex-1 rounded-xl shadow-lg h-full">
      <CardHeader className="pb-3 pt-6 px-6">
        <div>
          <CardTitle className="text-lg font-bold text-slate-100">
            Cobertura del análisis
          </CardTitle>
          <p className="text-xs text-slate-400 mt-1">Datos utilizados por The Oracle</p>
        </div>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          <div className="flex flex-col">
            {renderItem("Clasificación (Posición)", true)}
            {renderItem("Forma reciente", true)}
            {renderItem("Puntos por partido (PPG)", true)}
            {renderItem("Historial H2H", availability.h2h.available, availability.h2h.reason)}
          </div>
          <div className="flex flex-col">
            {renderItem("Métricas avanzadas (xG)", availability.advancedMetrics.available, availability.advancedMetrics.reason)}
            {renderItem("Lesiones y bajas", availability.injuries.available, availability.injuries.reason)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
