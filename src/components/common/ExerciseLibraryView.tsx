import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { GlassBadge } from './GlassBadge';
import { GlassInput } from './GlassInput';
import { GlassButton } from './GlassButton';
import { MOCK_MOVEMENTS } from '../../data/mockData';
import { Movement } from '../../types';
import { Search, Dumbbell, Play, Filter, Sparkles, Video } from 'lucide-react';

interface ExerciseLibraryViewProps {
  onSelectMovement?: (movement: Movement) => void;
  onOpenDetail: (movement: Movement) => void;
}

export const ExerciseLibraryView: React.FC<ExerciseLibraryViewProps> = ({
  onSelectMovement,
  onOpenDetail,
}) => {
  const [search, setSearch] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('همه');

  const muscleGroups = [
    'همه',
    'سینه (پکتورالیس)',
    'چهارسر ران و باسن',
    'زیربغل، کول، پشت‌بازو',
    'کل بدن (Full Body)',
    'دلتوئید قدامی، عضلات مرکزی کور',
  ];

  const filtered = MOCK_MOVEMENTS.filter((m) => {
    const matchesSearch =
      m.title.includes(search) ||
      (m.titleEn && m.titleEn.toLowerCase().includes(search.toLowerCase()));
    const matchesMuscle = selectedMuscle === 'همه' || m.muscleGroup.includes(selectedMuscle);
    return matchesSearch && matchesMuscle;
  });

  return (
    <div className="space-y-4 pb-24 text-right">
      {/* Search and Filters */}
      <GlassCard className="p-4" variant="highlight">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-emerald-400" />
              کتابخانه جامع حرکات و تمرینات ورزشی
            </h2>
            <GlassBadge variant="emerald" size="sm">
              {filtered.length} حرکت فعال
            </GlassBadge>
          </div>

          <GlassInput
            placeholder="جستجوی نام حرکت به فارسی یا انگلیسی (مثال: پرس سینه، Bench Press)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />

          {/* Muscle Filters */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {muscleGroups.map((group) => (
              <button
                key={group}
                onClick={() => setSelectedMuscle(group)}
                className={`text-xs px-3 py-1.5 rounded-xl border whitespace-nowrap transition-colors ${
                  selectedMuscle === group
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Grid of Movement Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((movement) => (
          <GlassCard
            key={movement.id}
            interactive
            onClick={() => onOpenDetail(movement)}
            className="p-3.5 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video rounded-xl overflow-hidden mb-2.5 bg-black/40 border border-white/10 group">
                {movement.thumbnailUrl ? (
                  <img
                    src={movement.thumbnailUrl}
                    alt={movement.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    <Video className="w-8 h-8" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/80 backdrop-blur-md flex items-center justify-center text-black shadow-lg">
                    <Play className="w-4 h-4 fill-black translate-x-[-1px]" />
                  </div>
                </div>
              </div>

              <h3 className="text-xs font-bold text-white line-clamp-1">{movement.title}</h3>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5 line-clamp-1">{movement.titleEn}</p>
            </div>

            <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10 text-[11px]">
              <span className="text-emerald-400 font-medium truncate max-w-[140px]">
                {movement.muscleGroup}
              </span>
              <span className="text-slate-400 text-[10px]">{movement.equipment || 'وزن بدن'}</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
