"use client";

import { HexColorPicker } from "react-colorful";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface ChangeColorProps {
  cssVariable: string;
  displayName: string;
  defaultColor: string;
}

interface FormData {
  hex: string;
}
const ChangeColor: React.FC<ChangeColorProps> = ({ cssVariable, displayName, defaultColor }) => {
  const [color, setColor] = useState(defaultColor);
  const debouncedColor = useDebounce(color, 300);
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  const [showWheel, setShowWheel] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const hex: string = data.hex;
    if (hex.trim() === "") return;
    setColor(hex)
  }

  const saveChanges = () => {
    localStorage.setItem(cssVariable, color);
    setUnsavedChanges(false);
    location.reload();
  }

  const initialize = () => {
    const storedColor = localStorage.getItem(cssVariable) || defaultColor;
    setColor(storedColor);
  }

  useEffect(() => {
    initialize();
  }, [])

  useEffect(() => {
    const storedColor = localStorage.getItem(cssVariable) || defaultColor;
    if (debouncedColor != storedColor) setUnsavedChanges(true);
    else setUnsavedChanges(false);
  }, [debouncedColor])

  return (
    <div className="flex flex-col align-middle justify-center items-center space-y-3" style={{ width: 200 }}>
      <div className="w-full bg-app-bg rounded-xl px-2 btn-hover flex items-center align-middle justify-between space-x-2 text-center" onClick={() => setShowWheel(!showWheel)}>
        <p>{displayName}</p>
        <div style={{ background: color, width: "20px", height: "20px", borderRadius: "25px", border: "1px solid white" }}></div>
      </div>
      {
        showWheel && (
          <div className="w-full flex flex-col align-middle justify-center items-center space-y-3">
            <HexColorPicker color={color} onChange={setColor} />
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex space-x-2">
              <input
                className="px-2 flex-1 w-1/2 bg-app-bg rounded-lg"
                {...register("hex", {
                  pattern: {
                    value: /^#([0-9A-Fa-f]{3}){1,2}$/,
                    message: "Invalid hex color",
                  },
                })}
                placeholder={color}
              />

              <button className="flex-none btn-hover bg-app-bg px-2 rounded-lg" type="submit">Select</button>
            </form>
            <button className="w-full rounded-lg btn-hover bg-app-bg" onClick={() => saveChanges()}>Save Changes</button>
            {errors.hex && <p style={{ color: "red" }}>{errors.hex.message}</p>}
            {unsavedChanges && <p className="text-red-800 text-sm text-center">You have unsaved changes!</p>}
          </div>
        )
      }
    </div >
  )
}

export default ChangeColor;
