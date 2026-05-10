"use client"

import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PanoramaViewer } from "@/components/panorama-viewer"
import { VideoTourPlayer } from "@/components/video-tour-player"
import { ImmersiveTourViewer } from "@/components/immersive-tour-viewer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { properties, formatPrice } from "@/lib/properties"
import { Box, MapPin, Bed, Bath, Square, ArrowRight, Eye, Rotate3d } from "lucide-react"

const demoRooms = [
  { id: "living", name: "Living Room", image: "/images/mombasa-interior-living.jpg", description: "Bright coastal living area with ocean breeze and natural light" },
  { id: "kitchen", name: "Kitchen", image: "/images/mombasa-interior-kitchen.jpg", description: "Modern fully-equipped kitchen with premium appliances" },
  { id: "bedroom", name: "Master Bedroom", image: "/images/mombasa-interior-bedroom.jpg", description: "Serene master suite with balcony access and sea views" },
  { id: "bathroom", name: "Bathroom", image: "/images/mombasa-interior-bathroom.jpg", description: "Elegant bathroom with natural stone finishes" },
  { id: "dining", name: "Dining Area", image: "/images/mombasa-interior-dining.jpg", description: "Open dining space perfect for family gatherings" },
  { id: "balcony", name: "Ocean View Balcony", image: "/images/mombasa-interior-balcony.jpg", description: "Private balcony with stunning Indian Ocean views" },
]

const videoTourRooms = [
  { id: "living", name: "Living Room", thumbnail: "/images/mombasa-interior-living.jpg", description: "Bright coastal living area with ocean breeze" },
  { id: "kitchen", name: "Modern Kitchen", thumbnail: "/images/mombasa-interior-kitchen.jpg", description: "Fully equipped kitchen with sea views" },
  { id: "dining", name: "Dining Area", thumbnail: "/images/mombasa-interior-dining.jpg", description: "Open dining space for family meals" },
  { id: "bedroom", name: "Master Bedroom", thumbnail: "/images/mombasa-interior-bedroom.jpg", description: "Serene bedroom with balcony access" },
  { id: "bathroom", name: "Master Bathroom", thumbnail: "/images/mombasa-interior-bathroom.jpg", description: "Modern bathroom with natural light" },
  { id: "balcony", name: "Ocean Balcony", thumbnail: "/images/mombasa-interior-balcony.jpg", description: "Private balcony with Indian Ocean views" },
]

