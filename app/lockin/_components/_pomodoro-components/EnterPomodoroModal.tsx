"use client";
import { useForm } from "react-hook-form";

import { Dispatch, SetStateAction } from "react";
import { useTaskStore } from "../../_hooks/useTaskStore";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EnterPomodoroModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

interface TimeFormInput {
  minutesWork: number;
  minutesBreak: number;
  notificationsEnabled: boolean;
}

export default function EnterPomodoroModal({
  showModal,
  setShowModal,
}: EnterPomodoroModalProps) {
  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors },
  } = useForm<TimeFormInput>();
  const setEnabled = useTaskStore((state) => state.setPomodoroEnabled);

  const onSubmit = async (data: TimeFormInput) => {
    let pomodoroGoalMs: number = Number(data.minutesWork * 60 * 1000);
    let pomodoroBreak: number = Number(data.minutesBreak * 60 * 1000);
    // pomodoroGoalMs = 5000;
    // pomodoroBreak = 5000;

    console.log(data.notificationsEnabled);
    if (data.notificationsEnabled) {
      localStorage.setItem("notifications", "yes");
      const result = await Notification.requestPermission();
      if (result === "denied") {
        setError("notificationsEnabled", {
          type: "manual",
          message:
            "We weren't able to enable notifications. Perhaps you are in incognito mode or your browser has notifications disabled?",
        });
        return;
      }
    } else {
      localStorage.setItem("notifications", "no");
    }
    localStorage.setItem("pomodoroGoalMs", String(pomodoroGoalMs));
    localStorage.setItem("breakTimeMs", String(pomodoroBreak));
    reset();
    setEnabled(true);
    setShowModal(false);
  };
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Customize Your Pomodoro
          </DialogTitle>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center gap-x-2 mt-5"
          >
            <div className="w-full flex justify-center gap-x-2 ">
              <label>Work Time:</label>
              <input
                className="bg-app-bg w-18 rounded-lg px-2"
                defaultValue={25}
                type="number"
                {...register("minutesWork", {
                  required: "Cmon you gotta work at least a little bit...",
                  min: { value: 5, message: "Must be at least 5 minutes" },
                  max: { value: 60, message: "Must be at most 60 minutes" },
                })}
              />
              <span>minutes</span>
            </div>
            {errors.minutesWork && (
              <p className="text-red-800 text-sm text-center">
                {errors.minutesWork.message}
              </p>
            )}
            <div className="w-full flex justify-center gap-x-2 mt-3">
              <label>Break Time:</label>
              <input
                className="bg-app-bg w-18 rounded-lg px-2"
                defaultValue={5}
                type="number"
                {...register("minutesBreak", {
                  required: "No break? You're crazy",
                  min: { value: 1, message: "Must be at least 1 minute" },
                  max: { value: 60, message: "Must be at most 60 minutes" },
                })}
              />
              <span>minutes</span>
            </div>
            {errors.minutesBreak && (
              <p className="text-red-800 text-sm text-center">
                {errors.minutesBreak.message}
              </p>
            )}
            <div className="w-full flex justify-center gap-x-2 mt-3">
              <label>Receive notifications?</label>
              <input
                className="scale-150"
                type="checkbox"
                defaultChecked={true}
                {...register("notificationsEnabled")}
              />
            </div>
            <p className="text-sm text-center">
              *Notifications must be enabled on your computer and for the
              browser you are using
            </p>
            {errors.notificationsEnabled && (
              <p className="text-red-800 text-sm text-center">
                {errors.notificationsEnabled.message}
              </p>
            )}
            <div className="mt-8 flex items-center ailgn-middle justify-center space-x-8">
              <button
                className=" p-2 text-center text-app-text rounded-xl font-bold bg-app-highlight w-fit btn-hover"
                type="submit"
              >
                Lets go!
              </button>
            </div>
          </form>
        </DialogHeader>
        <DialogFooter>
          ℹ️ Working on any task will count towards your work time. Your break
          will automatically start.
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
