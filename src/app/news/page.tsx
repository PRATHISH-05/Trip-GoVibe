'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Link from 'next/link';

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const allNews = [
    {
      id: 1,
      title: 'New Direct Flight Route: Delhi to Leh Opens',
      category: 'Travel Updates',
      date: 'Jan 15, 2025',
      image: '✈️',
      description: 'A new direct flight route connecting Delhi and Leh is now operational, reducing travel time.',
      region: 'North',
    },
    {
      id: 2,
      title: 'Top 10 Hidden Gems in Himachal Pradesh',
      category: 'Destinations',
      date: 'Jan 12, 2025',
      image: '🏔️',
      description: 'Discover lesser-known destinations in Himachal Pradesh perfect for adventure seekers.',
      region: 'North',
    },
    {
      id: 3,
      title: 'Budget Travel Tips for Solo Travelers in India',
      category: 'Travel Tips',
      date: 'Jan 10, 2025',
      image: '🎒',
      description: 'Expert tips on traveling solo across India on a tight budget without compromising on experience.',
      region: 'All',
    },
    {
      id: 4,
      title: 'Kerala Houseboat Season Peak: Book Your Stay',
      category: 'Travel Updates',
      date: 'Jan 8, 2025',
      image: '🚤',
      description: 'Peak season for Kerala houseboats is here with best weather conditions throughout January.',
      region: 'South',
    },
    {
      id: 5,
      title: 'Rajasthan Heritage Trail: A Complete Guide',
      category: 'Destinations',
      date: 'Jan 5, 2025',
      image: '🏰',
      description: 'Complete guide to exploring Rajasthan\'s rich heritage including forts, palaces, and cultural sites.',
      region: 'West',
    },
    {
      id: 6,
      title: 'New Luxury Resorts Opening in Goa',
      category: 'Accommodation',
      date: 'Jan 2, 2025',
      image: '🏨',
      description: 'Five new luxury resorts are opening in Goa this season with world-class amenities.',
      region: 'South',
    },
    {
      id: 7,
      title: 'Monsoon Travel: Best Places in Western Ghats',
      category: 'Travel Tips',
      date: 'Dec 28, 2024',
      image: '🌧️',
      description: 'Explore the lush green landscapes of Western Ghats during monsoon season.',
      region: 'South',
    },
    {
      id: 8,
      title: 'Adventure Sports in Northeast India',
      category: 'Destinations',
      date: 'Dec 25, 2024',
      image: '🪂',
      description: 'Thrilling adventure sports opportunities in the scenic Northeast region.',
      region: 'North',
    },
    {
      id: 9,
      title: 'Best Street Food Markets in Delhi',
      category: 'Food & Culture',
      date: 'Dec 20, 2024',
      image: '🍲',
      description: 'Guide to Delhi\'s most vibrant street food markets and must-try delicacies.',
      region: 'North',
    },
  ];

  const categories = ['All', 'Travel Updates', 'Destinations', 'Travel Tips', 'Accommodation', 'Food & Culture'];
  const regions = ['All', 'North', 'South', 'West', 'East'];

  const filteredNews = useMemo(() => {
    return allNews.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

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
              Travel{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                News & Updates
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Stay updated with the latest travel news, destination guides, and insider tips
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-lg backdrop-blur text-white placeholder-gray-400 focus:outline-none focus:border-amber-400/50 transition"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-gray-300 mb-4 font-semibold">Filter by Category:</p>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-lg border transition ${
                    selectedCategory === category
                      ? 'bg-amber-500 border-amber-500 text-black'
                      : 'bg-white/5 border-white/20 text-white hover:border-amber-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredNews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((news, idx) => (
                <motion.div
                  key={news.id}
                  className="group bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-xl overflow-hidden backdrop-blur hover:border-amber-400 transition-colors cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-5xl">{news.image}</div>
                      <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-xs text-amber-300">
                        {news.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-amber-400 transition">
                      {news.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{news.description}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                      <span className="text-gray-400 text-xs">{news.date}</span>
                      <span className="text-amber-400 text-xs font-semibold">{news.region}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-400 text-lg">No news articles found matching your search.</p>
            </motion.div>
          )}
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
            <h2 className="text-4xl font-bold mb-4">Ready to Plan Your Next Adventure?</h2>
            <p className="text-gray-300 mb-8">Use our AI-powered planner to create the perfect itinerary</p>
            <Link href="/plan">
              <motion.button
                className="px-12 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Planning →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
