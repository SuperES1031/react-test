import { Dayjs } from "dayjs";
import { FC, useState } from "react";

import styles from "./cell.module.css";
import TaskCard from "@/components/Cards/Task/Task";
import { Task } from "@/types/task.type";
import BaseButton from "@/components/Buttons/BaseButton/BaseButton";
import { LuPlus } from "react-icons/lu";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import NewTask from "@/components/Cards/Task/NewTask/NewTask";

type CellProps = {
  id: string | number;
  monthDay: Dayjs;
  firstDayOfMonth: number | undefined;
  tasks: Task[];
};

const Cell: FC<CellProps> = ({ id, monthDay, firstDayOfMonth, tasks }) => {
  const [isNewTask, setIsNewTask] = useState(false);

  const { isOver, setNodeRef } = useDroppable({
    id,
    data: { date: monthDay.format("YYYY-MM-DD") }
  });

  return (
    <div
      style={{ 
        gridColumn: firstDayOfMonth,
        backgroundColor: isOver ? "var(--secondary-grey-color)" : "var(--opacity-secondary-grey-color)"
      }}
      className={styles["cell"]}
      ref={setNodeRef}
    >
      <div className={styles["cell-heading"]}>
        <div className={styles["cell-heading-info"]}>
          <span className={styles["cell-heading-info-day"]}>
            {monthDay.format("D")}
          </span>
          { 
            !!tasks.length && (
              <span className={styles["cell-heading-info-tasks-amount"]}>
                {tasks.length} cards
              </span>
            ) 
          }
        </div>
        <BaseButton 
          backgroundColor="transparent"
          hasLabel
          label="New Task"
          labelColor="var(--primary-green-color)"
          labelSize="0.875rem"
          padding="0.75rem"
          distanceBetweenLabelAndIcon="0.25rem"
          icon={<LuPlus size="0.75rem" color="var(--primary-green-color)" />}
          onClick={() => setIsNewTask(true)}
        />
      </div>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {
          tasks.map(task => {
            return (
              <TaskCard
                key={task.id}
                {...task}
              />
            );
          })
        }
      </SortableContext>
      {
        isNewTask && <NewTask currentDate={monthDay.format("YYYY-MM-DD")} onCancel={() => setIsNewTask(false)} />
      }
    </div>
  );
};

export default Cell;