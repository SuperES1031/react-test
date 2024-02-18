import { FC, ReactNode } from "react";

import styles from "./base-layout.module.css";

type BaseLayoutPropos = {
  children: ReactNode;
};

const BaseLayout: FC<BaseLayoutPropos> = ({ children }) => {
  return (
    <div className={styles["base-layout"]}>
      {children}
    </div>
  );
};

export default BaseLayout;