"use client";

import { useState } from 'react';
import { LayoutDashboard, Users, Calendar, Bell, Settings, Search, Binoculars, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: <Search className="w-4 h-4" strokeWidth={1.5} />, label: 'Oracle Brief', active: true },
    { icon: <LayoutDashboard className="w-4 h-4" strokeWidth={1.5} />, label: 'League Desk' },
    { icon: <Binoculars className="w-4 h-4" strokeWidth={1.5} />, label: 'Pattern Watch' },
    { icon: <Users className="w-4 h-4" strokeWidth={1.5} />, label: 'Player Lens' },
    { icon: <Calendar className="w-4 h-4" strokeWidth={1.5} />, label: 'Calendario' },
    { icon: <Bell className="w-4 h-4" strokeWidth={1.5} />, label: 'Alertas', badge: 3 },
    { icon: <Settings className="w-4 h-4" strokeWidth={1.5} />, label: 'Configuración' },
  ];

  return (
    <aside className={cn(
      "bg-[#0a0f1c] border-r border-slate-900 text-slate-300 flex-shrink-0 hidden md:flex flex-col h-screen sticky top-0 overflow-y-auto transition-all duration-300 ease-in-out",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className={cn(
        "border-b border-slate-900/60 flex items-center transition-all duration-300 ease-in-out",
        isCollapsed ? "p-4 justify-center flex-col gap-3" : "p-6 justify-between"
      )}>
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-md flex items-center justify-center border border-emerald-500/30 shrink-0">
              <span className="font-extrabold text-white text-lg">O</span>
            </div>
            <div>
              <h1 className="font-black text-white text-base leading-tight tracking-wide">THE ORACLE</h1>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Football Intelligence</p>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 bg-emerald-600 rounded-md flex items-center justify-center border border-emerald-500/30 shrink-0">
            <span className="font-extrabold text-white text-lg">O</span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "p-1.5 rounded bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer",
            isCollapsed ? "mt-1" : ""
          )}
          title={isCollapsed ? "Expandir" : "Contraer"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <nav className={cn("flex-1 py-6 space-y-1.5 transition-all duration-300", isCollapsed ? "px-2" : "px-4")}>
        {menuItems.map((item, i) => (
          <a
            key={i}
            href="#"
            className={cn(
              "flex items-center rounded-lg text-sm font-semibold transition-all duration-200 border",
              isCollapsed ? "justify-center p-2.5" : "gap-3 px-4 py-2.5",
              item.active 
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-sm" 
                : "text-slate-400 border-transparent hover:bg-slate-900 hover:text-slate-200"
            )}
            title={isCollapsed ? item.label : undefined}
          >
            {item.icon}
            {!isCollapsed && <span className="flex-1">{item.label}</span>}
            {!isCollapsed && item.badge && (
              <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </a>
        ))}
      </nav>

      <div className={cn("border-t border-slate-900 transition-all duration-300", isCollapsed ? "p-2" : "p-4")}>
        <div className={cn(
          "flex items-center bg-slate-950 rounded-lg border border-slate-900 transition-all duration-300",
          isCollapsed ? "p-2 justify-center" : "p-3 gap-3"
        )}>
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold border border-emerald-500/35 shrink-0">
            AR
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-200">Analista</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Pro Plan</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

