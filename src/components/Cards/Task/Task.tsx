import { FC, useState } from "react";

import styles from "./task.module.css";
import { useTaskStore } from "@/store/task";
import SortableAndDraggableContext from "@/components/SortableAndDraggableContext/SortableAndDraggableContext";
import Label from "@/components/Label/Label";

import ColorPicker from "@/components/ColorPicker/ColorPicker";

import type { Task, TaskWithoutIdDateTypes } from "@/types/task.type";
import BaseButton from "@/components/Buttons/BaseButton/BaseButton";

import { MdModeEditOutline } from "react-icons/md";
import BaseTextarea from "@/components/Textareas/BaseTextarea";

import { ColorResult } from "react-color";

const TaskCard: FC<Task> = ({ id, name, colors, types }) => {
  const [isEditTask, setIsEditTask] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(Array(colors.length).fill(false));
  
  const [updatedTaskName, setUpdatedTaskName] = useState("");
  const [updatedColors, setUpdatedColors] = useState<string[]>(colors);

  const {
    getActiveDraggableTask,
    updateTaskById
  } = useTaskStore();

  const activeDraggableTask = getActiveDraggableTask(id);

  const handleUpdateTask = () => {    
    const payload: TaskWithoutIdDateTypes = {
      name: updatedTaskName,
      colors: updatedColors
    }

    updateTaskById(id, payload);
    setUpdatedTaskName("");
  };

  const handleCancel = () => {
    setIsEditTask(false);
    setUpdatedTaskName("");
  };

  const handleUpdateTaskColors = (hex: string, color: string) => {
    setUpdatedColors(prev => prev.map(c => {
      return c === color ? c = hex : c;
    }));
  };

  const handleColorClick = (colorIndex: number) => {
    setShowColorPicker(prev => prev.map((value, index) => index === colorIndex ? !value : false));
  };

  if (!activeDraggableTask?.types.includes("Public")) {
    return (
      <SortableAndDraggableContext id={id} preventListeners={isEditTask}>
        <div className={styles["task-card"]}>
          <div className={styles["task-card-heading"]}>
            {
              !updatedColors.length ?
                <span className={styles["task-card-heading-no-colors"]}>No colors specified</span> : (
                  <div className={styles["task-card-heading-colors"]}>
                    {
                      updatedColors.map((color, colorIndex) => {
                        return isEditTask ? (
                          <BaseButton
                            key={colorIndex}
                            distanceBetweenLabelAndIcon="none"
                            padding="0"
                            backgroundColor={color}
                            width="1.5rem"
                            height="1.5rem"
                            borderRadius="50%"
                            hasMenu={showColorPicker[colorIndex]}
                            menuComponent={
                              <ColorPicker
                                show={showColorPicker[colorIndex]}
                                top="-14.75rem"
                                left="-5rem"
                                onChangeComplete={({ hex }: ColorResult) => handleUpdateTaskColors(hex, color)}
                              />
                            }
                            icon={<MdModeEditOutline size="1rem" color="var(--primary-white-color)"/>}
                            onClick={() => handleColorClick(colorIndex)}
                          />
                        ) : (
                          <div
                            key={colorIndex}
                            style={{ backgroundColor: color }}
                            className={styles["task-card-colors-value"]}
                          />
                        )
                      })
                    }
                  </div>
                )
            }
            <Label type={types[0]} />
          </div>
          {
            isEditTask ? (
              <BaseTextarea 
                value={updatedTaskName}
                backgroundColor="var(--primary-white-color)"
                borderRadius="0.25rem"
                placeholder={name}
                rows={2}
                onChange={(e) => setUpdatedTaskName(e.target.value)}
              />
            ) : (
              <span className={styles["task-card-name"]}>
                {name}
              </span>
            )
          }
          <div className={styles["task-card-actions"]}>
            {
              isEditTask ? (
                <>
                  <BaseButton
                    backgroundColor="var(--primary-red-color)"
                    hasLabel
                    label="Cancel"
                    labelColor="var(--primary-white-color)"
                    labelSize="0.875rem"
                    borderRadius="0.25rem"
                    padding="0.75rem"
                    onClick={handleCancel}
                  />
                  <BaseButton 
                    backgroundColor={updatedTaskName.length ? "var(--primary-blue-color)" : "var(--primary-grey-color)"}
                    hasLabel
                    label="Update"
                    labelColor="var(--primary-white-color)"
                    labelSize="0.875rem"
                    borderRadius="0.25rem"
                    padding="0.75rem"
                    disabled={!updatedTaskName.length}
                    onClick={handleUpdateTask}
                  />
                </>
              ) : (
                <BaseButton
                  distanceBetweenLabelAndIcon="none"
                  padding="0"
                  backgroundColor="transparent"
                  width="1.5rem"
                  height="1.5rem"
                  borderRadius="50%"
                  icon={<MdModeEditOutline size="1.25rem" color="var(--primary-black-color)"/>}
                  onClick={() => setIsEditTask(true)}
                />
              )
            }
          </div>
        </div>
      </SortableAndDraggableContext>
    );
  }

  return (
    <div className={styles["task-card"]}>
      <div className={styles["task-card-heading"]}>
        <div className={styles["task-card-heading-colors"]}>
          {
            colors.map((color, colorIndex) => {
              return (
                <div
                  key={colorIndex}
                  style={{ backgroundColor: color }}
                  className={styles["task-card-colors-value"]}
                />
              )
            })
          }
        </div>
        <Label type={types[0]} />
      </div>
      <span className={styles["task-card-name"]}>
        {name}
      </span>
    </div>
  );
};

export default TaskCard;