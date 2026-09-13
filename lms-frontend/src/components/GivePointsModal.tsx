import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { api } from '../lib/api';
import { Course } from '../types';

interface SimpleUser {
  id: string;
  name: string;
}

interface Props {
  onClose: () => void;
  onSaved: () => void;
}

export default function GivePointsModal({ onClose, onSaved }: Props) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseId, setCourseId] = useState('');
  const [userId, setUserId] = useState('');
  const [points, setPoints] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/courses', { params: { limit: 100 } }).then((res) => setCourses(res.data.data));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!userId.trim()) {
      setError('User ID peserta wajib diisi');
      return;
    }

    setSaving(true);
    try {
      await api.post('/leaderboard', {
        user_id: userId,
        course_id: courseId,
        points: Number(points),
        notes: notes || undefined,
      });
      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal memberikan poin');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-navy">Berikan Poin</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">User ID Peserta</label>
            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Copy dari daftar peserta / Prisma Studio"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-from/40"
            />
            <p className="text-xs text-gray-400 mt-1">
              Backend belum punya endpoint pencarian user, jadi untuk sekarang ID diisi manual.
            </p>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Course</label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-from/40"
            >
              <option value="">Pilih course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Jumlah Poin</label>
            <input
              type="number"
              min={1}
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-from/40"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Catatan (opsional)</label>
            <input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Aktif diskusi sesi 3"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-from/40"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="bg-brand-from text-white font-semibold py-2.5 rounded-xl hover:bg-brand-to transition-colors disabled:opacity-60 mt-2"
          >
            {saving ? 'Menyimpan...' : 'Berikan Poin'}
          </button>
        </form>
      </div>
    </div>
  );
}