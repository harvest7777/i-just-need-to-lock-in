import { useState } from "react";
import { FaFolderPlus } from "react-icons/fa";
import MakeGroupModal from "./MakeGroupModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const NewGroupButton = () => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <Dialog open={visible} onOpenChange={setVisible}>
      <DialogTrigger asChild>
        <button
          data-testid="new-group-button"
          onClick={() => setVisible(true)}
          className="text-2xl btn-hover hover:text-app-highlight text-app-bg"
        >
          <FaFolderPlus />
        </button>
      </DialogTrigger>
      <DialogContent className="md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Make A New Group
          </DialogTitle>
        </DialogHeader>
        <MakeGroupModal setVisible={setVisible} />
      </DialogContent>
    </Dialog>
  );
};
export default NewGroupButton;
