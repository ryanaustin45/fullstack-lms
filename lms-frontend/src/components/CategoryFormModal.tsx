import { useState } from 'react';
import { X } from 'lucide-react';
import { api } from '../lib/api';
import { Category } from '../types';

interface Props {
  initialData?: Category | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function CategoryFormModal({ initialData, onClose, onSaved }: Props) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const isEdit = !!initialData;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      if (isEdit) {
        await api.put(`/categories/${initialData!.id}`, { name });
      } else {
        await api.post('/categories', { name });
      }
      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal menyimpan kategori');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-navy">{isEdit ? 'Edit Kategori' : 'Tambah Kategori'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Nama Kategori</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Pemrograman"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-from/40"
            />
            <p className="text-xs text-gray-400 mt-1">Slug dibuat otomatis dari nama ini.</p>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="bg-brand-from text-white font-semibold py-2.5 rounded-xl hover:bg-brand-to transition-colors disabled:opacity-60 mt-2"
          >
            {saving ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Kategori'}
          </button>
        </form>
      </div>
    </div>
  );
}