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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row space-x-2">
            {/* Task input field container */}
            <div className="flex flex-row">
                <input
                id="taskName"
                type="text"
                placeholder="add a task"
                {...register("taskName", { required: "Task name is required" })}  // Register input field with validation
                className="border p-2 rounded h-10"
                />
                {errors.taskName && <p className="text-red-500">{errors.taskName.message}</p>}
            </div>
            <button type="submit" className="bg-blue-500 h-10 text-white p-2 rounded">Add</button>
        </form>
    )
}

export default NewTaskForm;
