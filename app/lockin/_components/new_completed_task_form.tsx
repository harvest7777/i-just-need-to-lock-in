
import { useForm } from "react-hook-form";

interface FormData {
    taskName: string;
    taskMinutes: number;
}
interface NewTaskFormProps {
    addCompletedTask: (taskName: string, taskMinutes: number) => Promise<void>;
}

const NewCompletedTaskForm: React.FC<NewTaskFormProps> = ({addCompletedTask}) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        addCompletedTask(data.taskName, data.taskMinutes);
        reset();
    };
    return(
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row space-x-2 w-full justify-center">
            {/* Task name container */}
            <div className="flex flex-col w-1/2">
                <input
                    id="taskName"
                    type="text"
                    placeholder="Completed task name"
                    {...register("taskName", { required: "Task name is required" })}
                    className="border p-2 rounded"
                />
                {errors.taskName && <p className="text-red-500">{errors.taskName.message}</p>}
            </div>

            {/* Minutes container */}
            <div className="flex flex-col w-1/4">
                <input
                    id="tTaskMinutes"
                    type="number"
                    placeholder="Minutes spent"
                    {...register("taskMinutes", { required: "Minutes are required", min: 1 })}
                    className="border p-2 rounded"
                />
                {errors.taskMinutes && <p className="text-red-500">{errors.taskMinutes.message}</p>}

            </div>
            <button type="submit" className="bg-green-500 text-white p-2 rounded h-10 w-1/4">Add</button>
        </form>
    )
}

export default NewCompletedTaskForm;