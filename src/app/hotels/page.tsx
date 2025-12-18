'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Link from 'next/link';

export default function HotelsPage() {
  const [selectedCity, setSelectedCity] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');

  const popularCities = [
    'Delhi',
    'Mumbai',
    'Bangalore',
    'Pune',
    'Jaipur',
    'Agra',
    'Goa',
    'Hyderabad',
    'Kolkata',
    'Kochi',
  ];

  const hotelsByCity: { [key: string]: any[] } = {
    Delhi: [
      {
        id: 1,
        name: 'The Taj Hotel',
        location: 'New Delhi',
        price: 8500,
        rating: 4.8,
        amenities: ['WiFi', 'AC', 'Gym', 'Restaurant'],
        image: '🏨',
      },
      {
        id: 2,
        name: 'Radisson Blu',
        location: 'Dwarka',
        price: 6500,
        rating: 4.6,
        amenities: ['WiFi', 'Pool', 'Spa', 'Bar'],
        image: '🏨',
      },
      {
        id: 3,
        name: 'Hotel Golden Crown',
        location: 'Karol Bagh',
        price: 3500,
        rating: 4.3,
        amenities: ['WiFi', 'AC', 'TV'],
        image: '🏨',
      },
      {
        id: 4,
        name: 'Hilton Garden Inn',
        location: 'Aerocity',
        price: 7200,
        rating: 4.7,
        amenities: ['WiFi', 'Gym', 'Pool', 'Business Center'],
        image: '🏨',
      },
    ],
    Mumbai: [
      {
        id: 5,
        name: 'The Oberoi Mumbai',
        location: 'Nariman Point',
        price: 12000,
        rating: 4.9,
        amenities: ['WiFi', 'Pool', 'Spa', 'Multiple Restaurants'],
        image: '🏨',
      },
      {
        id: 6,
        name: 'Grand Hyatt',
        location: 'Bandra',
        price: 9500,
        rating: 4.7,
        amenities: ['WiFi', 'Gym', 'Pool', 'Sky Bar'],
        image: '🏨',
      },
      {
        id: 7,
        name: 'JW Marriott',
        location: 'Juhu',
        price: 8800,
        rating: 4.6,
        amenities: ['WiFi', 'Beach Access', 'Spa', 'Restaurant'],
        image: '🏨',
      },
    ],
    Bangalore: [
      {
        id: 8,
        name: 'Leela Palace',
        location: 'Whitefield',
        price: 7500,
        rating: 4.8,
        amenities: ['WiFi', 'Gym', 'Pool', 'Fine Dining'],
        image: '🏨',
      },
      {
        id: 9,
        name: 'ITC Gardenia',
        location: 'MG Road',
        price: 6800,
        rating: 4.6,
        amenities: ['WiFi', 'Spa', 'Restaurant', 'Bar'],
        image: '🏨',
      },
      {
        id: 10,
        name: 'The Chancery',
        location: 'Indiranagar',
        price: 4500,
        rating: 4.4,
        amenities: ['WiFi', 'AC', 'Garden'],
        image: '🏨',
      },
    ],
    Jaipur: [
      {
        id: 11,
        name: 'Rambagh Palace',
        location: 'City Center',
        price: 10000,
        rating: 4.9,
        amenities: ['WiFi', 'Pool', 'Heritage Experience', 'Restaurant'],
        image: '🏨',
      },
      {
        id: 12,
        name: 'Samode Palace',
        location: 'Samode',
        price: 8500,
        rating: 4.8,
        amenities: ['WiFi', 'Pool', 'Traditional', 'Spa'],
        image: '🏨',
      },
      {
        id: 13,
        name: 'Hotel Pearl Palace',
        location: 'C-Scheme',
        price: 3000,
        rating: 4.2,
        amenities: ['WiFi', 'AC', 'Restaurant'],
        image: '🏨',
      },
    ],
    Goa: [
      {
        id: 14,
        name: 'Taj Holiday Village',
        location: 'Sinquerim',
        price: 9000,
        rating: 4.7,
        amenities: ['WiFi', 'Beach Access', 'Pool', 'Water Sports'],
        image: '🏨',
      },
      {
        id: 15,
        name: 'Hilton Goa Resort',
        location: 'Candolim',
        price: 7500,
        rating: 4.6,
        amenities: ['WiFi', 'Pool', 'Beach Club', 'Restaurant'],
        image: '🏨',
      },
      {
        id: 16,
        name: 'Resort Paradise',
        location: 'Calangute',
        price: 3500,
        rating: 4.3,
        amenities: ['WiFi', 'Pool', 'Beach Access'],
        image: '🏨',
      },
    ],
  };

  const filteredHotels = (selectedCity && hotelsByCity[selectedCity]) || [];

  const filterByPrice = (hotels: any[]) => {
    if (priceFilter === 'budget') return hotels.filter((h) => h.price <= 5000);
    if (priceFilter === 'mid') return hotels.filter((h) => h.price > 5000 && h.price <= 8000);
    if (priceFilter === 'luxury') return hotels.filter((h) => h.price > 8000);
    return hotels;
  };

  const filterByRating = (hotels: any[]) => {
    if (ratingFilter === '4.5') return hotels.filter((h) => h.rating >= 4.5);
    if (ratingFilter === '4.7') return hotels.filter((h) => h.rating >= 4.7);
    if (ratingFilter === '4.8') return hotels.filter((h) => h.rating >= 4.8);
    return hotels;
  };

  let displayedHotels = filterByPrice(filteredHotels);
  displayedHotels = filterByRating(displayedHotels);

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
              Find Your Perfect{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Hotel Stay
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover luxury hotels and budget-friendly accommodations across India
            </p>
          </motion.div>

          {/* City Selector */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gray-300 mb-4 font-semibold">Select City:</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {popularCities.map((city) => (
                <motion.button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-4 py-3 rounded-lg border transition font-semibold ${
                    selectedCity === city
                      ? 'bg-amber-500 border-amber-500 text-black'
                      : 'bg-white/5 border-white/20 text-white hover:border-amber-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {city}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Filters */}
          {selectedCity && (
            <motion.div
              className="mb-12 bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-300 mb-3 font-semibold">Price Range:</p>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'All Prices' },
                      { value: 'budget', label: '₹0 - ₹5,000' },
                      { value: 'mid', label: '₹5,000 - ₹8,000' },
                      { value: 'luxury', label: '₹8,000+' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="price"
                          value={option.value}
                          checked={priceFilter === option.value}
                          onChange={(e) => setPriceFilter(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-gray-300 mb-3 font-semibold">Rating:</p>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'All Ratings' },
                      { value: '4.5', label: '★ 4.5+' },
                      { value: '4.7', label: '★ 4.7+' },
                      { value: '4.8', label: '★ 4.8+' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={option.value}
                          checked={ratingFilter === option.value}
                          onChange={(e) => setRatingFilter(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-end">
                  <motion.button
                    onClick={() => {
                      setPriceFilter('all');
                      setRatingFilter('all');
                    }}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Reset Filters
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {selectedCity ? (
            displayedHotels.length > 0 ? (
              <div>
                <p className="text-gray-400 mb-6">
                  Showing {displayedHotels.length} hotel{displayedHotels.length !== 1 ? 's' : ''} in {selectedCity}
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedHotels.map((hotel, idx) => (
                    <motion.div
                      key={hotel.id}
                      className="group bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-xl overflow-hidden backdrop-blur hover:border-amber-400 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="p-6">
                        <div className="text-6xl mb-4">{hotel.image}</div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition">
                          {hotel.name}
                        </h3>
                        <p className="text-gray-400 text-sm mb-3">📍 {hotel.location}</p>

                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <span className="text-amber-400 font-bold">★ {hotel.rating}</span>
                            <span className="text-gray-400 text-sm">(250+ reviews)</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-gray-300 text-sm mb-2">Amenities:</p>
                          <div className="flex flex-wrap gap-2">
                            {hotel.amenities.slice(0, 3).map((amenity: string, i: number) => (
                              <span key={i} className="px-2 py-1 bg-amber-500/20 border border-amber-500/30 rounded text-xs">
                                {amenity}
                              </span>
                            ))}
                            {hotel.amenities.length > 3 && (
                              <span className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs">
                                +{hotel.amenities.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-gray-400 text-sm">From</p>
                            <p className="text-3xl font-bold text-amber-400">₹{hotel.price}</p>
                            <p className="text-gray-400 text-xs">per night</p>
                          </div>
                          <motion.button
                            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-shadow"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Book
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-gray-400 text-lg">No hotels found matching your filters.</p>
              </motion.div>
            )
          ) : (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-4">🏨</div>
              <p className="text-gray-400 text-xl">Select a city to view available hotels</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
