import { Dayjs } from "dayjs";
import { FC } from "react";

import styles from "./calendar.module.css";
import DaysOfWeek from "./DaysOfWeek/DaysOfWeek";
import Grid from "./Grid/Grid";

type CalendarProps = {
  days: Dayjs[];
};

const Calendar: FC<CalendarProps> = ({ days }) => {
  return (
    <div className={styles["calendar"]}>
      <DaysOfWeek />
      <Grid 
        days={days}
      />
    </div>
  );
};

export default Calendar;