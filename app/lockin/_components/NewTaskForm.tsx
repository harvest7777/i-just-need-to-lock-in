import { useForm } from "react-hook-form";

import { FaPlus } from "react-icons/fa";

interface FormData {
  taskName: string;
}
interface NewTaskFormProps {
  addNewTask: (taskName: string) => Promise<void>;
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ addNewTask }) => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    addNewTask(data.taskName);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-row p-2 pt-0">
      {/* Task input field container */}
      <div className="w-full">
        <div className="flex space-x-1">
          <input
            id="taskName"
            type="text"
            placeholder="daily leetcode"
            {...register("taskName", { required: "Need name!" })}  // Register input field with validation
            className="px-2 w-5/6 rounded-lg bg-app-bg"
          />
          <button type="submit" className="bg-app-highlight rounded-lg w-1/6 text-app-fg btn-hover flex items-center justify-center">
            <FaPlus />
          </button>
        </div>
        {errors.taskName && <p className="text-red-500">{errors.taskName.message}</p>}
      </div>
    </form>
  )
}

export default NewTaskForm;
