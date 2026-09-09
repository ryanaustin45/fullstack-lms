export interface User {
  id: string;
  name: string;
  email?: string;
  role: 'admin' | 'pemateri' | 'peserta';
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  status: string;
  start_date?: string;
  category: { id: string; name: string };
  instructor?: { id: string; name: string };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: { id: string; name: string };
  course: string;
  points: number;
}

export interface ScheduleItem {
  id: string;
  title: string;
  instructor: { id: string; name: string };
  event_date: string;
  start_time: string;
  end_time: string;
}
