import { GoStopwatch } from "react-icons/go";
import { MdOutlineAutoGraph } from "react-icons/md";
import { LiaUserFriendsSolid } from "react-icons/lia";
import Image from "next/image";
import Link from "next/link";
import hero_image from "../app/public/images/hero.png"
export default async function Index() {
  return (
      <div className="min-h-screen h-max w-full bg-appFg absolute top-0 left-0 pb-10">
        {/* hero container */}
        <div className="flex mt-16 justify-center items-center p-5">
          {/* header */}
          <div className="flex flex-col items-center lg:w-1/2 w-full">
            <h1 className="font-header text-7xl lg:text-8xl">LOCK IN!!!</h1>
            <h2 className="italic text-xl text-center">track productivity and stay motivated... with friends!</h2>

            {/* button container */}
            <div className="flex flex-col mt-3">
              <Link href="sign-up" className="w-32 text-center bg-emerald-600 text-appFg rounded-md font-header p-2 btn-hover">I'M READY TO LOCK IN</Link>
            </div>
          </div>
        
          {/* image */}
          <div className="justify-center items-center w-1/2 lg:inline-block hidden">
          <Image
            src={hero_image}
            alt="a"
            width={600}
            layout="responsive"
            className="rounded-xl"
          />
          </div>
        </div>

        {/* selling points */}
        <div className="flex md:flex-row flex-col items-center align-middle space-y-8 md:space-y-0 w-full md:space-x-8 justify-center mt-20">
          <div className="w-1/4 flex flex-col items-center">
            <GoStopwatch className="text-4xl"/>
            <h1 className="text-center font-bold">Daily Task Management</h1>
            <p className="text-center">Stay on top of your day by starting, pausing, and completing tasks</p>
          </div>
          <div className="w-1/4 flex flex-col items-center">
            <MdOutlineAutoGraph className="text-4xl"/>
            <h1 className="text-center font-bold">Visualize Your Day</h1>
            <p className="text-center">Track your progress with productivity graphs</p>
          </div>
          <div className="w-1/4 flex flex-col items-center">
            <LiaUserFriendsSolid className="text-4xl"/>
            <h1 className="text-center font-bold">Social Accountability</h1>
            <p className="text-center">Connect with friends, compare productivity, and inspire each other</p>
          </div>
        </div>
      </div>
  );
}
