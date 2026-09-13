import { useEffect, useState } from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ScheduleFormModal from '../components/ScheduleFormModal';
import { api } from '../lib/api';
import { ScheduleItem } from '../types';
import { getCurrentUser } from '../lib/auth';

const scheduleColors = ['bg-brand-from', 'bg-coral', 'bg-gold'];

export default function Schedules() {
  const user = getCurrentUser();
  const canManage = user?.role === 'admin' || user?.role === 'pemateri';

  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [cursor, setCursor] = useState(new Date());

  async function loadSchedules() {
    setLoading(true);
    try {
      const res = await api.get('/schedules', {
        params: { month: cursor.getMonth() + 1, year: cursor.getFullYear() },
      });
      setSchedules(res.data.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSchedules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor]);

  function shiftMonth(delta: number) {
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + delta, 1));
  }

  const monthLabel = cursor.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Header />

        <div className="flex items-center justify-between mt-6 mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => shiftMonth(-1)} className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50">
              <ChevronLeft size={16} />
            </button>
            <span className="font-semibold text-navy capitalize min-w-40 text-center">{monthLabel}</span>
            <button onClick={() => shiftMonth(1)} className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50">
              <ChevronRight size={16} />
            </button>
          </div>

          {canManage && (
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 bg-brand-from text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-brand-to transition-colors"
            >
              <Plus size={16} /> Tambah Jadwal
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {loading ? (
            <p className="text-sm text-gray-400">Memuat...</p>
          ) : schedules.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <p className="text-sm text-gray-400">Belum ada jadwal di bulan ini.</p>
            </div>
          ) : (
            schedules.map((s, i) => (
              <div key={s.id} className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-4">
                <span className={`w-2.5 h-12 rounded-full ${scheduleColors[i % 3]}`} />
                <div className="flex-1">
                  <p className="font-medium text-navy">{s.title}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(s.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}
                    {' · '}{s.start_time} - {s.end_time}{' · '}With {s.instructor.name}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {modalOpen && (
        <ScheduleFormModal
          onClose={() => setModalOpen(false)}
          onSaved={loadSchedules}
        />
      )}
    </div>
  );
}