import { GoStopwatch } from "react-icons/go";
import { MdOutlineAutoGraph } from "react-icons/md";
import { LiaUserFriendsSolid } from "react-icons/lia";
import Image from "next/image";
import Link from "next/link";
import hero_image from "../app/public/images/hero.png"
export default async function Index() {
  return (
      <main className="h-full bg-appFg absolute top-0 left-0">
        {/* hero container */}
        <div className="flex mt-16 justify-center items-center p-5">
          {/* header */}
          <div className="flex flex-col items-center w-1/2">
            <h1 className="font-header text-6xl lg:text-8xl">LOCK IN!!!</h1>
            <h2 className="italic">track productivity and stay motivated... with friends!</h2>

            {/* button container */}
            <div className="flex space-x-10 mt-5">
              <Link href="sign-up" className="w-32 text-center bg-emerald-600 text-appFg rounded-md font-header p-2 btn-hover">I'M READY TO LOCK IN</Link>
              <p className="w-32 text-center bg-appBg rounded-md p-2 btn-hover">convince me more</p>
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
        <div className="flex w-full space-x-8 justify-center mt-20">
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
      </main>
  );
}
