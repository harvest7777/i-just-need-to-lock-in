import HeaderSection from "./HeaderSection"
import SellingPoints from "./SellingPoints"
import Features from "./Features"
import Statistics from "./Statistics"

export default function Landing() {
  return (
    <div className="min-h-screen h-max w-full bg-[#f9fbfc] absolute top-0 left-0">
      <HeaderSection />
      <SellingPoints />
      <Features />
      <Statistics />
    </div>
  )
}
