import { FC } from "react";

import styles from "./calendar.module.css";
import Grid from "./Grid/Grid";
import type { Days } from "@/types/day.type";

type CalendarProps = {
  days: Days;
};

const Calendar: FC<CalendarProps> = ({ days }) => {
  return (
    <div className={styles["calendar"]}>
      <Grid 
        days={days}
      />
    </div>
  );
};

export default Calendar;