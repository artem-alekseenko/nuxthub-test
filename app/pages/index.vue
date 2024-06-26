<script setup>
const { data: todos, refresh } = await useFetch('/api/todos')

const newTodo = ref('')

async function submitTodo (){
  if (!newTodo.value.trim()) return
  await $fetch('/api/todos', {
    method: 'POST',
    body: {
      todo:{
        name: newTodo.value,
        completed: 0
      }

    }
  })
  newTodo.value = ''
  await refresh()
}

async function deleTodo (id){
  console.log('deleting new todo', id);
  await $fetch(`/api/todos/${id}`, {
    method: 'DELETE'
  })
  await refresh()
}
</script>

<template>
  <main class="w-full h-screen flex items-center justify-center">
    <UCard class="w-96" @submit.prevent="submitTodo">
      <template #header>
        <h3 class="text-lg font-semibold leading-6">Todo List</h3>
      </template>
      <div class="flex items-center gap-2">
        <UInput
          ref="newTodoInput"
          name="todo"
          class="flex-1"
          placeholder="Add a Todo.."
          autocomplete="off"
          v-model="newTodo"
          autofocus
          :ui="{ wrapper: 'flex-1' }"
        />

        <UButton type="submit" />
      </div>
      <ul class="divide-y divide-gray-200 dark:divide-gray-800 mt-10">
        <li v-for="todo of todos"  :key="todo.id" class="flex items-center gap-4 py-2">
          <span
            class="flex-1 font-medium"
          >{{ todo.name}}</span
          >
          <UButton
            color="red"
            variant="soft"
            size="2xs"
            @click.prevent="deleTodo(Number(todo.id))"
          />
        </li>
      </ul>
    </UCard>
  </main>
</template>
