"use client";
import { useState, useEffect } from "react";
import Changelog from "../Changelog";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <button
          onClick={() => handleClick()}
          className="w-full font-bold text-lg btn-hover outline-1 bg-app-fg outline-app-highlight rounded-xl"
        >
          ✨Changelog
          {outdated && (
            <div className="absolute top-[-5px] right-[-5px] z-40 w-3 h-3 bg-red-800 rounded-full " />
          )}
        </button>
      </DialogTrigger>
      <DialogContent className="md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Changelog
          </DialogTitle>
        </DialogHeader>
        <Changelog />
      </DialogContent>
    </Dialog>
  );
}
