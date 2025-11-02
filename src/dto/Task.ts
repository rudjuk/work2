
import {Task} from '../constants'


export type Staus = 'todo' | 'in_progress' | 'done'

export type Priority = 'low' | 'medium' | 'high'


// Список завдань (який використовується для звернень з функцій)
export const myTasks: Task[] = [];
