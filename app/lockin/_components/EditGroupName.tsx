import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { IoCheckmarkOutline } from "react-icons/io5";

interface FormData {
  newGroupName: string;
}

interface EditGroupNameProps {
  handleRenameGroup: (group: Group, taskName: string) => void;
  setEditingGroupId: Dispatch<SetStateAction<number|null>>;
  group: Group;
}

const EditGroupName: React.FC<EditGroupNameProps> = ({handleRenameGroup, setEditingGroupId, group}) => {
    const { register, handleSubmit, reset } = useForm<FormData>();
    const onSubmit = (data: FormData, group: Group) => {
        if(!data.newGroupName.trim()) {
        reset();
        setEditingGroupId(null);
        return;
        }
        handleRenameGroup(group, data.newGroupName);
        setEditingGroupId(null);
        reset();
    };

    return (
        <>
        <form onSubmit={handleSubmit((data) => onSubmit(data, group))} className="flex-1">
        <input
            id="newGroupName"
            type="text"
            placeholder={group.name}
            {...register("newGroupName")}
            className="w-full rounded-lg bg-appBg pl-2"
        />
        </form>
        <IoCheckmarkOutline className="text-2xl flex-none btn-hover text-appBg hover:text-green-600"  onClick={handleSubmit((data)=>onSubmit(data,group))} />
        </>
    )
}
export default EditGroupName;
