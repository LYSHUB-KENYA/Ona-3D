'use client'

import { useState } from 'react'
import { Play, Volume2, VolumeX } from 'lucide-react'

export function ServicesShowcase() {
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null)
  const [unmuteVideo, setUnmuteVideo] = useState<string | null>(null)

  const services = [
    {
      id: '3d-matterport',
      title: '3D Virtual Tours',
      subtitle: 'Matterport-Style Immersive Experience',
      description: 'Professional 360-degree virtual tours that let buyers explore every corner of a property in stunning detail.',
      videoUrl: 'https://www.youtube.com/embed/TQ_1T-1yDWc',
      features: ['Interactive 3D navigation', 'Zoom & measure tools', 'Dollhouse view', 'Floor plan overlay'],
    },
    {
      id: 'property-listing',
      title: 'Property Listings',
      subtitle: 'Sale, Rent & Short-Term Stays',
      description: 'List your property for sale, rent, or short-term stays with professional photos and 3D tours included.',
      videoUrl: 'https://www.youtube.com/embed/A3Lj3B8mJOQ',
      features: ['Professional photography', 'Detailed property info', 'Buyer/renter reach', 'Analytics dashboard'],
    },
    {
      id: 'hospitality-tours',
      title: 'Hospitality Tours',
      subtitle: 'Hotels & Holiday Rentals',
      description: 'Showcase hotels, resorts, and holiday properties with immersive virtual tours that increase bookings.',
      videoUrl: 'https://www.youtube.com/embed/qZhpzLTMZC0',
      features: ['Room showcases', 'Amenity highlights', 'Booking integration', 'Multi-language support'],
    },
    {
      id: 'legal-verification',
      title: 'Legal Verification',
      subtitle: 'Title Deed & Document Security',
      description: 'Secure document verification and title deed authentication to build trust with international buyers.',
      videoUrl: 'https://www.youtube.com/embed/jBqpO9mVGu8',
      features: ['Document upload', 'Verification process', 'Trust badges', 'Legal compliance'],
    },
    {
      id: 'staging',
      title: 'Interior Staging',
      subtitle: 'Professional Home Design Services',
      description: 'Transform your property with professional interior styling to showcase its full potential.',
      videoUrl: 'https://www.youtube.com/embed/W1YGJ4C3y-4',
      features: ['Space planning', 'Furniture styling', 'Before & after tours', 'Design consultation'],
    },
    {
      id: 'marketing',
      title: 'Marketing Services',
      subtitle: 'Local & International Reach',
      description: 'Targeted marketing campaigns to connect your property with qualified buyers and renters worldwide.',
      videoUrl: 'https://www.youtube.com/embed/Ep4yfJ1bXK0',
      features: ['Social media marketing', 'Email campaigns', 'International listings', 'Performance tracking'],
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif text-foreground mb-4">
            Our Services in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore how Ona3D helps property owners across Mombasa and Kenya showcase their spaces and connect with global audiences.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredVideo(service.id)}
              onMouseLeave={() => setHoveredVideo(null)}
            >
              {/* Video Container */}
              <div className="relative rounded-2xl overflow-hidden bg-secondary mb-6 aspect-video">
                <iframe
                  src={service.videoUrl}
                  title={service.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />

                {/* Hover Overlay */}
                {hoveredVideo === service.id && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300">
                    <button
                      onClick={() => setUnmuteVideo(unmuteVideo === service.id ? null : service.id)}
                      className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
                      aria-label="Play video"
                    >
                      <Play className="w-8 h-8 text-white ml-1" />
                    </button>
                  </div>
                )}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-primary font-medium mb-3">
                  {service.subtitle}
                </p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-12 text-center border border-primary/10">
          <h3 className="text-2xl lg:text-3xl font-serif text-foreground mb-4">
            Ready to Showcase Your Property?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join property owners across Mombasa who are connecting with buyers, renters, and guests through Ona3D virtual tours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors">
              Create Your 3D Tour
            </button>
            <button className="px-8 py-3 border border-primary text-primary rounded-full font-medium hover:bg-primary/5 transition-colors">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
