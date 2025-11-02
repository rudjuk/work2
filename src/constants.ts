import tasks from '../task.json'
import { z } from 'zod'


//console.log(tasks)

export const StatusZ = z.enum(['todo', 'in_progress', 'done']);
export type Status = z.infer<typeof StatusZ>;

export const PriorityZ = z.enum(['low', 'medium', 'high']);
export type Priority = z.infer<typeof PriorityZ>;


// Схема для задавдань
const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().default(''),
  createdAt: z.coerce.date(), // Приймає Date | string | number  // -> Date z.union([z.date(), z.string()]),
  status: StatusZ.optional().default('todo'),
  priority: PriorityZ.optional().default('medium'),
  deadline: z.union([z.date(), z.string()]).optional().default('')
})


export type Task = z.output<typeof TaskSchema>

// Те, що очікує схема НА ВХОДІ (input) — корисно для DTO/form-data
export  type TaskInput = z.input<typeof TaskSchema>;

const taskSchema = z.array(TaskSchema);

export const parsedTask: Task[] = taskSchema.parse(tasks);

//console.log(parsedTask)

