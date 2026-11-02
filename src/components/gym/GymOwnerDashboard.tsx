import React, { useState, useEffect } from 'react';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { GlassBadge } from '../common/GlassBadge';
import { api } from '../../services/api';
import { Gym } from '../../types';
import { Building2, MapPin, Users, Dumbbell, ShieldCheck, Plus, Check, Wrench, Loader2 } from 'lucide-react';

export const GymOwnerDashboard: React.FC = () => {
  const [gym, setGym] = useState<Gym | null>(null);
  const [loading, setLoading] = useState(true);
  const [equipmentList, setEquipmentList] = useState([
    { id: 1, name: 'رک‌های اسکات و پاورکیج المپیک', status: 'active', count: 4 },
    { id: 2, name: 'میزهای پرس سینه تخت، بالا سینه و زیر سینه', status: 'active', count: 6 },
    { id: 3, name: 'سازه اختصاصی کراسفیت و دارحلقه', status: 'active', count: 1 },
    { id: 4, name: 'میله‌های بارفیکس گریپ‌دار کالیستنیکس', status: 'active', count: 3 },
    { id: 5, name: 'دستگاه جلوپا و پشت‌پا سیم‌کش ماتریکس', status: 'maintenance', count: 2 },
    { id: 6, name: 'سکوی ددلیفت جذب ارتعاش', status: 'active', count: 2 },
  ]);

  useEffect(() => {
    loadGymData();
  }, []);

  const loadGymData = async () => {
    setLoading(true);
    try {
      const gyms = await api.getGyms();
      if (gyms.length > 0) {
        setGym(gyms[0]);
      }
    } catch (err) {
      console.error('Failed to load gym data:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleEquipmentStatus = (id: number) => {
    setEquipmentList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'active' ? 'maintenance' : 'active' }
          : item
      )
    );
  };

  if (loading || !gym) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-[#0066FF]" />
        <span className="text-sm">در حال بارگذاری اطلاعات باشگاه از دیتابیس سرور...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 text-right">
      {/* Gym Banner */}
      <GlassCard className="p-5" variant="highlight">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shadow-sm shrink-0">
              <img
                src={gym.avatarUrl || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300'}
                alt={gym.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black text-slate-900">{gym.name}</h1>
                <GlassBadge variant="blue" size="sm">
                  {gym.isVerified ? 'باشگاه تأییدشده' : 'در انتظار تأیید'}
                </GlassBadge>
              </div>
              <p className="text-xs text-slate-600 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                <span>{gym.address}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <GlassButton variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
              ثبت مربی جدید در باشگاه
            </GlassButton>
          </div>
        </div>
      </GlassCard>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <GlassCard className="p-4 text-center">
          <span className="text-[11px] text-slate-500 block">ورزشکاران فعال</span>
          <span className="text-xl font-black font-mono text-[#0066FF] mt-1 block">
            {gym.activeAthletesCount || 120}
          </span>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <span className="text-[11px] text-slate-500 block">مربیان همکار</span>
          <span className="text-xl font-black font-mono text-slate-900 mt-1 block">
            {gym.activeCoachesCount || 8}
          </span>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <span className="text-[11px] text-slate-500 block">تجهیزات عملیاتی</span>
          <span className="text-xl font-black font-mono text-emerald-600 mt-1 block">
            {equipmentList.filter((e) => e.status === 'active').length}
          </span>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <span className="text-[11px] text-slate-500 block">در حال تعمیر / کالیبراسیون</span>
          <span className="text-xl font-black font-mono text-orange-600 mt-1 block">
            {equipmentList.filter((e) => e.status === 'maintenance').length}
          </span>
        </GlassCard>
      </div>

      {/* Equipment List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-[#0066FF]" />
            مدیریت سلامت و تعمیرات تجهیزات و دستگاه‌ها
          </h2>
          <span className="text-xs text-slate-500">برای تغییر وضعیت کلیک کنید</span>
        </div>

        <div className="space-y-2">
          {equipmentList.map((item) => (
            <GlassCard
              key={item.id}
              className="p-3.5 flex items-center justify-between cursor-pointer hover:border-slate-300 transition-colors"
              onClick={() => toggleEquipmentStatus(item.id)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    item.status === 'active'
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      : 'bg-orange-50 text-orange-600 border border-orange-200'
                  }`}
                >
                  <Dumbbell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    تعداد دستگاه: {item.count} عدد
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <GlassBadge
                  variant={item.status === 'active' ? 'emerald' : 'orange'}
                  size="sm"
                >
                  {item.status === 'active' ? 'عملیاتی و سالم' : 'نیازمند تعمیر / تعلیق'}
                </GlassBadge>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};
