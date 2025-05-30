"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import WordBlock from "@/components/ui/word-block";

interface TimePickerProps {
  selectedDate: Date | null;
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
}

export default function TimePicker({ setSelectedDate }: TimePickerProps) {
  const [time, setTime] = useState({ hour: "", minute: "" });
  const [period, setPeriod] = useState<"AM" | "PM">("AM");

  const updateDate = (newTime: typeof time, newPeriod: "AM" | "PM") => {
    console.log(newTime);
    if (newTime.hour === "" || newTime.minute === "") {
      console.log("fuck");
      setSelectedDate(null);
      return;
    }
    const h = parseInt(newTime.hour || "0", 10);
    const m = parseInt(newTime.minute || "0", 10);

    // Convert to 24-hour format
    let hour24 = h % 12;
    if (newPeriod === "PM") hour24 += 12;

    const now = new Date();
    now.setHours(hour24, m, 0, 0);
    setSelectedDate(now);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "hour" | "minute"
  ) => {
    let value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    if (value === "") {
      const updatedTime = { ...time, [field]: "" };
      console.log("update", updatedTime);
      setTime(updatedTime);
      updateDate(updatedTime, period);
      return;
    }

    const num = parseInt(value, 10);
    let clampedValue = value;

    if (field === "hour") {
      if (num < 1) clampedValue = "1";
      else if (num > 12) clampedValue = "12";
    } else {
      if (num < 0) clampedValue = "00";
      else if (num > 59) clampedValue = "59";
    }

    const updatedTime = { ...time, [field]: clampedValue };
    setTime(updatedTime);
    updateDate(updatedTime, period);
  };

  const handlePeriodChange = (val: "AM" | "PM") => {
    setPeriod(val);
    updateDate(time, val);
  };

  return (
    <div>
      <div className="flex gap-3">
        {["hour", "minute"].map((unit) => (
          <div key={unit}>
            <input
              type="text"
              id={unit}
              value={time[unit as keyof typeof time]}
              onChange={(e) => handleChange(e, unit as "hour" | "minute")}
              maxLength={2}
              className="w-12 h-10 border rounded text-center outline-app-bg outline-1 border-none"
              placeholder={unit[0].repeat(2).toUpperCase()}
            />
          </div>
        ))}

        <div className="relative z-10 w-full">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="h-10">
              <WordBlock className="w-full !text-lg" text={period}>
                <RiArrowDropDownLine />
              </WordBlock>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-50 w-[var(--radix-popper-anchor-width)] mt-1 bg-app-fg border-none">
              <DropdownMenuRadioGroup
                value={period}
                onValueChange={(v) => handlePeriodChange(v as "AM" | "PM")}
              >
                <DropdownMenuRadioItem
                  className="focus:bg-app-highlight"
                  value="AM"
                >
                  AM
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  className="focus:bg-app-highlight"
                  value="PM"
                >
                  PM
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
