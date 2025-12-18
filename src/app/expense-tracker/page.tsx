'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';

export default function ExpenseTrackerPage() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [category, setCategory] = useState('Food');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(50000);

  const categories = ['Food', 'Transport', 'Hotel', 'Activities', 'Shopping', 'Other'];
  const categoryEmojis: { [key: string]: string } = {
    Food: '🍔',
    Transport: '🚗',
    Hotel: '🏨',
    Activities: '🎭',
    Shopping: '🛍️',
    Other: '📦',
  };

  const addExpense = () => {
    if (amount && !isNaN(Number(amount))) {
      setExpenses([
        ...expenses,
        {
          id: Date.now(),
          category,
          amount: Number(amount),
          description,
          date: new Date().toLocaleDateString(),
        },
      ]);
      setAmount('');
      setDescription('');
    }
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = budget - totalExpense;
  const percentageUsed = (totalExpense / budget) * 100;

  const categoryBreakdown = categories.map((cat) => ({
    category: cat,
    amount: expenses.filter((e) => e.category === cat).reduce((sum, e) => sum + e.amount, 0),
  }));

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
              Track Your Trip{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Expenses
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Keep track of every rupee spent and manage your travel budget smartly
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Add Expense Form */}
            <motion.div
              className="lg:col-span-1 bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-xl p-6 backdrop-blur"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-bold mb-6">Add Expense</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-amber-400/50"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-gray-900">
                        {categoryEmojis[cat]} {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Amount (₹)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400/50"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., Hotel stay"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400/50"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Budget (₹)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-amber-400/50"
                  />
                </div>

                <motion.button
                  onClick={addExpense}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add Expense
                </motion.button>
              </div>
            </motion.div>

            {/* Stats and Breakdown */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Budget Overview */}
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-xl p-6 backdrop-blur">
                <h3 className="text-xl font-bold mb-4">Budget Overview</h3>

                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Total Budget</span>
                      <span className="text-amber-400 font-bold">₹{budget.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(percentageUsed, 100)}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    <motion.div
                      className="bg-white/5 border border-white/10 rounded-lg p-4 text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <p className="text-gray-400 text-sm">Spent</p>
                      <p className="text-2xl font-bold text-orange-400">₹{totalExpense.toLocaleString()}</p>
                    </motion.div>

                    <motion.div
                      className="bg-white/5 border border-white/10 rounded-lg p-4 text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <p className="text-gray-400 text-sm">Remaining</p>
                      <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ₹{Math.abs(remaining).toLocaleString()}
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white/5 border border-white/10 rounded-lg p-4 text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <p className="text-gray-400 text-sm">Used</p>
                      <p className="text-2xl font-bold text-amber-400">{percentageUsed.toFixed(1)}%</p>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-xl p-6 backdrop-blur">
                <h3 className="text-xl font-bold mb-4">Breakdown by Category</h3>

                <div className="space-y-3">
                  {categoryBreakdown
                    .filter((cb) => cb.amount > 0)
                    .sort((a, b) => b.amount - a.amount)
                    .map((cb) => (
                      <div key={cb.category} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{categoryEmojis[cb.category]}</span>
                          <span className="font-semibold">{cb.category}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-amber-400 font-bold">₹{cb.amount.toLocaleString()}</p>
                          <p className="text-gray-400 text-sm">{((cb.amount / totalExpense) * 100).toFixed(1)}%</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Expenses List */}
          <motion.div
            className="mt-8 bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-xl p-6 backdrop-blur"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6">All Expenses ({expenses.length})</h2>

            {expenses.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {[...expenses].reverse().map((expense) => (
                  <motion.div
                    key={expense.id}
                    className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:border-amber-400 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-3xl">{categoryEmojis[expense.category]}</span>
                      <div className="flex-1">
                        <p className="font-semibold">{expense.description || expense.category}</p>
                        <p className="text-gray-400 text-sm">{expense.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-amber-400 font-bold text-lg">₹{expense.amount.toLocaleString()}</p>
                      <motion.button
                        onClick={() => deleteExpense(expense.id)}
                        className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded hover:bg-red-500/30 transition text-red-400"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        ✕
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-gray-400 text-lg">No expenses tracked yet. Add one to get started!</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
