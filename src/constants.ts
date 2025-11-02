import tasks_json from '../task.json'
import { z } from 'zod'


//console.log(tasks)

export const StatusZ = z.enum(['todo', 'in_progress', 'done']);
export type Status = z.infer<typeof StatusZ>;

export const PriorityZ = z.enum(['low', 'medium', 'high']);
export type Priority = z.infer<typeof PriorityZ>;


// "dd.mm.yyyy" або "dd.mm.yyyy HH:mm"  -> Date (UTC)
const dateOrDateTimeDMY = z.string().trim()
  .regex(/^\d{2}\.\d{2}\.\d{4}(?:\s+\d{2}:\d{2})?$/, "Очікую dd.mm.yyyy або dd.mm.yyyy HH:mm")
  .transform(s => {
    const [datePart, timePart] = s.split(/\s+/);
    const [d, m, y] = datePart.split(".").map(Number);
    let hh = 0, mm = 0;
    if (timePart) {
      [hh, mm] = timePart.split(":").map(Number);
    }
    const dt = new Date(Date.UTC(y, m - 1, d, hh, mm));

    // валідність (31.02, 24:60 тощо не пройдуть)
    if (
      dt.getUTCFullYear() !== y ||
      dt.getUTCMonth()    !== m - 1 ||
      dt.getUTCDate()     !== d ||
      dt.getUTCHours()    !== hh ||
      dt.getUTCMinutes()  !== mm
    ) {
      throw new Error("Некоректна дата/час");
    }
    return dt;
  });


// Схема для задавдань
export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().default(''),
  createdAt: z.union([z.coerce.date(), dateOrDateTimeDMY]).default(() => new Date()),
  status: StatusZ.optional().default('todo'),
  priority: PriorityZ.optional().default('medium'),
  deadline:  z.union([z.coerce.date(), dateOrDateTimeDMY]).optional() //z.union([z.date(), z.string()]).optional().default('')
})


export type Task = z.output<typeof TaskSchema>;

// Те, що очікує схема НА ВХОДІ (input) — корисно для DTO/form-data
export  type TaskInput = z.input<typeof TaskSchema>;

const taskSchema = z.array(TaskSchema);

export const parsedTask: Task[] = taskSchema.parse(tasks_json);

//console.log(parsedTask)

