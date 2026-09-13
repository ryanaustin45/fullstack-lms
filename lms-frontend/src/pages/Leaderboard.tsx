import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import GivePointsModal from '../components/GivePointsModal';
import { api } from '../lib/api';
import { LeaderboardEntry, Course } from '../types';
import { getCurrentUser } from '../lib/auth';

const medalColors: Record<number, string> = {
  1: 'bg-yellow-400',
  2: 'bg-gray-300',
  3: 'bg-amber-600',
};

export default function Leaderboard() {
  const user = getCurrentUser();
  const canGivePoints = user?.role === 'admin' || user?.role === 'pemateri';

  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseFilter, setCourseFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  async function loadLeaderboard() {
    setLoading(true);
    try {
      const res = await api.get('/leaderboard', {
        params: { course_id: courseFilter || undefined, limit: 20 },
      });
      setEntries(res.data.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    api.get('/courses', { params: { limit: 100 } }).then((res) => setCourses(res.data.data));
  }, []);

  useEffect(() => {
    loadLeaderboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseFilter]);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Header />

        <div className="flex items-center justify-between mt-6 mb-4">
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-from/40"
          >
            <option value="">Semua Course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>

          {canGivePoints && (
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 bg-brand-from text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-brand-to transition-colors"
            >
              <Plus size={16} /> Berikan Poin
            </button>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          {loading ? (
            <p className="text-sm text-gray-400">Memuat...</p>
          ) : entries.length === 0 ? (
            <p className="text-sm text-gray-400">Belum ada data poin untuk ditampilkan.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 text-xs uppercase tracking-wide">
                  <th className="pb-3 font-medium">Rank</th>
                  <th className="pb-3 font-medium">Nama</th>
                  <th className="pb-3 font-medium">Course</th>
                  <th className="pb-3 font-medium">Point</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr key={`${e.rank}-${e.user.id}`} className="border-t border-gray-50">
                    <td className="py-3">
                      <span className={`w-7 h-7 rounded-full inline-flex items-center justify-center text-xs font-semibold text-white ${
                        medalColors[e.rank] ?? 'bg-gray-200 text-gray-500'
                      }`}>
                        {e.rank}
                      </span>
                    </td>
                    <td className="py-3 font-medium text-navy">{e.user.name}</td>
                    <td className="py-3 text-gray-500">{e.course}</td>
                    <td className="py-3 text-green-600 font-semibold">{e.points.toLocaleString()} Point</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {modalOpen && (
        <GivePointsModal
          onClose={() => setModalOpen(false)}
          onSaved={loadLeaderboard}
        />
      )}
    </div>
  );
}