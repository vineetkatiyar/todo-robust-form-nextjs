'use server'

import { createTodo } from '@/lib/todos'
import { revalidatePath } from 'next/cache'
import { NewTodoSchema } from '@/lib/schemas'
import arcjet, { shield, detectBot, fixedWindow, request } from '@arcjet/next'

type TodoActionState = {
  success?: string
  error?: string
}

// Shield will detect common attacks.
// bot detection prevents all automated clients from submitting the form.
// fixed window rate limit will allow 5 submissions per IP address within a 1 minute window.

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({
      mode: 'LIVE'
    }),
    detectBot({
      mode: 'LIVE',
      allow: []
    }),
    fixedWindow({
      mode: 'LIVE',
      window: '1m',
      max: 5
    })
  ]
})

export async function createTodoAction(
  state: TodoActionState,
  formData: FormData
) {
  try {
    const req = await request()
    const decision = await aj.protect(req)

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          error: 'Too many registration attempts. Please try again later.'
        }
      }
      if (decision.reason.isBot()) {
        return {
          error: 'You are a bot. Please go away.'
        }
      }
      return {
        error: 'An error occurred during registration.'
      }
    }

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
