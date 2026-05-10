'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, Home, Package, Building2, MapPin, FileCheck, Palette, Megaphone, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const propertyServices = [
    { label: 'Properties for Sale', href: '/properties/for-sale', icon: Package, desc: 'Buy residential & commercial properties' },
    { label: 'Properties for Rent', href: '/properties/for-rent', icon: Home, desc: 'Rent apartments, homes & offices' },
    { label: 'Short-Term Stays', href: '/properties/short-stays', icon: MapPin, desc: 'Vacation rentals & temporary housing' },
  ]

  const hospitalityServices = [
    { label: 'Hotel Tours', href: '/hospitality/hotels', icon: Building2, desc: 'Showcase hotel rooms & facilities' },
    { label: 'Holiday Rentals', href: '/hospitality/holidays', icon: MapPin, desc: 'Premium vacation property tours' },
  ]

  const businessServices = [
    { label: 'Legal Verification', href: '/services/legal', icon: FileCheck, desc: 'Verify property documents & titles' },
    { label: 'Interior Staging', href: '/services/staging', icon: Palette, desc: 'Professional interior design services' },
    { label: 'Marketing Services', href: '/services/marketing', icon: Megaphone, desc: 'Reach local & international buyers' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground tracking-tight">Ona3D</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest">Virtual Tours</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Properties Dropdown */}
            <div className="group relative">
              <button className="px-4 py-2 rounded-lg text-foreground hover:bg-secondary flex items-center gap-2 transition-colors">
                Properties
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 top-full pt-0 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all">
                <div className="bg-white border border-border rounded-xl shadow-lg p-6 mt-2 grid grid-cols-3 gap-6 min-w-max">
                  {propertyServices.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="p-3 rounded-lg hover:bg-secondary transition-colors group/item"
                    >
                      <div className="flex items-start gap-3">
                        <service.icon className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground group-hover/item:text-primary">{service.label}</p>
                          <p className="text-xs text-muted-foreground">{service.desc}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Hospitality Dropdown */}
            <div className="group relative">
              <button className="px-4 py-2 rounded-lg text-foreground hover:bg-secondary flex items-center gap-2 transition-colors">
                Hospitality
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 top-full pt-0 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all">
                <div className="bg-white border border-border rounded-xl shadow-lg p-6 mt-2 grid grid-cols-2 gap-6 min-w-max">
                  {hospitalityServices.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="p-3 rounded-lg hover:bg-secondary transition-colors group/item"
                    >
                      <div className="flex items-start gap-3">
                        <service.icon className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground group-hover/item:text-primary">{service.label}</p>
                          <p className="text-xs text-muted-foreground">{service.desc}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Services Dropdown */}
            <div className="group relative">
              <button className="px-4 py-2 rounded-lg text-foreground hover:bg-secondary flex items-center gap-2 transition-colors">
                Services
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 top-full pt-0 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all">
                <div className="bg-white border border-border rounded-xl shadow-lg p-6 mt-2 grid grid-cols-3 gap-6 min-w-max">
                  {businessServices.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="p-3 rounded-lg hover:bg-secondary transition-colors group/item"
                    >
                      <div className="flex items-start gap-3">
                        <service.icon className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground group-hover/item:text-primary">{service.label}</p>
                          <p className="text-xs text-muted-foreground">{service.desc}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>


          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/list-property">List Property</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-6 space-y-4 border-t border-border pt-4">
            <div>
              <button
                onClick={() => setActiveMenu(activeMenu === 'properties' ? null : 'properties')}
                className="w-full text-left px-4 py-2 font-medium text-foreground flex items-center justify-between hover:bg-secondary rounded-lg"
              >
                Properties
                <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === 'properties' ? 'rotate-180' : ''}`} />
              </button>
              {activeMenu === 'properties' && (
                <div className="pl-4 mt-2 space-y-2">
                  {propertyServices.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setActiveMenu(activeMenu === 'hospitality' ? null : 'hospitality')}
                className="w-full text-left px-4 py-2 font-medium text-foreground flex items-center justify-between hover:bg-secondary rounded-lg"
              >
                Hospitality
                <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === 'hospitality' ? 'rotate-180' : ''}`} />
              </button>
              {activeMenu === 'hospitality' && (
                <div className="pl-4 mt-2 space-y-2">
                  {hospitalityServices.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setActiveMenu(activeMenu === 'services' ? null : 'services')}
                className="w-full text-left px-4 py-2 font-medium text-foreground flex items-center justify-between hover:bg-secondary rounded-lg"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === 'services' ? 'rotate-180' : ''}`} />
              </button>
              {activeMenu === 'services' && (
                <div className="pl-4 mt-2 space-y-2">
                  {businessServices.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 space-y-2 border-t border-border">
              <Button variant="outline" asChild className="w-full">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/list-property">List Property</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
