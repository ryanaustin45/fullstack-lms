import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { api } from '../lib/api';
import { Course } from '../types';

interface Props {
  onClose: () => void;
  onSaved: () => void;
}

export default function ScheduleFormModal({ onClose, onSaved }: Props) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Ambil list course untuk dropdown opsional (jadwal bisa dikaitkan ke course tertentu)
    api.get('/courses', { params: { limit: 100 } }).then((res) => setCourses(res.data.data));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (startTime >= endTime) {
      setError('Jam selesai harus setelah jam mulai');
      return;
    }

    setSaving(true);
    try {
      await api.post('/schedules', {
        title,
        course_id: courseId || undefined,
        event_date: eventDate,
        start_time: startTime,
        end_time: endTime,
      });
      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal menyimpan jadwal');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-navy">Tambah Jadwal</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Judul Jadwal</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Storyteling dalam Pemasaran"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-from/40"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Course Terkait (opsional)</label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-from/40"
            >
              <option value="">Tidak terkait course tertentu</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Tanggal</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-from/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Jam Mulai</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-from/40"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Jam Selesai</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-from/40"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="bg-brand-from text-white font-semibold py-2.5 rounded-xl hover:bg-brand-to transition-colors disabled:opacity-60 mt-2"
          >
            {saving ? 'Menyimpan...' : 'Tambah Jadwal'}
          </button>
        </form>
      </div>
    </div>
  );
}