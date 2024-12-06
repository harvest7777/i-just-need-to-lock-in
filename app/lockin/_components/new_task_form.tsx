import { useForm } from "react-hook-form";

interface FormData {
    taskName: string;
}
interface NewTaskFormProps {
    addNewTask: (taskName: string) => Promise<void>;
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({addNewTask}) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        addNewTask(data.taskName);
        reset();
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-row space-x-2">
            {/* Task input field container */}
            <div className="w-full flex flex-row space-x-2">
                <div className="flex flex-col w-3/4">
                    <input
                    id="taskName"
                    type="text"
                    placeholder="add a task"
                    {...register("taskName", { required: "Task name is required" })}  // Register input field with validation
                    className="outline outline-black p-2"
                    />
                    {errors.taskName && <p className="text-red-500">{errors.taskName.message}</p>}
                </div>
               <button type="submit" className="bg-blue-500 h-10 w-1/4 text-white p-2 outline outline-black">Add</button>
            </div>
        </form>
    )
}

export default NewTaskForm;
