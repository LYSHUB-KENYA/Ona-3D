'use client'

import Link from 'next/link'
import { Package, Home, MapPin, Building2, FileCheck, Palette, Megaphone, BarChart3 } from 'lucide-react'
import { Card } from '@/components/ui/card'

const services = [
  {
    category: 'Properties',
    services: [
      { label: 'For Sale', href: '/properties/for-sale', icon: Package, desc: 'Showcase homes with immersive 3D tours', color: 'emerald' },
      { label: 'For Rent', href: '/properties/for-rent', icon: Home, desc: 'List rental properties effectively', color: 'blue' },
      { label: 'Short Stays', href: '/properties/short-stays', icon: MapPin, desc: 'Vacation rental tours', color: 'amber' },
    ]
  },
  {
    category: 'Hospitality',
    services: [
      { label: 'Hotels', href: '/hospitality/hotels', icon: Building2, desc: 'Professional hotel room tours', color: 'rose' },
      { label: 'Holiday Rentals', href: '/hospitality/holidays', icon: Home, desc: 'Premium vacation property showcases', color: 'teal' },
    ]
  },
  {
    category: 'Business Services',
    services: [
      { label: 'Legal Verification', href: '/services/legal', icon: FileCheck, desc: 'Verify property documents and titles', color: 'indigo' },
      { label: 'Interior Staging', href: '/services/staging', icon: Palette, desc: 'Professional interior design & styling', color: 'purple' },
      { label: 'Marketing', href: '/services/marketing', icon: Megaphone, desc: 'Reach local & international buyers', color: 'orange' },
    ]
  }
]

export function ServiceGrid() {
  const colorClasses = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
  }

  return (
    <section className="py-20 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-semibold text-foreground mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions for property owners, hoteliers, and real estate professionals across Kenya.
          </p>
        </div>

        {services.map((categoryGroup) => (
          <div key={categoryGroup.category} className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-8">{categoryGroup.category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryGroup.services.map((service) => (
                <Link key={service.href} href={service.href}>
                  <Card className="h-full p-8 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 rounded-lg ${colorClasses[service.color as keyof typeof colorClasses]} border`}>
                        <service.icon className="w-6 h-6" />
                      </div>
                    </div>
                    <h4 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{service.label}</h4>
                    <p className="text-muted-foreground">{service.desc}</p>
                    <div className="mt-6 flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                      Learn more →
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
