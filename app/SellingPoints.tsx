import { MdOutlineFilterCenterFocus } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { IoMdFolder } from "react-icons/io";
import { MdAutoGraph } from "react-icons/md";

export default function SellingPoints() {
  return (
    <div className="flex flex-col items-center justify-center align-middle w-full">
      {/* header */}
      <h1 className="mt-24">
        <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
          Every second counts
        </span>
      </h1>

      {/* relatability point */}
      <h2 className="mt-10 text-2xl gap-x-2 w-full justify-center text-neutral-600 px-52">
        <span>Do you ever find yourself wondering,</span>
        <span className="font-bold text-black"> where did all that time go?</span>
        <span> Managing time with imalockin boosts productivity and motivation, yielding</span>
        <span className="font-bold text-black"> significant benefits.</span>
      </h2>

      {/* benefits */}
      <div className="mt-16 flex space-x-2 text-7xl text-emerald-400 w-5/6">
        <div className="w-1/4 flex flex-col items-center justify-center h-full">
          <MdOutlineFilterCenterFocus />
          <p className="text-2xl text-neutral-600 text-center">Better focus</p>
        </div>
        <div className="w-1/4 flex flex-col items-center justify-center h-full">
          <IoMdFolder />
          <p className="text-2xl text-neutral-600 text-center">Stay organized</p>
        </div>
        <div className="w-1/4 flex flex-col items-center justify-center h-full">
          <MdAutoGraph />
          <p className="text-2xl text-neutral-600 text-center">Visualize progress</p>
        </div>
        <div className="w-1/4 flex flex-col items-center justify-center h-full">
          <FaUserFriends />
          <p className="text-2xl text-neutral-600 text-center">Stay motivated with friends</p>
        </div>
      </div>
    </div>
  )
}
