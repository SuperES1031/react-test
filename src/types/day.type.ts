import { Dayjs } from "dayjs";
import type { Task } from "./task.type";

export type Days = Array<{ id: string | number; monthDay: Dayjs; tasks: Task[] }>;