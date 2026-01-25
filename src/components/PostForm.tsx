import { FormEvent } from "react";

interface PostFormProps {
  task: string;
  setTask: (value: string) => void;
  addPost: (e: FormEvent) => void;
  count: number;
}

function PostForm({ task, setTask, addPost, count }: PostFormProps) {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end pb-4 border-b border-neutral-800">
        <h2 className="text-xl font-semibold">Para você</h2>
        <p className="text-sm text-neutral-500">{count} publicações</p>
      </header>

      <form 
        className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-3 md:p-4 flex gap-2 md:gap-4 items-center focus-within:border-indigo-500/50 transition-colors" 
        onSubmit={addPost}
      >
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-neutral-400 overflow-hidden shrink-0">
          U
        </div>
        <input
          type="text"
          className="bg-transparent border-none outline-none flex-1 text-sm md:text-lg placeholder:text-neutral-600 min-w-0"
          placeholder="Qual a boa?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setTask("");
            }
          }}
        />
        <button 
          type="submit"
          className="cursor-pointer bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 disabled:cursor-not-allowed text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm md:text-base font-semibold transition-colors shrink-0"
          disabled={!task.trim()}
        >
          Publicar
        </button>
      </form>
    </div>
  );
}

export default PostForm