import { useState, FormEvent, useRef, useEffect } from "react";
import { Image as ImageIcon, X, Smile, Calendar, MapPin } from "lucide-react";

interface PostFormProps {
  // função fornecida pelo componente pai para criar um novo post
  onAddPost: (title: string, image?: string) => void;
  count: number;
  isPosting: boolean;
}

function PostForm({ onAddPost, count, isPosting }: PostFormProps) {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * ajusta automaticamente a altura do textarea conforme o texto cresce,
   * evitando scroll interno e melhorando a experiência do usuário.
   */
  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  }, [content]);

  const handleGenerateImage = () => {
    // gera uma imagem aleatória usando seed baseada no tempo
    const randomUrl = `https://picsum.photos/seed/${Date.now()}/600/400`;
    setImageUrl(randomUrl);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // não permite post vazio (sem texto e sem imagem)
    if (!content.trim() && !imageUrl) return;

    onAddPost(content, imageUrl || undefined);

    // reset
    setContent("");
    setImageUrl(null);
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end pb-4 border-b border-[var(--border-color)]">
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          Para você
        </h2>
        <p className="text-sm text-[var(--text-secondary)]">
          {count} publicações
        </p>
      </header>

      <div
        className="
          bg-[var(--bg-secondary)]
          border border-[var(--border-color)]
          rounded-2xl p-4 shadow-sm
          focus-within:ring-1
          focus-within:ring-[var(--accent-color)]/30
        "
      >
        <form onSubmit={handleSubmit} className="flex gap-4">
          <div className="shrink-0">
            <div
              className="
                w-10 h-10 md:w-12 md:h-12 rounded-full
                flex items-center justify-center
                font-bold text-white overflow-hidden
                border border-[var(--border-color)]
                bg-gradient-to-br from-neutral-800 to-neutral-700
              "
            >
              U
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-3 min-w-0">
            <textarea
              ref={textareaRef}
              className="
                w-full bg-transparent
                border-none outline-none resize-none
                text-lg md:text-xl
                text-[var(--text-primary)]
                placeholder:text-[var(--text-secondary)]
                min-h-[60px] py-2
              "
              placeholder="O que está acontecendo?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={1}
            />

            {imageUrl && (
              <div className="relative rounded-2xl overflow-hidden border border-[var(--border-color)] group aspect-video">
                <img
                  src={imageUrl}
                  alt="Random preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImageUrl(null)}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-md"
                  title="Remover imagem"
                >
                  <X size={18} className="cursor-pointer"/>
                </button>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]/50 mt-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleGenerateImage}
                  className="
                    p-2 text-[var(--accent-color)]
                    hover:bg-[var(--accent-color)]/10
                    rounded-full transition-colors
                    relative group
                  "
                  title="Adicionar imagem aleatória"
                >
                  <ImageIcon size={20} className="cursor-pointer" />
                </button>

                {/* Ícones reservados para features futuras */}
                <button
                  type="button"
                  className="p-2 text-[var(--accent-color)] opacity-50 cursor-not-allowed"
                >
                  <Smile size={20} />
                </button>
                <button
                  type="button"
                  className="p-2 text-[var(--accent-color)] opacity-50 cursor-not-allowed"
                >
                  <Calendar size={20} />
                </button>
                <button
                  type="button"
                  className="p-2 text-[var(--accent-color)] opacity-50 cursor-not-allowed"
                >
                  <MapPin size={20} />
                </button>
              </div>

              <button
                disabled={isPosting || !content.trim()}
                className={`
                 px-6 py-2 rounded-full font-bold text-white transition-all
                  ${
                    isPosting || !content.trim()
                      ? "bg-[var(--accent-color)]/50 cursor-not-allowed opacity-50"
                      : "cursor-pointer bg-[var(--accent-color)] hover:brightness-110 active:scale-95 shadow-md shadow-[var(--accent-color)]/20"
                  }
                `}
              >
                {isPosting ? "Postando..." : "Postar"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
