import { FC } from "react";

import styles from "./grid.module.css";
import Cell from "../Cell/Cell";
import type { Days } from "@/types/day.type";

type GridProps = {
  days: Days;
};

const Grid: FC<GridProps> = ({ days }) => {
  const getFirstDayOfMonth = (dayIndex: number) => {    
    if (dayIndex === 0) return days[0].monthDay.day() + 1;
  };

  return (
    <div className={styles["grid"]}>
      {
        days.map((day, dayIndex) => {
          return (
            <Cell
              key={day.id}
              firstDayOfMonth={getFirstDayOfMonth(dayIndex)}
              {...day}
            />
          );
        })
      }
    </div>
  );
};

export default Grid;