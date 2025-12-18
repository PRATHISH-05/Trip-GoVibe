'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Link from 'next/link';

export default function RestaurantsPage() {
  const [selectedCity, setSelectedCity] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  const popularCities = ['Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Jaipur', 'Goa', 'Hyderabad', 'Kolkata', 'Kochi'];

  const cuisines = ['All', 'North Indian', 'South Indian', 'Continental', 'Chinese', 'Italian', 'Fast Food', 'Street Food'];

  const restaurantsByCity: { [key: string]: any[] } = {
    Delhi: [
      {
        id: 1,
        name: 'Bukhara',
        cuisine: 'North Indian',
        rating: 4.8,
        avgCost: 1500,
        reviews: 2150,
        image: '🍛',
        speciality: 'Tandoori Chicken',
      },
      {
        id: 2,
        name: 'Paranthe Wali Gali',
        cuisine: 'North Indian',
        rating: 4.6,
        avgCost: 300,
        reviews: 1850,
        image: '🥙',
        speciality: 'Parathas',
      },
      {
        id: 3,
        name: 'Dum Pukht',
        cuisine: 'North Indian',
        rating: 4.7,
        avgCost: 1800,
        reviews: 980,
        image: '🍖',
        speciality: 'Biryani',
      },
      {
        id: 4,
        name: 'Cafe Coffee Day',
        cuisine: 'Fast Food',
        rating: 4.2,
        avgCost: 250,
        reviews: 3200,
        image: '☕',
        speciality: 'Coffee & Snacks',
      },
      {
        id: 5,
        name: 'Haldiram',
        cuisine: 'North Indian',
        rating: 4.5,
        avgCost: 400,
        reviews: 2100,
        image: '🥘',
        speciality: 'Chole Bhature',
      },
    ],
    Mumbai: [
      {
        id: 6,
        name: 'Mahesh Lunch Home',
        cuisine: 'Continental',
        rating: 4.7,
        avgCost: 1200,
        reviews: 1650,
        image: '🦞',
        speciality: 'Seafood',
      },
      {
        id: 7,
        name: 'Trishna',
        cuisine: 'Continental',
        rating: 4.6,
        avgCost: 1400,
        reviews: 1250,
        image: '🍤',
        speciality: 'Crab',
      },
      {
        id: 8,
        name: 'Vada Pav Junction',
        cuisine: 'Street Food',
        rating: 4.4,
        avgCost: 50,
        reviews: 2980,
        image: '🥒',
        speciality: 'Vada Pav',
      },
      {
        id: 9,
        name: 'Sukh Chamdni',
        cuisine: 'North Indian',
        rating: 4.5,
        avgCost: 600,
        reviews: 1800,
        image: '🍖',
        speciality: 'Tandoori',
      },
    ],
    Bangalore: [
      {
        id: 10,
        name: 'Olive Beach',
        cuisine: 'Continental',
        rating: 4.8,
        avgCost: 1600,
        reviews: 1400,
        image: '🍝',
        speciality: 'Italian',
      },
      {
        id: 11,
        name: 'Meghana Foods',
        cuisine: 'South Indian',
        rating: 4.7,
        avgCost: 500,
        reviews: 2200,
        image: '🍲',
        speciality: 'Biryani',
      },
      {
        id: 12,
        name: 'MTR',
        cuisine: 'South Indian',
        rating: 4.6,
        avgCost: 300,
        reviews: 2100,
        image: '🥣',
        speciality: 'Idli Dosa',
      },
      {
        id: 13,
        name: 'The Shrine',
        cuisine: 'Chinese',
        rating: 4.5,
        avgCost: 800,
        reviews: 1600,
        image: '🥡',
        speciality: 'Chinese',
      },
    ],
    Goa: [
      {
        id: 14,
        name: 'Thalassa',
        cuisine: 'Continental',
        rating: 4.7,
        avgCost: 1400,
        reviews: 980,
        image: '🦐',
        speciality: 'Greek Seafood',
      },
      {
        id: 15,
        name: 'Pousada by the Beach',
        cuisine: 'Continental',
        rating: 4.6,
        avgCost: 1200,
        reviews: 1100,
        image: '🍤',
        speciality: 'Portuguese',
      },
      {
        id: 16,
        name: 'Beachside Shack',
        cuisine: 'Street Food',
        rating: 4.3,
        avgCost: 400,
        reviews: 1850,
        image: '🐟',
        speciality: 'Grilled Fish',
      },
    ],
    Jaipur: [
      {
        id: 17,
        name: 'Niros',
        cuisine: 'North Indian',
        rating: 4.6,
        avgCost: 700,
        reviews: 1950,
        image: '🍖',
        speciality: 'Gatte ki Sabzi',
      },
      {
        id: 18,
        name: 'LMB',
        cuisine: 'North Indian',
        rating: 4.5,
        avgCost: 600,
        reviews: 1700,
        image: '🥘',
        speciality: 'Rajasthani',
      },
    ],
  };

  const filteredRestaurants = (selectedCity && restaurantsByCity[selectedCity]) || [];

  const filterByCuisine = (restaurants: any[]) => {
    if (cuisineFilter === 'all') return restaurants;
    return restaurants.filter((r) => r.cuisine === cuisineFilter);
  };

  const filterByPrice = (restaurants: any[]) => {
    if (priceFilter === 'budget') return restaurants.filter((r) => r.avgCost <= 400);
    if (priceFilter === 'mid') return restaurants.filter((r) => r.avgCost > 400 && r.avgCost <= 1000);
    if (priceFilter === 'expensive') return restaurants.filter((r) => r.avgCost > 1000);
    return restaurants;
  };

  let displayedRestaurants = filterByCuisine(filteredRestaurants);
  displayedRestaurants = filterByPrice(displayedRestaurants);

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
              Discover Amazing{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Restaurants
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Find the best dining experiences across Indian cities
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
                  <p className="text-gray-300 mb-3 font-semibold">Cuisine:</p>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {cuisines.map((cuisine) => (
                      <label key={cuisine} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="cuisine"
                          value={cuisine.toLowerCase()}
                          checked={
                            (cuisine === 'All' && cuisineFilter === 'all') ||
                            cuisineFilter === cuisine
                          }
                          onChange={(e) =>
                            setCuisineFilter(e.target.value === 'all' ? 'all' : e.target.value)
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{cuisine}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-gray-300 mb-3 font-semibold">Budget:</p>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'All Budgets' },
                      { value: 'budget', label: '₹0 - ₹400 (Budget)' },
                      { value: 'mid', label: '₹400 - ₹1000 (Mid-range)' },
                      { value: 'expensive', label: '₹1000+ (Upscale)' },
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

                <div className="flex items-end">
                  <motion.button
                    onClick={() => {
                      setCuisineFilter('all');
                      setPriceFilter('all');
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

      {/* Restaurants Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {selectedCity ? (
            displayedRestaurants.length > 0 ? (
              <div>
                <p className="text-gray-400 mb-6">
                  Showing {displayedRestaurants.length} restaurant
                  {displayedRestaurants.length !== 1 ? 's' : ''} in {selectedCity}
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedRestaurants.map((restaurant, idx) => (
                    <motion.div
                      key={restaurant.id}
                      className="group bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-xl overflow-hidden backdrop-blur hover:border-amber-400 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="p-6">
                        <div className="text-6xl mb-4">{restaurant.image}</div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition">
                          {restaurant.name}
                        </h3>
                        <p className="text-gray-400 text-sm mb-3">{restaurant.cuisine}</p>

                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <span className="text-amber-400 font-bold">★ {restaurant.rating}</span>
                            <span className="text-gray-400 text-sm">({restaurant.reviews})</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-gray-300 text-sm mb-2">Speciality:</p>
                          <p className="text-amber-400 font-semibold text-sm">{restaurant.speciality}</p>
                        </div>

                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-gray-400 text-sm">Avg Cost</p>
                            <p className="text-2xl font-bold text-amber-400">₹{restaurant.avgCost}</p>
                            <p className="text-gray-400 text-xs">per person</p>
                          </div>
                          <motion.button
                            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-shadow"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Reserve
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
                <p className="text-gray-400 text-lg">No restaurants found matching your filters.</p>
              </motion.div>
            )
          ) : (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-4">🍽️</div>
              <p className="text-gray-400 text-xl">Select a city to view available restaurants</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
