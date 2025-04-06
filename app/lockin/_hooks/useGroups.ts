import { Dispatch, SetStateAction, useEffect, useState } from "react"

import { deleteGroup, getGroups, insertGroup, renameGroup } from "@/app/(api)/taskGroupServices";

interface useGroupsProps {
  setToDos: Dispatch<SetStateAction<Task[]>>;
}
export const useGroups = ({ setToDos }: useGroupsProps) => {
  const [groups, setGroups] = useState<Group[]>([]);

  const initialize = async () => {
    const fetchedGroups: Group[] = await getGroups();
    setGroups(fetchedGroups);
  }

  useEffect(() => {
    initialize();
  }, [])

  const handleMakeGroup = async (groupName: string) => {
    try {
      const newGroup: Group = await insertGroup(groupName);
      setGroups((prev) => [...prev, newGroup]);

    } catch (err: any) {
      if (err.code == "23505") {
        console.log("No duplicate groups!")
      }
    }
  }

  const handleDeleteGroup = async (group: Group) => {
    deleteGroup(group);
    setGroups((prev) => prev.filter((g) => g.id != group.id && g));
    setToDos((prev) =>
      prev.map((t: Task) =>
        t.group_id === group.id ? { ...t, group_id: null } : t
      )
    );
  }

  const handleRenameGroup = async (group: Group, newGroupName: string) => {
    renameGroup(group, newGroupName);
    setGroups((prev) => prev.map((g) => g.id == group.id ? { ...g, name: newGroupName } : g));
  }

  return {
    groups,
    setGroups,
    handleMakeGroup,
    handleDeleteGroup,
    handleRenameGroup
  }
}
