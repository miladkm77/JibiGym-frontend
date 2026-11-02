import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { GlassBadge } from '../common/GlassBadge';
import { MOCK_GYMS } from '../../data/mockData';
import { Building2, MapPin, Users, Dumbbell, ShieldCheck, Plus, Check, Wrench } from 'lucide-react';

export const GymOwnerDashboard: React.FC = () => {
  const [gym, setGym] = useState(MOCK_GYMS[0]);
  const [equipmentList, setEquipmentList] = useState([
    { id: 1, name: 'رک‌های اسکات و پاورکیج المپیک', status: 'active', count: 4 },
    { id: 2, name: 'میزهای پرس سینه تخت، بالا سینه و زیر سینه', status: 'active', count: 6 },
    { id: 3, name: 'سازه اختصاصی کراسفیت و دارحلقه', status: 'active', count: 1 },
    { id: 4, name: 'میله‌های بارفیکس گریپ‌دار کالیستنیکس', status: 'active', count: 3 },
    { id: 5, name: 'دستگاه جلوپا و پشت‌پا سیم‌کش ماتریکس', status: 'maintenance', count: 2 },
    { id: 6, name: 'سکوی ددلیفت جذب ارتعاش', status: 'active', count: 2 },
  ]);

  const toggleEquipmentStatus = (id: number) => {
    setEquipmentList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'active' ? 'maintenance' : 'active' }
          : item
      )
    );
  };

  return (
    <div className="space-y-6 pb-24 text-right">
      {/* Gym Banner */}
      <GlassCard className="p-5" variant="highlight">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shadow-sm shrink-0">
              <img src={gym.avatarUrl} alt={gym.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black text-slate-900">{gym.name}</h1>
                <GlassBadge variant="blue" size="sm">
                  باشگاه تأییدشده
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
      <div className="grid grid-cols-3 gap-3">
        <GlassCard className="p-4 text-right">
          <span className="text-xs text-slate-500 block mb-1">مربیان فعال</span>
          <div className="text-xl font-black text-slate-900 font-mono">{gym.coachesCount} نفر</div>
          <span className="text-[10px] text-[#0066FF] font-bold">دارای قرارداد فعال</span>
        </GlassCard>

        <GlassCard className="p-4 text-right">
          <span className="text-xs text-slate-500 block mb-1">ورزشکاران عضو</span>
          <div className="text-xl font-black text-sky-600 font-mono">۲۴۰ نفر</div>
          <span className="text-[10px] text-slate-500">سانس‌های اختصاصی</span>
        </GlassCard>

        <GlassCard className="p-4 text-right">
          <span className="text-xs text-slate-500 block mb-1">تجهیزات ثبت‌شده</span>
          <div className="text-xl font-black text-purple-600 font-mono">{equipmentList.length} نوع</div>
          <span className="text-[10px] text-purple-600 font-bold">آماده تمرین</span>
        </GlassCard>
      </div>

      {/* Equipment Inventory Checklist */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-[#0066FF]" />
              مدیریت و پایش دستگاه‌ها و تجهیزات باشگاه
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              وضعیت تجهیزات مستقیماً در حرکات مجاز برای مربیان این باشگاه اثر می‌گذارد.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {equipmentList.map((item) => (
            <GlassCard key={item.id} className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    item.status === 'active'
                      ? 'bg-blue-50 text-[#0066FF] border border-blue-200'
                      : 'bg-orange-50 text-orange-600 border border-orange-200'
                  }`}
                >
                  {item.status === 'active' ? <Check className="w-4 h-4" /> : <Wrench className="w-4 h-4" />}
                </div>

                <div className="text-right">
                  <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">تعداد: {item.count} دستگاه</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <GlassBadge variant={item.status === 'active' ? 'blue' : 'orange'} size="sm">
                  {item.status === 'active' ? 'آماده استفاده' : 'نیاز به سرویس'}
                </GlassBadge>

                <button
                  onClick={() => toggleEquipmentStatus(item.id)}
                  className="text-xs px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-black transition-colors border border-slate-200"
                >
                  تغییر وضعیت
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};
