import { LayoutGrid, BookOpen, Users, MessageSquare, GraduationCap, Settings, Calendar, LogOut } from 'lucide-react';
import { logout } from '../lib/auth';

const menuItems = [
  { icon: LayoutGrid, label: 'Dashboard', active: true },
  { icon: BookOpen, label: 'Modul' },
  { icon: Users, label: 'Peserta' },
  { icon: MessageSquare, label: 'Group Chat' },
  { icon: GraduationCap, label: 'Pemateri' },
];

const profileItems = [
  { icon: Settings, label: 'Settings' },
  { icon: Calendar, label: 'Kalender' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-navy min-h-screen flex flex-col py-6 px-4 text-gray-300">
      <div className="flex items-center gap-2 px-2 mb-10">
        <div className="w-8 h-8 rounded-lg bg-brand-from" />
        <span className="text-white font-semibold text-lg">ryanindo</span>
      </div>

      <nav className="flex flex-col gap-1">
        {menuItems.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              active ? 'bg-navy-light text-white' : 'hover:bg-navy-light/60 hover:text-white'
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-10">
        <p className="text-xs uppercase tracking-wide text-gray-500 px-3 mb-2">Profile</p>
        <nav className="flex flex-col gap-1">
          {profileItems.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-navy-light/60 hover:text-white transition-colors"
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
      </div>

      <button
        onClick={() => { logout(); window.location.href = '/login'; }}
        className="mt-auto flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-navy-light/60 transition-colors"
      >
        <LogOut size={18} />
        Log Out
      </button>
    </aside>
  );
}
