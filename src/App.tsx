import Navbar from "./components/Navbar/Navbar";
import BaseLayout from "./layouts/BaseLayout/BaseLayout";

import { useState, useMemo, useEffect } from "react";

import dayjs from "dayjs";
import Calendar from "./components/Calendar/Calendar";

import { v4 as uuidv4 } from "uuid";

import DaysOfWeek from "./components/Calendar/DaysOfWeek/DaysOfWeek";
import { useCurrentDateStore } from "./store/currentDate";
import { useTaskStore } from "./store/task";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

function App() {
  const [search, setSearch] = useState("");

  const {
    tasks,
    reorderTasks,
    fetchWorldwideHolidays,
    getActiveDraggableTask,
    moveTask
  } = useTaskStore();

  const { 
    currentDate, 
    handleNextMonth, 
    handlePreviousMonth 
  } = useCurrentDateStore();

  useEffect(() => {
    try {
      const { state: { tasks } } = JSON.parse(localStorage.getItem("tasks-data") || "");

      if (!tasks.length) {
        fetchWorldwideHolidays();
      }
    } catch (e) {
      console.error(e); 
    }
  }, []);

  const { formattedCurrentDate, days } = useMemo(() => {
    const monthDate = currentDate.startOf("month");

    return {
      formattedCurrentDate: (format: string) => currentDate.format(format),
      days: [...Array(monthDate.daysInMonth()).keys()].map(day => { 
        const monthDay = monthDate.clone().add(day, "day");

        return {
          id: uuidv4(),
          monthDay,
          tasks: tasks
                  .filter(task => monthDay.valueOf() === dayjs(task.date).valueOf())
                  .filter(task => task.name.toLowerCase().includes(search.trim().toLowerCase()))
        };
      })
    }
  }, [currentDate, tasks, search]);

  const handleDragEnd = (e: DragEndEvent) => {    
    const { active, over } = e;
    
    const activeDraggableTask = getActiveDraggableTask(active.id as string);    

    if ((active.id === over?.id) && !activeDraggableTask?.types.includes("Public")) return;

    return (
      over?.data.current?.type === "sortable" ? 
        reorderTasks(active.id as string, over?.id as string) : 
        moveTask(active.id, over?.data.current?.date)
    );
  }

  return (
    <BaseLayout>
      <div style={{ 
        width: "100%", 
        position: "sticky", 
        top: 0, 
        left: 0, 
        zIndex: 1 
      }}>
        <Navbar
          search={search}
          currentDate={formattedCurrentDate("MMMM YYYY")}
          onChange={(e) => setSearch(e.target.value)}
          handleNextMonth={handleNextMonth}
          handlePreviousMonth={handlePreviousMonth}
        />
        <DaysOfWeek />
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <Calendar
          days={days}
        />
      </DndContext>
    </BaseLayout>
  )
};

export default App;
