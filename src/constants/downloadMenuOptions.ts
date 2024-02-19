import { v4 as uuidv4 } from "uuid";

export const DOWNLOAD_MENU_OPTIONS = [
  { id: uuidv4(), title: "Save as JSON", type: "json", icon: "jsonFile" },
  { id: uuidv4(), title: "Save as JPG", type: "jpg", icon: "jpgFile" },
]