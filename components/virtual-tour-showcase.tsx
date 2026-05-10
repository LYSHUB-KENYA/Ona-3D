"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Box, Play, ArrowRight, Rotate3D, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const tourImages = [
  { src: "/images/mombasa-interior-living.jpg", label: "Living Room", description: "Bright coastal living with ocean breeze" },
  { src: "/images/mombasa-interior-kitchen.jpg", label: "Kitchen", description: "Modern kitchen with sea views" },
  { src: "/images/mombasa-interior-bedroom.jpg", label: "Master Bedroom", description: "Serene bedroom with balcony access" },
  { src: "/images/mombasa-interior-bathroom.jpg", label: "Bathroom", description: "Elegant bathroom with natural light" },
  { src: "/images/mombasa-interior-dining.jpg", label: "Dining Area", description: "Open dining for family meals" },
  { src: "/images/mombasa-interior-balcony.jpg", label: "Ocean Balcony", description: "Private balcony with Indian Ocean views" },
]

export function VirtualTourShowcase() {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % tourImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + tourImages.length) % tourImages.length)
  }

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Box className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Immersive Technology</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Experience Properties in{" "}
              <span className="text-primary">Stunning 3D</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Walk through your future home from anywhere in Kenya. Our cutting-edge 3D virtual tours let you explore every corner, every room, and every detail before visiting in person.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Rotate3D className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">360 Virtual Walkthroughs</h3>
                  <p className="text-muted-foreground">Explore every angle with interactive panoramic views</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">True-to-Life Detail</h3>
                  <p className="text-muted-foreground">High-resolution imagery that captures every finish</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Animated Property Views</h3>
                  <p className="text-muted-foreground">Watch guided tours with smooth camera animations</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/virtual-tours">
                <Button size="lg" className="gap-2">
                  <Box className="w-5 h-5" />
                  Explore 3D Tours
                </Button>
              </Link>
              <Link href="/properties">
                <Button variant="outline" size="lg" className="gap-2">
                  View Properties
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-card border border-border shadow-2xl relative group">
              <Image
                src={tourImages[currentImage].src}
                alt={tourImages[currentImage].label}
                fill
                className="object-cover transition-transform duration-500"
              />
              
              {/* Navigation arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-foreground" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-foreground" />
              </button>

              {/* Room label */}
              <div className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm rounded-xl p-4 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{tourImages[currentImage].label}</h4>
                    <p className="text-sm text-muted-foreground">{tourImages[currentImage].description}</p>
                  </div>
                  <div className="flex gap-1">
                    {tourImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImage ? "bg-primary w-6" : "bg-muted-foreground/30"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-3 mt-4 justify-center">
              {tourImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImage ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.label}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
