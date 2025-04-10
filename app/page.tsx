import HeaderSection from "./(landing-components)/HeaderSection"
import SellingPoints from "./(landing-components)/SellingPoints"
import Features from "./(landing-components)/Features"
import Statistics from "./(landing-components)/Statistics"
import Footer from "./(landing-components)/Footer"

export default function Landing() {
  return (
    <div className="min-h-screen h-max w-full bg-[#f9fbfc] absolute top-0 left-0">
      <HeaderSection />
      <SellingPoints />
      <Features />
      <Statistics />
      <Footer />
    </div>
  )
}
