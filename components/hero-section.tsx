"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Home, ArrowRight, Box } from "lucide-react"
import { counties, propertyTypes } from "@/lib/properties"

export function HeroSection() {
  const router = useRouter()
  const [searchType, setSearchType] = useState<"sale" | "rent">("sale")
  const [county, setCounty] = useState("")
  const [propertyType, setPropertyType] = useState("")

  const handleSearch = () => {
    const params = new URLSearchParams()
    params.set("type", searchType)
    if (county) params.set("county", county)
    if (propertyType) params.set("propertyType", propertyType)
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Top decorative bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="order-2 lg:order-1">
            {/* Tagline */}
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-6">
              Mombasa&apos;s Premier Coastal Property Platform
            </p>

            {/* Main headline - inspired by the design */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-normal text-foreground mb-8 leading-[1.1]">
              <span className="block">Discover homes</span>
              <span className="block italic text-primary">through immersive</span>
              <span className="block">virtual tours</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-lg mb-12 leading-relaxed">
              Experience beachfront apartments and coastal properties in stunning 360-degree detail. Walk through every room and find your perfect home along the Kenyan coast.
            </p>

            {/* Action links */}
            <div className="flex items-center gap-12 mb-16">
              <Link 
                href="/virtual-tours" 
                className="group flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                Explore Tours
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/properties" 
                className="group flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                View Properties
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Search Box */}
            <div className="bg-card rounded-2xl shadow-xl border border-border p-6">
              {/* Toggle */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setSearchType("sale")}
                  className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm transition-all ${
                    searchType === "sale"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setSearchType("rent")}
                  className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm transition-all ${
                    searchType === "rent"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  Rent
                </button>
              </div>

              {/* Search fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <select
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer text-sm"
                  >
                    <option value="">All Counties</option>
                    {counties.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer text-sm"
                  >
                    <option value="">All Property Types</option>
                    {propertyTypes.map((pt) => (
                      <option key={pt.value} value={pt.value}>{pt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Button 
                onClick={handleSearch}
                className="w-full py-4 h-auto text-sm font-medium gap-2 uppercase tracking-wider"
              >
                <Search className="w-4 h-4" />
                Search Properties
              </Button>
            </div>
          </div>

          {/* Right image showcase */}
          <div className="order-1 lg:order-2 relative">
            {/* Main image */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/mombasa-apt-1.jpg"
                alt="Luxury coastal apartment in Mombasa"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
              
              {/* 3D Tour badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <Link href="/virtual-tours">
                  <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-border/50 hover:bg-card transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Box className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">Start Virtual Tour</p>
                        <p className="text-xs text-muted-foreground">Explore in 360 degrees</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-8 -left-8 bg-card rounded-2xl p-6 shadow-xl border border-border">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-2xl font-bold text-foreground">2,500+</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Properties</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">500+</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">3D Tours</p>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>

      {/* Bottom section - property types */}
      <div className="border-t border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { label: "Apartments", count: "850+" },
              { label: "Beachfront", count: "320+" },
              { label: "Penthouses", count: "95+" },
              { label: "Studios", count: "180+" },
              { label: "Villas", count: "150+" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-lg font-semibold text-foreground">{item.count}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
