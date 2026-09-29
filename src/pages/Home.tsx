import { useState } from 'react';
import {
  ArrowRight,
  Star,
  Check,
  Phone,
  Clock,
  ShieldCheck,
  Award,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { services, type Service } from '@/data/services';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface HomeProps {
  onNavigate: (page: 'home' | 'store') => void;
}

const stats: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: Users, value: '5,000+', label: 'Happy Customers' },
  { icon: Award, value: '15+', label: 'Years Experience' },
  { icon: ShieldCheck, value: '100%', label: 'Licensed & Insured' },
  { icon: Clock, value: '24/7', label: 'Emergency Service' },
];

const testimonials = [
  { name: 'Sarah Mitchell', role: 'Homeowner', text: 'VoltEdge rewired our entire 1920s home flawlessly. Professional, clean, and on time. Highly recommend!', rating: 5 },
  { name: 'James Carter', role: 'Restaurant Owner', text: 'They installed all the lighting in our new restaurant. The smart lighting system they set up is incredible.', rating: 5 },
  { name: 'Emily Rodriguez', role: 'Property Manager', text: 'I manage 12 properties and VoltEdge is my go-to for all electrical work. Reliable and fairly priced.', rating: 5 },
];

export default function Home({ onNavigate }: HomeProps) {
  const { addToCart } = useCart();
  const [booking, setBooking] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const featuredProducts = products.slice(0, 4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setBooking({ name: '', email: '', phone: '', service: '', date: '', message: '' });
    }, 4000);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/27928762/pexels-photo-27928762.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Electrician at work"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-sm font-medium text-amber-300">
              <Zap className="h-4 w-4" />
              Licensed &amp; Insured Electricians
            </div>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Powering Your World with{' '}
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Expert Electrical
              </span>{' '}
              Solutions
            </h1>
            <p className="mt-6 text-lg text-gray-300">
              From residential wiring to commercial installations, we deliver safe, reliable, and
              affordable electrical services. Plus, shop quality electrical products in our store.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#booking"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-600 px-6 py-3 font-semibold text-slate-900 shadow-lg shadow-amber-500/30 transition-all hover:shadow-amber-500/50 hover:brightness-110"
              >
                Book a Service
                <ArrowRight className="h-5 w-5" />
              </a>
              <button
                onClick={() => onNavigate('store')}
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition-all hover:bg-white/10"
              >
                Visit Our Store
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-slate-950/80 backdrop-blur">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:px-6 md:grid-cols-4 lg:px-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-400/10 text-amber-400">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-amber-600">What We Do</span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Our Electrical Services</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Whether it's a small repair or a full rewiring project, our certified electricians
              have you covered with professional, reliable service.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service: Service) => (
              <div
                key={service.id}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-900 shadow-lg shadow-amber-500/20 transition-transform group-hover:scale-110">
                  <service.icon className="h-7 w-7" strokeWidth={2} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900">{service.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-gray-600">{service.description}</p>
                <ul className="mb-5 space-y-1.5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="h-4 w-4 flex-shrink-0 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-lg font-bold text-slate-900">{service.price}</span>
                  <a
                    href="#booking"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600 transition-colors hover:text-amber-700"
                  >
                    Book Now
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <img
                src="https://images.pexels.com/photos/17842832/pexels-photo-17842832.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Electrician working on panel"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-amber-600">Why Choose Us</span>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                Trusted by Thousands of Homes &amp; Businesses
              </h2>
              <p className="mt-4 text-gray-600">
                We combine decades of experience with modern techniques to deliver electrical
                solutions that are safe, efficient, and built to last.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { title: 'Certified Electricians', desc: 'Fully licensed and continuously trained' },
                  { title: 'Upfront Pricing', desc: 'No hidden fees, transparent quotes' },
                  { title: 'Quality Materials', desc: 'Only premium, code-compliant parts' },
                  { title: 'Satisfaction Guarantee', desc: 'We stand behind every job we do' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-amber-600">Our Store</span>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Featured Products</h2>
              <p className="mt-2 text-gray-600">Quality electrical products from trusted brands</p>
            </div>
            <button
              onClick={() => onNavigate('store')}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 font-semibold text-white transition-all hover:bg-slate-800"
            >
              View All Products
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-slate-900">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="mb-1 flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium text-gray-600">{product.rating}</span>
                    <span className="ml-2 text-xs text-gray-400">{product.category}</span>
                  </div>
                  <h3 className="mb-2 line-clamp-1 font-semibold text-slate-900">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-slate-900">${product.price}</span>
                      {product.oldPrice && (
                        <span className="text-sm text-gray-400 line-through">${product.oldPrice}</span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-amber-500 hover:text-slate-900"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="relative overflow-hidden bg-slate-900 py-20">
        <div className="absolute inset-0 opacity-5">
          <img
            src="https://images.pexels.com/photos/14319099/pexels-photo-14319099.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-amber-400">Book a Service</span>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Schedule Your Appointment</h2>
            <p className="mt-4 text-gray-400">
              Fill out the form below and our team will confirm your booking within 2 hours.
            </p>
          </div>

          {submitted ? (
            <div className="mt-10 rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20">
                <Check className="h-7 w-7 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Booking Received!</h3>
              <p className="mt-2 text-gray-400">
                Thank you, {booking.name || 'there'}! We'll call you shortly to confirm your appointment.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-300">Full Name</label>
                  <input
                    type="text"
                    required
                    value={booking.name}
                    onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-4 py-2.5 text-white placeholder-gray-500 outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-300">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={booking.phone}
                    onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-4 py-2.5 text-white placeholder-gray-500 outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-300">Email Address</label>
                  <input
                    type="email"
                    required
                    value={booking.email}
                    onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-4 py-2.5 text-white placeholder-gray-500 outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-300">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={booking.date}
                    onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-4 py-2.5 text-white placeholder-gray-500 outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400 [color-scheme:dark]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-300">Service Needed</label>
                  <select
                    required
                    value={booking.service}
                    onChange={(e) => setBooking({ ...booking, service: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-4 py-2.5 text-white outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  >
                    <option value="">Select a service...</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title} className="bg-slate-800">
                        {s.title} — {s.price}
                      </option>
                    ))}
                    <option value="Other" className="bg-slate-800">Other / Not sure</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-300">
                    Additional Details (optional)
                  </label>
                  <textarea
                    rows={3}
                    value={booking.message}
                    onChange={(e) => setBooking({ ...booking, message: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-4 py-2.5 text-white placeholder-gray-500 outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    placeholder="Describe the issue or what you need..."
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-600 py-3 font-semibold text-slate-900 shadow-lg shadow-amber-500/30 transition-all hover:brightness-110"
              >
                Confirm Booking
                <ArrowRight className="h-5 w-5" />
              </button>
              <p className="mt-3 text-center text-xs text-gray-500">
                No payment required now. We'll confirm by phone before your appointment.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-amber-600">Testimonials</span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-gray-200 bg-slate-50 p-7">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mb-5 text-gray-600">"{t.text}"</p>
                <div className="flex items-center gap-3 border-t border-gray-200 pt-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 font-bold text-slate-900">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bar */}
      <section className="bg-gradient-to-r from-amber-400 to-amber-600 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row lg:px-8">
          <div className="flex items-center gap-4">
            <Phone className="h-10 w-10 flex-shrink-0 text-slate-900" />
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Need an Electrician Now?</h3>
              <p className="text-slate-800">Call us 24/7 for emergency electrical service</p>
            </div>
          </div>
          <a
            href="tel:5551234567"
            className="rounded-lg bg-slate-900 px-8 py-3 text-lg font-bold text-white shadow-lg transition-all hover:bg-slate-800"
          >
            (555) 123-4567
          </a>
        </div>
      </section>
    </div>
  );
}
