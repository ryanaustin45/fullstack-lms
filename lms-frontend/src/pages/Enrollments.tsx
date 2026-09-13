import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { api } from '../lib/api';
import { Course } from '../types';
import { getCurrentUser } from '../lib/auth';

interface MyEnrollment {
  id: string;
  progress: number;
  status: string;
  course: { id: string; title: string; thumbnail?: string };
}

export default function Enrollments() {
  const user = getCurrentUser();
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [myEnrollments, setMyEnrollments] = useState<MyEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState<string | null>(null);

  async function loadData() {
    setLoading(true);
    try {
      const [coursesRes, enrollmentsRes] = await Promise.all([
        api.get('/courses', { params: { status: 'published', limit: 50 } }),
        api.get('/enrollments/me'),
      ]);
      setMyEnrollments(enrollmentsRes.data.data);
      // Sembunyikan course yang sudah di-enroll dari daftar "tersedia"
      const enrolledIds = new Set(enrollmentsRes.data.data.map((e: MyEnrollment) => e.course.id));
      setAvailableCourses(coursesRes.data.data.filter((c: Course) => !enrolledIds.has(c.id)));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleEnroll(courseId: string) {
    setEnrollingId(courseId);
    try {
      await api.post('/enrollments', { course_id: courseId });
      await loadData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Gagal enroll course');
    } finally {
      setEnrollingId(null);
    }
  }

  async function handleProgressChange(enrollmentId: string, progress: number) {
    // Update di UI dulu biar terasa responsif, baru kirim ke server
    setMyEnrollments((prev) =>
      prev.map((e) => (e.id === enrollmentId ? { ...e, progress } : e)),
    );
    await api.patch(`/enrollments/${enrollmentId}/progress`, { progress });
  }

  if (user?.role !== 'peserta') {
    return (
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6">
          <Header />
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center mt-6">
            <p className="text-sm text-gray-400">
              Halaman ini khusus untuk role peserta. Backend belum punya endpoint untuk
              admin/pemateri melihat semua enrollment peserta lain.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Header />

        {loading ? (
          <p className="text-sm text-gray-400 mt-6">Memuat...</p>
        ) : (
          <div className="flex flex-col gap-8 mt-6">
            {/* Course yang sedang diikuti */}
            <div>
              <h3 className="font-semibold text-navy mb-3">Course Saya</h3>
              {myEnrollments.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
                  <p className="text-sm text-gray-400">Kamu belum enroll ke course manapun.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {myEnrollments.map((e) => (
                    <div key={e.id} className="bg-white rounded-2xl border border-gray-100 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-navy">{e.course.title}</p>
                        {e.status === 'completed' && (
                          <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                            <Check size={12} /> Selesai
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={e.progress}
                          onChange={(ev) => handleProgressChange(e.id, Number(ev.target.value))}
                          className="flex-1 accent-brand-from"
                        />
                        <span className="text-sm text-gray-500 w-12 text-right">{e.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Course yang bisa di-enroll */}
            <div>
              <h3 className="font-semibold text-navy mb-3">Course Tersedia</h3>
              {availableCourses.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
                  <p className="text-sm text-gray-400">Tidak ada course baru yang tersedia.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {availableCourses.map((c) => (
                    <div key={c.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-3">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">{c.category?.name}</p>
                        <p className="font-medium text-navy leading-snug">{c.title}</p>
                      </div>
                      <button
                        onClick={() => handleEnroll(c.id)}
                        disabled={enrollingId === c.id}
                        className="mt-auto bg-brand-from text-white text-sm font-semibold py-2 rounded-xl hover:bg-brand-to transition-colors disabled:opacity-60"
                      >
                        {enrollingId === c.id ? 'Memproses...' : 'Enroll'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}