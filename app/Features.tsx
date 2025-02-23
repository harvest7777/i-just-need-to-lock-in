import DemoGraph from "./DemoGraph"
import DemoFriendsList from "./DemoFriendsList"

export default function Features() {
  return (
    <div className="p-5">
      {/* sell the time graph */}
      <div className="mt-32 flex space-x-10 w-full p-5">
        <div className="w-1/2  shadow-[0_0_20px_1px] shadow-emerald-400 p-6 rounded-xl"><DemoGraph /></div>
        <div className="text-neutral-600 p-10 w-1/2">
          <h1 className="text-4xl font-bold">Visualize where all that time went</h1>
          <div className="gap-x-2 mt-8 text-2xl">
            <span>Time flies by. </span>
            <span className="font-bold text-black">Never let another hour slip away</span>
            <span> by tracking your day.</span>
          </div>
        </div>
      </div>

      {/* sell the social aspect */}
      <div className="mt-32 flex space-x-10 w-full p-5">
        <div className="text-neutral-600 p-10 w-2/3">
          <h1 className="text-4xl font-bold">Never feel alone</h1>
          <div className="gap-x-2 mt-8 text-2xl">
            <span>Productivity doesn't have to be sad or lonely.</span>
            <span className="font-bold text-black"> Win, grow, and stay connected with the people you love.</span>
          </div>
        </div>
        <div className="w-1/3  shadow-[0_0_20px_1px] shadow-emerald-400 p-6 rounded-xl"><DemoFriendsList /></div>
      </div>
    </div>
  )
}
