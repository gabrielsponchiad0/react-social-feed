import { Home, Search, Compass, MessageCircle, Heart, PlusSquare, User, Menu } from 'lucide-react';
import '../App.css';

interface SidebarProps {
  onSearchClick: () => void;
}

interface SidebarProps {
  onSearchClick: () => void;
  isCollapsed: boolean;
}

const Sidebar = ({ onSearchClick, isCollapsed }: SidebarProps) => {
  return (
    <>
      {/* Sidebar */}
      <aside 
        className={`
          fixed left-0 top-0 h-screen border-r border-neutral-800 bg-black p-3 
          hidden md:flex flex-col transition-all duration-300 z-50
          ${isCollapsed ? 'w-20' : 'w-64'}
        `}
      >
        <div className={`mb-10 px-2 pt-4 transition-all ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
          <h1 className="text-2xl font-bold tracking-tight text-white italic">Feedly</h1>
        </div>
        
        {isCollapsed && (
           <div className="absolute top-8 left-1/2 -translate-x-1/2">
             <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
               <span className="text-xs font-bold font-serif italic text-white">F</span>
             </div>
           </div>
        )}

        <nav className="flex-1 space-y-2">
          <NavItem icon={Home} label="Home" active isCollapsed={isCollapsed} />
          <NavItem 
            icon={Search} 
            label="Pesquisar" 
            isCollapsed={isCollapsed}
            onClick={(e) => { e.preventDefault(); onSearchClick(); }} 
            active={isCollapsed}
          />
          <NavItem icon={Compass} label="Explorar" isCollapsed={isCollapsed} />
          <NavItem icon={MessageCircle} label="Mensagens" isCollapsed={isCollapsed} />
          <NavItem icon={Heart} label="Notificações" isCollapsed={isCollapsed} />
          <NavItem icon={PlusSquare} label="Criar" isCollapsed={isCollapsed} />
          <NavItem icon={User} label="Perfil" isCollapsed={isCollapsed} />
        </nav>

        <div className="mt-auto">
          <NavItem icon={Menu} label="Mais" isCollapsed={isCollapsed} />
        </div>
      </aside>

      {/* Navegação Mobile */}
      <nav className="fixed bottom-0 left-0 w-full h-14 bg-black border-t border-neutral-800 flex md:hidden items-center justify-around px-4 z-[100]">
        <Home className="text-white" size={26} />
        <Search 
          className={isCollapsed ? "text-white" : "text-neutral-400"} 
          size={26} 
          onClick={(e) => { e.preventDefault(); onSearchClick(); }} 
        />
        <PlusSquare className="text-neutral-400" size={26} />
        <Compass className="text-neutral-400" size={26} />
        <div className="w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700" />
      </nav>
    </>
  );
};

interface NavItemProps {
  icon: any;
  label: string;
  active?: boolean;
  isCollapsed?: boolean;
  onClick?: (e: any) => void;
}

const NavItem = ({ icon: Icon, label, active = false, isCollapsed = false, onClick }: NavItemProps) => {
  return (
    <a
      href="#"
      onClick={onClick}
      className={`
        flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-200 group relative
        ${active ? 'md:bg-neutral-900 text-white' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'}
        ${isCollapsed ? 'justify-center' : ''}
      `}
    >
      <Icon size={24} className={`shrink-0 transition-transform ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
      
      {!isCollapsed && (
        <span className="text-base whitespace-nowrap overflow-hidden transition-all">{label}</span>
      )}
      
      {isCollapsed && (
        <div className="absolute left-16 bg-neutral-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </a>
  );
};

export default Sidebar;
