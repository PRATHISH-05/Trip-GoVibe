'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Link from 'next/link';

export default function SurpriseTripPage() {
  const [budgetRange, setBudgetRange] = useState('mid');
  const [revealed, setRevealed] = useState(false);
  const [surpriseDestination, setSurpriseDestination] = useState<any>(null);

  const surpriseDestinations = {
    budget: [
      {
        name: 'Pushkar, Rajasthan',
        image: '🏜️',
        price: '₹12,000 - ₹18,000',
        duration: '3-4 Days',
        highlights: 'Holy lake, temple town, camel fair, desert',
        bestFor: 'Spiritual travelers',
      },
      {
        name: 'Rishikesh, Uttarakhand',
        image: '🧘',
        price: '₹10,000 - ₹16,000',
        duration: '3-4 Days',
        highlights: 'Yoga capital, adventure sports, riverside',
        bestFor: 'Wellness seekers',
      },
      {
        name: 'Jaisalmer, Rajasthan',
        image: '🏰',
        price: '₹13,000 - ₹19,000',
        duration: '3-4 Days',
        highlights: 'Golden fort, desert safari, havelis',
        bestFor: 'Desert lovers',
      },
      {
        name: 'Chikmagalur, Karnataka',
        image: '☕',
        price: '₹11,000 - ₹17,000',
        duration: '2-3 Days',
        highlights: 'Coffee plantations, waterfalls, trek',
        bestFor: 'Nature enthusiasts',
      },
      {
        name: 'Alleppey, Kerala',
        image: '🚤',
        price: '₹12,000 - ₹18,000',
        duration: '2-3 Days',
        highlights: 'Backwaters, houseboat, fishing village',
        bestFor: 'Relaxation seekers',
      },
    ],
    mid: [
      {
        name: 'Udaipur, Rajasthan',
        image: '🏛️',
        price: '₹20,000 - ₹30,000',
        duration: '4-5 Days',
        highlights: 'Lakes, palaces, temples, boat rides',
        bestFor: 'History enthusiasts',
      },
      {
        name: 'Munnar, Kerala',
        image: '🌿',
        price: '₹18,000 - ₹28,000',
        duration: '3-4 Days',
        highlights: 'Tea gardens, mountains, nature walks',
        bestFor: 'Mountain lovers',
      },
      {
        name: 'Jaipur, Rajasthan',
        image: '🏰',
        price: '₹19,000 - ₹29,000',
        duration: '3-4 Days',
        highlights: 'Pink City Palace, bazaar, forts',
        bestFor: 'Culture explorers',
      },
      {
        name: 'Hampi, Karnataka',
        image: '🛕',
        price: '₹17,000 - ₹27,000',
        duration: '3-4 Days',
        highlights: 'Ancient temples, ruins, boulder walks',
        bestFor: 'History buffs',
      },
      {
        name: 'Varanasi, Uttar Pradesh',
        image: '🕉️',
        price: '₹16,000 - ₹26,000',
        duration: '3-4 Days',
        highlights: 'Spiritual ghats, temples, Ganga Aarti',
        bestFor: 'Spiritual seekers',
      },
    ],
    luxury: [
      {
        name: 'Goa Beach Paradise',
        image: '🏖️',
        price: '₹35,000 - ₹50,000',
        duration: '5-7 Days',
        highlights: 'Luxury resorts, beaches, water sports',
        bestFor: 'Beach vacationers',
      },
      {
        name: 'Kashmir Paradise',
        image: '⛰️',
        price: '₹40,000 - ₹60,000',
        duration: '5-7 Days',
        highlights: 'Dal Lake, houseboats, Gulmarg',
        bestFor: 'Nature lovers',
      },
      {
        name: 'Ladakh Adventure',
        image: '🏔️',
        price: '₹45,000 - ₹65,000',
        duration: '6-8 Days',
        highlights: 'Mountain passes, monasteries, adventure',
        bestFor: 'Adventure seekers',
      },
      {
        name: 'Maldives Getaway',
        image: '🏝️',
        price: '₹60,000 - ₹90,000',
        duration: '5-7 Days',
        highlights: 'Luxury resorts, diving, snorkeling',
        bestFor: 'Luxury travelers',
      },
      {
        name: 'Andaman Islands',
        image: '🌊',
        price: '₹38,000 - ₹55,000',
        duration: '5-7 Days',
        highlights: 'Island hopping, water sports, beaches',
        bestFor: 'Adventure lovers',
      },
    ],
  };

  const generateSurprise = () => {
    const destinations = surpriseDestinations[budgetRange as keyof typeof surpriseDestinations];
    const randomDest = destinations[Math.floor(Math.random() * destinations.length)];
    setSurpriseDestination(randomDest);
    setRevealed(true);
  };

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
              Let Fate Decide Your{' '}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
                Next Adventure
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Not sure where to go? Let our surprise trip generator pick a perfect destination for you!
            </p>
          </motion.div>

          {/* Budget Selection */}
          <motion.div
            className="mb-12 bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-center text-gray-300 mb-6 font-semibold text-lg">Select Your Budget Range:</p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { value: 'budget', label: '💰 Budget', desc: '₹10k - ₹20k' },
                { value: 'mid', label: '💳 Mid-Range', desc: '₹20k - ₹40k' },
                { value: 'luxury', label: '💎 Luxury', desc: '₹40k - ₹90k' },
              ].map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => {
                    setBudgetRange(option.value);
                    setRevealed(false);
                  }}
                  className={`p-6 rounded-lg border-2 transition ${
                    budgetRange === option.value
                      ? 'bg-amber-500 border-amber-500 text-black'
                      : 'bg-white/5 border-white/20 text-white hover:border-amber-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-2xl">{option.label}</div>
                  <div className="text-sm mt-2">{option.desc}</div>
                </motion.button>
              ))}
            </div>

            {/* Reveal Button */}
            <motion.button
              onClick={generateSurprise}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg font-bold text-lg text-white hover:shadow-2xl hover:shadow-amber-500/50 transition-shadow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🎲 Reveal My Surprise Trip!
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Surprise Reveal */}
      {revealed && surpriseDestination && (
        <section className="pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-gradient-to-br from-amber-900/30 to-orange-900/20 border-2 border-amber-500/50 rounded-2xl p-12 backdrop-blur text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="text-9xl mb-6"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {surpriseDestination.image}
              </motion.div>

              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                {surpriseDestination.name}
              </h2>

              <div className="grid grid-cols-2 gap-6 my-8">
                <motion.div
                  className="bg-white/5 border border-white/10 rounded-lg p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-gray-400 text-sm mb-1">Budget</p>
                  <p className="text-2xl font-bold text-amber-400">{surpriseDestination.price}</p>
                </motion.div>

                <motion.div
                  className="bg-white/5 border border-white/10 rounded-lg p-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-gray-400 text-sm mb-1">Duration</p>
                  <p className="text-2xl font-bold text-amber-400">{surpriseDestination.duration}</p>
                </motion.div>
              </div>

              <div className="mb-8 text-lg">
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold text-amber-400">Highlights:</span> {surpriseDestination.highlights}
                </p>
                <p className="text-gray-400 text-sm italic">
                  Perfect for: {surpriseDestination.bestFor}
                </p>
              </div>

              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/plan">
                  <motion.button
                    className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg font-semibold text-lg hover:shadow-xl hover:shadow-amber-500/50 transition-shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book This Trip 🚀
                  </motion.button>
                </Link>

                <motion.button
                  onClick={() => setRevealed(false)}
                  className="px-8 py-4 bg-white/10 border border-white/20 rounded-lg font-semibold text-lg hover:bg-white/20 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try Again 🎲
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {!revealed && (
        <section className="pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Why Try Our Surprise Generator?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🎯',
                  title: 'Personalized Picks',
                  desc: 'AI-selected destinations based on your budget',
                },
                {
                  icon: '⚡',
                  title: 'Instant Planning',
                  desc: 'Get complete itinerary in seconds',
                },
                {
                  icon: '🌟',
                  title: 'Hidden Gems',
                  desc: 'Discover lesser-known amazing places',
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="bg-gradient-to-br from-amber-900/20 to-orange-900/10 border border-amber-500/20 rounded-xl p-6 backdrop-blur text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
