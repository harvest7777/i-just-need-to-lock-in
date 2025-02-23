export default function HeaderSection() {
  return (
    <div className="h-screen bg-emerald-800 flex space-x-2 text-appFg">
      {/* selling msg */}
      <div className="space-y-10 p-10 w-2/5 flex flex-col justify-center items-center">
        <div className="flex space-x-2 w-full">
          <span className="text-6xl font-bold">Control</span>
          <span className="text-6xl font-bold text-emerald-400">Your</span>
          <span className="text-6xl font-bold">Day</span>
        </div>
        <h2 className="text-appBg text-2xl w-full">Take back control of your time. Track your day, share your journey, visualize your growth.</h2>
        <p className="text-2xl p-4 rounded-xl bg-appFg text-center text-emerald-800 w-fit font-bold btn-hover">I'M READY TO LOCK IN</p>
      </div>
      {/* demo video */}
      <video src="demo.mp4" controls />
    </div>
  )
}
