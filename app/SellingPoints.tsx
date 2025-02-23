import { MdOutlineFilterCenterFocus } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { IoMdFolder } from "react-icons/io";
import { MdAutoGraph } from "react-icons/md";

export default function SellingPoints() {
  return (
    <div className="flex flex-col items-center justify-center align-middle w-full">
      {/* header */}
      <h1 className="md:mt-32 mt-24 flex items-center justify-center align-middle">
        <span className="text-center md:text-6xl text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
          Every second counts
        </span>
      </h1>

      {/* relatability point */}
      <h2 className="mt-10 md:text-2xl text-xl gap-x-2 w-full justify-center text-neutral-600 md:px-52 px-10">
        <span>Do you ever find yourself wondering,</span>
        <span className="font-bold text-black"> where did all that time go?</span>
        <span> Managing time with imalockin boosts productivity and motivation, yielding</span>
        <span className="font-bold text-black"> significant benefits.</span>
      </h2>

      {/* benefits */}
      <div className="mt-24 flex md:flex-nowrap flex-wrap space-x-2 md:text-7xl text-5xl text-emerald-400  items-center justify-center align-top">
        <div className="w-1/4 flex flex-col items-center justify-start align-top  h-36">
          <MdOutlineFilterCenterFocus />
          <p className="md:text-2xl text-lg text-neutral-600 text-center ">Better focus</p>
        </div>
        <div className="w-1/4 flex flex-col items-center justify-start align-top h-36 ">
          <IoMdFolder />
          <p className="md:text-2xl text-lg text-neutral-600 text-center">Stay organized</p>
        </div>
        <div className="w-1/4 flex flex-col items-center justify-start align-top h-36">
          <MdAutoGraph />
          <p className="md:text-2xl text-lg text-neutral-600 text-center">Visualize progress</p>
        </div>
        <div className="w-1/4 flex flex-col items-center justify-start align-top h-36">
          <FaUserFriends />
          <p className="md:text-2xl text-lg text-neutral-600 text-center">Stay motivated with friends</p>
        </div>
      </div>
    </div>
  )
}
