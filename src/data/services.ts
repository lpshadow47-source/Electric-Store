import {
  Zap,
  Home,
  Factory,
  Lightbulb,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: 's1',
    icon: Home,
    title: 'Residential Wiring',
    description: 'Complete home electrical wiring, from new installations to rewiring older properties safely and up to code.',
    price: 'From $120',
    features: ['Full house wiring', 'Safety inspection', 'Switchboard upgrade', 'Certificate of compliance'],
  },
  {
    id: 's2',
    icon: Factory,
    title: 'Commercial Electrical',
    description: 'Electrical solutions for offices, retail spaces, and industrial facilities with minimal downtime.',
    price: 'From $250',
    features: ['3-phase power', 'Emergency lighting', 'Data cabling', 'Maintenance contracts'],
  },
  {
    id: 's3',
    icon: Lightbulb,
    title: 'Lighting Installation',
    description: 'Indoor and outdoor lighting design and installation, including smart lighting systems and chandeliers.',
    price: 'From $80',
    features: ['LED upgrades', 'Smart lighting', 'Outdoor & garden', 'Chandelier fitting'],
  },
  {
    id: 's4',
    icon: ShieldCheck,
    title: 'Safety Inspection',
    description: 'Comprehensive electrical safety audits to ensure your property meets all current regulations.',
    price: 'From $99',
    features: ['Full audit report', 'Fault detection', 'RCD testing', 'Compliance certificate'],
  },
  {
    id: 's5',
    icon: Zap,
    title: 'Emergency Callout',
    description: '24/7 emergency electrical service for power outages, faults, and dangerous situations.',
    price: 'From $150',
    features: ['24/7 availability', 'Fast response', 'Fault repair', 'Power restoration'],
  },
  {
    id: 's6',
    icon: Wrench,
    title: 'Repairs & Maintenance',
    description: 'Ongoing maintenance and repair services for sockets, switches, fans, and all electrical fixtures.',
    price: 'From $65',
    features: ['Socket repair', 'Switch replacement', 'Fan servicing', 'General troubleshooting'],
  },
];
