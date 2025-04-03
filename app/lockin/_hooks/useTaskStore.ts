import { TaskState, TaskAction } from './createTaskSlice'
import { create } from 'zustand'
import { createTaskSlice } from './createTaskSlice'
import { createTimerSlice, TimerAction, TimerState } from './createTimerSlice'
import { createManageTaskSlice, ManageTaskActions } from './createManageTaskSlice'
import { createGroupSlice, GroupAction, GroupState } from './createGroupSlice'


export const useTaskStore = create<TaskState & TaskAction & TimerAction & TimerState & ManageTaskActions & GroupState & GroupAction>()((...a) => ({
  ...createTaskSlice(...a),
  ...createTimerSlice(...a),
  ...createManageTaskSlice(...a),
  ...createGroupSlice(...a)
}))

