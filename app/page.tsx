import HeaderSection from "./HeaderSection"
import SellingPoints from "./SellingPoints"
import Features from "./Features"

export default function Landing() {
  return (
    <div className="min-h-screen h-max w-full bg-appFg absolute top-0 left-0">
      <HeaderSection />
      <SellingPoints />
      <Features />
    </div>
  )
}
