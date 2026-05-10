import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"

export default function StagingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <Badge className="mb-4">Services</Badge>
            <h1 className="text-4xl font-serif font-semibold text-foreground mb-4">Interior Design & Staging</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Professional interior staging and design services to showcase your property in its best light. Increase perceived value and buyer interest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Placeholder content */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-96 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground">
                Staging Project {i}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
