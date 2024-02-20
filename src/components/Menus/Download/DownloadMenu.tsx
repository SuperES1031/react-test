import { DOWNLOAD_MENU_OPTIONS } from "@/constants/downloadMenuOptions";
import { FC, useRef, forwardRef, RefObject } from "react";

import styles from "./download-menu.module.css";

import MenuOption from "../Option/Option";

import html2canvas from "html2canvas";

type DownloadMenuProps = {
  top?: string;
  left?: string;
  show: boolean;
  ref?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null;
}

const DownloadMenu: FC<DownloadMenuProps> = forwardRef<HTMLDivElement, DownloadMenuProps>(({ show = false, top, left }, ref) => {
  const downloadJSONRef = useRef<HTMLAnchorElement>(null);
  const downloadJPGRef = useRef<HTMLAnchorElement>(null);  
  
  const downloadAsJSON = () => {
    if (downloadJSONRef) {
      const tasksDataAsJSON = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(localStorage.getItem("tasks-data")))}`;
      downloadJSONRef.current?.setAttribute("href", tasksDataAsJSON);
      downloadJSONRef.current?.setAttribute("download", "tasks.json");
      downloadJSONRef.current?.click();
    }
  };

  const downloadAsJPG = async () => {
    const element = ref as any;

    setTimeout(async () => {
      const canvas = await html2canvas(element.current);      
  
      const dataUrl = canvas.toDataURL("image/jpg");      
  
      downloadJPGRef.current?.setAttribute("href", dataUrl);
      downloadJPGRef.current?.setAttribute("download", "calendar.jpg");
      downloadJPGRef.current?.click();
    }, 5000);
  };

  const handleFileType = async (type: string) => {
    return type === "json" ? downloadAsJSON() : await downloadAsJPG();
  };

  return (
    <>
      {
        show ? (
          <div 
            style={{ top, left }}
            className={styles["download-menu"]}
          >
            {
              DOWNLOAD_MENU_OPTIONS.map(option => {
                return (
                  <MenuOption
                    key={option.id}
                    {...option}
                    ref={option.type === "json" ? downloadJSONRef : downloadJPGRef}
                    onClick={() => handleFileType(option.type)}
                  />
                )
              })
            }
          </div>
        ) : (
          <div 
            style={{ display: "none" }}
            className={styles["download-menu"]}
          >
            {
              DOWNLOAD_MENU_OPTIONS.map(option => {
                return (
                  <MenuOption
                    key={option.id}
                    {...option}
                    ref={option.type === "json" ? downloadJSONRef : downloadJPGRef}
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
});

export default DownloadMenu;