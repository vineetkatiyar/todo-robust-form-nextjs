'use client'

import { Todo } from '@prisma/client'
import { formatDate } from '@/lib/utils'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function TodoItem({ todo }: { todo: Todo }) {
  //   async function handleChange(isCompleted: boolean) {
  //     console.log(isCompleted)
  //     // update todo using a server action
  //   }

  return (
    <li className='flex items-center gap-3'>
      <Checkbox
        id={todo.id}
        className='peer'
        // defaultChecked={todo.isCompleted}
        // checked={todo.isCompleted}
        // onCheckedChange={checked => handleChange(checked as boolean)}
      />
      <Label
        htmlFor={todo.id}
        className='cursor-pointer peer-data-[state=checked]:text-gray-500 peer-data-[state=checked]:line-through'
      >
        {todo.title}
      </Label>
      <span className='ml-auto text-sm text-gray-500 peer-data-[state=checked]:text-gray-500 peer-data-[state=checked]:line-through'>
        {formatDate(todo.updatedAt)}
      </span>
    </li>
  )
}
