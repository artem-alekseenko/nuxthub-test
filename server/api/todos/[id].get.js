export default eventHandler(async (event) => {
  debugger;
  console.log('here')
  // Get the ID from the event (assuming it's passed as an argument)
  const { id } = event.context.params

  if (!id) {
    throw new Error('Missing ID to delete todo');
  }


  const db = hubDatabase();


  // Delete the todo with the specific ID
  await db.prepare('DELETE FROM todos WHERE id = ?').bind(id).run();

  // No need to return anything as the todo is deleted

});
