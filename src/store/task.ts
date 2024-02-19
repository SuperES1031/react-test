import type { Task, TaskWithoutIdDateTypes } from "@/types/task.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { getRandomColors } from "@/helpers/colors";
import { arrayMove } from "@dnd-kit/sortable";
import dayjs from "dayjs";

type TaskStore = {
  tasks: Task[];
  createNewTask: (newTask: Task) => void;
  moveTask: (taskId: string | number, date: string) => void;
  reorderTasks: (activeId: string, overId: string) => void;
  getActiveDraggableTask: (activeId: string | number) => Task | undefined;
  fetchWorldwideHolidays: () => Promise<void>;
  updateTaskById: (taskId: string | number, paylaod: TaskWithoutIdDateTypes) => void;
};

export const useTaskStore = create(
  persist<TaskStore>(
    (set, get) => ({
      tasks: [],

      createNewTask: (newTask: Task) => set({ tasks: [...get().tasks, newTask] }),
      updateTaskById: (taskId: string | number, payload: TaskWithoutIdDateTypes) => set({
        tasks: get().tasks.map(task => {
          return task.id === taskId ? { ...task, ...payload } : task;
        })
      }),
      getActiveDraggableTask: (activeId: string | number) => get().tasks.find(task => task.id === activeId),
      reorderTasks: (activeId: string, overId: string) => {
        const oldIndex = get().tasks.findIndex(task => task.id === activeId);
        const newIndex = get().tasks.findIndex(task => task.id === overId);
        set({ tasks: arrayMove(get().tasks, oldIndex, newIndex) });
      },
      moveTask: (taskId: string | number, date: string) => set({
        tasks: get().tasks.map(task => {
          return task.id === taskId && !dayjs(task.date).isSame(date) ? { ...task, date } : task;
        }),
      }),

      fetchWorldwideHolidays: async () => {
        try {
          const { data } = await axios.get<Task[]>("https://date.nager.at/api/v3/NextPublicHolidaysWorldwide");

          if (data && data.length) {
            const transformedData = data.map(item => ({
              id: uuidv4(),
              name: item.name,
              date: item.date,
              colors: getRandomColors(2),
              types: item.types
            }));

            set({ tasks: transformedData });
          }
        } catch (e) {
          console.error(e);
        }
      },
    }),
    {
      name: "tasks-data",
    }
  )
);