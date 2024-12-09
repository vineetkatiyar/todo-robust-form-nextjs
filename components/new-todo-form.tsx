'use client'

import { useActionState, useState } from 'react'
import { createTodoAction } from '@/lib/actions'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { NewTodoSchema } from '@/lib/schemas'

export default function NewTodoForm() {
  const [validationError, setValidationError] = useState({ title: '' })
  const [state, dispatch, insPending] = useActionState(createTodoAction, {
    success: '',
    error: undefined
  })

  const formAction = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries())
    const result = NewTodoSchema.safeParse(data)

    if (!result.success) {
      console.log(result.error.errors[0].message)
      setValidationError({ title: result.error.errors[0].message })
      return
    }

    dispatch(formData)
  }

  return (
    <form action={formAction}>
      <div className='text-red-500'>{state.error}</div>
      <div className='mt-12 flex gap-3'>
        <div className='w-full'>
          <Input type='text' name='title' placeholder='Enter a task' />
          {validationError.title && (
            <p className='ml-1 mt-2 text-sm text-red-500'>
              {validationError.title}
            </p>
          )}
        </div>

        <Button type='submit'>{insPending ? 'Adding...' : 'Add Task'}</Button>
      </div>
    </form>
  )
}
