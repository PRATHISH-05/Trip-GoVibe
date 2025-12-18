'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';

interface Friend {
  id: number;
  name: string;
}

interface SharedExpense {
  id: number;
  category: string;
  amount: number;
  description: string;
  paidBy: string;
  splitWith: string[];
  date: string;
}

export default function FriendSplitPage() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [newFriendName, setNewFriendName] = useState('');
  const [sharedExpenses, setSharedExpenses] = useState<SharedExpense[]>([]);
  const [category, setCategory] = useState('Food');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [splitWith, setSplitWith] = useState<string[]>([]);

  const categories = ['Food', 'Transport', 'Hotel', 'Activities', 'Shopping', 'Other'];
  const categoryEmojis: { [key: string]: string } = {
    Food: '🍔',
    Transport: '🚗',
    Hotel: '🏨',
    Activities: '🎭',
    Shopping: '🛍️',
    Other: '📦',
  };

  const addFriend = () => {
    if (newFriendName.trim()) {
      setFriends([...friends, { id: Date.now(), name: newFriendName }]);
      setNewFriendName('');
    }
  };

  const removeFriend = (id: number) => {
    setFriends(friends.filter((f) => f.id !== id));
  };

  const toggleSplitWith = (name: string) => {
    if (splitWith.includes(name)) {
      setSplitWith(splitWith.filter((s) => s !== name));
    } else {
      setSplitWith([...splitWith, name]);
    }
  };

  const addSharedExpense = () => {
    if (amount && paidBy && splitWith.length > 0 && !isNaN(Number(amount))) {
      setSharedExpenses([
        ...sharedExpenses,
        {
          id: Date.now(),
          category,
          amount: Number(amount),
          description,
          paidBy,
          splitWith,
          date: new Date().toLocaleDateString(),
        },
      ]);
      setAmount('');
      setDescription('');
      setPaidBy('');
      setSplitWith([]);
    }
  };

  const deleteExpense = (id: number) => {
    setSharedExpenses(sharedExpenses.filter((e) => e.id !== id));
  };

  // Calculate settlements
  const calculateSettlements = () => {
    const balances: { [key: string]: number } = {};

    friends.forEach((f) => {
      balances[f.name] = 0;
    });

    sharedExpenses.forEach((expense) => {
      const perPersonCost = expense.amount / (expense.splitWith.length + 1);

      // Person who paid gets credit
      balances[expense.paidBy] += expense.amount - perPersonCost;

      // Others owe
      expense.splitWith.forEach((person) => {
        balances[person] -= perPersonCost;
      });
    });

    // Calculate who owes whom
    const settlements: Array<{ from: string; to: string; amount: number }> = [];
    const sorted = Object.entries(balances).sort((a, b) => a[1] - b[1]);

    let i = 0;
    let j = sorted.length - 1;

    while (i < j) {
      const [debtor, debtAmount] = sorted[i];
      const [creditor, creditAmount] = sorted[j];

      if (Math.abs(debtAmount) < 0.01) {
        i++;
        continue;
      }

      if (Math.abs(creditAmount) < 0.01) {
        j--;
        continue;
      }

      const settleAmount = Math.min(Math.abs(debtAmount), creditAmount);

      settlements.push({
        from: debtor,
        to: creditor,
        amount: settleAmount,
      });

      sorted[i][1] += settleAmount;
      sorted[j][1] -= settleAmount;
    }

    return settlements;
  };

  const settlements = calculateSettlements();
  const totalShared = sharedExpenses.reduce((sum, e) => sum + e.amount, 0);

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
              Split Expenses{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                with Friends
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Track shared expenses and settle debts effortlessly
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Friends Management */}
            <motion.div
              className="lg:col-span-1 bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-xl p-6 backdrop-blur"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4">Friends</h2>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFriendName}
                    onChange={(e) => setNewFriendName(e.target.value)}
                    placeholder="Add friend name"
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400/50"
                  />
                  <motion.button
                    onClick={addFriend}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    +
                  </motion.button>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {friends.length > 0 ? (
                    friends.map((friend) => (
                      <motion.div
                        key={friend.id}
                        className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <span className="font-semibold">👤 {friend.name}</span>
                        <motion.button
                          onClick={() => removeFriend(friend.id)}
                          className="text-red-400 hover:text-red-300"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          ✕
                        </motion.button>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm text-center py-4">No friends added yet</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Add Shared Expense */}
            <motion.div
              className="lg:col-span-2 bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-xl p-6 backdrop-blur"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-4">Add Shared Expense</h2>

              <div className="grid md:grid-cols-2 gap-4">
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
                    placeholder="e.g., Dinner at restaurant"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400/50"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Paid By</label>
                  <select
                    value={paidBy}
                    onChange={(e) => setPaidBy(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-amber-400/50"
                  >
                    <option value="" className="bg-gray-900">
                      Select friend
                    </option>
                    {friends.map((f) => (
                      <option key={f.id} value={f.name} className="bg-gray-900">
                        {f.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm text-gray-400 mb-2 block">Split With</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {friends
                      .filter((f) => f.name !== paidBy)
                      .map((f) => (
                        <motion.button
                          key={f.id}
                          onClick={() => toggleSplitWith(f.name)}
                          className={`px-3 py-2 rounded-lg border transition-colors ${
                            splitWith.includes(f.name)
                              ? 'bg-amber-500 border-amber-400'
                              : 'bg-white/5 border-white/20'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {f.name}
                        </motion.button>
                      ))}
                  </div>
                </div>

                <motion.button
                  onClick={addSharedExpense}
                  className="md:col-span-2 py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add Shared Expense
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Settlements */}
          {settlements.length > 0 && (
            <motion.div
              className="mt-8 bg-gradient-to-br from-gray-900/80 to-black/80 border border-green-500/20 rounded-xl p-6 backdrop-blur"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4">💰 Settlements</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {settlements.map((settlement, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-white/5 border border-green-500/30 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div>
                      <p className="font-semibold">{settlement.from}</p>
                      <p className="text-gray-400 text-sm">owes</p>
                      <p className="font-semibold text-green-400">{settlement.to}</p>
                    </div>
                    <p className="text-3xl font-bold text-green-400">₹{settlement.amount.toLocaleString()}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Shared Expenses List */}
          <motion.div
            className="mt-8 bg-gradient-to-br from-gray-900/80 to-black/80 border border-amber-500/20 rounded-xl p-6 backdrop-blur"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Shared Expenses ({sharedExpenses.length})</h2>
              {totalShared > 0 && (
                <p className="text-xl font-bold text-amber-400">Total: ₹{totalShared.toLocaleString()}</p>
              )}
            </div>

            {sharedExpenses.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {[...sharedExpenses].reverse().map((expense) => (
                  <motion.div
                    key={expense.id}
                    className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:border-amber-400 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-2xl">{categoryEmojis[expense.category]}</span>
                        <div>
                          <p className="font-semibold">{expense.description || expense.category}</p>
                          <p className="text-gray-400 text-sm">
                            {expense.paidBy} paid • Split with {expense.splitWith.join(', ')}
                          </p>
                        </div>
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
                <p className="text-gray-400 text-lg">No shared expenses yet. Add one to get started!</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
