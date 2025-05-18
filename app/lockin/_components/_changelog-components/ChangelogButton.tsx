"use client";
import { useState, useEffect } from "react";
import Changelog from "../Changelog";

export default function ChangelogButton() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [outdated, setOutdated] = useState<boolean>(false);
  const CURRENT_VERSION = "v1.4";

  const handleClick = async () => {
    setShowModal(true);
    localStorage.setItem("viewedChangelog", "true");
    setOutdated(false);
  };

  const isOudated = () => {
    const storedVersion: string | null = localStorage.getItem("version");
    const viewedChangelog: string | null =
      localStorage.getItem("viewedChangelog");

    //not set at all
    if (!storedVersion || !viewedChangelog) return true;

    if (storedVersion !== CURRENT_VERSION || viewedChangelog !== "true")
      return true;
    return false;
  };

  const checkVersion = () => {
    localStorage.getItem("viewedChangelog");
    if (isOudated()) {
      setOutdated(true);
    }
    localStorage.setItem("version", CURRENT_VERSION);
  };
  useEffect(() => {
    checkVersion();
  }, []);

  return (
    <div>
      <button
        onClick={() => handleClick()}
        className="w-full font-bold text-lg btn-hover outline-1 bg-app-fg outline-app-highlight rounded-xl"
      >
        ✨Changelog
        {outdated && (
          <div className="absolute top-[-5px] right-[-5px] z-40 w-3 h-3 bg-red-800 rounded-full " />
        )}
      </button>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center align-middle z-50">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

          <div className="relative md:w-3/5 w-11/12 bg-app-fg p-3 rounded-xl text-xl flex flex-col justify-center items-center">
            <Changelog />

            <button
              onClick={() => setShowModal(false)}
              className="bg-app-bg rounded-xl p-2 text-xl font-bold btn-hover"
            >
              close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
