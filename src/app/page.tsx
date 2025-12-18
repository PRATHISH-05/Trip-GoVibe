'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Link from 'next/link';

export default function Home() {
  const [currentPlace, setCurrentPlace] = useState(0);

  // Featured places carousel
  const featuredPlaces = [
    {
      name: 'Taj Mahal, Agra',
      state: 'Uttar Pradesh',
      emoji: '🏰',
      description: 'Wonder of the World',
    },
    {
      name: 'Kerala Backwaters',
      state: 'Kerala',
      emoji: '🚤',
      description: 'Serene Water Paradise',
    },
    {
      name: 'Goa Beaches',
      state: 'Goa',
      emoji: '🏖️',
      description: 'Coastal Paradise',
    },
    {
      name: 'Jaipur City Palace',
      state: 'Rajasthan',
      emoji: '🏛️',
      description: 'Royal Heritage',
    },
    {
      name: 'Munnar Tea Gardens',
      state: 'Kerala',
      emoji: '🌿',
      description: "Nature's Carpet",
    },
    {
      name: 'Varanasi Ghats',
      state: 'Uttar Pradesh',
      emoji: '🕉️',
      description: 'Spiritual Heart of India',
    },
    {
      name: 'Mumbai Marine Drive',
      state: 'Maharashtra',
      emoji: '🏙️',
      description: 'City of Dreams',
    },
    {
      name: 'Ladakh Pangong Lake',
      state: 'Ladakh',
      emoji: '🏔️',
      description: 'High-Altitude Azure',
    },
    {
      name: 'Rann of Kutch',
      state: 'Gujarat',
      emoji: '🌅',
      description: 'White Salt Desert',
    },
    {
      name: 'Andaman Havelock',
      state: 'Andaman & Nicobar',
      emoji: '🏝️',
      description: 'Turquoise Waters',
    },
  ];

  // Suggested trips - ENHANCED with more realistic data
  const suggestedTrips = [
    {
      title: 'Rajasthan Royal Trail',
      duration: '7 Days',
      cities: 'Jaipur → Udaipur → Jodhpur',
      price: '₹35,000',
      image: '🏰',
      highlights: ['Palaces', 'Forts', 'Desert Safari'],
    },
    {
      title: 'Kerala Wellness Retreat',
      duration: '5 Days',
      cities: 'Kochi → Munnar → Alleppey',
      price: '₹28,000',
      image: '🌴',
      highlights: ['Backwaters', 'Tea Gardens', 'Ayurveda'],
    },
    {
      title: 'Goa Beach Escape',
      duration: '4 Days',
      cities: 'North & South Goa',
      price: '₹18,000',
      image: '🏖️',
      highlights: ['Beaches', 'Water Sports', 'Nightlife'],
    },
    {
      title: 'Himalayan Adventure',
      duration: '6 Days',
      cities: 'Shimla → Manali',
      price: '₹32,000',
      image: '⛰️',
      highlights: ['Mountain Trekking', 'Adventure Sports', 'Scenic Views'],
    },
    {
      title: 'Mumbai City Explorer',
      duration: '3 Days',
      cities: 'Mumbai Metropolitan Area',
      price: '₹15,000',
      image: '🏙️',
      highlights: ['Street Food', 'Nightlife', 'Heritage Sites'],
    },
    {
      title: 'Varanasi Spiritual Journey',
      duration: '4 Days',
      cities: 'Varanasi & Nearby',
      price: '₹20,000',
      image: '🕉️',
      highlights: ['Ghats', 'Temples', 'Cultural Experience'],
    },
  ];

  // Travel news
  const travelNews = [
    {
      title: 'New Direct Flight Route: Delhi to Leh Opens',
      category: 'Travel Updates',
      date: 'Jan 15, 2025',
      image: '✈️',
    },
    {
      title: 'Top 10 Hidden Gems in Himachal Pradesh',
      category: 'Destinations',
      date: 'Jan 12, 2025',
      image: '🏔️',
    },
    {
      title: 'Budget Travel Tips for Solo Travelers in India',
      category: 'Travel Tips',
      date: 'Jan 10, 2025',
      image: '🎒',
    },
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlace((prev) => (prev + 1) % featuredPlaces.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredPlaces.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Discover India's{' '}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
                Hidden Treasures
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              AI-powered trip planning for authentic local experiences across 500+ destinations in India
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/plan">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg font-semibold text-lg hover:shadow-xl hover:shadow-amber-500/50 transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Plan Your Trip
                </motion.button>
              </Link>
              <Link href="/surprise-trip">
                <motion.button
                  className="px-8 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-lg font-semibold text-lg hover:bg-white/20 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Surprise Me! 🎲
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { value: '1,200+', label: 'Destinations' },
              { value: '50K+', label: 'Happy Travelers' },
              { value: 'All 28', label: 'States Covered' },
              { value: '100km', label: 'Local Radius' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="bg-gradient-to-br from-amber-900/30 to-orange-900/20 border border-amber-500/30 rounded-xl p-6 text-center backdrop-blur"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              GoVibe?
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'AI-Powered Planning',
                desc: 'Smart itineraries based on your preferences, budget, and travel style',
              },
              {
                icon: '📍',
                title: '100km Local Radius',
                desc: 'Discover authentic experiences within 100km of your city for genuine local flavor',
              },
              {
                icon: '🗺️',
                title: 'All-India Coverage',
                desc: '1,200+ places across all 28 states and 8 union territories',
              },
              {
                icon: '⏱️',
                title: 'Flexible Duration',
                desc: 'Plans from 1-day getaways to 2+ week adventures',
              },
              {
                icon: '💰',
                title: 'Budget-Friendly Options',
                desc: 'Travel within your budget with smart cost optimization',
              },
              {
                icon: '🏆',
                title: 'Hidden Gems',
                desc: 'Discover off-the-beaten-path destinations alongside famous landmarks',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="group bg-gradient-to-br from-amber-900/20 to-orange-900/10 border border-amber-500/20 rounded-xl p-6 backdrop-blur hover:border-amber-400 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations Carousel */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Featured{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Destinations
            </span>
          </h2>
          <div className="relative h-96 rounded-2xl overflow-hidden border border-amber-500/30 backdrop-blur">
            {featuredPlaces.map((place, idx) => (
              <motion.div
                key={idx}
                className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: idx === currentPlace ? 1 : 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-center px-6">
                  <motion.div
                    className="text-9xl mb-6 drop-shadow-2xl"
                    animate={idx === currentPlace ? { scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] } : {}}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.5 }}
                  >
                    {place.emoji}
                  </motion.div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-xl">{place.name}</h3>
                  <p className="text-amber-400 text-xl font-semibold">{place.description}</p>
                  <p className="text-gray-300 mt-2 text-lg">{place.state}</p>
                </div>
              </motion.div>
            ))}

            {/* Carousel Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {featuredPlaces.map((_, idx) => (
                <motion.button
                  key={idx}
                  className={`h-2 rounded-full transition ${
                    idx === currentPlace ? 'bg-amber-400 w-8' : 'bg-gray-600 w-2'
                  }`}
                  onClick={() => setCurrentPlace(idx)}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Travel News */}
      <section className="py-20 px-6 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">
              Latest{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Travel News
              </span>
            </h2>
            <Link href="/news">
              <motion.button
                className="px-6 py-2 bg-amber-500/20 border border-amber-500/30 rounded-lg hover:bg-amber-500/30 transition"
                whileHover={{ scale: 1.05 }}
              >
                View All News →
              </motion.button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {travelNews.map((news, idx) => (
              <motion.div
                key={idx}
                className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-xl p-6 backdrop-blur hover:border-amber-400 transition-colors cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="text-5xl mb-4">{news.image}</div>
                <div className="text-amber-400 text-sm mb-2">{news.category}</div>
                <h3 className="text-lg font-bold mb-2">{news.title}</h3>
                <p className="text-gray-400 text-sm">{news.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Suggested Trips */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Suggested{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Trip Packages
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedTrips.map((trip, idx) => (
              <motion.div
                key={idx}
                className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-xl overflow-hidden backdrop-blur hover:border-amber-400 transition-colors group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="p-6">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{trip.image}</div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-400 transition">{trip.title}</h3>
                  <p className="text-amber-400 mb-2">{trip.cities}</p>
                  <p className="text-gray-400 text-sm mb-4">{trip.duration}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {trip.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-xs"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/10">
                    <div>
                      <div className="text-sm text-gray-400">Starting from</div>
                      <div className="text-2xl font-bold text-amber-400">{trip.price}</div>
                    </div>
                    <Link href="/plan">
                      <motion.button
                        className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-shadow"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Book Now
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-amber-500/30 rounded-2xl p-12 text-center backdrop-blur"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let our AI plan the perfect itinerary for your next trip
            </p>
            <Link href="/plan">
              <motion.button
                className="px-12 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Plan Trip Now →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-500/20 backdrop-blur bg-black/50 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-amber-400 font-bold mb-4 text-2xl">✈️ GoVibe</h4>
              <p className="text-gray-400 text-sm">
                AI-powered travel planning for authentic Indian experiences
              </p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/plan" className="hover:text-amber-400 transition">Plan Trip</Link></li>
                <li><Link href="/hotels" className="hover:text-amber-400 transition">Find Hotels</Link></li>
                <li><Link href="/restaurants" className="hover:text-amber-400 transition">Find Restaurants</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Explore</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/monthly-trips" className="hover:text-amber-400 transition">Monthly Trips</Link></li>
                <li><Link href="/surprise-trip" className="hover:text-amber-400 transition">Surprise Trip</Link></li>
                <li><Link href="/news" className="hover:text-amber-400 transition">Travel News</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Tools</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/expense-tracker" className="hover:text-amber-400 transition">Expense Tracker</Link></li>
                <li><a href="#" className="hover:text-amber-400 transition">Chatbot Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-amber-500/20 pt-8 text-center text-gray-400">
            <p>&copy; 2025 GoVibe. All rights reserved. Discover India like never before.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
