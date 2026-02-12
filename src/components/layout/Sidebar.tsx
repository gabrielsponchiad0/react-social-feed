import {
  Home,
  Search,
  Compass,
  MessageCircle,
  PlusSquare,
  User,
  Menu,
  Bell,
  LucideIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import "../../App.css";

/**
 * Sidebar responsiva:
 * - Desktop: lateral
 * - Mobile: navegação inferior fixa
 */
interface SidebarProps {
  onSearchClick: () => void;
  isCollapsed: boolean;
  isSearchOpen: boolean;
}

export default function Sidebar({ onSearchClick, isCollapsed, isSearchOpen }: SidebarProps) {
  return (
    <>
      {/* Sidebar Desktop */}
      <aside
        className={`
          fixed left-0 top-0 h-screen border-r border-[var(--border-color)]
          bg-[var(--bg-primary)] p-3 hidden md:flex flex-col duration-300 z-50
          ${isCollapsed ? "w-20" : "w-64"}
        `}
      >
        {/* Logo */}
        <div
          className={`mb-10 px-2 pt-4 transition-all ${
            isCollapsed ? "opacity-0" : "opacity-100"
          }`}
        >
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] italic">
            Feedly
          </h1>
        </div>

        {/* Logo */}
        {isCollapsed && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2">
            <div className="w-8 h-8 rounded-lg bg-[var(--text-primary)]/10 flex items-center justify-center">
              <span className="text-xs font-bold font-serif italic text-[var(--text-primary)]">
                F
              </span>
            </div>
          </div>
        )}

        <nav className="flex-1 space-y-2">
          <NavItem icon={Home} label="Home" to="/home" isCollapsed={isCollapsed} />

          {/* item de busca abre o input global em vez de navegar */}
          <NavItem
            icon={Search}
            label="Pesquisar"
            to="#"
            active={isSearchOpen}
            isCollapsed={isCollapsed}
            onClick={(e) => {
              e.preventDefault();
              onSearchClick();
            }}
          />

          <NavItem icon={Compass} label="Explorar" to="/explore" isCollapsed={isCollapsed} />
          <NavItem icon={MessageCircle} label="Mensagens" to="/messages" isCollapsed={isCollapsed} />
          <NavItem icon={Bell} label="Notificações" to="/notifications" isCollapsed={isCollapsed} />
          <NavItem icon={PlusSquare} label="Criar" to="/create" isCollapsed={isCollapsed} />
          <NavItem icon={User} label="Perfil" to="/profile" isCollapsed={isCollapsed} />
        </nav>

        <div className="mt-auto">
          <NavItem icon={Menu} label="Mais" to="/settings" isCollapsed={isCollapsed} />
        </div>
      </aside>

      {/* navegação mobile */}
      <nav
        className="
          fixed bottom-0 left-0 w-full h-14 bg-[var(--bg-primary)]
          border-t border-[var(--border-color)] flex md:hidden
          items-center justify-around px-4 z-[100]
        "
      >
        <NavLink to="/home" className={({ isActive }) => isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}>
          <Home size={26} />
        </NavLink>

        <button
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            onSearchClick();
          }}
          className={`
            transition-colors duration-200 cursor-pointer
            ${isSearchOpen ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}
          `}
        >
          <Search size={26} />
        </button>

        <NavLink to="/notifications" className={({ isActive }) => isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}>
          <Bell size={26} />
        </NavLink>
        <NavLink to="/explore" className={({ isActive }) => isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}>
          <Compass size={26} />
        </NavLink>
        <NavLink to="/profile">
          <div className="w-6 h-6 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)]" />
        </NavLink>
      </nav>
    </>
  );
}

/**
 * Item de navegação reutilizável
 * mostra tooltip com o label
 */
interface NavItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
  isCollapsed?: boolean;
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const NavItem = ({
  icon: Icon,
  label,
  to,
  isCollapsed = false,
  active,
  onClick,
}: NavItemProps) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => {
        const isCurrentlyActive = active !== undefined ? active : isActive;
        
        return `
          flex items-center gap-4 px-3 py-3 rounded-lg duration-200 group relative
          ${
            isCurrentlyActive
              ? "bg-[var(--bg-secondary)] text-[var(--text-primary)]"
              : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
          }
          ${isCollapsed ? "justify-center" : ""}
        `;
      }}
    >
      <Icon
        size={24}
        className="shrink-0 transition-transform group-hover:scale-110"
      />

      {!isCollapsed && (
        <span className="text-base whitespace-nowrap overflow-hidden">
          {label}
        </span>
      )}

      {/* Tooltip no modo colapsado */}
      {isCollapsed && (
        <div
          className="
            absolute left-16 bg-[var(--bg-secondary)] text-[var(--text-primary)]
            text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100
            pointer-events-none transition-opacity whitespace-nowrap z-50
            border border-[var(--border-color)] shadow-lg
          "
        >
          {label}
        </div>
      )}
    </NavLink>
  );
};
