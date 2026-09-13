import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CategoryFormModal from '../components/CategoryFormModal';
import { api } from '../lib/api';
import { Category } from '../types';
import { getCurrentUser } from '../lib/auth';

export default function Categories() {
  const user = getCurrentUser();
  const canManage = user?.role === 'admin' || user?.role === 'pemateri';

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  async function loadCategories() {
    setLoading(true);
    try {
      const res = await api.get('/categories');
      setCategories(res.data.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('Yakin hapus kategori ini?')) return;
    try {
      await api.delete(`/categories/${id}`);
      loadCategories();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Gagal menghapus kategori');
    }
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Header />

        <div className="flex items-center justify-between mt-6 mb-4">
          <h3 className="font-semibold text-navy">Kategori / Modul Kompetensi</h3>
          {canManage && (
            <button
              onClick={() => { setEditingCategory(null); setModalOpen(true); }}
              className="flex items-center gap-2 bg-brand-from text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-brand-to transition-colors"
            >
              <Plus size={16} /> Tambah Kategori
            </button>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          {loading ? (
            <p className="text-sm text-gray-400">Memuat...</p>
          ) : categories.length === 0 ? (
            <p className="text-sm text-gray-400">
              Belum ada kategori. Tambahkan dulu sebelum membuat course.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 text-xs uppercase tracking-wide">
                  <th className="pb-3 font-medium">Nama</th>
                  <th className="pb-3 font-medium">Slug</th>
                  {canManage && <th className="pb-3 font-medium">Aksi</th>}
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c.id} className="border-t border-gray-50">
                    <td className="py-3 font-medium text-navy">{c.name}</td>
                    <td className="py-3 text-gray-500">{c.slug}</td>
                    {canManage && (
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => { setEditingCategory(c); setModalOpen(true); }} className="text-gray-400 hover:text-brand-from">
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
        </div>
      </main>

      {modalOpen && (
        <CategoryFormModal
          initialData={editingCategory}
          onClose={() => setModalOpen(false)}
          onSaved={loadCategories}
        />
      )}
    </div>
  );
}