import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function NewTodoForm() {
  return (
    <form action=''>
      <div className='mt-12 flex gap-3'>
        <Input type='text' name='title' placeholder='Enter a task' />
        <Button type='submit'>Add Todo</Button>
      </div>
    </form>
  )
}
