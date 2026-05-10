export interface Property {
  id: string
  title: string
  location: string
  county: string
  price: number
  type: "sale" | "rent"
  propertyType: "apartment" | "house" | "villa" | "land" | "commercial"
  bedrooms: number
  bathrooms: number
  area: number
  images: string[]
  featured: boolean
  virtualTour: boolean
  description: string
  amenities: string[]
  agent: {
    name: string
    phone: string
    email: string
  }
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Ocean View 3BR Apartment in Nyali",
    location: "Nyali, Mombasa",
    county: "Mombasa",
    price: 25000000,
    type: "sale",
    propertyType: "apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: 165,
    images: ["/images/mombasa-property-1.jpg"],
    featured: true,
    virtualTour: true,
    description: "Stunning beachfront apartment with unobstructed Indian Ocean views. Modern finishes, spacious balcony, and access to pristine beaches. Perfect for coastal living or holiday rentals.",
    amenities: ["Ocean View", "Swimming Pool", "Beach Access", "24/7 Security", "Parking", "Gym"],
    agent: {
      name: "Hassan Omar",
      phone: "+254 712 345 678",
      email: "hassan@nyumba360.co.ke"
    }
  },
  {
    id: "2",
    title: "Luxury Seaside Apartment in Nyali",
    location: "Nyali Beach, Mombasa",
    county: "Mombasa",
    price: 85000,
    type: "rent",
    propertyType: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    images: ["/images/mombasa-property-2.jpg"],
    featured: true,
    virtualTour: true,
    description: "Contemporary 2-bedroom apartment just steps from Nyali Beach. Fully furnished with modern amenities. Ideal for professionals or small families seeking coastal lifestyle.",
    amenities: ["Furnished", "Ocean Glimpse", "Pool", "Gym", "Parking", "Generator Backup"],
    agent: {
      name: "Fatma Ali",
      phone: "+254 723 456 789",
      email: "fatma@nyumba360.co.ke"
    }
  },
  {
    id: "3",
    title: "Penthouse with Panoramic Ocean Views",
    location: "Bamburi, Mombasa",
    county: "Mombasa",
    price: 45000000,
    type: "sale",
    propertyType: "apartment",
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    images: ["/images/mombasa-property-3.jpg"],
    featured: true,
    virtualTour: true,
    description: "Exclusive penthouse apartment with 360-degree views of the Indian Ocean. Private rooftop terrace, infinity pool access, and premium finishes throughout.",
    amenities: ["Rooftop Terrace", "Infinity Pool", "Ocean View", "Concierge", "Smart Home", "Private Parking"],
    agent: {
      name: "Ahmed Bakari",
      phone: "+254 734 567 890",
      email: "ahmed@nyumba360.co.ke"
    }
  },
  {
    id: "4",
    title: "Charming Studio in Old Town",
    location: "Old Town, Mombasa",
    county: "Mombasa",
    price: 35000,
    type: "rent",
    propertyType: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: 55,
    images: ["/images/mombasa-property-4.jpg"],
    featured: false,
    virtualTour: true,
    description: "Beautifully restored studio apartment in historic Old Town Mombasa. Swahili architecture meets modern comfort. Walking distance to Fort Jesus and the harbor.",
    amenities: ["Historic Building", "Furnished", "WiFi", "Air Conditioning", "Rooftop Access", "Security"],
    agent: {
      name: "Zainab Hassan",
      phone: "+254 745 678 901",
      email: "zainab@nyumba360.co.ke"
    }
  },
  {
    id: "5",
    title: "Family Apartment in Kizingo",
    location: "Kizingo, Mombasa",
    county: "Mombasa",
    price: 18000000,
    type: "sale",
    propertyType: "apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: 145,
    images: ["/images/mombasa-property-5.jpg"],
    featured: true,
    virtualTour: true,
    description: "Spacious family apartment in the quiet Kizingo neighborhood. Secure gated compound with playground, close to schools and hospitals. Perfect for families.",
    amenities: ["Gated Community", "Playground", "Garden", "Parking", "Generator", "Water Tank"],
    agent: {
      name: "Mary Mwende",
      phone: "+254 756 789 012",
      email: "mary@nyumba360.co.ke"
    }
  },
  {
    id: "6",
    title: "Modern High-Rise in Tudor",
    location: "Tudor, Mombasa",
    county: "Mombasa",
    price: 65000,
    type: "rent",
    propertyType: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 95,
    images: ["/images/mombasa-property-6.jpg"],
    featured: false,
    virtualTour: true,
    description: "Contemporary apartment in a modern high-rise building with city and partial ocean views. Close to Tudor shopping center and public transport.",
    amenities: ["City View", "Lift", "Gym", "CCTV", "Intercom", "Backup Power"],
    agent: {
      name: "Joseph Ochieng",
      phone: "+254 767 890 123",
      email: "joseph@nyumba360.co.ke"
    }
  },
  {
    id: "7",
    title: "Beachfront 2BR in Shanzu",
    location: "Shanzu, Mombasa",
    county: "Mombasa",
    price: 22000000,
    type: "sale",
    propertyType: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 110,
    images: ["/images/mombasa-property-1.jpg"],
    featured: true,
    virtualTour: true,
    description: "Direct beachfront apartment in Shanzu with stunning sunrise views. Ideal for vacation home or Airbnb investment. Well-maintained building with excellent amenities.",
    amenities: ["Beachfront", "Pool", "Restaurant On-site", "24/7 Security", "Parking", "WiFi"],
    agent: {
      name: "Hassan Omar",
      phone: "+254 778 901 234",
      email: "hassan@nyumba360.co.ke"
    }
  },
  {
    id: "8",
    title: "Executive Apartment in Links Road",
    location: "Links Road, Nyali, Mombasa",
    county: "Mombasa",
    price: 95000,
    type: "rent",
    propertyType: "apartment",
    bedrooms: 3,
    bathrooms: 3,
    area: 175,
    images: ["/images/mombasa-property-2.jpg"],
    featured: false,
    virtualTour: true,
    description: "Premium executive apartment near Nyali Golf Club. High-end finishes, spacious rooms, and proximity to international schools and hospitals.",
    amenities: ["Near Golf Course", "Gym", "Pool", "DSQ", "Backup Generator", "Borehole"],
    agent: {
      name: "Diana Achieng",
      phone: "+254 789 012 345",
      email: "diana@nyumba360.co.ke"
    }
  },
  {
    id: "9",
    title: "Sea Breeze Studio in Bamburi",
    location: "Bamburi Beach, Mombasa",
    county: "Mombasa",
    price: 12000000,
    type: "sale",
    propertyType: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: 48,
    images: ["/images/mombasa-property-3.jpg"],
    featured: false,
    virtualTour: true,
    description: "Cozy beachside studio apartment perfect for singles or couples. Walking distance to Bamburi Beach and local restaurants. Great rental income potential.",
    amenities: ["Beach Nearby", "Furnished", "Pool", "Security", "Parking", "Laundry"],
    agent: {
      name: "Salim Abdul",
      phone: "+254 790 123 456",
      email: "salim@nyumba360.co.ke"
    }
  },
  {
    id: "10",
    title: "Duplex Apartment in Mtwapa",
    location: "Mtwapa, Kilifi",
    county: "Kilifi",
    price: 28000000,
    type: "sale",
    propertyType: "apartment",
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    images: ["/images/mombasa-property-5.jpg"],
    featured: true,
    virtualTour: true,
    description: "Unique duplex apartment with private garden in Mtwapa. Just 15 minutes from Mombasa CBD. Features include a private entrance and rooftop entertainment area.",
    amenities: ["Duplex Layout", "Private Garden", "Rooftop", "Parking", "Security", "Water Storage"],
    agent: {
      name: "Grace Nyambura",
      phone: "+254 701 234 567",
      email: "grace@nyumba360.co.ke"
    }
  }
]

export const counties = [
  "Mombasa",
  "Kilifi",
  "Kwale",
  "Nairobi",
  "Kisumu",
  "Nakuru",
  "Machakos",
  "Kajiado",
  "Kiambu",
  "Lamu"
]

export const propertyTypes = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "villa", label: "Villa" },
  { value: "land", label: "Land" },
  { value: "commercial", label: "Commercial" }
]

export function formatPrice(price: number, type: "sale" | "rent"): string {
  if (price >= 1000000) {
    return `KES ${(price / 1000000).toFixed(1)}M${type === "rent" ? "/mo" : ""}`
  }
  return `KES ${price.toLocaleString()}${type === "rent" ? "/mo" : ""}`
}
