interface Material {
  id: string;
  title: string;
  highlighted?: boolean;
}

interface Props {
  title: string;
  variant: 'dark' | 'coral' | 'gold';
  materials: Material[];
}

const variantStyles = {
  dark: 'bg-gradient-to-br from-navy to-navy-light',
  coral: 'bg-coral',
  gold: 'bg-gold',
};

export default function ModuleCard({ title, variant, materials }: Props) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col">
      <div className={`h-28 flex items-center justify-center ${variantStyles[variant]}`}>
        <span className="text-white font-bold tracking-wide text-sm">{title.toUpperCase()}</span>
      </div>

      <div className="p-4 flex-1">
        <p className="text-xs font-semibold text-gray-400 tracking-wide mb-2">MATERI KOMPETENSI</p>
        <ul className="flex flex-col gap-1.5">
          {materials.map((m) => (
            <li
              key={m.id}
              className={`text-sm px-2 py-1.5 rounded-lg leading-snug ${
                m.highlighted ? 'bg-yellow-100 text-navy font-medium' : 'text-gray-600'
              }`}
            >
              {m.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
