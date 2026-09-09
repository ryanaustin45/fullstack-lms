import { User, Calendar } from 'lucide-react';
import { Course } from '../types';

interface Props {
  course: Course;
}

export default function HeroBanner({ course }: Props) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-brand-from to-brand-to p-8 text-white relative overflow-hidden">
      <span className="inline-block text-xs font-semibold tracking-wide bg-yellow-400 text-navy px-3 py-1 rounded-full mb-4">
        {course.category.name.toUpperCase()}
      </span>

      <h2 className="text-2xl font-bold max-w-lg leading-snug mb-3">{course.title}</h2>

      <p className="text-sm text-white/70 max-w-md mb-6 line-clamp-2">
        {course.description}
      </p>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-5 text-sm text-white/80">
          {course.instructor && (
            <span className="flex items-center gap-1.5">
              <User size={14} /> Pemateri By {course.instructor.name}
            </span>
          )}
          {course.start_date && (
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> {course.start_date}
            </span>
          )}
        </div>

        <button className="bg-white text-navy text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors">
          MULAI LEARNING
        </button>
      </div>
    </div>
  );
}
