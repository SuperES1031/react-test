import { FC, MouseEvent } from "react";

import styles from "./navbar.module.css";
import BaseButton from "../Buttons/BaseButton/BaseButton";

import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type NavbarProps = {
  currentDate: string;
  handleNextMonth: (e: MouseEvent<HTMLButtonElement>) => void;
  handlePreviousMonth: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Navbar: FC<NavbarProps> = ({ currentDate, handleNextMonth, handlePreviousMonth }) => {
  return (
    <div className={styles["navbar"]}>
      <div className={styles["navbar-date"]}>
        <BaseButton
          backgroundColor="var(--primary-white-color)"
          hasLabel={false}
          borderRadius="50%"
          padding="0.5rem"
          icon={<IoIosArrowBack size="1.25rem" color="var(--primary-black-color)" />}
          onClick={handlePreviousMonth}
        />
        <span className={styles["navbar-date-value"]}>
          {currentDate}
        </span>
        <BaseButton
          backgroundColor="var(--primary-white-color)"
          hasLabel={false}
          borderRadius="50%"
          padding="0.5rem"
          icon={<IoIosArrowForward size="1.25rem" color="var(--primary-black-color)" />}
          onClick={handleNextMonth}
        />
      </div>
      <BaseButton
        backgroundColor="var(--primary-white-color)"
        hasLabel={false}
        borderRadius="50%"
        padding="0.75rem"
        icon={<PiDotsThreeOutlineVerticalFill size="1.25rem" color="var(--primary-black-color)" />}
      />
    </div>
  );
};

export default Navbar;