export default function VirtualToursPage() {
  const tourProperties = properties.filter((p) => p.virtualTour)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-secondary/50 to-background py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">
                Immersive Experience
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground mb-6">
                360-Degree
                <span className="italic text-primary"> Virtual Tours</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Walk through every room of your dream home from anywhere. 
                Experience properties in stunning detail before scheduling a visit.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-foreground font-medium">High-res imagery</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Rotate3d className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-foreground font-medium">360-degree views</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Box className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-foreground font-medium">Room-by-room navigation</span>
              </div>
            </div>
          </div>
        </section>

        {/* Immersive 3D Tour - Matterport Style */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
              <div>
                <Badge className="mb-3 bg-primary/10 text-primary border-0">Matterport-Style Experience</Badge>
                <h2 className="text-2xl lg:text-3xl font-semibold text-foreground">
                  Immersive 3D Virtual Tour
                </h2>
                <p className="text-muted-foreground mt-2">
                  Experience properties like never before with our advanced 3D tour technology. Switch between tour, dollhouse, and floor plan views.
                </p>
              </div>
            </div>

            <ImmersiveTourViewer 
              rooms={demoRooms} 
              propertyName="Ocean View Apartment in Nyali" 
              propertyLocation="Nyali, Mombasa"
            />
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-xl p-5">
                <Eye className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Tour Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Drag to look around in full 360-degree view
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <Box className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Dollhouse View</h3>
                <p className="text-sm text-muted-foreground">
                  See all rooms at once from a 3D perspective
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <Rotate3d className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Floor Plan</h3>
                <p className="text-sm text-muted-foreground">
                  Interactive layout for easy navigation
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Tour Demo */}
        <section className="py-16 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
              <div>
                <Badge className="mb-3 bg-primary/10 text-primary border-0">Video Walkthrough</Badge>
                <h2 className="text-2xl lg:text-3xl font-semibold text-foreground">
                  Cinematic Property Tour
                </h2>
                <p className="text-muted-foreground mt-2">
                  Sit back and enjoy a guided video tour through every room of this stunning property.
                </p>
              </div>
            </div>

            <VideoTourPlayer rooms={videoTourRooms} propertyName="Ocean View Apartment in Nyali, Mombasa" />
          </div>
        </section>

        {/* Panorama viewer demo */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
              <div>
                <Badge className="mb-3 bg-primary/10 text-primary border-0">Interactive 360</Badge>
                <h2 className="text-2xl lg:text-3xl font-semibold text-foreground">
                  360-Degree Room Explorer
                </h2>
                <p className="text-muted-foreground mt-2">
                  Take control - drag to look around, zoom in on details, and navigate between rooms.
                </p>
              </div>
            </div>

            <PanoramaViewer rooms={demoRooms} />

            <div className="mt-8 bg-card border border-border rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-foreground">Beachfront Apartment in Nyali</h3>
                  <p className="text-sm text-muted-foreground">
                    This is a sample virtual tour. Every Mombasa coastal property with the 3D Tour badge offers this immersive experience.
                  </p>
                </div>
                <Link href="/properties">
                  <Button className="gap-2 whitespace-nowrap">
                    Browse All Properties
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Properties with Virtual Tours */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-2">
                  Explore from home
                </p>
                <h2 className="text-2xl lg:text-3xl font-semibold text-foreground">
                  Properties with Virtual Tours
                </h2>
                <p className="text-muted-foreground mt-2">
                  {tourProperties.length} properties available for 360-degree exploration
                </p>
              </div>
              <Link href="/properties">
                <Button variant="outline" className="gap-2">
                  View All Properties
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tourProperties.map((property) => (
                <Card key={property.id} className="group overflow-hidden border-border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={property.images[0]}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={property.type === "sale" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}>
                        {property.type === "sale" ? "For Sale" : "For Rent"}
                      </Badge>
                    </div>

                    {/* 3D Tour Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-card/90 backdrop-blur border-primary text-primary gap-1">
                        <Box className="w-3 h-3" />
                        3D Tour
                      </Badge>
                    </div>

                    {/* Hover overlay */}
                    <Link 
                      href={`/property/${property.id}/tour`} 
                      className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <Button className="gap-2">
                        <Box className="w-5 h-5" />
                        Start Tour
                      </Button>
                    </Link>
                  </div>

                  <CardContent className="p-5">
                    {/* Price */}
                    <div className="text-xl font-bold text-primary mb-2">
                      {formatPrice(property.price, property.type)}
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
                      {property.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{property.location}</span>
                    </div>

                    {/* Features */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5 pb-5 border-b border-border">
                      {property.bedrooms > 0 && (
                        <div className="flex items-center gap-1.5">
                          <Bed className="w-4 h-4" />
                          <span>{property.bedrooms} Beds</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4" />
                        <span>{property.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Square className="w-4 h-4" />
                        <span>{property.area} m²</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex gap-3">
                      <Link href={`/property/${property.id}`} className="flex-1">
                        <Button variant="outline" className="w-full text-sm">
                          Details
                        </Button>
                      </Link>
                      <Link href={`/property/${property.id}/tour`} className="flex-1">
                        <Button className="w-full gap-2 text-sm">
                          <Eye className="w-4 h-4" />
                          Tour
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-serif text-foreground mb-4">
              Want a 3D tour for your property?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Properties with virtual tours receive 40% more inquiries. List your property with us 
              and our team will create an immersive 360-degree tour.
            </p>
            <Link href="/list-property">
              <Button size="lg" className="gap-2 px-8">
                List Your Property
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
