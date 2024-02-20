import { FC, MouseEvent, ChangeEvent, useState, forwardRef, RefObject } from "react";

import styles from "./navbar.module.css";
import BaseButton from "../Buttons/BaseButton/BaseButton";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { MdDownload } from "react-icons/md";
import BaseInput from "../Inputs/BaseInput/BaseInput";
import DownloadMenu from "../Menus/Download/DownloadMenu";

type NavbarProps = {
  currentDate: string;
  search: string;
  handleNextMonth: (e: MouseEvent<HTMLButtonElement>) => void;
  handlePreviousMonth: (e: MouseEvent<HTMLButtonElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  ref?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null;
}

const Navbar: FC<NavbarProps> = forwardRef<HTMLDivElement, NavbarProps>(({
  currentDate,
  search,
  handleNextMonth, 
  handlePreviousMonth,
  onChange
}, ref) => {
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  const divRef = ref as RefObject<HTMLDivElement>;

  return (
    <div className={styles["navbar"]}>
      <div className={styles["navbar-date"]}>
        <div className={styles["navbar-date-actions"]}>
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
        <BaseInput 
          backgroundColor="var(--primary-white-color)"
          borderRadius="2rem"
          placeholder="Search"
          value={search}
          onChange={onChange}
        />
      </div>
      <div className={styles["navbar-actions"]}>
        <BaseButton
          backgroundColor="var(--primary-white-color)"
          hasLabel
          hasMenu
          menuComponent={
            <DownloadMenu
              ref={divRef}
              show={showDownloadMenu}
              top="3.5rem"
              left="-2.5rem"
            />
          }
          label="Download"
          labelColor="var(--primary-black-color)"
          labelSize="1rem"
          borderRadius="0.25rem"
          padding="0.75rem"
          icon={<MdDownload size="1.5rem" color="var(--primary-black-color)" />}
          onClick={() => setShowDownloadMenu(prev => !prev)}
        />
      </div>
    </div>
  );
});

export default Navbar;