import Link from "next/link"

export default function HeaderSection() {
  return (
    <div className="h-screen min-h-fit bg-emerald-800 flex md:flex-row flex-col gap-x-2 gap-y-2 justify-center align-middle items-center text-appFg">
      {/* selling msg */}
      <div className="md:mt-0 mt-20 space-y-10 md:p-10 p-8 md:w-1/2 flex flex-col align-middle justify-center items-center md:items-start">
        <div className="gap-x-2 w-full md:text-left text-center">
          <h1 className="text-8xl font-bold text-emerald-400">LOCK IN</h1>
          <h1 className="text-4xl font-bold"> (for real this time)</h1>
        </div>
        <h2 className="text-appBg text-2xl w-full">Take back control of your time. Track your day, share your journey, visualize your growth.</h2>
        <Link href="/sign-up" className="text-2xl p-4 rounded-xl bg-appFg text-center text-emerald-800 w-fit font-bold btn-hover">I'M READY TO LOCK IN</Link>
      </div>
      {/* demo video */}

      <div className="relative flex md:w-1/2 items-center justify-center p-5 md:h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 via-white to-emerald-500 rounded-full opacity-30"></div>
        <video autoPlay muted loop width="100%" height="auto" className="rounded-xl z-10">
          <source src="demo.mp4" />
        </video>
      </div>
    </div >
  )
}
