import { StateCreator } from "zustand";
import { TaskState } from "./createTaskSlice";

import { deleteGroup, getGroups, insertGroup, renameGroup } from "@/app/(api)/taskGroupServices";

export interface GroupState {
  groups: Group[] | null;
}

export interface GroupAction {
  setGroups: (groups: Group[]) => void;
  handleRenameGroup: (group: Group, newGroupName: string) => void;
  handleDeleteGroup: (group: Group) => void;
  handleMakeGroup: (groupName: string) => void;
}
export const createGroupSlice: StateCreator<
  GroupState & TaskState & GroupAction,
  [],
  [],
  GroupState & GroupAction> = (set, get) => ({
    groups: null,
    setGroups: (groups: Group[]) => set({ groups: groups }),
    handleMakeGroup: async (groupName: string) => {
      if (get().groups === null) return;
      try {
        const newGroup: Group = await insertGroup(groupName);
        set((state) => ({
          groups: [...state.groups!, newGroup]
        }))

      } catch (err: any) {
        if (err.code == "23505") {
          console.log("No duplicate groups!")
        }
      }
    },
    handleDeleteGroup: async (group: Group) => {
      deleteGroup(group);
      set((state) => ({
        groups: state.groups!.filter((g) => g.id != group.id && g)
      }));
      set((state) => ({
        toDos: state.toDos!.map((t) => t.group_id === group.id ? { ...t, group_id: null } : t)
      }));
    },
    handleRenameGroup: async (group: Group, newGroupName: string) => {
      renameGroup(group, newGroupName);
      set((state) => ({
        groups: state.groups!.map((g) => g.id == group.id ? { ...g, name: newGroupName } : g)
      }))
    }

  })


