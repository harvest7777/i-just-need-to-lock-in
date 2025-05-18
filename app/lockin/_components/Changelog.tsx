"use client";

export default function Changelog() {
  return (
    <div className="w-full h-full">
      <h1 className="text-center text-2xl font-bold mb-3">Changelog</h1>
      {/* <div className="mb-2">
        <span className="text-green-600 font-bold">In Development - </span>
        <span className="text-app-text">Pomodoro mode, timer updates</span>
      </div> */}
      <div className="max-h-60 overflow-y-auto border-y-2 border-app-bg">
        <p className="text-app-text">🟩 5/17/2025 - Added changelog</p>
        <p className="text-app-text">
          🟩 5/16/2025 - Added daily summary generator
        </p>
        <p className="text-app-text">
          🟩 5/10/2025 - Added list for all sessions
        </p>
        <p className="text-app-text">🟥 April - Got cooked by school sorry</p>
        <p className="text-app-text">🟩 3/26/2025 - Added custom colors</p>
        <p className="text-app-text">
          🟩 3/5/2025 - Added locked in leaderboards
        </p>
        <p className="text-app-text">🟩 2/23/2025 - Added pie chart analysis</p>
        <p className="text-app-text">
          🔨 2/18/2025 - Fixed task dragging on touchpad tap
        </p>
        <p className="text-app-text">🟩 2/18/2025 - Added task groups</p>
        <p className="text-app-text">🔃 2/7/2025 - UI changes</p>
        <p className="text-app-text">
          🔨 2/2/2025 - Fixed lock in history skipping Sunday
        </p>
        <p className="text-app-text">
          🟩 2/1/2025 - Added ability to cancel session on demand
        </p>
        <p className="text-app-text">
          🟩 2/1/2025 - Added ability to mark tasks incomplete
        </p>
        <p className="text-app-text">
          🟩 1/31/2025 - Added weekly lock in history
        </p>
        <p className="text-app-text">
          🔃 1/29/2025 - Sign up and login now use OTP to support Outlook emails
        </p>
        <p className="text-app-text">
          🟩 1/27/2025 - Added option to cancel session if you accidentally
          leave a timer running
        </p>
        <p className="text-app-text">
          🟩 1/26/2025 - Added total time spent to completed tasks
        </p>
        <p className="text-app-text">🟩 1/26/2025 - Added session timer</p>
        <p className="text-app-text">
          🔃 1/26/2025 - Tasks no longer reset daily
        </p>
        <p className="text-app-text">
          🟩 1/26/2025 - Added support for Google login
        </p>
        <p className="text-app-text">
          🟩 1/25/2025 - Added confirmation when removing a friend
        </p>
        <p className="text-app-text">🔃 1/25/2025 - UI changes</p>
        <p className="text-app-text">
          🟩 1/25/2025 - Added confirmation when deleting a task
        </p>
        <p className="text-app-text">
          🟩 1/24/2025 - Added confetti when completing a task
        </p>
        <p className="text-app-text">
          🟩 1/24/2025 - Added priority to friends list and friends feed
        </p>
        <p className="text-app-text">
          🔨 1/24/2025 - Fixed 406 bad request when deleting an in progress task
        </p>
        <p className="text-app-text">
          🔨 1/24/2025 - Fixed friend activity desyncing when tabbed out
        </p>
        <p className="text-app-text">
          🟩 1/24/2025 - Added modal to verify you are still working on a task
        </p>
        <p className="text-app-text">
          🔨 1/23/2025 - Fixed timezone compatability
        </p>
        <p className="text-app-text">
          🟩 1/23/2025 - Added friend notification to dashboard
        </p>
        <p className="text-app-text">🟩 1/22/2025 - Added changelog page</p>
        <p className="text-app-text">
          🔨 1/20/2025 - Fixed null total time when completing a task
        </p>
        <p className="text-app-text">
          🔨 1/19/2025 - Fixed activity status not updating on desktop
        </p>
      </div>
      <p className="italic text-app-text text-sm mt-4">
        🤍 Your feedback is valuable. If you encounter any bugs or ideas please
        reach out to me on discord @bagillionaire.
      </p>
    </div>
  );
}
