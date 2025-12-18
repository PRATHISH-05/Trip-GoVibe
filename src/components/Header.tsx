'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Plane, MapPin, Hotel, UtensilsCrossed, Newspaper, MessageCircle, Calendar, Sparkles, Wallet, Users } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: Plane },
    { href: '/plan', label: 'Plan Trip', icon: MapPin },
    { href: '/hotels', label: 'Hotels', icon: Hotel },
    { href: '/restaurants', label: 'Restaurants', icon: UtensilsCrossed },
    { href: '/news', label: 'Travel News', icon: Newspaper },
    { href: '/monthly-trips', label: 'Monthly Picks', icon: Calendar },
    { href: '/surprise-trip', label: 'Surprise Me', icon: Sparkles },
    { href: '/expense-tracker', label: 'Expenses', icon: Wallet },
    { href: '/friend-split', label: 'Split', icon: Users },
  ];

  return (
    <motion.header
      className="sticky top-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_-10px_rgba(251,191,36,0.35)]"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.span 
              className="text-3xl"
              whileHover={{ rotate: 20, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              ✈️
            </motion.span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              GoVibe
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white px-3 py-2 rounded-full border border-white/0 hover:border-white/10 hover:bg-white/10 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/plan">
              <motion.div
                className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 text-white font-bold shadow-lg hover:shadow-xl hover:shadow-amber-500/50 transition-all overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Start Planning</span>
                  <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-800 text-gray-300 hover:text-amber-400 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-800/95 border-t border-slate-700"
          >
            <nav className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-700/50 text-gray-300 hover:bg-slate-700 hover:text-amber-400 transition-all"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
