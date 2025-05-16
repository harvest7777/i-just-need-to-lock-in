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

export default function GenerateSummary() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [timeSpent, setTimeSpent] = useState<TPastTaskTime[] | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const taskIntervals = useTaskStore((state) => state.taskIntervals);

  const init = async () => {
    const userId = await getUserId();
    const fetchedTimeSpent = await getPastTaskTime(0, userId);
    setTimeSpent(fetchedTimeSpent);
  };

  const handleCopy = async () => {
    if (!statsRef.current) return;

    try {
      await document.fonts.ready;

      const canvas = await html2canvas(statsRef.current, {
        useCORS: true,
        scale: 2,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob }),
        ]);

        console.log("Image copied to clipboard");
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    } catch (err) {
      console.error("Failed to copy image:", err);
    }
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
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="w-full font-bold text-lg btn-hover outline-1 bg-app-fg outline-app-highlight rounded-xl"
      >
        ✨Daily Summary
      </button>

      {showModal && (
        <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center align-middle z-50">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
          {timeSpent && taskIntervals ? (
            <div className="bg-app-fg flex flex-col gap-y-3 card-outline z-50 w-[450px] pb-2">
              <div
                ref={statsRef}
                className="flex flex-col gap-y-3 bg-app-fg rounded-xl p-2"
              >
                <h1 className="font-bold text-xl text-center">🔒 {today}</h1>
                <div className="pt-2 pb-1.5 border-1 border-app-bg rounded-xl">
                  <p className="px-5 font-bold mb-1">Stats:</p>
                  <MiscStats />
                </div>
                <div className="pt-3 pb-1 border-1 border-app-bg rounded-xl">
                  <p className="px-5 font-bold mb-1">Locked In During:</p>
                  <BarGraph taskIntervals={taskIntervals} showTotal={false} />
                </div>
                <div className="pt-2 pb-1.5 border-1 border-app-bg rounded-xl">
                  <p className="px-5 font-bold mb-1">Worked On:</p>
                  <DisplayTimeSpent tasks={timeSpent} />
                </div>
                <h1 className="text-center italic ">
                  made with 🤍 https://imalockin.com
                </h1>
              </div>
              <div className="flex justify-center gap-x-5">
                <button
                  className="bg-app-bg rounded-xl p-2 text-xl font-bold btn-hover"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  onClick={() => handleCopy()}
                  className="bg-app-highlight rounded-xl p-2 text-xl font-bold btn-hover"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          ) : (
            <PreLoaderSmall />
          )}
        </div>
      )}
    </div>
  );
}
