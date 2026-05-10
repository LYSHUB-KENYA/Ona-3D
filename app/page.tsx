import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServiceGrid } from "@/components/service-grid"
import { ServicesShowcase } from "@/components/services-showcase"
import { FeaturedProperties } from "@/components/featured-properties"
import { VirtualTourShowcase } from "@/components/virtual-tour-showcase"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServiceGrid />
        <ServicesShowcase />
        <FeaturedProperties />
        <VirtualTourShowcase />
        <WhyChooseUs />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
