import { useTheme } from "../components/theme/theme-provider";
import { Moon, Sun, Monitor } from "lucide-react";

export default function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="py-12 px-4 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Configurações</h2>
      
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold mb-4 text-[var(--text-secondary)]">Aparência</h3>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setTheme("light")}
              className={`cursor-pointer flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                theme === "light" 
                  ? "border-[var(--accent-color)] bg-[var(--accent-color)]/10" 
                  : "border-[var(--border-color)] hover:bg-[var(--bg-secondary)]"
              }`}
            >
              <Sun size={24} className="mb-2" />
              <span className="text-sm font-medium">Claro</span>
            </button>
            
            <button
              onClick={() => setTheme("dark")}
              className={`cursor-pointer flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                theme === "dark" 
                  ? "border-[var(--accent-color)] bg-[var(--accent-color)]/10" 
                  : "border-[var(--border-color)] hover:bg-[var(--bg-secondary)]"
              }`}
            >
              <Moon size={24} className="mb-2" />
              <span className="text-sm font-medium">Escuro</span>
            </button>
            
            <button
              onClick={() => setTheme("system")}
              className={`cursor-pointer flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                theme === "system" 
                  ? "border-[var(--accent-color)] bg-[var(--accent-color)]/10" 
                  : "border-[var(--border-color)] hover:bg-[var(--bg-secondary)]"
              }`}
            >
              <Monitor size={24} className="mb-2" />
              <span className="text-sm font-medium">Sistema</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
