'use client';

import { useState, useEffect } from 'react';

const predefinedApps = [
  'Netflix',
  'Spotify',
  'YouTube Premium',
  'HBO Max',
  'Apple Music',
  'Disney+',
  'Amazon Prime Video',
  'Altul',
];

const frequencyOptions = [
  { label: 'Lunar', value: 'monthly' },
  { label: 'Anual', value: 'yearly' },
];

function calculateEndDate(start: string, frequency: string): string {
  if (!start) return '';
  const date = new Date(start);
  if (frequency === 'monthly') date.setMonth(date.getMonth() + 1);
  if (frequency === 'yearly') date.setFullYear(date.getFullYear() + 1);
  return date.toISOString().split('T')[0];
}

export default function AddSubscription() {
  const [appName, setAppName] = useState(predefinedApps[0]);
  const [customAppName, setCustomAppName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [price, setPrice] = useState('');
  const [frequency, setFrequency] = useState('monthly');

  useEffect(() => {
    if (startDate && frequency) {
      const calculated = calculateEndDate(startDate, frequency);
      setEndDate(calculated);
    }
  }, [startDate, frequency]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (new Date(endDate) <= new Date(startDate)) {
      alert('Data de sfârșit trebuie să fie după data de început.');
      return;
    }

    const newSubscription = {
      appName: appName === 'Altul' ? customAppName : appName,
      startDate,
      endDate,
      frequency,
      price,
    };

    console.log('Submitting subscription:', newSubscription);
    // Trimite către backend sau salvează în local storage aici
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Adaugă o Subscriptie</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* App Selection */}
        <div>
          <label htmlFor="appName" className="block text-sm font-medium text-gray-700">
            Alege aplicația
          </label>
          <select
            id="appName"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          >
            {predefinedApps.map((app) => (
              <option key={app} value={app}>
                {app}
              </option>
            ))}
          </select>
        </div>

        {appName === 'Altul' && (
          <div>
            <label htmlFor="customAppName" className="block text-sm font-medium text-gray-700">
              Nume aplicație personalizată
            </label>
            <input
              type="text"
              id="customAppName"
              value={customAppName}
              onChange={(e) => setCustomAppName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
              required
            />
          </div>
        )}

        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Data de început
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            required
          />
        </div>

        {/* Frequency */}
        <div>
          <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
            Frecvență
          </label>
          <select
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
          >
            {frequencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* End Date (auto-calculated) */}
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            Data de sfârșit
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Preț (RON)
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            min="0"
            step="0.01"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Adaugă abonament
        </button>
      </form>
    </div>
  );
}
