import { FC, ReactElement, Ref, forwardRef } from "react";

import { BsFiletypeJson, BsFiletypeJpg } from "react-icons/bs";

import styles from "./option.module.css";

type MenuOptionProps = {
  title?: string;
  type: string;
  icon: string;
  ref?: Ref<HTMLAnchorElement>;
  onClick?: (type: string) => void;
};

const MenuOption: FC<MenuOptionProps> = forwardRef(({ title, type, icon, onClick }, ref) => {
  const optionIcon: Record<string, ReactElement> = {
    "jsonFile": <BsFiletypeJson size="1.5rem" color="var(--primary-black-color)"/>,
    "jpgFile": <BsFiletypeJpg size="1.5rem" color="var(--primary-black-color)"/>
  };

  return (
    <div className={styles["option"]}>
      {optionIcon[icon]}
      <a
        ref={ref}
        onClick={() => onClick?.(type)}
        className={styles["option-link"]}
        data-filetype={type}
      >
        {title}
      </a>
    </div>
  );
});

export default MenuOption;