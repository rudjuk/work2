// Запуск: npx ts-node-dev --respawn src/index.ts


console.log("\nПочаток програми");

import { parsedTask } from './constants'
import * as Task from './dto/Task'
import * as TaskApi from './TaskApi'

// Перевіряємо, як завантажився JSON в масив
console.log(parsedTask);

// Вставляю в мої завдання масив, який прочитаний з JSON-файлу
Task.myTasks.push(...parsedTask);

// Пошук по рядку
console.log("===> Пошук по строці '01':");
console.log(TaskApi.getTask("01"));

// Пошук не існуючого елемента
console.log("===> Пошук по не існуючій строці '0100':");
console.log(TaskApi.getTask("0100"));

// Пошук по цифрі
console.log("===> Пошук по строці '5':");
console.log(TaskApi.getTask("5"));


// Створення нового завдання
const newTask: Task.Task = { 
    id: '11',  
    title: 'Нове завдання',  
    description: 'Додавання нового завдання',  
    createdAt: '07.10.2025',  
    status: 'todo',   
    priority: 'low',  
    deadline: '30.01.2026'
  };


Task.myTasks.push(newTask);

console.log(Task.myTasks);


// Апдейту деталей завдання
console.log('Зміна завдання:');
newTask['title']='Змінене завдання';
TaskApi.updateTask(newTask);
console.log(TaskApi.getTask("11"));

// Видалення завдання
TaskApi.delTask("11");
TaskApi.delTask("10-todo");
console.log("\nВидалення завдання:");
console.log(Task.myTasks);


// Фільтрація завдань за статусом, датою створення та пріоритетом;
console.log("\nФільтрація завдань:");

console.log("\nФільтрація за статусом:");
const filter_stat=TaskApi.filterTask('done');
console.log(filter_stat);


console.log("\nФільтрація за приоритетом:");
const filter_prior=TaskApi.filterTask(undefined, undefined, 'medium');
console.log(filter_prior);


console.log("\nФільтрація по даті створення:");
const filter_date=TaskApi.filterTask(undefined, '07.10.2025');
console.log(filter_date);


console.log("\nМікс по різним параметрам:");
console.log("\nФільтрація по даті створення:");
const filter_mix=TaskApi.filterTask('done', '07.10.2025', 'low');
console.log(filter_mix);


// Перевірка, чи завершено завдання до дедлайну.
console.log("\nПеревірка дедлайну:");
let isdedline=TaskApi.checkTask('01');
console.log("'01': "+isdedline);

// Перевірка дедлайну, коли вказуємо цифровий параметр
isdedline=TaskApi.checkTask("5");
console.log("5: "+isdedline);

// Перевірка дддлайну не існуючого елекменту
try {
  isdedline=TaskApi.checkTask("9");
  console.log("9: "+isdedline);
 } catch (err) {
  if (err instanceof Error) {
    console.error('Помилка:', err.message);   // Task with id "9" not found
  } else {
    console.error('Невідома помилка:', err);
  }
} 



console.log('Кінець програми...'+ new Date()
   .toLocaleString('uk-UA',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',hour12:false})
   .replace(',', ''));

