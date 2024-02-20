import { FC, forwardRef, RefObject } from "react";

import styles from "./calendar.module.css";
import Grid from "./Grid/Grid";
import type { Days } from "@/types/day.type";

type CalendarProps = {
  days: Days;
  ref?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null;
};

const Calendar: FC<CalendarProps> = forwardRef<HTMLDivElement, CalendarProps>(({ days }, ref) => {
  const divRef = ref as RefObject<HTMLDivElement>;
  
  return (
    <div 
      className={styles["calendar"]}
      ref={divRef}
    >
      <Grid 
        days={days}
      />
    </div>
  );
});

export default Calendar;