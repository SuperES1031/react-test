import { FC } from "react";

import styles from "./base-button.module.css";

import { MouseEvent, ReactElement } from "react";

type BaseButtonProps = {
  backgroundColor?: string;
  label?: string;
  labelColor?: string;
  labelSize?: string;
  icon?:  ReactElement | null;
  hasLabel?: boolean;
  padding?: string;
  borderRadius?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const BaseButton: FC<BaseButtonProps> = ({ 
  backgroundColor = "inherit",
  label = "",
  icon = null,
  labelColor,
  labelSize,
  padding = "0.75rem 1.5rem",
  borderRadius,
  hasLabel = true,
  onClick
}) => {
  return (
    <button
      className={styles["button-with-icon"]}
      style={{
        background: backgroundColor,
        padding,
        borderRadius
      }}
      onClick={onClick}
    >
      {icon}
      {hasLabel && (
        <span
          className={styles["button-with-icon-title"]}
          style={{
            color: labelColor,
            fontSize: labelSize
          }}
        >
          {label}
        </span>
      )}
    </button>
  );
};

export default BaseButton;