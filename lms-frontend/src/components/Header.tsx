import { Search, Bell, Mail } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-lg font-semibold text-navy tracking-wide">LEARNING MANAGEMENT SYSTEM</h1>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search class..."
            className="pl-9 pr-4 py-2 rounded-full bg-gray-100 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-brand-from/40"
          />
        </div>
        <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <Bell size={16} className="text-gray-600" />
        </button>
        <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <Mail size={16} className="text-gray-600" />
        </button>
      </div>
    </header>
  );
}
