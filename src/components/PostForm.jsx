function PostForm({ task, setTask, addPost, count }) {
  return (
    <div className="main-layout">
      <header className="top-bar">
        <h1>Feed</h1>
        <p>{count} publicações</p>
      </header>

      <form className="post-form" onSubmit={addPost}>
        <input
          type="text"
          placeholder="Qual a boa?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
}

export default PostForm