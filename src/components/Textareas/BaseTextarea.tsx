import { FC, ChangeEvent } from "react";

import styles from "./base-textarea.module.css";

type BaseTextareaProps = {
  value: string;
  backgroundColor?: string;
  borderRadius?: string;
  placeholder?: string;
  cols?: number;
  rows?: number;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

const BaseTextarea: FC<BaseTextareaProps> = ({
  value,
  backgroundColor,
  borderRadius,
  placeholder,
  cols,
  rows,
  onChange
}) => {
  return (
    <textarea
      style={{
        backgroundColor,
        borderRadius
      }}
      className={styles["base-textarea"]}
      value={value}
      placeholder={placeholder}
      cols={cols}
      rows={rows}
      onChange={onChange}
    />
  )
};

export default BaseTextarea;