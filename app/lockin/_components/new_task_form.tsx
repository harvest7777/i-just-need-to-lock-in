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
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-row p-2 pt-0">
            {/* Task input field container */}
            <div className="w-full">
                <div className="flex space-x-1">
                    <input
                    id="taskName"
                    type="text"
                    placeholder="daily leetcode"
                    {...register("taskName", { required: "Need name!" })}  // Register input field with validation
                    className="pl-2 w-5/6 rounded-lg bg-neutral-200"
                    />
                    <button type="submit" className="bg-blue-400 rounded-lg w-1/6 text-white">+</button>
                </div>
                {errors.taskName && <p className="text-red-500">{errors.taskName.message}</p>}
            </div>
        </form>
    )
}

export default NewTaskForm;
