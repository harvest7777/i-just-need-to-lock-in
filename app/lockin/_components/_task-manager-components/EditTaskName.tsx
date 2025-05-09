import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { IoCheckmarkOutline } from "react-icons/io5";

interface FormData {
  newTaskName: string;
}

interface EditTaskNameProps {
  handleRenameTask: (task: Task, taskName: string) => void;
  setEditingTaskId: Dispatch<SetStateAction<number | null>>;
  task: Task;
}

const EditTaskName: React.FC<EditTaskNameProps> = ({ handleRenameTask, setEditingTaskId, task }) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const onSubmit = (data: FormData, task: Task) => {
    if (!data.newTaskName.trim()) {
      reset();
      setEditingTaskId(null);
      return;
    }
    handleRenameTask(task, data.newTaskName);
    setEditingTaskId(null);
    reset();
  };

  return (
    <div className="flex flex-1 space-x-1" onPointerDown={(e) => { e.stopPropagation() }} onTouchStart={(e) => { e.stopPropagation() }} onMouseDown={(e) => { e.stopPropagation() }}>
      <form onSubmit={handleSubmit((data) => onSubmit(data, task))} className="flex-1" >
        <input
          id="newTaskName"
          type="text"
          placeholder={task.name}
          {...register("newTaskName")}
          className="w-full rounded-lg bg-app-bg pl-2"
        />
      </form>
      <IoCheckmarkOutline className="text-2xl flex-none btn-hover text-app-bg hover:text-green-600" onClick={handleSubmit((data) => onSubmit(data, task))} />
    </div>
  )
}
export default EditTaskName;
