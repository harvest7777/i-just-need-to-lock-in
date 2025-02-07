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
            <span className="text-yellow-600 font-bold">In Development - </span>
            <span className="text-neutral-400">Polishing and refactoring</span>
        </div>
        <div className="max-h-24 overflow-y-auto">
            <p className="text-neutral-400">🔃 2/7/2025 - UI changes</p>
            <p className="text-neutral-400">🔨 2/2/2025 - Fixed lock in history skipping Sunday</p>
            <p className="text-neutral-400">🟩 2/1/2025 - Added ability to cancel session on demand</p>
            <p className="text-neutral-400">🟩 2/1/2025 - Added ability to mark tasks incomplete</p>
            <p className="text-neutral-400">🟩 1/31/2025 - Added weekly lock in history</p>
            <p className="text-neutral-400">🔃 1/29/2025 - Sign up and login now use OTP to support Outlook emails</p>
            <p className="text-neutral-400">🟩 1/27/2025 - Added option to cancel session if you accidentally leave a timer running</p>
            <p className="text-neutral-400">🟩 1/26/2025 - Added total time spent to completed tasks</p>
            <p className="text-neutral-400">🟩 1/26/2025 - Added session timer</p>
            <p className="text-neutral-400">🔃 1/26/2025 - Tasks no longer reset daily</p>
            <p className="text-neutral-400">🟩 1/26/2025 - Added support for Google login</p>
            <p className="text-neutral-400">🟩 1/25/2025 - Added confirmation when removing a friend</p>
            <p className="text-neutral-400">🔃 1/25/2025 - UI changes</p>
            <p className="text-neutral-400">🟩 1/25/2025 - Added confirmation when deleting a task</p>
            <p className="text-neutral-400">🟩 1/24/2025 - Added confetti when completing a task</p>
            <p className="text-neutral-400">🟩 1/24/2025 - Added priority to friends list and friends feed</p>
            <p className="text-neutral-400">🔨 1/24/2025 - Fixed 406 bad request when deleting an in progress task</p>
            <p className="text-neutral-400">🔨 1/24/2025 - Fixed friend activity desyncing when tabbed out</p>
            <p className="text-neutral-400">🟩 1/24/2025 - Added modal to verify you are still working on a task</p>
            <p className="text-neutral-400">🔨 1/23/2025 - Fixed timezone compatability</p>
            <p className="text-neutral-400">🟩 1/23/2025 - Added friend notification to dashboard</p>
            <p className="text-neutral-400">🟩 1/22/2025 - Added changelog page</p>
            <p className="text-neutral-400">🔨 1/20/2025 - Fixed null total time when completing a task</p>
            <p className="text-neutral-400">🔨 1/19/2025 - Fixed activity status not updating on desktop</p>
        </div>
        <h1 className="text-neutral-400 mt-2">🤍 Your feedback is valuable. If you encounter any bugs or ideas please reach out to me on discord @bagillionaire.</h1>
       </div> 
        }
        </>
    )
}