import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { api } from '../lib/api';
import { Course, Category } from '../types';

interface Props {
  initialData?: Course | null; // ada isinya = mode edit, kosong = mode tambah
  onClose: () => void;
  onSaved: () => void; // dipanggil setelah berhasil simpan, buat refresh list di parent
}

export default function CourseFormModal({ initialData, onClose, onSaved }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [categoryId, setCategoryId] = useState(initialData?.category.id ?? '');
  const [startDate, setStartDate] = useState(initialData?.start_date ?? '');
  const [status, setStatus] = useState(initialData?.status ?? 'draft');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const isEdit = !!initialData;

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data.data));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);

    const payload = {
      title,
      description,
      category_id: categoryId,
      start_date: startDate || undefined,
      status,
    };

    try {
      if (isEdit) {
        await api.put(`/courses/${initialData!.id}`, payload);
      } else {
        await api.post('/courses', payload);
      }
      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal menyimpan course');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-navy">{isEdit ? 'Edit Course' : 'Tambah Course'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Judul Course</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-from/40"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Deskripsi</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-from/40"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Kategori</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-from/40"
            >
              <option value="">Pilih kategori</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Tanggal Mulai</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-from/40"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-from/40"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="bg-brand-from text-white font-semibold py-2.5 rounded-xl hover:bg-brand-to transition-colors disabled:opacity-60 mt-2"
          >
            {saving ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Course'}
          </button>
        </form>
      </div>
    </div>
  );
}