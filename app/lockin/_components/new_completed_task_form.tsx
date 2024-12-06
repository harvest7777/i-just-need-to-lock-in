
import { useForm } from "react-hook-form";

interface FormData {
    taskName: string;
    taskSeconds: number;
}
interface NewTaskFormProps {
    addCompletedTask: (taskName: string, taskSeconds: number) => Promise<void>;
}

const NewCompletedTaskForm: React.FC<NewTaskFormProps> = ({addCompletedTask}) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        addCompletedTask(data.taskName, data.taskSeconds);
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

            {/* Seconds container */}
            <div className="flex flex-col w-1/4">
                <input
                    id="taskSeconds"
                    type="number"
                    placeholder="Seconds spent"
                    {...register("taskSeconds", { required: "Seconds are required", min: 1 })}
                    className="border p-2 rounded"
                />
                {errors.taskSeconds && <p className="text-red-500">{errors.taskSeconds.message}</p>}

            </div>
            <button type="submit" className="bg-green-500 text-white p-2 rounded h-10 w-1/4">Add</button>
        </form>
    )
}

export default NewCompletedTaskForm;