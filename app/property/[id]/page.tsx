"use client"

import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { properties, formatPrice } from "@/lib/properties"
import { 
  MapPin, Bed, Bath, Square, Box, Heart, Share2, 
  Phone, Mail, User, Check, ArrowLeft, Calendar,
  Building2, Maximize2
} from "lucide-react"
import { useState } from "react"

const interiorImages = [
  "/images/mombasa-interior-living.jpg",
  "/images/mombasa-interior-kitchen.jpg",
  "/images/mombasa-interior-bedroom.jpg",
  "/images/mombasa-interior-bathroom.jpg",
  "/images/mombasa-interior-balcony.jpg",
]

interface PageProps {
  params: Promise<{ id: string }>
}

export default function PropertyDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const [isLiked, setIsLiked] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  
  const property = properties.find((p) => p.id === id)

  if (!property) {
    notFound()
  }

  const allImages = [property.images[0], ...interiorImages]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link href="/properties" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Back to Properties
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-muted">
                  {/* Main Image */}
                  <Image
                    src={allImages[activeImageIndex]}
                    alt={property.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    <Badge className={property.type === "sale" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}>
                      {property.type === "sale" ? "For Sale" : "For Rent"}
                    </Badge>
                    {property.featured && (
                      <Badge variant="secondary" className="bg-card/90 text-foreground">
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* 3D Tour Badge */}
                  {property.virtualTour && (
                    <Link 
                      href={`/property/${property.id}/tour`}
                      className="absolute top-4 right-4 z-10"
                    >
                      <Badge variant="outline" className="bg-card/90 border-primary text-primary gap-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Box className="w-3 h-3" />
                        Start 3D Tour
                      </Badge>
                    </Link>
                  )}

                  {/* Actions */}
                  <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className="w-10 h-10 rounded-full bg-card/90 flex items-center justify-center hover:bg-card transition-colors"
                      aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                    </button>
                    <button
                      className="w-10 h-10 rounded-full bg-card/90 flex items-center justify-center hover:bg-card transition-colors"
                      aria-label="Share property"
                    >
                      <Share2 className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        index === activeImageIndex ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`View ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Title & Price */}
              <div>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-5 h-5" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl sm:text-4xl font-bold text-primary">
                      {formatPrice(property.price, property.type)}
                    </div>
                    {property.type === "rent" && (
                      <span className="text-sm text-muted-foreground">per month</span>
                    )}
                  </div>
                </div>

                {/* Key Features */}
                <div className="flex flex-wrap gap-6 py-4 border-y border-border">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Bed className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{property.bedrooms}</div>
                        <div className="text-sm text-muted-foreground">Bedrooms</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bath className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{property.bathrooms}</div>
                      <div className="text-sm text-muted-foreground">Bathrooms</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Maximize2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{property.area} m2</div>
                      <div className="text-sm text-muted-foreground">Living Area</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground capitalize">{property.propertyType}</div>
                      <div className="text-sm text-muted-foreground">Type</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                </CardContent>
              </Card>

              {/* Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle>Amenities & Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-foreground">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 3D Tour CTA */}
              {property.virtualTour && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
                        <Box className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          Experience This Property in 3D
                        </h3>
                        <p className="text-muted-foreground">
                          Take an immersive virtual tour and explore every room from the comfort of your home.
                        </p>
                      </div>
                      <Link href={`/property/${property.id}/tour`}>
                        <Button size="lg" className="gap-2">
                          <Box className="w-5 h-5" />
                          Start 3D Tour
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Agent Contact Card */}
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Contact Agent</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Agent Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{property.agent.name}</div>
                      <div className="text-sm text-muted-foreground">Property Agent</div>
                    </div>
                  </div>

                  {/* Contact Buttons */}
                  <div className="space-y-3">
                    <Button className="w-full gap-2">
                      <Phone className="w-5 h-5" />
                      Call Agent
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <Mail className="w-5 h-5" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <Calendar className="w-5 h-5" />
                      Schedule Visit
                    </Button>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3 pt-4 border-t border-border">
                    <a 
                      href={`tel:${property.agent.phone}`}
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{property.agent.phone}</span>
                    </a>
                    <a 
                      href={`mailto:${property.agent.email}`}
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{property.agent.email}</span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 gap-2"
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                      {isLiked ? "Saved" : "Save"}
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
