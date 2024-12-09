import NewTodoForm from '@/components/new-todo-form'
import TodoList from '@/components/todo-list'

export default function Home() {
  return (
    <section className='py-24'>
      <div className='container max-w-2xl'>
        <h1 className='font-serif text-3xl font-medium'>
          Keep track of your tasks
        </h1>

        <NewTodoForm />

        <TodoList />
      </div>
    </section>
  )
}
