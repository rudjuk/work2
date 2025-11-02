import {myTasks, Staus, Priority} from './dto/Task'
import {Task, TaskInput} from './constants'


/////////////////////////////////
// Допоміжні функції
/////////////////////////////////

// Конвертація в дату
function toDate(d?: string | Date): Date | undefined {
  if (!d) {
    return undefined;
  }
  return d instanceof Date ? d : new Date(d);
}

// Пошук по індексу
const findIndexById = (id: string) =>
  myTasks.findIndex(t => t.id === id);


/////////////////////////////////
// Робота зі списком завдань
/////////////////////////////////


// Отримання деталей завдання за вказаним id
export function getTask(id: string){
  return myTasks.find(t => t.id === id);
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
export function updateTask(myTask: Task){
  const i = findIndexById(myTask.id);
  if (i === -1) throw new Error(`Task with id "${myTask.id}" not found`);
  const current = myTasks[i];
  const updated: Task = {
    ...current,
    ...myTask,
    createdAt: toDate(myTask.createdAt) ?? toDate(current.createdAt) ?? new Date(),
    deadline: toDate(myTask.deadline) ?? toDate(current.deadline),
  };
  myTasks[i] = updated;
  return updated;
}  


// Видалення завдання
export function delTask(id: string){
  const i = findIndexById(id);
  if (i === -1) return false;
  myTasks.splice(i, 1);
  return true;
}

// Фільтрація завдань за статусом, датою створення та пріоритетом;
export function filterTask(
  statFilter?: Staus,
  dateFilter?: string | Date,
  priorityFilter?: Priority
): Task[] {
  const byDate = toDate(dateFilter);
  return myTasks.filter(t => {
    const okStatus = statFilter ? t.status === statFilter : true;
    const okPriority = priorityFilter ? t.priority === priorityFilter : true;
    const created = toDate(t.createdAt);
    // якщо задано date_filter — беремо задачі, створені того ж дня
    const okDate = byDate
      ? (created ? created.getTime() === byDate.getTime() : false)
      : true;
    return okStatus && okDate && okPriority;
  });
}



// Перевірка, чи завершено завдання до дедлайну
export function checkTask(id: string): boolean {
  const t = getTask(id);
  if (!t) throw new Error(`Task with id "${id}" not found`);
  if (t.status !== 'done') return false;
  const dl = toDate(t.deadline);
  return !dl || Date.now() <= dl.getTime();
}



console.log("TaskApi\n")
