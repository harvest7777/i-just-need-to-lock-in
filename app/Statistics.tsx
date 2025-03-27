import Link from "next/link"

export default function Statistics() {
  return (

    <div className="flex flex-col items-center justify-center align-middle w-full md:mt-32 mt-24 text-center">
      {/* header */}
      <div className="flex md:flex-row flex-col gap-x-4 gap-y-10 align-middle justify-center md:items-start items-center">
        <div className="flex flex-col items-center justify-center align-middle md:w-1/3 h-full">
          <p className="md:text-6xl text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-blue-500">1000+ </p>
          <p className="md:text-5xl text-3xl font-bold text-neutral-600">hours spent locking in</p>
        </div>

        <div className="flex flex-col items-center justify-center align-middle md:w-1/3 h-full">
          <p className="md:text-6xl text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-blue-500">3000+</p>
          <p className="md:text-5xl text-3xl font-bold text-neutral-600">work sessions</p>
        </div>

        <div className="flex flex-col items-center justify-center align-middle md:w-1/3 h-full">
          <p className="md:text-6xl text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-blue-500">700+</p>
          <p className="md:text-5xl text-3xl font-bold text-neutral-600">tasks completed</p>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center align-middle pb-56">
        <p className="text-xl text-neutral-600 px-10 mb-8">Ready to take control of your day? Just click here, and we'll handle the rest.</p>
        <Link href="/sign-up" className="text-2xl p-4 rounded-xl text-center text-[#f9fbfc] w-fit font-bold btn-hover bg-emerald-400 shadow-[0_0_20px_1px] shadow-emerald-400">I'M READY TO LOCK IN</Link>
      </div>
    </div>
  )
}
