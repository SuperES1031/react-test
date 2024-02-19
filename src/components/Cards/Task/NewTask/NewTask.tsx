import { FC, MouseEvent, useState } from "react";

import styles from "./new-task.module.css";
import BaseTextarea from "@/components/Textareas/BaseTextarea";
import BaseButton from "@/components/Buttons/BaseButton/BaseButton";

import { GoPlus } from "react-icons/go";
import ColorPicker from "@/components/ColorPicker/ColorPicker";
import { ColorResult } from "react-color";
import { useTaskStore } from "@/store/task";

import { v4 as uuidv4 } from "uuid";

type NewTaskProps = {
  currentDate: string;
  onCancel: (e: MouseEvent<HTMLButtonElement>) => void;
}

const NewTask: FC<NewTaskProps> = ({ currentDate, onCancel }) => {
  const [taskName, setTaskName] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const { createNewTask } = useTaskStore();

  const handleSaveTask = () => {
    createNewTask({
      id: uuidv4(),
      name: taskName,
      date: currentDate,
      colors,
      types: ["Custom"]
    });
  }

  return (
    <div className={styles["new-task"]}>
      <div className={styles["new-task-colors"]}>
        {
          !!colors.length ? (
            <>
              {
                colors.map((color, colorIndex) => {
                  return (
                    <div
                      key={colorIndex}
                      style={{
                        backgroundColor: color,
                        width: "1.5rem",
                        height: "1.5rem",
                        borderRadius: "50%"
                      }}
                    />
                    )
                  }
                )
              }
              <BaseButton
                distanceBetweenLabelAndIcon="none"
                padding="0"
                backgroundColor="var(--primary-grey-color)"
                width="1.5rem"
                height="1.5rem"
                borderRadius="50%"
                hasMenu
                menuComponent={
                  <ColorPicker
                    show={showColorPicker}
                    top="-14.75rem"
                    left="-5rem"
                    onChangeComplete={({ hex }: ColorResult) => setColors(prev => [...prev, hex])}
                  />
                }
                icon={<GoPlus size="1.25rem" color="var(--primary-black-color)"/>}
                onClick={() => setShowColorPicker(prev => !prev)}
              />
            </>
          ) : (
            <BaseButton
              distanceBetweenLabelAndIcon="none"
              padding="0"
              backgroundColor="var(--primary-grey-color)"
              width="1.5rem"
              height="1.5rem"
              borderRadius="50%"
              hasMenu
              menuComponent={
                <ColorPicker
                  show={showColorPicker}
                  top="-14.75rem"
                  left="-5rem"
                  onChangeComplete={({ hex }: ColorResult) => setColors(prev => [...prev, hex])}
                />
              }
              icon={<GoPlus size="1.25rem" color="var(--primary-black-color)"/>}
              onClick={() => setShowColorPicker(prev => !prev)}
            />
          )
        }
      </div>
      <BaseTextarea 
        value={taskName}
        backgroundColor="var(--primary-white-color)"
        borderRadius="0.25rem"
        placeholder="Task name"
        rows={2}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <div className={styles["new-task-actions"]}>
      <BaseButton 
          backgroundColor="var(--primary-red-color)"
          hasLabel
          label="Cancel"
          labelColor="var(--primary-white-color)"
          labelSize="0.875rem"
          borderRadius="0.25rem"
          padding="0.75rem"
          onClick={onCancel}
        />
        <BaseButton 
          backgroundColor={taskName.length ? "var(--primary-blue-color)" : "var(--primary-grey-color)"}
          hasLabel
          label="Save"
          labelColor="var(--primary-white-color)"
          labelSize="0.875rem"
          borderRadius="0.25rem"
          padding="0.75rem"
          disabled={!taskName.length}
          onClick={handleSaveTask}
        />
      </div>
    </div>
  );
};

export default NewTask;