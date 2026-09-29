import { Zap, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Clock } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'home' | 'store') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer id="contact" className="bg-slate-950 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600">
                <Zap className="h-5 w-5 text-slate-900" strokeWidth={2.5} />
              </div>
              <span className="text-4 font-bold text-white">
                Chohan<span className="text-amber-400"> Electric <span className='text-white'>Store</span></span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Professional electrical services and quality electrical products for homes and
              businesses. Licensed, insured, and trusted since 2008.
            </p>
            <div className="flex gap-3">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 transition-colors hover:bg-amber-400 hover:text-slate-900" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 transition-colors hover:bg-amber-400 hover:text-slate-900" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 transition-colors hover:bg-amber-400 hover:text-slate-900" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('home')} className="transition-colors hover:text-amber-400">Home</button></li>
              <li><button onClick={() => onNavigate('store')} className="transition-colors hover:text-amber-400">Shop Products</button></li>
              <li><a href="#services" className="transition-colors hover:text-amber-400">Our Services</a></li>
              <li><a href="#booking" className="transition-colors hover:text-amber-400">Book a Service</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Residential Wiring</li>
              <li>Commercial Electrical</li>
              <li>Lighting Installation</li>
              <li>Emergency Callout 24/7</li>
              <li>Safety Inspections</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Get in Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-amber-400" />
                <span>(+92) 3110649235</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-amber-400" />
                <span>lpshadow47@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 flex-shrink-0 text-amber-400" />
                <span>BHALWAL ROAD NEAR DIN COLONY SARGODHA, PAKISTAN</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 flex-shrink-0 text-amber-400" />
                <span>Mon–Sun: 7am – 10pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs">
          <p>&copy; 2026 VoltEdge Electrical. All rights reserved. Licensed &amp; Insured. License #EC-2008-4521</p>
        </div>
      </div>
    </footer>
  );
}
