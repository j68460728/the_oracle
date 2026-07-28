import { LayoutDashboard, Users, Calendar, Bell, Settings, Search, Binoculars } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppSidebar() {
  const menuItems = [
    { icon: <Search className="w-5 h-5" />, label: 'Oracle Brief', active: true },
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'League Desk' },
    { icon: <Binoculars className="w-5 h-5" />, label: 'Pattern Watch' },
    { icon: <Users className="w-5 h-5" />, label: 'Player Lens' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Calendario' },
    { icon: <Bell className="w-5 h-5" />, label: 'Alertas', badge: 3 },
    { icon: <Settings className="w-5 h-5" />, label: 'Configuración' },
  ];

  return (
    <aside className="w-64 bg-[#0a0f1c] border-r border-slate-800 text-slate-300 flex-shrink-0 hidden md:flex flex-col h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="font-bold text-white text-xl">O</span>
          </div>
          <div>
            <h1 className="font-bold text-white text-lg leading-tight">THE ORACLE</h1>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest">Football Intelligence</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item, i) => (
          <a
            key={i}
            href="#"
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              item.active 
                ? "bg-blue-600/20 text-blue-400" 
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            )}
          >
            {item.icon}
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 bg-slate-900 rounded-lg p-3 border border-slate-800">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
            AR
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-200">Analista</span>
            <span className="text-xs text-slate-500">Pro Plan</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
