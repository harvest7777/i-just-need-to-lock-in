"use client";

import { useState, useRef, useEffect } from "react";
import BarGraph from "../BarGraph";
import MiscStats from "./MiscStats";
import { useTaskStore } from "@/app/lockin/_hooks/useTaskStore";
import DisplayTimeSpent from "../DisplayTimeSpent";
import { getPastTaskTime, TPastTaskTime } from "@/app/(api)/taskTimeServices";
import { getUserId } from "@/app/(api)/profileServices";
import PreLoaderSmall from "@/app/_components/PreLoaderSmall";
import html2canvas from "html2canvas-pro";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function GenerateSummary() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [timeSpent, setTimeSpent] = useState<TPastTaskTime[] | null>(null);
  const [error, setError] = useState<boolean>(false);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const taskIntervals = useTaskStore((state) => state.taskIntervals);

  const init = async () => {
    const userId = await getUserId();
    const fetchedTimeSpent = await getPastTaskTime(0, userId);
    setTimeSpent(fetchedTimeSpent);
  };
  const handleClick = async () => {
    await init();
    setShowModal(true);
  };

  const handleCopy = async () => {
    if (!statsRef.current) return;

    const newTab = window.open("", "_blank");
    try {
      await document.fonts.ready;
      const canvas = await html2canvas(statsRef.current, { useCORS: true });
      const dataURL = canvas.toDataURL();
      if (newTab) {
        newTab.document.body.innerHTML = `<img src="${dataURL}" style="max-width: 400px; display: block; margin: auto;" />`;
        newTab.document.title = "Download or copy the image!";
      } else {
        console.error("Failed to open new tab (popup blocked?)");
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    }
    // try {
    //   await document.fonts.ready;

    //   const canvas = await html2canvas(statsRef.current, {
    //     useCORS: true,
    //   });
    //   const dataurl = canvas.toDataURL();
    //   console.log(dataurl)

    //   canvas.toBlob(async (blob) => {
    //     if (!blob) return;

    //     await navigator.clipboard.write([
    //       new ClipboardItem({ [blob.type]: blob }),
    //     ]);

    //     console.log("Image copied to clipboard");
    //     setCopied(true);
    //     setTimeout(() => setCopied(false), 3000);
    //   });
    // } catch (err) {
    //   console.error("Failed to copy image:", err);
    // }
  };

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    init();
  }, []);

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <button
          onClick={() => handleClick()}
          className="w-full font-bold text-lg btn-hover outline-1 bg-app-fg outline-app-highlight rounded-xl"
        >
          ✨Daily Summary
        </button>
      </DialogTrigger>
      <DialogContent className="md:max-w-2xl max-h-[calc(100%-30px)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Daily Summary
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center overflow-y-scroll">
          {timeSpent && taskIntervals ? (
            <div className="flex flex-col justify-center items-center  md:w-[400px] w-full">
              <div
                ref={statsRef}
                className=" flex flex-col gap-y-3 bg-app-fg rounded-xl w-full"
              >
                <p className="font-bold text-xl text-center">🔒 {today}</p>

                {/* container for the stats */}
                <div className="border-2 border-app-bg rounded-xl py-2">
                  <div className="rounded-xl">
                    <p className="px-5 font-bold">Stats:</p>
                    <MiscStats />
                    <div className="min-h-[150px] pt-5 md:pb-5 pb-10">
                      <BarGraph
                        taskIntervals={taskIntervals}
                        showTotal={false}
                        maxHeight={150}
                      />
                    </div>
                    <div>
                      <p className=" px-5 font-bold">Worked On:</p>
                      <DisplayTimeSpent tasks={timeSpent} />
                    </div>
                  </div>
                </div>
                <h1 className="text-center italic ">
                  made with 🤍 https://imalockin.com
                </h1>
              </div>
              <button
                onClick={() => handleCopy()}
                className="mt-8 bg-app-highlight rounded-xl p-2 font-bold btn-hover"
              >
                Generate Image
              </button>
              {error && (
                <p className="text-sm text-red-800 text-center">
                  Couldn't open image in new tab, perhaps popups are blocked?
                </p>
              )}
            </div>
          ) : (
            <PreLoaderSmall />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
