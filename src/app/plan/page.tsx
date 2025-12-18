'use client';

import { useState } from 'react';
import PlannerForm from '@/components/PlannerForm';
import ItineraryDisplay from '@/components/ItineraryDisplay';
import Header from '@/components/Header';
import { motion } from 'framer-motion';

export default function PlanPage() {
  const [itinerary, setItinerary] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateItinerary = async (formData: any) => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        setItinerary(data.itinerary);
      } else {
        alert(data.error || 'Failed to generate itinerary');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate itinerary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Header />
      
      {/* Hero Section */}
      <motion.section
        className="relative z-10 max-w-7xl mx-auto px-6 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Plan Your{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Perfect Journey
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Enter your details below and let our AI create your ideal itinerary with nearby attractions within 100km
          </p>
        </div>

        <motion.div
          className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-2xl p-8 backdrop-blur-xl"
          whileHover={{ borderColor: '#fbbf24' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className={itinerary ? 'lg:col-span-1' : 'lg:col-span-3 max-w-3xl mx-auto w-full'}>
              <PlannerForm
                onSubmit={handleGenerateItinerary}
                loading={loading}
              />
            </div>
            {itinerary && (
              <div className="lg:col-span-2">
                <ItineraryDisplay itinerary={itinerary} />
              </div>
            )}
          </div>
        </motion.div>
      </motion.section>
    </main>
  );
}
