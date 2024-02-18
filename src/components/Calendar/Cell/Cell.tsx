import { Dayjs } from "dayjs";
import { FC } from "react";

import styles from "./cell.module.css";

type CellProps = {
  day: Dayjs;
  firstDayOfMonth: number | undefined;
};

const Cell: FC<CellProps> = ({ day, firstDayOfMonth }) => {
  return (
    <div
      style={{ gridColumn: firstDayOfMonth }}
      className={styles["cell"]}
    >
      <span className={styles["cell-day-number"]}>
        {day.format("D")}
      </span>
      <div>
        tasks
      </div>
    </div>
  );
};

export default Cell;