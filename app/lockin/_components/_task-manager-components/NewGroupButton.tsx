import { useState } from "react";
import { FaFolderPlus } from "react-icons/fa";
import MakeGroupModal from "./MakeGroupModal";
const NewGroupButton = () => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div className="flex">
      {visible && <MakeGroupModal setVisible={setVisible} />}
      <FaFolderPlus onClick={() => setVisible(true)} className="text-2xl btn-hover hover:text-app-highlight text-app-bg" />
    </div>
  )
}
export default NewGroupButton;
