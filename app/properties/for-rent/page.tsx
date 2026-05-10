import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"

export default function PropertiesForRentPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <Badge className="mb-4">Properties</Badge>
            <h1 className="text-4xl font-serif font-semibold text-foreground mb-4">Properties for Rent</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Create stunning rental property listings with 3D virtual tours. Make it easy for tenants to explore apartments, offices, and homes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder content */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground">
                Rental Property {i}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
