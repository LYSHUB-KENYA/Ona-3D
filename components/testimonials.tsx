"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Wanjiku",
    role: "First-time Homebuyer",
    location: "Nairobi",
    image: "/images/testimonial-1.jpg",
    quote: "The 3D virtual tours were incredible. I was able to explore multiple properties from Mombasa while living in Nairobi. Found my dream apartment without making a single trip until the final viewing.",
    rating: 5,
  },
  {
    id: 2,
    name: "David Ochieng",
    role: "Property Investor",
    location: "Kisumu",
    image: "/images/testimonial-2.jpg",
    quote: "As someone who invests in properties across Kenya, the virtual tour feature has saved me countless hours and travel costs. The attention to detail in the 360-degree views is remarkable.",
    rating: 5,
  },
  {
    id: 3,
    name: "Amina Hassan",
    role: "Real Estate Agent",
    location: "Mombasa",
    image: "/images/testimonial-3.jpg",
    quote: "Listing properties on Nyumba360 has transformed my business. The virtual tours generate quality leads from serious buyers who already know what they want before scheduling a visit.",
    rating: 5,
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const activeTestimonial = testimonials[activeIndex]

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">
              Testimonials
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-8">
              What our <span className="italic">clients</span> say
            </h2>

            {/* Quote */}
            <div className="relative mb-8">
              <Quote className="w-12 h-12 text-primary/20 absolute -top-2 -left-2" />
              <p className="text-lg text-muted-foreground leading-relaxed pl-8">
                {activeTestimonial.quote}
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 mb-8 pl-8">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-lg font-semibold text-primary">
                {activeTestimonial.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-foreground">{activeTestimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {activeTestimonial.role} - {activeTestimonial.location}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4 pl-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
              <span className="text-sm text-muted-foreground ml-4">
                {activeIndex + 1} / {testimonials.length}
              </span>
            </div>
          </div>

          {/* Right - Stats & Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-secondary">
              <Image
                src="/images/house-luxury-1.jpg"
                alt="Happy homeowner"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
            </div>

            {/* Stats overlay */}
            <div className="absolute bottom-8 left-8 right-8 bg-card/95 backdrop-blur-sm rounded-2xl p-6 border border-border">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-2xl font-bold text-foreground">2,500+</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Happy Clients</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">98%</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Satisfaction</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">47</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Counties</p>
                </div>
              </div>
            </div>

            {/* Decorative dots */}
            <div className="absolute -top-4 -right-4 grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-primary/30" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
