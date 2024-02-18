import { FC } from "react";

import { Dayjs } from "dayjs";

import styles from "./grid.module.css";
import Cell from "../Cell/Cell";

type GridProps = {
  days: Dayjs[];
};

const Grid: FC<GridProps> = ({ days }) => {
  const getFirstDayOfMonth = (dayIndex: number) => {    
    if (dayIndex === 0) return days[0].day() + 1;
  };

  return (
    <div className={styles["grid"]}>
      {
        days.map((day, dayIndex) => {
          return (
            <Cell
              key={dayIndex}
              firstDayOfMonth={getFirstDayOfMonth(dayIndex)}
              day={day}
            />
          );
        })
      }
    </div>
  );
};

export default Grid;