import React from 'react';
import { ModalSheet } from './ModalSheet';
import { GlassBadge } from './GlassBadge';
import { GlassButton } from './GlassButton';
import { Movement } from '../../types';
import { Video, ShieldCheck, Dumbbell, Play, Info } from 'lucide-react';

interface ExerciseDetailModalProps {
  movement: Movement | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  movement,
  isOpen,
  onClose,
}) => {
  if (!movement) return null;

  return (
    <ModalSheet isOpen={isOpen} onClose={onClose} title="راهنمای اجرای صحیح حرکت">
      <div className="space-y-4 text-right">
        {/* Video / Visual Hero */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 flex items-center justify-center">
          {movement.thumbnailUrl ? (
            <img
              src={movement.thumbnailUrl}
              alt={movement.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-slate-400 flex flex-col items-center">
              <Video className="w-10 h-10 mb-2" />
              <span className="text-xs">ویدیو هنوز آپلود نشده است</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Play Icon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-[#0066FF]/90 backdrop-blur-md flex items-center justify-center text-white shadow-lg">
              <Play className="w-6 h-6 fill-white translate-x-[-1px]" />
            </div>
          </div>

          <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-xs">
            <GlassBadge variant="blue" size="sm">
              کیفیت 1080p Full HD
            </GlassBadge>
            <span className="text-white font-mono text-[11px] bg-black/60 px-2 py-0.5 rounded-lg">
              پخش اسلوموشن
            </span>
          </div>
        </div>

        {/* Title and Specs */}
        <div>
          <h2 className="text-base font-black text-slate-900">{movement.title}</h2>
          <p className="text-xs font-mono text-slate-500 mt-0.5">{movement.titleEn}</p>
        </div>

        {/* Tags */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100">
            <span className="text-[10px] text-slate-500 block mb-0.5">عضله هدف اصلی:</span>
            <span className="font-bold text-[#0066FF]">{movement.muscleGroup}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block mb-0.5">تجهیزات مورد نیاز:</span>
            <span className="font-bold text-slate-800">{movement.equipment || 'وزن بدن'}</span>
          </div>
        </div>

        {/* Execution Guidance */}
        <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1">
            <Info className="w-4 h-4 text-[#0066FF]" />
            <span>نکات بیومکانیک و اجرای بی‌خطر:</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {movement.description ||
              'کمر صاف، انقباض متمرکز بر عضله هدف، تنفس منظم (دم هنگام کشش و بازدم هنگام انقباض) و کنترل کامل وزنه در مسیر منفی.'}
          </p>
        </div>

        <GlassButton variant="primary" size="lg" fullWidth onClick={onClose}>
          متوجه شدم
        </GlassButton>
      </div>
    </ModalSheet>
  );
};
