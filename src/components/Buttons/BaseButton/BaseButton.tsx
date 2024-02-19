import { FC, ReactNode } from "react";

import styles from "./base-button.module.css";

import { MouseEvent, ReactElement } from "react";

type BaseButtonProps = {
  width?: string;
  height?: string;
  backgroundColor?: string;
  label?: string;
  labelColor?: string;
  labelSize?: string;
  icon?:  ReactElement | null;
  hasLabel?: boolean;
  disabled?: boolean;
  hasMenu?: boolean;
  menuComponent?: ReactNode;
  padding?: string;
  borderRadius?: string;
  distanceBetweenLabelAndIcon?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const BaseButton: FC<BaseButtonProps> = ({
  width,
  height,
  backgroundColor = "inherit",
  label = "",
  icon = null,
  labelColor,
  labelSize,
  padding = "0.75rem 1.5rem",
  borderRadius,
  hasLabel = true,
  hasMenu = false,
  menuComponent,
  disabled = false,
  distanceBetweenLabelAndIcon = "0.5rem",
  onClick,
}) => {
  return (
    <button
      className={styles["base-button"]}
      style={{
        width,
        height,
        background: backgroundColor,
        padding,
        borderRadius,
        gap: distanceBetweenLabelAndIcon
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
      {hasLabel && (
        <span
          className={styles["base-button-label"]}
          style={{
            color: labelColor,
            fontSize: labelSize
          }}
        >
          {label}
        </span>
      )}
      {hasMenu && menuComponent}
    </button>
  );
};

export default BaseButton;