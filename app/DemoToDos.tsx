import { FaFolderOpen } from "react-icons/fa";
import { FaFolderPlus } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { IoMdFolder } from "react-icons/io";

export default function DemoToDos() {
  return (
    <div className="text-[#242129] flex gap-y-2 flex-col text-xl">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">To Dos</h1>
        <FaFolderPlus className="text-3xl text-[#d7dde1]" />
      </div>

      <div>
        <div className="relative group flex space-x-2">
          <FaFolderOpen className="text-[#d7dde1] text-2xl" />
          <p className="font-bold">📙 Homework</p>
        </div>

        <div className="relative pl-8">
          <div className="absolute left-4 top-0 h-full bg-red-500 border-l-2 border-[#d7dde1]"></div>
          <div className="flex justify-between">
            <p>history reading</p>
            <FaRegStar className="text-yellow-400 text-2xl" />
          </div>
          <p>cecs 323 diagram</p>
        </div>
      </div>

      <div>
        <div className="relative group flex space-x-2 ">
          <FaFolderOpen className="text-2xl text-[#d7dde1]" />
          <p className="font-bold">💻 Career</p>
        </div>

        <div className="relative pl-8">
          <div className="absolute left-4 top-0 h-full bg-red-500 border-l-2 border-[#d7dde1]"></div>
          <p>daily leetcode</p>
          <p>apply to 3 jobs</p>
        </div>
      </div>

      <div>
        <div className="relative group flex space-x-2 ">
          <FaFolderOpen className="text-2xl text-[#d7dde1]" />
          <p className="font-bold">🌿 Self Care</p>
        </div>

        <div className="relative pl-8">
          <div className="absolute left-4 top-0 h-full bg-red-500 border-l-2 border-[#d7dde1]"></div>
          <p>stretches</p>
          <p>breathing exercises</p>
        </div>
      </div>
      <div className="relative group flex space-x-2 ">
        <IoMdFolder className="text-2xl text-[#d7dde1]" />
        <p>🌍 Projects (2)</p>
      </div>
    </div>
  )
}
