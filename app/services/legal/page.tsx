import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DocumentVerification } from "@/components/document-verification"

export default function LegalVerificationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <DocumentVerification />
        </div>
      </main>
      <Footer />
    </div>
  )
}
