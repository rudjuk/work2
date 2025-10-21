import tasks from '../task.json'
import { z } from 'zod'


//console.log(tasks)

export const StatusZ = z.enum(['todo', 'in_progress', 'done']);
export type Status = z.infer<typeof StatusZ>;

export const PriorityZ = z.enum(['low', 'medium', 'high']);
export type Priority = z.infer<typeof PriorityZ>;


// Схема для задавдань
const schema = z.object({
  id: z.union([z.number(), z.string()]),
  title: z.string(),
  description: z.string().default(''),
  createdAt: z.union([z.date(), z.string()]),
  status: StatusZ.optional().default('todo'),
  priority: PriorityZ.optional().default('medium'),
  deadline: z.union([z.date(), z.string()]).optional().default('')
})


type Task = z.infer<typeof schema>

const taskSchema = z.array(schema);

export const parsedTask: Task[] = taskSchema.parse(tasks);

//console.log(parsedTask)

