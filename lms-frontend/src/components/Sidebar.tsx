import { NavLink } from 'react-router-dom';
import { LayoutGrid, BookOpen, Users, MessageSquare, GraduationCap, Settings, Calendar, LogOut, Tag } from 'lucide-react';
import { logout, getCurrentUser } from '../lib/auth';

export default function Sidebar() {
  const user = getCurrentUser();
  const isPeserta = user?.role === 'peserta';

  const menuItems = [
    { icon: LayoutGrid, label: 'Dashboard', path: '/' },
    { icon: BookOpen, label: 'Modul', path: '/courses' },
    { icon: Tag, label: 'Kategori', path: '/categories' },
    isPeserta
      ? { icon: Users, label: 'Kelas Saya', path: '/enrollments' }
      : { icon: Users, label: 'Peserta', path: '/enrollments' },
    { icon: MessageSquare, label: 'Leaderboard', path: '/leaderboard' },
    { icon: GraduationCap, label: 'Pemateri', path: '/pemateri' },
  ];

  const profileItems = [
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: Calendar, label: 'Kalender', path: '/schedules' },
  ];

  return (
    <aside className="w-64 bg-navy min-h-screen flex flex-col py-6 px-4 text-gray-300">
      <div className="flex items-center gap-2 px-2 mb-10">
        <div className="w-8 h-8 rounded-lg bg-brand-from" />
        <span className="text-white font-semibold text-lg">adhivasindo</span>
      </div>

      <nav className="flex flex-col gap-1">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive ? 'bg-navy-light text-white' : 'hover:bg-navy-light/60 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-10">
        <p className="text-xs uppercase tracking-wide text-gray-500 px-3 mb-2">Profile</p>
        <nav className="flex flex-col gap-1">
          {profileItems.map(({ icon: Icon, label, path }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? 'bg-navy-light text-white' : 'hover:bg-navy-light/60 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
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