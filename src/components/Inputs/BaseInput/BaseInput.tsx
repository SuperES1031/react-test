import { FC, ChangeEvent } from "react";

import styles from "./base-input.module.css";

type BaseInputProps = {
  value: string;
  backgroundColor?: string;
  borderRadius?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const BaseInput: FC<BaseInputProps> = ({
  value,
  backgroundColor,
  borderRadius,
  placeholder,
  onChange
}) => {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      className={styles["base-input"]}
      style={{
        backgroundColor,
        borderRadius
      }}
      onChange={onChange} 
    />
  );
};

export default BaseInput;