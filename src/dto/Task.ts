
import {Task} from '../constants'


export type Staus = 'todo' | 'in_progress' | 'done'

export type Priority = 'low' | 'medium' | 'high'

/*export type Task = {
  readonly id: string
  title: string
  description?: string
  readonly createdAt: string | Date
  status?: Staus
  priority?: Priority
  deadline?: string | Date
}*/


// Список завдань (який використовується для звернень з функцій)
export const myTasks: Task[] = [];
