import React, { useState } from 'react';
import { Settings, Save, Database, Mail, Shield, Bell, Palette } from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'store', label: 'Store Settings', icon: Palette },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'database', label: 'Database', icon: Database },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your store settings and preferences</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-gold to-amber-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
        >
          <Save size={20} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-green-800">
            Settings saved successfully!
          </p>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200 overflow-x-auto">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-brand-gold border-b-2 border-brand-gold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'general' && <GeneralSettings />}
          {activeTab === 'store' && <StoreSettings />}
          {activeTab === 'email' && <EmailSettings />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'database' && <DatabaseSettings />}
        </div>
      </div>
    </div>
  );
}

function GeneralSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-display font-bold text-gray-900 mb-4">General Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Store Name
            </label>
            <input
              type="text"
              defaultValue="MK Collection"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Store Tagline
            </label>
            <input
              type="text"
              defaultValue="Premium Fashion Collection"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Store Description
            </label>
            <textarea
              rows={4}
              defaultValue="Discover timeless elegance with MK Collection's curated selection of premium fashion."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-display font-bold text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue="info@mkcollection.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              defaultValue="+92 300 1234567"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              defaultValue="Lahore, Punjab, Pakistan"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StoreSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-display font-bold text-gray-900 mb-4">Currency & Tax</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Currency
            </label>
            <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold">
              <option value="PKR">PKR - Pakistani Rupee</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tax Rate (%)
            </label>
            <input
              type="number"
              defaultValue="0"
              min="0"
              max="100"
              step="0.1"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-display font-bold text-gray-900 mb-4">Shipping</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Standard Shipping Fee
            </label>
            <input
              type="number"
              defaultValue="200"
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Free Shipping Threshold
            </label>
            <input
              type="number"
              defaultValue="5000"
              min="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-display font-bold text-gray-900 mb-4">Display Options</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-brand-gold border-gray-300 rounded focus:ring-brand-gold"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">Show Sale Badges</p>
              <p className="text-xs text-gray-600">Display sale badges on discounted products</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-brand-gold border-gray-300 rounded focus:ring-brand-gold"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">Show Stock Count</p>
              <p className="text-xs text-gray-600">Display remaining stock on product pages</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-brand-gold border-gray-300 rounded focus:ring-brand-gold"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">Enable Reviews</p>
              <p className="text-xs text-gray-600">Allow customers to leave product reviews</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

function EmailSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-display font-bold text-gray-900 mb-4">Email Notifications</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-brand-gold border-gray-300 rounded focus:ring-brand-gold"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">Order Confirmation</p>
              <p className="text-xs text-gray-600">Send confirmation email when order is placed</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-brand-gold border-gray-300 rounded focus:ring-brand-gold"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">Shipping Updates</p>
              <p className="text-xs text-gray-600">Notify customers of shipping status changes</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 text-brand-gold border-gray-300 rounded focus:ring-brand-gold"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">Marketing Emails</p>
              <p className="text-xs text-gray-600">Send promotional and marketing emails</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-display font-bold text-gray-900 mb-4">Password Requirements</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-brand-gold border-gray-300 rounded focus:ring-brand-gold"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">Require Strong Passwords</p>
              <p className="text-xs text-gray-600">Minimum 8 characters with uppercase, lowercase, and numbers</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 text-brand-gold border-gray-300 rounded focus:ring-brand-gold"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">Two-Factor Authentication</p>
              <p className="text-xs text-gray-600">Require 2FA for admin accounts</p>
            </div>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-display font-bold text-gray-900 mb-4">Session Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              defaultValue="60"
              min="5"
              max="1440"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-display font-bold text-gray-900 mb-4">Admin Notifications</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-brand-gold border-gray-300 rounded focus:ring-brand-gold"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">New Orders</p>
              <p className="text-xs text-gray-600">Get notified when new orders are placed</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-brand-gold border-gray-300 rounded focus:ring-brand-gold"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">Low Stock Alerts</p>
              <p className="text-xs text-gray-600">Alert when product stock is low</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 text-brand-gold border-gray-300 rounded focus:ring-brand-gold"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">New Reviews</p>
              <p className="text-xs text-gray-600">Notify when customers leave reviews</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-brand-gold border-gray-300 rounded focus:ring-brand-gold"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">New User Registrations</p>
              <p className="text-xs text-gray-600">Alert when new users register</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

function DatabaseSettings() {
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);

  const handleSeed = async () => {
    setSeeding(true);
    setSeedResult(null);
    try {
      const { seedDatabase } = await import('@/lib/seedData');
      const result = await seedDatabase();
      setSeedResult(result.success ? 'Database seeded successfully!' : 'Error seeding database. Check console.');
    } catch (err) {
      setSeedResult('Failed to load seed script.');
    }
    setSeeding(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-display font-bold text-gray-900 mb-4">Database Management</h3>
        <p className="text-sm text-gray-600 mb-6">
          Manage your database with caution. These actions cannot be undone.
        </p>

        {seedResult && (
          <div className={`mb-6 p-4 rounded-xl border ${
            seedResult.includes('successfully')
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <p className="text-sm font-semibold">{seedResult}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-semibold text-blue-900 mb-1">Seed Sample Data</h4>
                <p className="text-xs text-blue-700">
                  Populate database with sample products, categories, and orders for testing
                </p>
              </div>
              <button
                onClick={handleSeed}
                disabled={seeding}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {seeding ? 'Seeding...' : 'Seed Data'}
              </button>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-semibold text-yellow-900 mb-1">Backup Database</h4>
                <p className="text-xs text-yellow-700">
                  Create a backup of your current database
                </p>
              </div>
              <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-700 transition-colors">
                Backup Now
              </button>
            </div>
          </div>

          <div className="p-4 bg-red-50 rounded-xl border border-red-200">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-semibold text-red-900 mb-1">Clear All Data</h4>
                <p className="text-xs text-red-700">
                  ⚠️ WARNING: This will delete all data from the database. This action cannot be undone.
                </p>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">
                Clear Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
