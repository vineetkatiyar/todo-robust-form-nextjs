'use server'

import { createTodo } from '@/lib/todos'
import { revalidatePath } from 'next/cache'

type TodoActionState = {
  success?: string
  error?: string
}

export async function createTodoAction(
  state: TodoActionState,
  formData: FormData
) {
  const title = formData.get('title') as string
  try {
    await createTodo(title)
    return { success: 'Todo added successfully.' }
  } catch (error: unknown) {
    return { error: (error as Error)?.message || 'Failed to add todo.' }
  } finally {
    revalidatePath('/')
  }
}
