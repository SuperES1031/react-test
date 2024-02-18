import { FC } from "react";

import styles from "./days-of-week.module.css";

const daysOfWeek: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const DaysOfWeek: FC = () => {
  return (
    <div className={styles["days-of-week"]}>
      {
        daysOfWeek.map((day, dayIndex) => {
          return (
            <span
              key={dayIndex}
              className={styles["days-of-week-label"]}
            >
              {day}
            </span>  
          );
        })
      }
    </div>
  );
};

export default DaysOfWeek;