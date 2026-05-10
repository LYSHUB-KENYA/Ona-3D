import { Suspense } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PropertiesClient } from "./properties-client";

function PropertiesSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-12 bg-muted rounded-lg animate-pulse w-1/3" />
      <div className="h-64 bg-muted rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-80 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<PropertiesSkeleton />}>
            <PropertiesClient />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
