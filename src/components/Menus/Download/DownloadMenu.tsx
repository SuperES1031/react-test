import { DOWNLOAD_MENU_OPTIONS } from "@/constants/downloadMenuOptions";
import { FC, useRef } from "react";

import styles from "./download-menu.module.css";

import MenuOption from "../Option/Option";

type DownloadMenuProps = {
  top?: string;
  left?: string;
  show: boolean;
}

const DownloadMenu: FC<DownloadMenuProps> = ({ show, top, left }) => {
  const downloadRefs = useRef<HTMLAnchorElement[]>([]);
  
  const downloadAsJSON = (type: string) => {
    const downloadJSONRef = downloadRefs.current.find(ref => ref && ref.dataset.filetype === type);

    if (downloadJSONRef) {
      const tasksDataAsJSON = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(localStorage.getItem("tasks-data")))}`;
      downloadJSONRef.setAttribute('href', tasksDataAsJSON);
      downloadJSONRef.setAttribute('download', "tasks.json");
      downloadJSONRef.click();
    }
  };

  const downloadAsJPG = () => alert("In development");

  const handleFileType = async (type: string) => {
    return type === "json" ? downloadAsJSON(type) : downloadAsJPG();
  };

  return (
    <>
      {
        show && (
          <div 
            style={{ top, left }}
            className={styles["download-menu"]}
          >
            {
              DOWNLOAD_MENU_OPTIONS.map((option, optionIndex) => {
                return (
                  <MenuOption
                    key={option.id}
                    {...option}
                    ref={(el: HTMLAnchorElement) => {
                      downloadRefs.current[optionIndex] = el;
                    }}
                    onClick={() => handleFileType(option.type)}
                  />
                )
              })
            }
          </div>
        )
      }
    </>
  );
};

export default DownloadMenu;