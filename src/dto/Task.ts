
export type Staus = 'todo' | 'in_progress' | 'done'

export type Priority = 'low' | 'medium' | 'high'

export type Task = {
  id: number | string
  title: string
  description?: string
  createdAt: string | Date
  status?: Staus
  priority?: Priority
  deadline?: string | Date
}


export type TaskList = Task[];

// Список завдань (який використовується для звернень з функцій)
export const myTasks: TaskList =  [];

/////////////////////////////////
// Допоміжні функції
/////////////////////////////////

// Конвертація в дату
const toDate = (d?: string | Date) =>
  d == null ? undefined : (d instanceof Date ? d : new Date(d));

// Пошук по індексу
const findIndexById = (id: number | string) =>
  myTasks.findIndex(t => String(t.id) === String(id));


/////////////////////////////////
// Робота зі списком завдань
/////////////////////////////////


// Отримання деталей завдання за вказаним id
export function getTask(id: number | string){
  return myTasks.find(t => String(t.id) === String(id));
}


// Створення нового завдання
export function newTask(mytask: Task){
  if (getTask(mytask.id)) {
    throw new Error(`Task with id "${mytask.id}" already exists`);
  }
  // нормалізуємо дати
  const createdAt = toDate(mytask.createdAt) ?? new Date();
  const deadline  = toDate(mytask.deadline);
  const task: Task = { ...mytask, createdAt, deadline };
  myTasks.push(task);
  return task;
}


// Апдейту деталей завдання
export function updateTask(mytask: Task){
  const i = findIndexById(mytask.id);
  if (i === -1) throw new Error(`Task with id "${mytask.id}" not found`);
  const current = myTasks[i];
  const updated: Task = {
    ...current,
    ...mytask,
    createdAt: toDate(mytask.createdAt) ?? toDate(current.createdAt) ?? new Date(),
    deadline: toDate(mytask.deadline) ?? toDate(current.deadline),
  };
  myTasks[i] = updated;
  return updated;
}  


// Видалення завдання
export function delTask(id: number | string){
  const i = findIndexById(id);
  if (i === -1) return false;
  myTasks.splice(i, 1);
  return true;
}

// Фільтрація завдань за статусом, датою створення та пріоритетом;
export function filterTask(
  stat_filter?: Staus,
  date_filter?: string | Date,
  priority_filter?: Priority
): TaskList {
  const byDate = toDate(date_filter);
  return myTasks.filter(t => {
    const okStatus = stat_filter ? t.status === stat_filter : true;
    const okPriority = priority_filter ? t.priority === priority_filter : true;
    const created = toDate(t.createdAt);
    // якщо задано date_filter — беремо задачі, створені того ж дня
    const okDate = byDate
      ? (created ? created.getTime() === byDate.getTime() : false)
      : true;
    return okStatus && okDate && okPriority;
  });
}



// Перевірка, чи завершено завдання до дедлайну
export function checkTask(id: number | string): boolean {
  const t = getTask(id);
  if (!t) throw new Error(`Task with id "${id}" not found`);
  if (t.status !== 'done') return false;
  const dl = toDate(t.deadline);
  return !dl || Date.now() <= dl.getTime();
}



console.log("Tasks\n")
