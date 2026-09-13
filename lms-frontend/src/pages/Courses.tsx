import { useEffect, useState } from 'react';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CourseFormModal from '../components/CourseFormModal';
import { api } from '../lib/api';
import { Course } from '../types';
import { getCurrentUser } from '../lib/auth';
import { Link } from 'react-router-dom';

export default function Courses() {
  const user = getCurrentUser();
  const canManage = user?.role === 'admin' || user?.role === 'pemateri';

  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  async function loadCourses() {
    setLoading(true);
    try {
      const res = await api.get('/courses', { params: { search, page, limit: 6 } });
      setCourses(res.data.data);
      setTotalPages(res.data.meta.total_pages);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Debounce search: tunggu 400ms setelah user berhenti ngetik, baru fetch
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      loadCourses();
    }, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  async function handleDelete(id: string) {
    if (!confirm('Yakin hapus course ini?')) return;
    await api.delete(`/courses/${id}`);
    loadCourses();
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Header />

        <div className="flex items-center justify-between mt-6 mb-4">
          <div className="relative w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari course..."
              className="pl-9 pr-4 py-2 rounded-full bg-white border border-gray-200 text-sm w-full focus:outline-none focus:ring-2 focus:ring-brand-from/40"
            />
          </div>

          {canManage && (
            <button
              onClick={() => { setEditingCourse(null); setModalOpen(true); }}
              className="flex items-center gap-2 bg-brand-from text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-brand-to transition-colors"
            >
              <Plus size={16} /> Tambah Course
            </button>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          {loading ? (
            <p className="text-sm text-gray-400">Memuat...</p>
          ) : courses.length === 0 ? (
            <p className="text-sm text-gray-400">Tidak ada course ditemukan.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 text-xs uppercase tracking-wide">
                  <th className="pb-3 font-medium">Judul</th>
                  <th className="pb-3 font-medium">Kategori</th>
                  <th className="pb-3 font-medium">Pemateri</th>
                  <th className="pb-3 font-medium">Status</th>
                  {canManage && <th className="pb-3 font-medium">Aksi</th>}
                </tr>
              </thead>
              <tbody>
                {courses.map((c) => (
                  <tr key={c.id} className="border-t border-gray-50">
                    <td className="py-3 font-medium text-navy">
                        <Link to={`/courses/${c.id}`} className="hover:text-brand-from hover:underline">
                            {c.title}
                        </Link>
                    </td>
                    <td className="py-3 text-gray-500">{c.category?.name}</td>
                    <td className="py-3 text-gray-500">{c.instructor?.name ?? '-'}</td>
                    <td className="py-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        c.status === 'published' ? 'bg-green-100 text-green-700' :
                        c.status === 'draft' ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    {canManage && (
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => { setEditingCourse(c); setModalOpen(true); }} className="text-gray-400 hover:text-brand-from">
                            <Pencil size={15} />
                          </button>
                          <button onClick={() => handleDelete(c.id)} className="text-gray-400 hover:text-red-500">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-sm ${
                    page === i + 1 ? 'bg-brand-from text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      {modalOpen && (
        <CourseFormModal
          initialData={editingCourse}
          onClose={() => setModalOpen(false)}
          onSaved={loadCourses}
        />
      )}
    </div>
  );
}