import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <Badge className="mb-4">Services</Badge>
            <h1 className="text-4xl font-serif font-semibold text-foreground mb-4">Property Marketing Services</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Reach local and international buyers with targeted marketing campaigns. Leverage 3D tours to maximize property exposure and interest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Placeholder content */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground">
                Marketing Service {i}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
