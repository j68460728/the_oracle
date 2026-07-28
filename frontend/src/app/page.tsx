import { mockOracleBrief } from '@/mocks/brief';
import { BriefHeader } from '@/components/oracle/BriefHeader';
import { QuickSummary } from '@/components/oracle/QuickSummary';
import { RecentForm } from '@/components/oracle/RecentForm';
import { LeaguePosition } from '@/components/oracle/LeaguePosition';
import { HeadToHead } from '@/components/oracle/HeadToHead';
import { GoalsAndAttack } from '@/components/oracle/GoalsAndAttack';
import { DefensiveSolidity } from '@/components/oracle/DefensiveSolidity';
import { KeyPlayers } from '@/components/oracle/KeyPlayers';
import { ContextFactors } from '@/components/oracle/ContextFactors';
import { AppSidebar } from '@/components/oracle/AppSidebar';

export default function Home() {
  const data = mockOracleBrief;

  return (
    <div className="flex h-screen bg-[#070b14] text-slate-200 font-sans overflow-hidden">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">Oracle Brief</h2>
            <p className="text-sm text-slate-400">Análisis prepartido completo y contextual</p>
          </div>

          <BriefHeader 
            matchInfo={data.matchInfo} 
            homeTeam={data.homeTeam} 
            awayTeam={data.awayTeam} 
          />

          {/* Fila 1: Resumen rápido, Forma reciente, Posición en Liga */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            <QuickSummary 
              summary={data.summary} 
              homeTeamName={data.homeTeam.shortName} 
              awayTeamName={data.awayTeam.shortName} 
            />
            <RecentForm 
              homeTeam={data.homeTeam} 
              awayTeam={data.awayTeam} 
            />
            <LeaguePosition 
              homeTeam={data.homeTeam} 
              awayTeam={data.awayTeam} 
              competition={`${data.matchInfo.competition} 2024/25`}
            />
          </div>

          {/* Fila 2: H2H, Goles, Defensa, Jugadores Clave */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
            <HeadToHead 
              history={data.headToHead} 
              homeTeam={data.homeTeam} 
              awayTeam={data.awayTeam} 
            />
            <GoalsAndAttack 
              homeTeam={data.homeTeam} 
              awayTeam={data.awayTeam} 
            />
            <DefensiveSolidity 
              homeTeam={data.homeTeam} 
              awayTeam={data.awayTeam} 
            />
            <KeyPlayers 
              homeTeam={data.homeTeam} 
              awayTeam={data.awayTeam} 
            />
          </div>

          {/* Fila 3: Contexto */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            <ContextFactors factors={data.contextFactors} />
          </div>
          
          <div className="flex justify-between items-center text-xs text-slate-600 pb-8">
            <p>Datos proporcionados por Football-Data.org | Actualizado: 11/05/2025 10:30 (GMT+2)</p>
            <p>The Oracle v1.0.0</p>
          </div>
        </div>
      </main>
    </div>
  );
}
