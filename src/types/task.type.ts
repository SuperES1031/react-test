export type Task = {
  id: string | number;
  name: string;
  date: string;
  colors: string[];
  types: string[] | string;
};

export type TaskWithoutIdDateTypes = Omit<Task, "id" | "date" | "types">
