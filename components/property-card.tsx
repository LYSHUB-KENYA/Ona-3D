"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Property, formatPrice } from "@/lib/properties"
import { MapPin, Bed, Bath, Square, Eye, Box, Heart } from "lucide-react"
import { useState } from "react"

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Card className="group overflow-hidden border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {/* Property Image */}
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
          {property.featured && (
            <Badge variant="secondary" className="bg-card/90 text-foreground">
              Featured
            </Badge>
          )}
        </div>

        {/* 3D Tour Badge */}
        {property.virtualTour && (
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="bg-card/90 border-primary text-primary gap-1">
              <Box className="w-3 h-3" />
              3D Tour
            </Badge>
          </div>
        )}

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsLiked(!isLiked)
          }}
          className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-card/90 flex items-center justify-center hover:bg-card transition-colors"
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
        </button>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <Link href={`/property/${property.id}`}>
            <Button variant="secondary" size="sm" className="gap-2">
              <Eye className="w-4 h-4" />
              View Details
            </Button>
          </Link>
          {property.virtualTour && (
            <Link href={`/property/${property.id}/tour`}>
              <Button size="sm" className="gap-2">
                <Box className="w-4 h-4" />
                3D Tour
              </Button>
            </Link>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        {/* Price */}
        <div className="text-2xl font-bold text-primary mb-2">
          {formatPrice(property.price, property.type)}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-muted-foreground mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms} Beds</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            <span>{property.area} m2</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
