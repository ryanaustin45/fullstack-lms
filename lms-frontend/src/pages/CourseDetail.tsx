import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { api } from '../lib/api';
import { Course } from '../types';
import { getCurrentUser } from '../lib/auth';

interface Material {
  id: string;
  title: string;
  orderNo: number;
}

export default function CourseDetail() {
  const { id } = useParams();
  const user = getCurrentUser();
  const canManage = user?.role === 'admin' || user?.role === 'pemateri';

  const [course, setCourse] = useState<Course & { materials: Material[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [adding, setAdding] = useState(false);

  async function loadCourse() {
    setLoading(true);
    try {
      const res = await api.get(`/courses/${id}`);
      setCourse(res.data.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function handleAddMaterial(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setAdding(true);
    try {
      await api.post('/materials', {
        course_id: id,
        title: newTitle,
        order_no: (course?.materials.length ?? 0) + 1,
      });
      setNewTitle('');
      await loadCourse();
    } finally {
      setAdding(false);
    }
  }

  async function handleDeleteMaterial(materialId: string) {
    if (!confirm('Hapus materi ini?')) return;
    await api.delete(`/materials/${materialId}`);
    loadCourse();
  }

  if (loading) {
    return (
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6">
          <Header />
          <p className="text-sm text-gray-400 mt-6">Memuat...</p>
        </main>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6">
          <Header />
          <p className="text-sm text-gray-400 mt-6">Course tidak ditemukan.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Header />

        <Link to="/courses" className="flex items-center gap-2 text-sm text-gray-500 hover:text-navy mt-6 mb-4 w-fit">
          <ArrowLeft size={16} /> Kembali ke daftar course
        </Link>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <span className="text-xs font-semibold text-brand-from bg-brand-from/10 px-2.5 py-1 rounded-full">
            {course.category?.name}
          </span>
          <h1 className="text-xl font-bold text-navy mt-3 mb-1">{course.title}</h1>
          <p className="text-sm text-gray-500">{course.description}</p>
          {course.instructor && (
            <p className="text-sm text-gray-400 mt-2">Pemateri: {course.instructor.name}</p>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-semibold text-navy mb-4">Materi Kompetensi</h3>

          {course.materials.length === 0 ? (
            <p className="text-sm text-gray-400 mb-4">Belum ada materi untuk course ini.</p>
          ) : (
            <ul className="flex flex-col gap-2 mb-4">
              {course.materials.map((m, i) => (
                <li key={m.id} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                  <span className="text-sm text-navy">
                    <span className="text-gray-400 mr-2">{i + 1}.</span>
                    {m.title}
                  </span>
                  {canManage && (
                    <button onClick={() => handleDeleteMaterial(m.id)} className="text-gray-400 hover:text-red-500">
                      <Trash2 size={15} />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}

          {canManage && (
            <form onSubmit={handleAddMaterial} className="flex items-center gap-2">
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Judul materi baru..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-from/40"
              />
              <button
                type="submit"
                disabled={adding}
                className="flex items-center gap-2 bg-brand-from text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-brand-to transition-colors disabled:opacity-60"
              >
                <Plus size={16} /> Tambah
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}