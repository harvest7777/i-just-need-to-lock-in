"use client";

import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useTaskStore } from "../../_hooks/useTaskStore";

interface MakeGroupModalProps {
  // handleMakeGroup:(name:string) => void;
  // setGroups: Dispatch<SetStateAction<Group[]>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

interface formData {
  groupName: string;
}
const MakeGroupModal: React.FC<MakeGroupModalProps> = ({ setVisible }) => {
  const { handleMakeGroup } = useTaskStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formData>();

  const onSubmit = async (data: formData) => {
    handleMakeGroup(data.groupName);
    reset();
    setVisible(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-3 text-center">
      <input
        id="groupName"
        placeholder="cecs323 homework"
        className="bg-app-bg px-2 rounded-lg"
        {...register("groupName", { required: "Need a name!" })}
      />

      {errors.groupName && (
        <p className="text-red-500">{errors.groupName.message}</p>
      )}
      <div className=" mt-8">
        <button
          type="submit"
          className="p-2 text-center rounded-xl font-bold bg-app-highlight w-fit btn-hover"
        >
          Create Group!
        </button>
      </div>
    </form>
  );
};

export default MakeGroupModal;
