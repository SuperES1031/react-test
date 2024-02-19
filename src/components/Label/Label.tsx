import { FC } from "react";

import styles from "./label.module.css";

type LabelProps = {
  type: string;
};

const Label: FC<LabelProps> = ({ type }) => {
  return (
    <div
      style={{
        border: `0.0625rem solid ${type === "Public" ? "var(--primary-green-color)" : "var(--primary-blue-color)"}`
      }}
      className={styles["label"]}
    >
      <span
        style={{
          color: type === "Public" ? "var(--primary-green-color)" : "var(--primary-blue-color)"
        }}
        className={styles["label-value"]}
      >
        {type === "Public" ? "Holiday" : "Task"}
      </span>
    </div>
  )
};

export default Label;