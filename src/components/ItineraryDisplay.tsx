'use client';

import { MapPin, Clock, IndianRupee, TrendingUp, Navigation, Hotel, Utensils, Ticket, AlertTriangle, Plane, Train, Bus, Star, Calendar, Compass } from 'lucide-react';
import dynamic from 'next/dynamic';
import { motion as Motion } from 'framer-motion';

const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

interface ItineraryDisplayProps {
  itinerary: any;
}

export default function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
  if (!itinerary) return null;

  const {
    title,
    days,
    totalCost = 0,
    costBreakdown = {},
    totalDistance = 0,
    averageScore = 0,
    origin,
    transport,
    tripMetadata,
  } = itinerary;

  return (
    <Motion.div className="space-y-6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      {/* Hero Header Card */}
      <Motion.div 
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden border border-amber-500/20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-400 to-orange-600" />
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                {title}
              </h2>
              <p className="text-gray-300 flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-amber-400" />
                Starting from {origin?.name}, {origin?.district}
              </p>
            </div>
            <Motion.div 
              className="text-6xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              ✈️
            </Motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <StatCard 
              icon={IndianRupee} 
              label="Total Budget" 
              value={`₹${(totalCost || 0).toLocaleString()}`}
              gradient="from-green-400 to-emerald-500"
            />
            <StatCard 
              icon={Navigation} 
              label="Total Distance" 
              value={`${totalDistance || 0} km`}
              gradient="from-blue-400 to-cyan-500"
            />
            <StatCard 
              icon={Star} 
              label="Match Score" 
              value={`${averageScore || 0}/100`}
              gradient="from-amber-400 to-orange-500"
            />
          </div>

          {tripMetadata && tripMetadata.pickupPoint && tripMetadata.dropoffPoint && (
            <Motion.div 
              className="mt-6 p-4 bg-white/10 backdrop-blur rounded-lg border border-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex flex-wrap gap-6 text-sm">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                  <span className="text-gray-300">Pickup:</span>
                  <span className="font-semibold">{tripMetadata.pickupPoint}</span>
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full" />
                  <span className="text-gray-300">Dropoff:</span>
                  <span className="font-semibold">{tripMetadata.dropoffPoint}</span>
                </span>
              </div>
            </Motion.div>
          )}
        </div>
      </Motion.div>
 
      {/* Budget alert */}
      {tripMetadata && tripMetadata.budgetSufficient === false && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
          <div>
            <p className="font-semibold text-orange-800">Budget shortfall: ₹{tripMetadata.budgetShortfall?.toLocaleString()} (Estimated: ₹{tripMetadata.estimatedTotal?.toLocaleString()} | Budget: ₹{(tripMetadata.budget)?.toLocaleString?.() || ''})</p>
            <p className="text-sm text-orange-700 mt-1">Suggestions: reduce days or people, or lower transport class.</p>
          </div>
        </div>
      )}

      {/* Budget Breakdown - Enhanced */}
      <Motion.div 
        className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <span className="text-3xl">💰</span>
            Budget Breakdown
          </h3>
          {transport && (
            <Motion.div 
              className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200"
              whileHover={{ scale: 1.05 }}
            >
              {transport.recommended?.type === 'FLIGHT' && <Plane className="h-4 w-4 text-blue-600" />} 
              {transport.recommended?.type === 'TRAIN' && <Train className="h-4 w-4 text-blue-600" />} 
              {transport.recommended?.type === 'BUS' && <Bus className="h-4 w-4 text-blue-600" />} 
              <span className="text-sm font-medium text-gray-700">{transport.from} → {transport.to}</span>
              <span className="font-bold text-blue-600">₹{transport.totalCost?.toLocaleString()}</span>
            </Motion.div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <BudgetItem
            icon={Navigation}
            label="Travel"
            amount={costBreakdown.travel}
            color="blue"
          />
          <BudgetItem
            icon={Hotel}
            label="Stay"
            amount={costBreakdown.stay}
            color="purple"
          />
          <BudgetItem
            icon={Utensils}
            label="Food"
            amount={costBreakdown.food}
            color="green"
          />
          <BudgetItem
            icon={Ticket}
            label="Tickets"
            amount={costBreakdown.tickets}
            color="orange"
          />
        </div>
        
        {/* Enhanced Progress Bar with Labels */}
        {totalCost > 0 && (
          <div className="space-y-2">
            <div className="h-6 bg-gray-100 rounded-full overflow-hidden flex shadow-inner">
              <Motion.div
                className="bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white"
                initial={{ width: 0 }}
                animate={{ width: `${((costBreakdown.travel || 0) / totalCost) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
                title="Travel"
              >
                {((costBreakdown.travel || 0) / totalCost * 100) > 10 && `${Math.round((costBreakdown.travel || 0) / totalCost * 100)}%`}
              </Motion.div>
              <Motion.div
                className="bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white"
                initial={{ width: 0 }}
                animate={{ width: `${((costBreakdown.stay || 0) / totalCost) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.3 }}
                title="Stay"
              >
                {((costBreakdown.stay || 0) / totalCost * 100) > 10 && `${Math.round((costBreakdown.stay || 0) / totalCost * 100)}%`}
              </Motion.div>
              <Motion.div
                className="bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-xs font-bold text-white"
                initial={{ width: 0 }}
                animate={{ width: `${((costBreakdown.food || 0) / totalCost) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.4 }}
                title="Food"
              >
                {((costBreakdown.food || 0) / totalCost * 100) > 10 && `${Math.round((costBreakdown.food || 0) / totalCost * 100)}%`}
              </Motion.div>
              <Motion.div
                className="bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-xs font-bold text-white"
                initial={{ width: 0 }}
                animate={{ width: `${((costBreakdown.tickets || 0) / totalCost) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.5 }}
                title="Tickets"
              >
                {((costBreakdown.tickets || 0) / totalCost * 100) > 10 && `${Math.round((costBreakdown.tickets || 0) / totalCost * 100)}%`}
              </Motion.div>
            </div>
          </div>
        )}
      </Motion.div>

      {/* Day-wise Itinerary */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">📅 Day-wise Plan</h3>
        {days.map((day: any, index: number) => (
          <Motion.div key={index} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * index }}>
            <DayCard day={day} />
          </Motion.div>
        ))}
      </div>

      {/* Map View */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">🗺️ Route Map</h3>
        <div className="h-96 rounded-lg overflow-hidden">
          <MapComponent days={days} origin={origin} />
        </div>
      </div>
    </Motion.div>
  );
}

function StatCard({ icon: Icon, label, value, gradient }: any) {
  return (
    <Motion.div 
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all"
      whileHover={{ scale: 1.05, y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 shadow-lg`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="text-sm text-gray-300 mb-1">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </Motion.div>
  );
}

function BudgetItem({ icon: Icon, label, amount, color }: any) {
  const colorClasses: any = {
    blue: { bg: 'from-blue-500 to-blue-600', text: 'text-blue-700', light: 'bg-blue-50' },
    purple: { bg: 'from-purple-500 to-purple-600', text: 'text-purple-700', light: 'bg-purple-50' },
    green: { bg: 'from-green-500 to-green-600', text: 'text-green-700', light: 'bg-green-50' },
    orange: { bg: 'from-orange-500 to-orange-600', text: 'text-orange-700', light: 'bg-orange-50' },
  };

  const styles = colorClasses[color];

  return (
    <Motion.div 
      className={`rounded-xl p-5 ${styles.light} border border-${color}-200 hover:shadow-lg transition-all`}
      whileHover={{ scale: 1.05, y: -2 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${styles.bg} flex items-center justify-center mb-3 shadow-md`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className={`text-xs font-semibold uppercase tracking-wide ${styles.text} mb-1`}>{label}</div>
      <div className="text-2xl font-bold text-gray-900">₹{amount.toLocaleString()}</div>
    </Motion.div>
  );
}

function DayCard({ day }: any) {
  return (
    <Motion.div 
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition-all overflow-hidden relative"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Day Header Bar */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
            {day.dayNumber}
          </div>
          <div>
            <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Day {day.dayNumber}
            </h4>
            {day.date && (
              <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4" />
                {new Date(day.date).toLocaleDateString('en-IN', {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            ₹{(day.totalCost || 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 flex items-center gap-2 justify-end mt-2 bg-gray-100 px-3 py-1 rounded-full">
            <Clock className="h-4 w-4" />
            {Math.round(day.travelTime / 60)}h travel
          </div>
        </div>
      </div>

      {/* Places Timeline */}
      <div className="space-y-4 relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-300 via-orange-300 to-red-300" />
        
        {day.places.map((place: any, idx: number) => (
          <PlaceCard key={idx} place={place} index={idx} />
        ))}
      </div>

      {day.notes && (
        <Motion.div 
          className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 text-sm text-blue-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="font-semibold">📝 Note:</span> {day.notes}
        </Motion.div>
      )}
    </Motion.div>
  );
}

function PlaceCard({ place, index }: any) {
  const getTypeBadge = (type: string) => {
    const badges: any = {
      TEMPLE: { emoji: '🛕', gradient: 'from-orange-400 to-red-500', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
      WATERFALL: { emoji: '💧', gradient: 'from-blue-400 to-cyan-500', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      HILL_STATION: { emoji: '⛰️', gradient: 'from-green-400 to-emerald-500', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
      MALL: { emoji: '🏬', gradient: 'from-purple-400 to-pink-500', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
      PARK: { emoji: '🌳', gradient: 'from-green-400 to-lime-500', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
      LAKE: { emoji: '🏞️', gradient: 'from-cyan-400 to-blue-500', bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
      VIEWPOINT: { emoji: '👁️', gradient: 'from-indigo-400 to-purple-500', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
      GARDEN: { emoji: '🌺', gradient: 'from-pink-400 to-rose-500', bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
    };
    return badges[type] || { emoji: '📍', gradient: 'from-gray-400 to-gray-500', bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
  };

  const badge = getTypeBadge(place.type);

  return (
    <Motion.div 
      className="flex items-start gap-5 p-5 bg-white rounded-xl hover:shadow-lg transition-all border border-gray-200 relative z-10"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      whileHover={{ x: 5 }}
    >
      {/* Number Badge with Gradient */}
      <div className="flex-shrink-0 relative">
        <div className={`w-12 h-12 bg-gradient-to-br ${badge.gradient} text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10 relative`}>
          {index + 1}
        </div>
        {/* Connection dot */}
        <div className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-amber-400 rounded-full" />
      </div>

      <div className="flex-grow">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex-grow">
            <h5 className="font-bold text-gray-900 text-lg flex items-center gap-2 flex-wrap">
              {place.name}
              {place.isHiddenGem && (
                <span className="text-xs bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full font-semibold shadow">
                  🌿 Hidden Gem
                </span>
              )}
            </h5>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{place.description}</p>
          </div>
          <div className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap ${badge.bg} ${badge.text} border ${badge.border} shadow-sm flex items-center gap-1.5`}>
            <span className="text-base">{badge.emoji}</span>
            {place.type.replace('_', ' ')}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center gap-4 mt-3 flex-wrap">
          <Motion.span 
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
            whileHover={{ scale: 1.05 }}
          >
            <Navigation className="h-4 w-4" />
            {(place.distanceKm || 0).toFixed(0)} km
          </Motion.span>
          <Motion.span 
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium"
            whileHover={{ scale: 1.05 }}
          >
            <Clock className="h-4 w-4" />
            {place.minHoursNeeded || 2}h
          </Motion.span>
          {(place.entryFee || 0) > 0 && (
            <Motion.span 
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium"
              whileHover={{ scale: 1.05 }}
            >
              <Ticket className="h-4 w-4" />
              ₹{place.entryFee}
            </Motion.span>
          )}
          <span className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm font-bold">
            <Star className="h-4 w-4 fill-amber-500" />
            {place.score || 0}/100
          </span>
        </div>
      </div>
    </Motion.div>
  );
}
