"use client";

import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

export default function Changelog() {
    const [visible, setVisible] = useState<boolean>(true);
    return(
        <>
        {visible&&
        <div className="border-4 h-fit border-neutral-400 border-dashed  outline-neutral-400 p-2 rounded-2xl">
        <div className="flex justify-between align-top">
        <h1 className="text-neutral-400 text-l font-semibold mb-2 md:w-full w-11/12">Thank you for beta testing! Here are recent changes and fixes.</h1>
        <IoCloseOutline className="text-3xl text-red-800 btn-hover md:w-min w-1/12" onClick={()=>setVisible(false)}/>
        </div>
        <div className="mb-2">
            <span className="text-emerald-600">Public Testing - </span>
            <span className="text-neutral-400">Fixed bugs when working on a task through 12 AM. Please report any issues!</span>
        </div>
        <div>
            <p className="text-neutral-400">1/23/2025 - Fixed timezone compatability</p>
            <p className="text-neutral-400">1/23/2025 - Added friend notification to dashboard</p>
            <p className="text-neutral-400">1/22/2025 - Added changelog page</p>
            <p className="text-neutral-400">1/20/2025 - Fixed null total time when completing a task</p>
            <p className="text-neutral-400">1/19/2025 - Fixed activity status not updating on desktop</p>
        </div>
        <h1 className="text-neutral-400 mt-2">🤍 Your feedback is valuable. If you encounter any bugs or want a feature added please reach out to me on discord @bagillionaire.</h1>
       </div> 
        }
        </>
    )
}