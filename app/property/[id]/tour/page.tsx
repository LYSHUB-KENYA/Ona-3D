"use client"

import { use, useState, useEffect } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ImmersiveTourViewer } from "@/components/immersive-tour-viewer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { properties, formatPrice } from "@/lib/properties"
import { 
  ArrowLeft, X, Info, Expand,
  MapPin, Bed, Bath, Square, Box, Phone, Share2, ChevronDown
} from "lucide-react"

// Room configurations for virtual tours - Mombasa coastal apartments
const propertyRooms = [
  { id: "living", name: "Living Room", image: "/images/mombasa-interior-living.jpg", description: "Bright coastal living area with ocean breeze" },
  { id: "kitchen", name: "Kitchen", image: "/images/mombasa-interior-kitchen.jpg", description: "Modern fully-equipped kitchen" },
  { id: "bedroom", name: "Master Bedroom", image: "/images/mombasa-interior-bedroom.jpg", description: "Serene master suite with sea views" },
  { id: "bathroom", name: "Bathroom", image: "/images/mombasa-interior-bathroom.jpg", description: "Elegant bathroom with natural finishes" },
  { id: "dining", name: "Dining Area", image: "/images/mombasa-interior-dining.jpg", description: "Open dining space for family" },
  { id: "balcony", name: "Ocean Balcony", image: "/images/mombasa-interior-balcony.jpg", description: "Private balcony with Indian Ocean views" },
]

interface PageProps {
  params: Promise<{ id: string }>
}

export default function PropertyTourPage({ params }: PageProps) {
  const { id } = use(params)
  const [showInfo, setShowInfo] = useState(true)
  const [currentRoom, setCurrentRoom] = useState("living")
  const [isMobile, setIsMobile] = useState(false)
  
  const property = properties.find((p) => p.id === id)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!property || !property.virtualTour) {
    notFound()
  }

  return (
    <div className="h-screen w-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between z-50 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link href={`/property/${property.id}`}>
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
          </Link>
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-px h-6 bg-border" />
            <Badge variant="outline" className="gap-1.5 border-primary/30 text-primary">
              <Box className="w-3 h-3" />
              Virtual Tour
            </Badge>
          </div>
        </div>

        <div className="flex-1 text-center hidden lg:block px-4">
          <h1 className="font-semibold text-foreground truncate">
            {property.title}
          </h1>
        </div>

        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowInfo(!showInfo)}
            className={showInfo ? "bg-primary/10 text-primary" : ""}
          >
            <Info className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="w-5 h-5" />
          </Button>
          <Link href={`/property/${property.id}`}>
            <Button variant="ghost" size="icon">
              <X className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 relative flex">
        {/* Immersive 3D Tour Viewer */}
        <div className="flex-1 relative">
          <ImmersiveTourViewer 
            rooms={propertyRooms} 
            propertyName={property.title}
            propertyLocation={property.location}
            initialRoom={currentRoom}
          />
        </div>

        {/* Property Info Panel - Desktop */}
        {showInfo && !isMobile && (
          <div className="w-96 bg-card border-l border-border flex flex-col">
            <div className="p-6 border-b border-border">
              <div className="flex items-start justify-between gap-2 mb-4">
                <Badge className={property.type === "sale" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}>
                  {property.type === "sale" ? "For Sale" : "For Rent"}
                </Badge>
                <button 
                  onClick={() => setShowInfo(false)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Close panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {property.title}
              </h2>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{property.location}</span>
              </div>
            </div>

            <div className="p-6 flex-1 overflow-auto space-y-6">
              {/* Price */}
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {property.type === "sale" ? "Asking Price" : "Monthly Rent"}
                </p>
                <div className="text-2xl font-bold text-primary">
                  {formatPrice(property.price, property.type)}
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-3">
                {property.bedrooms > 0 && (
                  <div className="text-center p-3 bg-secondary/50 rounded-xl">
                    <Bed className="w-5 h-5 mx-auto text-primary mb-1.5" />
                    <div className="text-lg font-semibold text-foreground">{property.bedrooms}</div>
                    <div className="text-xs text-muted-foreground">Bedrooms</div>
                  </div>
                )}
                <div className="text-center p-3 bg-secondary/50 rounded-xl">
                  <Bath className="w-5 h-5 mx-auto text-primary mb-1.5" />
                  <div className="text-lg font-semibold text-foreground">{property.bathrooms}</div>
                  <div className="text-xs text-muted-foreground">Bathrooms</div>
                </div>
                <div className="text-center p-3 bg-secondary/50 rounded-xl">
                  <Square className="w-5 h-5 mx-auto text-primary mb-1.5" />
                  <div className="text-lg font-semibold text-foreground">{property.area}</div>
                  <div className="text-xs text-muted-foreground">Sq. Meters</div>
                </div>
              </div>

              {/* Room navigation */}
              <div>
                <p className="text-sm font-medium text-foreground mb-3">Navigate Rooms</p>
                <div className="grid grid-cols-2 gap-2">
                  {propertyRooms.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => setCurrentRoom(room.id)}
                      className={`p-3 rounded-xl text-left text-sm transition-colors ${
                        currentRoom === room.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/50 text-foreground hover:bg-secondary"
                      }`}
                    >
                      {room.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities preview */}
              {property.amenities && property.amenities.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">Amenities</p>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.slice(0, 6).map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {property.amenities.length > 6 && (
                      <Badge variant="outline" className="text-xs">
                        +{property.amenities.length - 6} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-border space-y-3">
              <Button className="w-full gap-2">
                <Phone className="w-4 h-4" />
                Contact Agent
              </Button>
              <Link href={`/property/${property.id}`} className="block">
                <Button variant="outline" className="w-full gap-2">
                  <Expand className="w-4 h-4" />
                  View Full Details
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Mobile Info Panel */}
        {showInfo && isMobile && (
          <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-3xl shadow-2xl z-40 max-h-[60vh] overflow-auto">
            <div className="sticky top-0 bg-card pt-4 pb-2 px-6 border-b border-border">
              <div className="w-12 h-1 bg-border rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between">
                <div>
                  <Badge className={property.type === "sale" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"} >
                    {property.type === "sale" ? "For Sale" : "For Rent"}
                  </Badge>
                </div>
                <button onClick={() => setShowInfo(false)}>
                  <ChevronDown className="w-6 h-6 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-1">
                  {property.title}
                </h2>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{property.location}</span>
                </div>
              </div>

              <div className="text-2xl font-bold text-primary">
                {formatPrice(property.price, property.type)}
              </div>

              <div className="flex gap-4">
                {property.bedrooms > 0 && (
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-primary" />
                    <span className="text-sm text-foreground">{property.bedrooms} Beds</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5 text-primary" />
                  <span className="text-sm text-foreground">{property.bathrooms} Baths</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="w-5 h-5 text-primary" />
                  <span className="text-sm text-foreground">{property.area} m²</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 gap-2">
                  <Phone className="w-4 h-4" />
                  Call Agent
                </Button>
                <Link href={`/property/${property.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
