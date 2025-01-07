import React, { useState } from "react";
import { Task } from "../_services/TaskSchema";
import { CiLock } from "react-icons/ci";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { IoCheckmarkOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";

interface IncompleteTasksProps {
  dailyTasks: Task[];
  lockIntoTask: (task: Task) => void;
  renameTask: (task: Task, taskName: string) => void;
  handleDeleteTask:(task:Task) => void;
}

interface FormData {
  newTaskName: string;
}

const IncompleteTasks: React.FC<IncompleteTasksProps> = ({
  dailyTasks,
  lockIntoTask,
  renameTask,
  handleDeleteTask
}) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData, task: Task) => {
    if(!data.newTaskName.trim()) {
      reset();
      setEditingTaskId(null);
      return;
    }
    renameTask(task, data.newTaskName);
    setEditingTaskId(null);
    reset();
  };

  return (
    <div className="flex flex-col items-center w-full p-2">
      <h1 className="font-bold text-xl pl-2 w-full">In progress</h1>
      {dailyTasks?.map( (task) => !task.is_complete && (
        <div className="my-1 flex space-x-1 w-full rounded-xl" key={task.task_id}>
          <CiLock className="text-2xl w-1/5 btn-hover hover:text-green-600" onClick={() => lockIntoTask(task)}/>
          {editingTaskId === task.task_id ? (
            <form onSubmit={handleSubmit((data) => onSubmit(data, task))} className="w-4/6">
              <input
                id="newTaskName"
                type="text"
                placeholder={task.name}
                {...register("newTaskName")}
                className="w-full rounded-lg bg-appBg"
              />
            </form>
          ) : (
            <p className="w-4/6 rounded-lg">{task.name}</p>
          )}
          {editingTaskId !== task.task_id ? (
            <div className="flex w-1/4 space-x-2">
              <RiDeleteBin6Line 
              className="text-2xl w-1/2 btn-hover text-appBg hover:text-red-600"
              onClick={()=>handleDeleteTask(task)}
              />
              <MdOutlineDriveFileRenameOutline
              className="text-2xl w-1/2 btn-hover text-appBg hover:text-blue-600"
              onClick={() => setEditingTaskId(task.task_id)}
            />
            </div>
          ) : (
            <IoCheckmarkOutline
              className="text-2xl w-1/5 btn-hover hover:text-green-600"
              onClick={handleSubmit((data) => onSubmit(data, task))}/>
          )}
        </div>
        )
      )}
    </div>
  );
};

export default IncompleteTasks;
