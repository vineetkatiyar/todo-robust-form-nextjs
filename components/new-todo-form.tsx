'use client'

import { useActionState } from 'react'
import { createTodoAction } from '@/lib/actions'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function NewTodoForm() {
  const [state, formAction, insPending] = useActionState(createTodoAction, {
    success: '',
    error: undefined
  })

  return (
    <form action={formAction}>
      <div className='text-red-500'>{state.error}</div>
      <div className='mt-12 flex gap-3'>
        <Input type='text' name='title' placeholder='Enter a task' />
        <Button type='submit'>{insPending ? 'Adding...' : 'Add Task'}</Button>
      </div>
    </form>
  )
}
