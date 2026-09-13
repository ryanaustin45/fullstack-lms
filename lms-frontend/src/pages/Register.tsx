import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../lib/auth';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'peserta' | 'pemateri'>('peserta');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak sama');
      return;
    }
    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password, role);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registrasi gagal, coba lagi');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-brand-from" />
          <span className="font-semibold text-lg text-navy">adhivasindo</span>
        </div>

        <h1 className="text-xl font-bold text-navy mb-1">Buat akun baru</h1>
        <p className="text-sm text-gray-500 mb-6">Daftar untuk mulai belajar</p>

        {success ? (
          <div className="bg-green-50 text-green-700 text-sm rounded-xl px-4 py-3">
            Registrasi berhasil! Mengarahkan ke halaman login...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-from/40"
                placeholder="Juliana"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-from/40"
                placeholder="nama@email.com"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">Daftar sebagai</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('peserta')}
                  className={`py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                    role === 'peserta'
                      ? 'bg-brand-from text-white border-brand-from'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  Peserta
                </button>
                <button
                  type="button"
                  onClick={() => setRole('pemateri')}
                  className={`py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                    role === 'pemateri'
                      ? 'bg-brand-from text-white border-brand-from'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  Pemateri
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-from/40"
                placeholder="Minimal 6 karakter"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Konfirmasi Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-from/40"
                placeholder="Ulangi password"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-brand-from text-white font-semibold py-2.5 rounded-xl hover:bg-brand-to transition-colors disabled:opacity-60"
            >
              {loading ? 'Memproses...' : 'Daftar'}
            </button>
          </form>
        )}

        <p className="text-sm text-gray-500 text-center mt-6">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-brand-from font-medium hover:underline">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}