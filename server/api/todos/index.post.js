export default eventHandler(async (event) => {
  const { todo } = await readBody(event)
  const db = hubDatabase()

  await db
    .prepare('INSERT INTO todos (name, completed, created_at) VALUES (?1, ?2, ?3)')
    .bind(todo.name, todo.completed, Date.now())
    .run()

  return {}
})
