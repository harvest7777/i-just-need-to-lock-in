import { useState, Dispatch, SetStateAction } from "react";
import { FaFolderPlus } from "react-icons/fa";
import MakeGroupModal from "./MakeGroupModal";
import { useTaskStore } from "../_hooks/useTaskStore";

// interface NewGroupButtonProps {
//   setGroups: Dispatch<SetStateAction<Group[]>>;
//   handleMakeGroup: (name: string) => void;
// }
// const NewGroupButton: React.FC<NewGroupButtonProps> = ({ setGroups, handleMakeGroup }) => {
const NewGroupButton = () => {
  const { setGroups, handleMakeGroup } = useTaskStore();
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div className="flex">
      {visible && <MakeGroupModal setVisible={setVisible} />}
      <FaFolderPlus onClick={() => setVisible(true)} className="text-2xl btn-hover hover:text-green-600 text-app-bg" />
    </div>
  )
}
export default NewGroupButton;
