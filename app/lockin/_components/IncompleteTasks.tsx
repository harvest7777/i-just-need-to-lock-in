import React, { useState } from "react";
import { MdLock } from "react-icons/md";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { IoCheckmarkOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

interface IncompleteTasksProps {
  toDos: Task[];
  lockIntoTask: (task: Task) => void;
  handleRenameTask: (task: Task, taskName: string) => void;
  handleDeleteTask:(task:Task) => void;
}

interface FormData {
  newTaskName: string;
}

const IncompleteTasks: React.FC<IncompleteTasksProps> = ({
  toDos,
  lockIntoTask,
  handleRenameTask,
  handleDeleteTask
}) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [taskToDelete, setTaskToDelete] = useState<Task|null>(null);

  const onSubmit = (data: FormData, task: Task) => {
    if(!data.newTaskName.trim()) {
      reset();
      setEditingTaskId(null);
      return;
    }
    handleRenameTask(task, data.newTaskName);
    setEditingTaskId(null);
    reset();
  };

  return (
    <div className="flex flex-col items-center w-full p-2">
      <ConfirmDeleteModal taskToDelete={taskToDelete} setTaskToDelete={setTaskToDelete} handleDeleteTask={handleDeleteTask}/>
      <h1 className="font-bold text-xl pl-2 w-full">To Do</h1>
      {toDos?.map( (task) => !task.is_complete && (
        // list out incomplete tasks and corresponding buttons
        <div className="my-1 flex space-x-1 w-full rounded-xl" key={task.task_id}>
          <MdLock className="text-2xl w-1/5 btn-hover text-appBg hover:text-green-600" onClick={() => lockIntoTask(task)}/>

          {/* if the task is being edited, show input box */}
          {editingTaskId === task.task_id ? (
            <>
              <form onSubmit={handleSubmit((data) => onSubmit(data, task))} className="w-4/6">
                <input
                  id="newTaskName"
                  type="text"
                  placeholder={task.name}
                  {...register("newTaskName")}
                  className="w-full rounded-lg bg-appBg pl-2"
                />
              </form>
              <IoCheckmarkOutline className="text-2xl w-1/5 btn-hover text-appBg hover:text-green-600" onClick={handleSubmit((data) => onSubmit(data, task))}/>
            </>
          ) : (
            <>
              <p className="w-4/6 rounded-lg">{task.name}</p>
              <div className="flex w-2/5 space-x-2">
                <RiDeleteBin6Line  className="text-2xl w-1/2 btn-hover text-appBg hover:text-red-600" onClick={()=>setTaskToDelete(task)}/>
                <MdOutlineDriveFileRenameOutline className="text-2xl w-1/2 btn-hover text-appBg hover:text-blue-600" onClick={() => setEditingTaskId(task.task_id)}/>
              </div>
            </>
          )}
          
        </div>
        )
      )}
    </div>
  );
};

export default IncompleteTasks;
