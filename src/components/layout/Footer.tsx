export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={`
            w-full mt-auto py-8 px-6 
            border-t border-[var(--border-color)] 
            bg-[var(--bg-primary)]
        `}>
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2 grayscale opacity-40">
                         <span className="text-sm font-bold tracking-tight text-[var(--text-primary)] italic">
                            Feedly
                         </span>
                    </div>

                    <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">
                        &copy; {currentYear} FEEDLY SOCIAL
                    </p>
                </div>
            </div>
        </footer>
    );
}
