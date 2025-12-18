 'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Calendar, Users, IndianRupee, 
  Mountain, Heart, Camera, Coffee, Leaf,
  Sparkles, Zap, Plane, Star, Send
} from 'lucide-react';

interface PlannerFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
  compact?: boolean;
}

export default function PlannerForm({ onSubmit, loading, compact = false }: PlannerFormProps) {
  const [formData, setFormData] = useState({
    originCity: '',
    budget: 25000,
    days: 4,
    startDate: '',
    numPeople: 2,
    tripType: 'COUPLE',
    personalities: [] as string[],
    showHiddenGems: false,
    pickupPoint: '',
    dropoffPoint: '',
    adults: 2,
    children: 0,
    useAi: true, // AI enabled by default
  });

  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Auto-fill pickup/dropoff if empty
    const finalData = {
      ...formData,
      pickupPoint: formData.pickupPoint || formData.originCity,
      dropoffPoint: formData.dropoffPoint || formData.originCity,
    };
    onSubmit(finalData);
  };

  const handlePersonalityToggle = (personality: string) => {
    const current = formData.personalities;
    if (current.includes(personality)) {
      setFormData({
        ...formData,
        personalities: current.filter((p) => p !== personality),
      });
    } else {
      setFormData({
        ...formData,
        personalities: [...current, personality],
      });
    }
  };

  const tripTypes = [
    { value: 'FAMILY', label: 'Family', emoji: '👨‍👩‍👧‍👦', color: 'from-pink-500 to-rose-500' },
    { value: 'BOYS', label: 'Friends', emoji: '🤝', color: 'from-blue-500 to-cyan-500' },
    { value: 'COUPLE', label: 'Couple', emoji: '💑', color: 'from-purple-500 to-pink-500' },
    { value: 'SOLO', label: 'Solo', emoji: '🎒', color: 'from-green-500 to-emerald-500' },
  ];

  const personalities = [
    { value: 'ADVENTURE', label: 'Adventure', icon: Mountain, color: 'orange' },
    { value: 'SPIRITUAL', label: 'Spiritual', icon: Heart, color: 'purple' },
    { value: 'INSTAGRAM', label: 'Instagram', icon: Camera, color: 'pink' },
    { value: 'FOODIE', label: 'Foodie', icon: Coffee, color: 'amber' },
    { value: 'NATURE', label: 'Nature', icon: Leaf, color: 'green' },
  ];

  return (
    <motion.div 
      className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      </div>

      {/* Header with AI Badge */}
      <div className="relative p-6 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-400" />
            Smart Trip Planner
          </h2>
          {formData.useAi && (
            <motion.div 
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="h-3.5 w-3.5 text-purple-400" />
              <span className="text-xs font-semibold text-purple-300">AI Powered</span>
            </motion.div>
          )}
        </div>
        <p className="text-sm text-slate-400">Create your perfect journey with intelligent planning</p>
      </div>

      <form onSubmit={handleSubmit} className="relative p-6 space-y-6">
        {/* Destination */}
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
            <MapPin className="h-4 w-4 text-blue-400" />
            Destination
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.originCity}
              onChange={(e) => setFormData({ ...formData, originCity: e.target.value })}
              className="w-full px-4 py-3.5 bg-slate-800/50 border-2 border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white font-medium placeholder:text-slate-500 transition-all"
              placeholder="e.g., Goa, Kerala, Jaipur..."
              required
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Star className="h-5 w-5 text-slate-600" />
            </div>
          </div>
        </div>

        {/* Budget & Days Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Budget */}
          <div className="col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
              <IndianRupee className="h-4 w-4 text-green-400" />
              Budget: <span className="text-green-400">₹{formData.budget.toLocaleString()}</span>
            </label>
            <div className="relative">
              <input
                type="range"
                min="5000"
                max="100000"
                step="5000"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                className="w-full h-3 bg-slate-700 rounded-full appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(to right, rgb(34 197 94) 0%, rgb(34 197 94) ${((formData.budget - 5000) / 95000) * 100}%, rgb(51 65 85) ${((formData.budget - 5000) / 95000) * 100}%, rgb(51 65 85) 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>₹5K</span>
                <span>₹1L</span>
              </div>
            </div>
          </div>

          {/* Days */}
          <div className="col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
              <Calendar className="h-4 w-4 text-purple-400" />
              Duration: <span className="text-purple-400">{formData.days} {formData.days === 1 ? 'Day' : 'Days'}</span>
            </label>
            <div className="relative">
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={formData.days}
                onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
                className="w-full h-3 bg-slate-700 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgb(168 85 247) 0%, rgb(168 85 247) ${((formData.days - 1) / 14) * 100}%, rgb(51 65 85) ${((formData.days - 1) / 14) * 100}%, rgb(51 65 85) 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>1 day</span>
                <span>15 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Type Cards */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
            <Users className="h-4 w-4 text-pink-400" />
            Trip Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {tripTypes.map((type) => (
              <motion.button
                key={type.value}
                type="button"
                onClick={() => {
                  let updates: any = { tripType: type.value };
                  if (type.value === 'FAMILY') {
                    updates = { ...updates, adults: 2, children: 1, numPeople: 3 };
                  } else if (type.value === 'COUPLE') {
                    updates = { ...updates, numPeople: 2 };
                  } else if (type.value === 'SOLO') {
                    updates = { ...updates, numPeople: 1 };
                  } else if (type.value === 'BOYS') {
                    updates = { ...updates, numPeople: 4 };
                  }
                  setFormData({ ...formData, ...updates });
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`relative overflow-hidden p-4 rounded-xl font-bold transition-all border-2 ${
                  formData.tripType === type.value
                    ? `bg-gradient-to-br ${type.color} text-white border-transparent shadow-lg`
                    : 'bg-slate-800/50 text-slate-300 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-2xl">{type.emoji}</span>
                  <span className="text-sm">{type.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Travelers Count */}
        <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
            <Users className="h-4 w-4 text-blue-400" />
            Travelers
          </label>
          {formData.tripType === 'FAMILY' ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Adults</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.adults}
                    onChange={(e) => {
                      const adults = parseInt(e.target.value) || 1;
                      setFormData({ 
                        ...formData, 
                        adults,
                        numPeople: adults + formData.children
                      });
                    }}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-center font-semibold focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Children</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.children}
                    onChange={(e) => {
                      const children = parseInt(e.target.value) || 0;
                      setFormData({ 
                        ...formData, 
                        children,
                        numPeople: formData.adults + children
                      });
                    }}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-center font-semibold focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <p className="text-xs text-slate-400 text-center">Total: <span className="font-semibold text-blue-400">{formData.numPeople}</span> people</p>
            </div>
          ) : (
            <input
              type="number"
              min="1"
              max="20"
              value={formData.numPeople}
              onChange={(e) => setFormData({ ...formData, numPeople: parseInt(e.target.value) || 1 })}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-center text-lg font-bold focus:ring-2 focus:ring-purple-500"
            />
          )}
        </div>

        {/* Start Date */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
            <Calendar className="h-4 w-4 text-orange-400" />
            Travel Date <span className="text-xs font-normal text-slate-500">(Optional)</span>
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white font-medium"
          />
        </div>

        {/* Travel Preferences */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
            <Star className="h-4 w-4 text-yellow-400" />
            Travel Vibes <span className="text-xs font-normal text-slate-500">(Pick your favorites)</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {personalities.map((p) => {
              const Icon = p.icon;
              const isSelected = formData.personalities.includes(p.value);
              return (
                <motion.button
                  key={p.value}
                  type="button"
                  onClick={() => handlePersonalityToggle(p.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg font-medium transition-all text-sm ${
                    isSelected
                      ? `bg-${p.color}-500/20 text-${p.color}-300 border-2 border-${p.color}-500/50 shadow-md`
                      : 'bg-slate-800/30 text-slate-400 border-2 border-slate-700/30 hover:border-slate-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{p.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Transport Points (Collapsible) */}
        <details className="group bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden">
          <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800/50 transition-colors">
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-semibold text-slate-300">Transport Details</span>
              <span className="text-xs text-slate-500">(Optional)</span>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-500 group-open:rotate-180 transition-transform" />
          </summary>
          <div className="p-4 pt-0 space-y-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Pickup City</label>
              <input
                type="text"
                value={formData.pickupPoint}
                onChange={(e) => setFormData({ ...formData, pickupPoint: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-cyan-500"
                placeholder="Leave empty for same as destination"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Dropoff City</label>
              <input
                type="text"
                value={formData.dropoffPoint}
                onChange={(e) => setFormData({ ...formData, dropoffPoint: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-cyan-500"
                placeholder="Leave empty for same as destination"
              />
            </div>
            <p className="text-xs text-cyan-400/70 flex items-start gap-1">
              <span>✈️</span>
              <span>We'll calculate flight/train costs if different cities</span>
            </p>
          </div>
        </details>

        {/* AI & Hidden Gems Toggles */}
        <div className="space-y-3">
          {/* AI Toggle */}
          <motion.div 
            className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
              formData.useAi 
                ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30' 
                : 'bg-slate-800/30 border-slate-700/50'
            }`}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${formData.useAi ? 'bg-purple-500/20' : 'bg-slate-700/50'}`}>
                <Zap className={`h-5 w-5 ${formData.useAi ? 'text-purple-400' : 'text-slate-500'}`} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-200">AI Smart Planning</div>
                <div className="text-xs text-slate-400">Intelligent day-wise arrangement</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, useAi: !formData.useAi })}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                formData.useAi ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-slate-600'
              }`}
            >
              <motion.span
                className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg"
                animate={{ x: formData.useAi ? 26 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </motion.div>

          {/* Hidden Gems Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border-2 border-slate-700/50">
            <div className="flex items-center gap-3">
              <Sparkles className={`h-5 w-5 ${formData.showHiddenGems ? 'text-green-400' : 'text-slate-500'}`} />
              <span className="text-sm font-semibold text-slate-300">Hidden Gems</span>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, showHiddenGems: !formData.showHiddenGems })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.showHiddenGems ? 'bg-green-500' : 'bg-slate-600'
              }`}
            >
              <motion.span
                className="inline-block h-4 w-4 transform rounded-full bg-white"
                animate={{ x: formData.showHiddenGems ? 24 : 4 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className={`relative w-full py-4 px-6 rounded-xl font-bold text-lg transition-all overflow-hidden ${
            loading 
              ? 'bg-slate-700 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:shadow-2xl hover:shadow-purple-500/50'
          }`}
        >
          {/* Animated background */}
          {!loading && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 opacity-0"
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />
          )}
          
          <span className="relative flex items-center justify-center gap-3 text-white">
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="h-6 w-6" />
                </motion.div>
                <span>Crafting Your Journey...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span>Generate {formData.useAi ? 'AI ' : ''}Itinerary</span>
                <Sparkles className="h-5 w-5" />
              </>
            )}
          </span>
        </motion.button>

        {/* Info Footer */}
        <div className="text-center text-xs text-slate-500 pt-2">
          {formData.useAi ? (
            <span className="flex items-center justify-center gap-1">
              <Zap className="h-3 w-3 text-purple-400" />
              Powered by AI • Smart planning enabled
            </span>
          ) : (
            <span>Fast algorithmic planning</span>
          )}
        </div>
      </form>

      {/* Decorative Elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl" />
    </motion.div>
  );
}

// Helper component for ChevronDown
function ChevronDown({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
