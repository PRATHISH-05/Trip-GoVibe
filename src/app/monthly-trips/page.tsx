'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Link from 'next/link';

export default function MonthlytTripsPage() {
  const [selectedMonth, setSelectedMonth] = useState('January');

  const monthlyTrips: { [key: string]: any } = {
    January: {
      weather: 'Perfect Sunny Days',
      bestFor: 'Adventure & Trekking',
      destinations: [
        { name: 'Himachal Pradesh', highlight: 'Snow-capped mountains & trekking', temp: '5-15°C' },
        { name: 'Goa', highlight: 'Beach season, perfect weather', temp: '20-30°C' },
        { name: 'Rajasthan', highlight: 'Desert festivals & heritage', temp: '15-25°C' },
        { name: 'Kashmir', highlight: 'Winter sports & snow activities', temp: '0-5°C' },
      ],
      avgBudget: '₹30,000 - ₹50,000',
      packingTips: 'Warm clothes, trekking shoes, sunscreen, camera',
    },
    February: {
      weather: 'Pleasant & Cool',
      bestFor: 'Heritage Tours & Beach',
      destinations: [
        { name: 'Kerala', highlight: 'Backwaters & houseboats', temp: '22-32°C' },
        { name: 'Agra', highlight: 'Taj Mahal & monuments', temp: '15-25°C' },
        { name: 'Jaipur', highlight: 'Pink City & culture', temp: '15-28°C' },
        { name: 'Maldives Trip', highlight: 'Underwater exploration', temp: '26-30°C' },
      ],
      avgBudget: '₹25,000 - ₹45,000',
      packingTips: 'Light clothes, hat, water bottle, travel guide',
    },
    March: {
      weather: 'Warm & Dry',
      bestFor: 'Hill Stations & Festivals',
      destinations: [
        { name: 'Munnar', highlight: 'Tea gardens in bloom', temp: '15-25°C' },
        { name: 'Udaipur', highlight: 'Lakes & palaces', temp: '25-35°C' },
        { name: 'Ooty', highlight: 'Nilgiri mountains', temp: '18-28°C' },
        { name: 'Pushkar', highlight: 'Camel fair & temples', temp: '25-35°C' },
      ],
      avgBudget: '₹20,000 - ₹40,000',
      packingTips: 'Light layers, sunglasses, sandals, water bottle',
    },
    April: {
      weather: 'Hot & Dry',
      bestFor: 'Heritage Sites & Water Activities',
      destinations: [
        { name: 'Hampi', highlight: 'Ancient ruins & temples', temp: '28-38°C' },
        { name: 'Varanasi', highlight: 'Spiritual ghats & temples', temp: '30-40°C' },
        { name: 'Andaman', highlight: 'Island hopping & water sports', temp: '28-32°C' },
        { name: 'Shimla', highlight: 'Hill station escape', temp: '15-28°C' },
      ],
      avgBudget: '₹28,000 - ₹48,000',
      packingTips: 'Very light clothes, strong sunscreen, hat, umbrella',
    },
    May: {
      weather: 'Very Hot',
      bestFor: 'Hill Stations & Water Sports',
      destinations: [
        { name: 'Ladakh', highlight: 'Mountain passes & monasteries', temp: '15-25°C' },
        { name: 'Andaman Islands', highlight: 'Beaches & snorkeling', temp: '28-32°C' },
        { name: 'Leh', highlight: 'High altitude adventure', temp: '10-25°C' },
        { name: 'Spiti Valley', highlight: 'Remote mountain landscape', temp: '5-20°C' },
      ],
      avgBudget: '₹35,000 - ₹55,000',
      packingTips: 'Lightweight clothes, sunscreen, hat, water bottle',
    },
    June: {
      weather: 'Monsoon Begins',
      bestFor: 'Monsoon Trekking & Waterfalls',
      destinations: [
        { name: 'Coorg', highlight: 'Coffee plantations, waterfalls', temp: '18-28°C' },
        { name: 'Meghalaya', highlight: 'Wettest place, living root bridges', temp: '15-25°C' },
        { name: 'Goa', highlight: 'Monsoon festival vibes', temp: '22-32°C' },
        { name: 'Western Ghats', highlight: 'Lush green landscapes', temp: '20-30°C' },
      ],
      avgBudget: '₹18,000 - ₹35,000',
      packingTips: 'Waterproof jacket, umbrella, water shoes, light clothes',
    },
    July: {
      weather: 'Heavy Monsoon',
      bestFor: 'Nature Lovers & Adventure',
      destinations: [
        { name: 'Wayanad', highlight: 'Tea gardens & treks', temp: '18-28°C' },
        { name: 'Chikmagalur', highlight: 'Coffee plantations', temp: '15-25°C' },
        { name: 'Shillong', highlight: 'Green hills & waterfalls', temp: '16-26°C' },
        { name: 'Almora', highlight: 'Mountain trails & views', temp: '12-22°C' },
      ],
      avgBudget: '₹15,000 - ₹32,000',
      packingTips: 'Waterproof gear, umbrella, good shoes, sweater',
    },
    August: {
      weather: 'Monsoon Peak',
      bestFor: 'Waterfall Tours & Beach',
      destinations: [
        { name: 'Malshej Ghat', highlight: 'Waterfalls & monsoon views', temp: '15-25°C' },
        { name: 'Rishikesh', highlight: 'Adventure sports & yoga', temp: '18-32°C' },
        { name: 'Cherrapunji', highlight: 'Living root bridges', temp: '14-24°C' },
        { name: 'Manali', highlight: 'Adventure & trekking', temp: '12-22°C' },
      ],
      avgBudget: '₹16,000 - ₹33,000',
      packingTips: 'Rain jacket, waterproof bag, good traction shoes',
    },
    September: {
      weather: 'Post-Monsoon',
      bestFor: 'Adventure & Nature',
      destinations: [
        { name: 'Dharamshala', highlight: 'Mountains & monasteries', temp: '12-25°C' },
        { name: 'Kanyakumari', highlight: 'Southernmost tip, beaches', temp: '22-32°C' },
        { name: 'Pushkar', highlight: 'Desert town & camel fair prep', temp: '25-35°C' },
        { name: 'Ooty', highlight: 'Hill station trekking', temp: '15-25°C' },
      ],
      avgBudget: '₹20,000 - ₹38,000',
      packingTips: 'Light layers, jacket, good hiking shoes, camera',
    },
    October: {
      weather: 'Pleasant & Cool',
      bestFor: 'Heritage & Adventure',
      destinations: [
        { name: 'Jodhpur', highlight: 'Blue city & forts', temp: '18-32°C' },
        { name: 'Kerala Backwaters', highlight: 'Boat cruises & scenery', temp: '23-33°C' },
        { name: 'Araku Valley', highlight: 'Tribal villages & tribal art', temp: '15-28°C' },
        { name: 'Diwali Celebrations', highlight: 'Festival tourism nationwide', temp: 'Varies' },
      ],
      avgBudget: '₹22,000 - ₹42,000',
      packingTips: 'Light clothes, jacket, comfortable shoes, camera',
    },
    November: {
      weather: 'Perfect Weather',
      bestFor: 'All Activities',
      destinations: [
        { name: 'Jaipur', highlight: 'Heritage festival season', temp: '15-28°C' },
        { name: 'Goa', highlight: 'Beach season beginning', temp: '20-32°C' },
        { name: 'Varanasi', highlight: 'Dev Deepavali festival', temp: '15-28°C' },
        { name: 'Himachal Pradesh', highlight: 'Golden autumn foliage', temp: '8-20°C' },
      ],
      avgBudget: '₹25,000 - ₹45,000',
      packingTips: 'Light clothes, jacket, sunscreen, walking shoes',
    },
    December: {
      weather: 'Cool & Comfortable',
      bestFor: 'Festivals & Beach',
      destinations: [
        { name: 'Goa', highlight: 'Peak season, all activities', temp: '20-32°C' },
        { name: 'Rajasthan', highlight: 'Desert festivals', temp: '12-28°C' },
        { name: 'Kerala', highlight: 'Cochin Carnival & cruises', temp: '22-32°C' },
        { name: 'Himachal', highlight: 'Christmas celebrations', temp: '5-15°C' },
      ],
      avgBudget: '₹30,000 - ₹50,000',
      packingTips: 'Warm clothes for hills, light for beaches, festival attire',
    },
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const tripData = monthlyTrips[selectedMonth];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Plan Your Trip by{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Month
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover the best destinations for each month based on weather, festivals, and activities
            </p>
          </motion.div>

          {/* Month Selector */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {months.map((month) => (
                <motion.button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={`px-3 py-2 rounded-lg border transition font-semibold text-sm ${
                    selectedMonth === month
                      ? 'bg-amber-500 border-amber-500 text-black'
                      : 'bg-white/5 border-white/20 text-white hover:border-amber-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {month.slice(0, 3)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Month Details */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            key={selectedMonth}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            {/* Info Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <motion.div
                className="bg-gradient-to-br from-amber-900/30 to-orange-900/20 border border-amber-500/30 rounded-xl p-6 backdrop-blur"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-gray-400 text-sm mb-2">Weather</p>
                <p className="text-2xl font-bold text-amber-400">{tripData.weather}</p>
              </motion.div>
              <motion.div
                className="bg-gradient-to-br from-amber-900/30 to-orange-900/20 border border-amber-500/30 rounded-xl p-6 backdrop-blur"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <p className="text-gray-400 text-sm mb-2">Best For</p>
                <p className="text-2xl font-bold text-amber-400">{tripData.bestFor}</p>
              </motion.div>
              <motion.div
                className="bg-gradient-to-br from-amber-900/30 to-orange-900/20 border border-amber-500/30 rounded-xl p-6 backdrop-blur"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-gray-400 text-sm mb-2">Budget</p>
                <p className="text-xl font-bold text-amber-400">{tripData.avgBudget}</p>
              </motion.div>
              <motion.div
                className="bg-gradient-to-br from-amber-900/30 to-orange-900/20 border border-amber-500/30 rounded-xl p-6 backdrop-blur"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-gray-400 text-sm mb-2">Pack</p>
                <p className="text-sm font-bold text-amber-400">{tripData.packingTips}</p>
              </motion.div>
            </div>

            {/* Destinations */}
            <h2 className="text-3xl font-bold mb-6">
              Best Destinations in {selectedMonth}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {tripData.destinations.map((dest: any, idx: number) => (
                <motion.div
                  key={idx}
                  className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-xl p-6 backdrop-blur hover:border-amber-400 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-2xl font-bold mb-2 text-amber-400">{dest.name}</h3>
                  <p className="text-gray-300 mb-3">{dest.highlight}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <span className="text-gray-400">Temperature: {dest.temp}</span>
                    <Link href="/plan">
                      <motion.button
                        className="px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-lg hover:bg-amber-500/30 transition"
                        whileHover={{ scale: 1.05 }}
                      >
                        Plan Trip →
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-amber-500/30 rounded-2xl p-12 text-center backdrop-blur"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Explore in {selectedMonth}?</h2>
            <p className="text-gray-300 mb-8">
              Plan your perfect {selectedMonth} getaway with our AI-powered itinerary planner
            </p>
            <Link href="/plan">
              <motion.button
                className="px-12 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Itinerary Now →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
