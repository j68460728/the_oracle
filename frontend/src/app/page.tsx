import { BriefHeader } from '@/modules/oracle/components/BriefHeader';
import { QuickSummary } from '@/modules/oracle/components/QuickSummary';
import { RecentForm } from '@/modules/oracle/components/RecentForm';
import { LeaguePosition } from '@/modules/oracle/components/LeaguePosition';
import { HeadToHead } from '@/modules/oracle/components/HeadToHead';
import { GoalsAndAttack } from '@/modules/oracle/components/GoalsAndAttack';
import { DefensiveSolidity } from '@/modules/oracle/components/DefensiveSolidity';
import { KeyPlayers } from '@/modules/oracle/components/KeyPlayers';
import { ContextFactors } from '@/modules/oracle/components/ContextFactors';
import { AppSidebar } from '@/modules/oracle/components/AppSidebar';
import { DataAvailability } from '@/modules/oracle/components/DataAvailability';
import { OracleMethodology } from '@/modules/oracle/components/OracleMethodology';
import { getOracleBrief } from '@/api/oracle.client';

export const dynamic = 'force-dynamic';

export default async function Home(props: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const searchParams = await props.searchParams;
  
  const competition = typeof searchParams.competition === 'string' ? searchParams.competition : 'PL';
  const home = typeof searchParams.home === 'string' ? parseInt(searchParams.home, 10) : 65;
  const away = typeof searchParams.away === 'string' ? parseInt(searchParams.away, 10) : 66;

  let data;
  try {
    data = await getOracleBrief(competition, home, away);
  } catch (error) {
    return (
      <div className="flex h-screen bg-[#070b14] text-slate-200 font-sans overflow-hidden">
        <AppSidebar />
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-red-500">API Error</h1>
            <p className="text-slate-400 max-w-lg">
              No se pudo obtener el Oracle Brief. {(error as Error).message}
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#070b14] text-slate-200 font-sans overflow-hidden">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Oracle Brief</h2>
            <p className="text-sm text-slate-400 mt-1">Análisis prepartido completo y contextual</p>
          </div>

          <BriefHeader 
            matchInfo={data.matchInfo} 
            homeTeam={data.homeTeam} 
            awayTeam={data.awayTeam} 
          />

          {/* Fila 1: Resumen rápido y Posición en Liga */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <QuickSummary 
              summary={data.summary} 
              scoring={data.scoring}
              homeTeamName={data.homeTeam.shortName} 
              awayTeamName={data.awayTeam.shortName} 
            />
            <LeaguePosition 
              homeTeam={data.homeTeam} 
              awayTeam={data.awayTeam} 
              competition={`${data.matchInfo.competition} 2024/25`}
            />
          </div>

          {/* Fila 2: H2H y Forma Reciente */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8 items-start">
            <HeadToHead 
              history={data.headToHead} 
              homeTeam={data.homeTeam} 
              awayTeam={data.awayTeam} 
            />
            <RecentForm 
              homeTeam={data.homeTeam} 
              awayTeam={data.awayTeam} 
            />
          </div>

          {/* Fila 3: Goles y Solidez Defensiva */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-start">
            <GoalsAndAttack 
              homeTeam={data.homeTeam} 
              awayTeam={data.awayTeam} 
            />
            <DefensiveSolidity 
              homeTeam={data.homeTeam} 
              awayTeam={data.awayTeam} 
            />
          </div>

          {/* Fila 4: Contexto, Metodología y Disponibilidad */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10 items-start">
            <div className="xl:col-span-1 flex flex-col h-full">
              <ContextFactors factors={data.contextFactors} />
            </div>
            <div className="xl:col-span-1 flex flex-col h-full">
              <OracleMethodology score={data.scoring.home.score} />
            </div>
            <div className="xl:col-span-1 flex flex-col h-full">
              <DataAvailability availability={data.availability} />
            </div>
          </div>
          
          <div className="flex justify-between items-center text-xs text-slate-600 pb-10 border-t border-slate-900 pt-6">
            <p>Datos proporcionados por Football-Data.org | Actualizado: 11/05/2025 10:30 (GMT+2)</p>
            <p>The Oracle v1.0.0</p>
          </div>
        </div>
      </main>
    </div>
  );
}
