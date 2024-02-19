import { FC } from "react";
import { BlockPicker, ColorResult } from "react-color";

import styles from "./color-picker.module.css";
import { DEFAULT_COLORS } from "@/constants/defaultColors";

type ColorPickerProps = {
  show: boolean;
  top?: string;
  left?: string;
  onChangeComplete?: (color: ColorResult, e: any) => void;
};

const ColorPicker: FC<ColorPickerProps> = ({ 
  show = false, 
  top, 
  left,
  onChangeComplete
}) => {
  return (
    <>
      {
        show && (
          <div
            className={styles["color-picker"]}
            style={{ top, left }}
          >
            <BlockPicker
              triangle="hide"
              colors={DEFAULT_COLORS}
              onChangeComplete={onChangeComplete}
            />
          </div>
        )
      }
    </>
  )
};

export default ColorPicker;