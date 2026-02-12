import { Link } from "react-router-dom";
import { AlertCircle, House } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <AlertCircle size={40} />
      </div>
      
      <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-2">404</h1>
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Página não encontrada</h2>
      
      <p className="text-[var(--text-secondary)] max-w-md mb-8">
        Ops! Parece que o link que você tentou acessar não existe ou foi movido para outro lugar.
      </p>
      
      <Link 
        to="/home" 
        className="
          flex items-center gap-2 px-8 py-3 bg-[var(--bg-secondary)] 
          border border-[var(--border-color)] text-[var(--text-primary)]
          font-bold rounded-2xl transition-all hover:border-[var(--accent-color)]
          hover:bg-[var(--accent-color)]/5 active:scale-95
        "
      >
        <House size={18} />
        Voltar para o Início
      </Link>
    </div>
  );
}
