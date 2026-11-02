import React, { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { GlassBadge } from './GlassBadge';
import { GlassInput } from './GlassInput';
import { GlassButton } from './GlassButton';
import { api } from '../../services/api';
import { Movement } from '../../types';
import { Search, Dumbbell, Play, Filter, Sparkles, Video, Loader2 } from 'lucide-react';

interface ExerciseLibraryViewProps {
  onSelectMovement?: (movement: Movement) => void;
  onOpenDetail: (movement: Movement) => void;
}

export const ExerciseLibraryView: React.FC<ExerciseLibraryViewProps> = ({
  onSelectMovement,
  onOpenDetail,
}) => {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('all');

  const muscleFilters = [
    { id: 'all', label: 'همه عضلات' },
    { id: 'chest', label: 'سینه' },
    { id: 'back', label: 'پشت و زیربغل' },
    { id: 'legs', label: 'پا و باسن' },
    { id: 'shoulders', label: 'سرشانه' },
    { id: 'arms', label: 'بازو' },
    { id: 'core', label: 'شکم و عضلات کور' },
  ];

  useEffect(() => {
    loadMovements();
  }, []);

  const loadMovements = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getMovements();
      setMovements(data);
    } catch (err: any) {
      setError(err.message || 'خطا در بارگذاری حرکات از سرور');
    } finally {
      setLoading(false);
    }
  };

  const filtered = movements.filter((m) => {
    const matchesSearch =
      m.title.includes(search) ||
      (m.titleEn && m.titleEn.toLowerCase().includes(search.toLowerCase()));
    const matchesMuscle =
      selectedMuscle === 'all' || (m.muscleGroup && m.muscleGroup.includes(selectedMuscle));
    return matchesSearch && matchesMuscle;
  });

  return (
    <div className="space-y-4 pb-24 text-right">
      {/* Search and Filters */}
      <GlassCard className="p-4" variant="highlight">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-[#0066FF]" />
              بانک اطلاعاتی حرکات ورزشی (سرور زنده)
            </h2>
            <GlassBadge variant="blue" size="sm">
              {filtered.length} حرکت فعال
            </GlassBadge>
          </div>

          <GlassInput
            placeholder="جستجوی نام حرکت به فارسی یا انگلیسی (مثال: پرس سینه، Bench Press)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4 text-slate-400" />}
          />

          {/* Muscle Filters */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {muscleFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedMuscle(f.id)}
                className={`text-xs px-3 py-1.5 rounded-xl border whitespace-nowrap transition-colors font-medium ${
                  selectedMuscle === f.id
                    ? 'bg-blue-50 border-[#0066FF] text-[#0066FF] font-bold shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-black'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Loading & Error States */}
      {loading && (
        <div className="flex items-center justify-center py-12 gap-2 text-slate-500 text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-[#0066FF]" />
          در حال دریافت اطلاعات از سرور دیتابیس...
        </div>
      )}

      {error && (
        <GlassCard className="p-4 text-center border-red-200 bg-red-50/50">
          <p className="text-sm text-red-600 mb-2">{error}</p>
          <GlassButton size="sm" onClick={loadMovements}>تلاش مجدد</GlassButton>
        </GlassCard>
      )}

      {/* Grid of Movement Cards */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((movement) => (
            <GlassCard
              key={movement.id}
              interactive
              onClick={() => onOpenDetail(movement)}
              className="p-3.5 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video rounded-xl overflow-hidden mb-2.5 bg-slate-100 border border-slate-200 group">
                  {movement.thumbnailUrl ? (
                    <img
                      src={movement.thumbnailUrl}
                      alt={movement.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 bg-gradient-to-br from-blue-50/50 to-slate-100">
                      <Video className="w-8 h-8 text-blue-400" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-1">
                    <GlassBadge variant="blue" size="sm">
                      {movement.sportType === 'calisthenics'
                        ? 'کالیستنیکس'
                        : movement.sportType === 'powerlifting'
                        ? 'پاورلیفتینگ'
                        : movement.sportType === 'crossfit'
                        ? 'کراس‌فیت'
                        : 'بدنسازی'}
                    </GlassBadge>
                  </div>
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-md flex items-center justify-center text-[#0066FF]">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-slate-900 leading-snug">{movement.title}</h3>
                {movement.titleEn && (
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">{movement.titleEn}</p>
                )}
                {movement.description && (
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{movement.description}</p>
                )}
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">شناسه: #{movement.id}</span>
                {onSelectMovement && (
                  <GlassButton
                    size="sm"
                    variant="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectMovement(movement);
                    }}
                  >
                    افزودن به برنامه
                  </GlassButton>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};
