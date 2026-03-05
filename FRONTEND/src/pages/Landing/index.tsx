import Navbar from "../../components/layout/Navbar"
import Footer from "../../components/layout/Footer"

import HeroSection from "./HeroSection"
import FeaturesSection from "./FeaturesSection"
import StatsSection from "./StatsSection"
import CTASection from "./CTASection"

export default function Landing() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <CTASection />
      </main>

      <Footer />
    </>
  )
}