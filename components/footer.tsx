import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-[#1a1612] text-white">
      {/* CTA Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-light text-white mb-2">
                Ready to showcase your property?
              </h3>
              <p className="text-white/60">
                Create immersive 3D virtual tours and connect with buyers, renters, and guests across Mombasa and Kenya.
              </p>
            </div>
            <div className="flex gap-4 flex-wrap">
              <Link href="/list-property">
                <Button className="bg-white text-[#1a1612] hover:bg-white/90 gap-2 rounded-full px-6">
                  List Your Property
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/virtual-tours">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 gap-2 rounded-full px-6">
                  View Examples
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-white tracking-tight">Ona3D</span>
                <span className="text-[10px] text-white/50 uppercase tracking-[0.15em]">3D Virtual Tours</span>
              </div>
            </Link>
            <p className="text-white/60 mt-6 mb-8 max-w-sm leading-relaxed">
              Ona3D specializes in creating immersive 3D virtual tours for properties across Mombasa and Kenya. Showcase your spaces online and connect with buyers, renters, and guests worldwide.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-medium text-white uppercase tracking-wider mb-6">Services</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/services/3d-tours" className="text-white/60 hover:text-white transition-colors text-[15px]">
                  3D Virtual Tours
                </Link>
              </li>
              <li>
                <Link href="/services/legal" className="text-white/60 hover:text-white transition-colors text-[15px]">
                  Legal Verification
                </Link>
              </li>
              <li>
                <Link href="/services/staging" className="text-white/60 hover:text-white transition-colors text-[15px]">
                  Interior Staging
                </Link>
              </li>
              <li>
                <Link href="/services/marketing" className="text-white/60 hover:text-white transition-colors text-[15px]">
                  Marketing Services
                </Link>
              </li>
              <li>
                <Link href="/hospitality/hotels" className="text-white/60 hover:text-white transition-colors text-[15px]">
                  Hospitality Tours
                </Link>
              </li>
            </ul>
          </div>

          {/* Coverage */}
          <div>
            <h4 className="text-sm font-medium text-white uppercase tracking-wider mb-6">Coverage</h4>
            <ul className="space-y-4">
              <li>
                <span className="text-white/60 text-[15px]">Mombasa</span>
              </li>
              <li>
                <span className="text-white/60 text-[15px]">Nairobi</span>
              </li>
              <li>
                <span className="text-white/60 text-[15px]">Coastal Region</span>
              </li>
              <li>
                <span className="text-white/60 text-[15px]">All Kenya</span>
              </li>
              <li>
                <span className="text-white/60 text-[15px]">International Reach</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium text-white uppercase tracking-wider mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-[15px]">
                  Westlands Business Park<br />
                  Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white/40 flex-shrink-0" />
                <a href="tel:+254712345678" className="text-white/60 hover:text-white transition-colors text-[15px]">
                  +254 712 345 678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white/40 flex-shrink-0" />
                <a href="mailto:tours@ona3d.co.ke" className="text-white/60 hover:text-white transition-colors text-[15px]">
                  tours@ona3d.co.ke
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              2026 Ona3D. All rights reserved. 3D Virtual Tours for Mombasa & Kenya.
            </p>
            <div className="flex gap-8">
              <Link href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
