import { Settings, ChevronLeft, ChevronRight, ChevronRight as ArrowRight } from 'lucide-react';
import { ScheduleItem, User } from '../types';

interface Props {
  user: User;
  schedules: ScheduleItem[];
}

const scheduleColors = ['bg-brand-from', 'bg-coral', 'bg-gold'];

export default function RightPanel({ user, schedules }: Props) {
  const today = new Date();
  const monthName = today.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  return (
    <aside className="w-80 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex-1" />
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gray-200" />
          <button className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center">
            <Settings size={11} className="text-gray-500" />
          </button>
        </div>
      </div>

      <div className="text-right -mt-2">
        <p className="font-semibold text-navy text-sm">SELAMAT DATANG, {user.name.toUpperCase()}</p>
        <p className="text-xs text-gray-400">Di LMS by Ryan Austin Andika</p>
      </div>

      {/* Mini calendar */}
      <div className="bg-navy rounded-2xl p-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <ChevronLeft size={16} className="text-gray-400" />
          <span className="text-sm font-medium capitalize">{monthName}</span>
          <ChevronRight size={16} className="text-gray-400" />
        </div>
        <div className="grid grid-cols-7 gap-1 text-xs text-center text-gray-300">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
            <span key={d} className="pb-1">{d}</span>
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <span
              key={i}
              className={`py-1 rounded-full ${i === today.getDay() ? 'bg-brand-from font-semibold' : ''}`}
            >
              {today.getDate() - today.getDay() + i}
            </span>
          ))}
        </div>
      </div>

      {/* Schedule list */}
      <div>
        <h4 className="text-sm font-semibold text-navy mb-3">Jadwal Pemateri</h4>
        <div className="flex flex-col gap-3">
          {schedules.map((s) => (
            <div key={s.id} className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-3">
              <span className={`w-2.5 h-10 rounded-full ${scheduleColors[schedules.indexOf(s) % 3]}`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-navy leading-tight">{s.title}</p>
                <p className="text-xs text-gray-400">
                  {s.start_time} - {s.end_time} With {s.instructor.name}
                </p>
              </div>
              <ArrowRight size={14} className="text-gray-300" />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
