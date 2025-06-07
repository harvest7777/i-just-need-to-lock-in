import Link from "next/link";
import Image from "next/image";

export default function Goodbye() {
  return (
    <div className="z-80 fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-neutral-50 text-lg text-neutral-700 p-5 ">
      <div className="relative overflow-y-scroll flex flex-col items-center">
        <Image
          src="/thank.png"
          alt="thank you duckies"
          width={500}
          height={200}
        />
        <div className="mt-12 flex flex-col gap-y-5 md:w-3/4 w-11/12 pb-16">
          <h1>Thank you for locking in.</h1>
          <p>
            After 7 months, I am putting this project to rest. Here are some
            final statistics- I think imalockin has lived a good life.
          </p>
          <ul className="!list-disc !list-inside space-y-1 marker:text-neutral-700">
            <li>130 registered users</li>
            <li>6,065 locked in sessions</li>
            <li>1,788 tasks completed</li>
            <li>2,294 hours spent locking in</li>
          </ul>
          <p>
            This project meant a lot to me and honestly achieved more success
            than I could have imagined. I am so grateful for each of you who
            used it, contributed ideas, supported it, gave feedback, or even
            just took a look. It means a lot.
          </p>
          <p>
            It’s time for me to move on and face new challenges though. I didn’t
            want to leave this project unmaintained or barely keep it alive
            through updates which don’t challenge my engineering ability. I
            learned so much from developing imalockin, and I hope it was useful
            to somebody. It has served its purpose and unfortunately, it is time
            to lock out.
          </p>
          <p>
            Thank you again for being part of this chapter of my life. 🤍
            <br></br>– Ryan
          </p>
          <div>
            <p>
              If you want to host this project yourself, the source code is
              available here:
            </p>
            <Link
              className="text-cyan-700"
              href={"https://github.com/harvest7777/i-just-need-to-lock-in"}
              target="_blank"
            >
              [GitHub]
            </Link>
          </div>

          <div>
            <p>If you want to contact me, here is my LinkedIn:</p>
            <Link
              className="text-cyan-700"
              href={"https://www.linkedin.com/in/ryan-tran-b776762a3/"}
              target="_blank"
            >
              [LinkedIn]
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
