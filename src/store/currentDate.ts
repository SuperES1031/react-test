import dayjs, { Dayjs } from "dayjs";
import { MouseEvent } from "react";
import { create } from "zustand";

type CurrentDateStoreState = {
  currentDate: Dayjs;
  handleNextMonth: (e: MouseEvent<HTMLButtonElement>) => void;
  handlePreviousMonth: (e: MouseEvent<HTMLButtonElement>) => void;
}; 

export const useCurrentDateStore = create<CurrentDateStoreState>()((set, get) => ({
  currentDate: dayjs(),
  
  handleNextMonth: () => set({ currentDate: get().currentDate.add(1, "month") }),
  handlePreviousMonth: () => set({ currentDate: get().currentDate.subtract(1, "month") }),
}));