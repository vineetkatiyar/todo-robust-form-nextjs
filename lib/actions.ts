'use server'

import { createTodo } from '@/lib/todos'
import { revalidatePath } from 'next/cache'
import { NewTodoSchema } from './schemas'

type TodoActionState = {
  success?: string
  error?: string
}

export async function createTodoAction(
  state: TodoActionState,
  formData: FormData
) {
  try {
    const data = Object.fromEntries(formData.entries())
    const result = NewTodoSchema.safeParse(data)

    if (!result.success) {
      return { error: result.error.errors[0].message }
    }

    const title = data.title as string
    await createTodo(title)
    return { success: 'Todo added successfully.' }
  } catch (error: unknown) {
    return { error: (error as Error)?.message || 'Failed to add todo.' }
  } finally {
    revalidatePath('/')
  }
}
