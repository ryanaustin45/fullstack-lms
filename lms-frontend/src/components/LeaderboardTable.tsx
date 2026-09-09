import { LeaderboardEntry } from '../types';

const medalColors: Record<number, string> = {
  1: 'bg-yellow-400',
  2: 'bg-gray-300',
  3: 'bg-amber-600',
};

export default function LeaderboardTable({ entries }: { entries: LeaderboardEntry[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <h3 className="font-semibold text-navy mb-4">Nilai Peserta</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-400 text-xs uppercase tracking-wide">
            <th className="pb-3 font-medium">Rank</th>
            <th className="pb-3 font-medium">Name</th>
            <th className="pb-3 font-medium">Class</th>
            <th className="pb-3 font-medium">Modul</th>
            <th className="pb-3 font-medium">Point</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.rank} className="border-t border-gray-50">
              <td className="py-3">
                <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-semibold text-white ${medalColors[e.rank] ?? 'bg-gray-200 text-gray-500'}`}>
                  {e.rank}
                </span>
              </td>
              <td className="py-3 font-medium text-navy">{e.user.name}</td>
              <td className="py-3 text-gray-500">{e.course}</td>
              <td className="py-3 text-gray-500">L{e.rank}</td>
              <td className="py-3 text-green-600 font-semibold">{e.points.toLocaleString()} Point</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
