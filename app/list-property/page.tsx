"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Home, 
  Upload, 
  Camera, 
  MapPin, 
  Phone, 
  Mail, 
  User,
  Building,
  Bed,
  Bath,
  Square,
  Check,
  ArrowRight,
  Box
} from "lucide-react"
import { propertyTypes, counties } from "@/lib/properties"

type ListingType = "sell" | "rent"

export default function ListPropertyPage() {
  const [listingType, setListingType] = useState<ListingType>("sell")
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "",
    county: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    name: "",
    email: "",
    phone: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setStep(4) // Success step
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-secondary/50 to-background py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-0 px-4 py-1.5 text-sm">
              List Your Property
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground mb-6">
              Reach thousands of buyers
              <br />
              <span className="italic text-primary">across Kenya</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              List your property with us and get access to immersive 3D virtual tours, 
              professional photography, and a network of verified buyers and renters.
            </p>
          </div>
        </section>

        {/* Form section */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-4">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      step >= s 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div className={`w-16 h-0.5 ${step > s ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              ))}
            </div>

            {step < 4 && (
              <Card className="border-border shadow-lg">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit}>
                    {/* Step 1: Listing Type & Property Details */}
                    {step === 1 && (
                      <div className="space-y-8">
                        <div>
                          <h2 className="text-xl font-semibold text-foreground mb-2">
                            What would you like to do?
                          </h2>
                          <p className="text-muted-foreground text-sm mb-6">
                            Choose whether you want to sell or rent your property
                          </p>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <button
                              type="button"
                              onClick={() => setListingType("sell")}
                              className={`p-6 rounded-xl border-2 transition-all text-left ${
                                listingType === "sell"
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <Building className="w-8 h-8 text-primary mb-3" />
                              <p className="font-medium text-foreground">Sell Property</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                List your property for sale
                              </p>
                            </button>
                            <button
                              type="button"
                              onClick={() => setListingType("rent")}
                              className={`p-6 rounded-xl border-2 transition-all text-left ${
                                listingType === "rent"
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <Home className="w-8 h-8 text-primary mb-3" />
                              <p className="font-medium text-foreground">Rent Property</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                List your property for rent
                              </p>
                            </button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Property Title
                            </label>
                            <Input
                              name="title"
                              value={formData.title}
                              onChange={handleInputChange}
                              placeholder="e.g., Modern 3 Bedroom Villa in Karen"
                              className="h-12"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Property Type
                              </label>
                              <select
                                name="propertyType"
                                value={formData.propertyType}
                                onChange={handleInputChange}
                                className="w-full h-12 px-4 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                              >
                                <option value="">Select type</option>
                                {propertyTypes.map((pt) => (
                                  <option key={pt.value} value={pt.value}>{pt.label}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                County
                              </label>
                              <select
                                name="county"
                                value={formData.county}
                                onChange={handleInputChange}
                                className="w-full h-12 px-4 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                              >
                                <option value="">Select county</option>
                                {counties.map((c) => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Specific Location
                            </label>
                            <div className="relative">
                              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                              <Input
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                placeholder="e.g., Karen, Nairobi"
                                className="h-12 pl-12"
                              />
                            </div>
                          </div>
                        </div>

                        <Button
                          type="button"
                          onClick={() => setStep(2)}
                          className="w-full h-12 gap-2"
                        >
                          Continue
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    )}

                    {/* Step 2: Property Features & Price */}
                    {step === 2 && (
                      <div className="space-y-8">
                        <div>
                          <h2 className="text-xl font-semibold text-foreground mb-2">
                            Property Features
                          </h2>
                          <p className="text-muted-foreground text-sm mb-6">
                            Tell us more about your property
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Bedrooms
                            </label>
                            <div className="relative">
                              <Bed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                              <Input
                                name="bedrooms"
                                type="number"
                                value={formData.bedrooms}
                                onChange={handleInputChange}
                                placeholder="0"
                                className="h-12 pl-12"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Bathrooms
                            </label>
                            <div className="relative">
                              <Bath className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                              <Input
                                name="bathrooms"
                                type="number"
                                value={formData.bathrooms}
                                onChange={handleInputChange}
                                placeholder="0"
                                className="h-12 pl-12"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Area (sqm)
                            </label>
                            <div className="relative">
                              <Square className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                              <Input
                                name="area"
                                type="number"
                                value={formData.area}
                                onChange={handleInputChange}
                                placeholder="0"
                                className="h-12 pl-12"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            {listingType === "sell" ? "Asking Price (KES)" : "Monthly Rent (KES)"}
                          </label>
                          <Input
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="e.g., 25000000"
                            className="h-12"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Description
                          </label>
                          <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Describe your property, its features, amenities, and neighborhood..."
                            className="min-h-[150px] resize-none"
                          />
                        </div>

                        {/* Photo upload placeholder */}
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Property Photos
                          </label>
                          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                            <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                            <p className="text-sm font-medium text-foreground mb-1">
                              Drop your images here, or click to browse
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PNG, JPG up to 10MB each. Upload at least 5 photos.
                            </p>
                          </div>
                        </div>

                        {/* 3D Tour option */}
                        <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Box className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-foreground mb-1">
                                Add 3D Virtual Tour
                              </h3>
                              <p className="text-sm text-muted-foreground mb-3">
                                Properties with 3D tours get 40% more inquiries. Our team can help you create an immersive virtual tour.
                              </p>
                              <div className="flex items-center gap-2">
                                <Camera className="w-4 h-4 text-primary" />
                                <span className="text-sm text-primary font-medium">Schedule a 3D scan</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep(1)}
                            className="flex-1 h-12"
                          >
                            Back
                          </Button>
                          <Button
                            type="button"
                            onClick={() => setStep(3)}
                            className="flex-1 h-12 gap-2"
                          >
                            Continue
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Contact Information */}
                    {step === 3 && (
                      <div className="space-y-8">
                        <div>
                          <h2 className="text-xl font-semibold text-foreground mb-2">
                            Contact Information
                          </h2>
                          <p className="text-muted-foreground text-sm mb-6">
                            How can interested parties reach you?
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Your Name
                            </label>
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                              <Input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Full name"
                                className="h-12 pl-12"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                              <Input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="email@example.com"
                                className="h-12 pl-12"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Phone Number
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                              <Input
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="+254 7XX XXX XXX"
                                className="h-12 pl-12"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-secondary/50 rounded-xl p-4 text-sm text-muted-foreground">
                          By submitting this form, you agree to our terms of service and privacy policy. 
                          Your listing will be reviewed by our team before going live.
                        </div>

                        <div className="flex gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep(2)}
                            className="flex-1 h-12"
                          >
                            Back
                          </Button>
                          <Button
                            type="submit"
                            className="flex-1 h-12 gap-2"
                          >
                            Submit Listing
                            <Check className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Success state */}
            {step === 4 && (
              <Card className="border-border shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground mb-3">
                    Listing Submitted!
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Thank you for listing your property with Nyumba360. Our team will review your submission 
                    and contact you within 24 hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="outline" onClick={() => { setStep(1); setFormData({ title: "", description: "", propertyType: "", county: "", location: "", price: "", bedrooms: "", bathrooms: "", area: "", name: "", email: "", phone: "" }) }}>
                      List Another Property
                    </Button>
                    <Button asChild>
                      <a href="/properties">Browse Properties</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
