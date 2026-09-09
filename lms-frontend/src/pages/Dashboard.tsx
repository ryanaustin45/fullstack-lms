import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import ModuleCard from '../components/ModuleCard';
import LeaderboardTable from '../components/LeaderboardTable';
import RightPanel from '../components/RightPanel';
import { api } from '../lib/api';
import { getCurrentUser } from '../lib/auth';
import { Course, LeaderboardEntry, ScheduleItem } from '../types';

export default function Dashboard() {
  const user = getCurrentUser();
  const [courses, setCourses] = useState<Course[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [coursesRes, leaderboardRes, schedulesRes] = await Promise.all([
          api.get('/courses?limit=3'),
          api.get('/leaderboard?limit=5'),
          api.get('/schedules'),
        ]);
        setCourses(coursesRes.data.data);
        setLeaderboard(leaderboardRes.data.data);
        setSchedules(schedulesRes.data.data);
      } catch (err) {
        console.error('Gagal memuat data dashboard', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (!user) return null;

  const featuredCourse = courses[0];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 flex gap-6">
        <div className="flex-1 flex flex-col gap-6">
          <Header />

          {loading ? (
            <p className="text-gray-400 text-sm">Memuat data...</p>
          ) : (
            <>
              {featuredCourse && <HeroBanner course={featuredCourse} />}

              <div>
                <h3 className="font-semibold text-navy mb-3">Modul Kompetensi</h3>
                <div className="grid grid-cols-3 gap-4">
                  {courses.map((c, i) => (
                    <ModuleCard
                      key={c.id}
                      title={c.category.name}
                      variant={(['dark', 'coral', 'gold'] as const)[i % 3]}
                      materials={[{ id: c.id, title: c.title, highlighted: i === 0 }]}
                    />
                  ))}
                </div>
              </div>

              <LeaderboardTable entries={leaderboard} />
            </>
          )}
        </div>

        <RightPanel user={user} schedules={schedules} />
      </main>
    </div>
  );
}
