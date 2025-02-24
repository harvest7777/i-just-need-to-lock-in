import DemoGraph from "./DemoGraph"
import DemoPieChart from "./DemoPieChart"
import DemoFriendsList from "./DemoFriendsList"
import DemoToDos from "./DemoToDos"

export default function Features() {
  return (
    <div className="p-5 pt-0">
      {/* sell the time graph */}
      <div className="md:mt-32 mt-24 flex md:flex-row flex-col md:space-x-10 w-full md:p-5">
        <div className="flex flex-col md:w-1/2 md:mt-0 mt-10 shadow-[0_0_20px_1px] shadow-emerald-400 md:p-10 p-3 rounded-xl md:order-1 order-2">
          <DemoPieChart />
          <DemoGraph />
        </div>
        <div className="text-neutral-600 md:p-10 md:w-1/2 md:text-left text-center flex flex-col justify-center md:order-2 order-1">
          <h1 className="text-4xl font-bold">See where all that time went 👁️</h1>
          <div className="gap-x-2 mt-8 text-2xl">
            <span>Time flies by. </span>
            <span className="font-bold text-black">Never let another hour slip away</span>
            <span> by tracking your day.</span>
          </div>
        </div>
      </div>

      {/* sell the social aspect */}
      <div className="md:mt-32 mt-24 flex md:flex-row flex-col md:space-x-10 w-full md:p-5">
        <div className="text-neutral-600 md:p-10 md:w-2/3 md:text-left text-center flex flex-col justify-center">
          <h1 className="text-4xl font-bold">Feel connected 💖</h1>
          <div className="gap-x-2 mt-8 text-2xl">
            <span>Productivity doesn't have to be sad or lonely.</span>
            <span className="font-bold text-black"> Win, grow, and stay productive with the people you love.</span>
          </div>
        </div>
        <div className="md:w-1/3 md:mt-0 mt-10 shadow-[0_0_20px_1px] shadow-emerald-400 md:p-10 p-5 rounded-xl">
          <DemoFriendsList />
        </div>
      </div>

      {/* sell the todos */}
      <div className="md:mt-32 mt-24 flex md:flex-row flex-col md:space-x-10 w-full md:p-5">
        <div className="md:w-1/3 md:mt-0 mt-10 shadow-[0_0_20px_1px] shadow-emerald-400 md:p-10 p-5 rounded-xl md:order-1 order-2">
          <DemoToDos />
        </div>
        <div className="text-neutral-600 md:p-10 md:w-2/3 md:text-left text-center flex flex-col justify-center md:order-2 order-1">
          <h1 className="text-4xl font-bold">Stay organized 📂</h1>
          <div className="gap-x-2 mt-8 text-2xl">
            <span>Overwhelmed? Too much to do? We've all been there.</span>
            <span className="font-bold text-black"> Decluster your mind and feel clarity</span>
            <span> by organizing your tasks.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

