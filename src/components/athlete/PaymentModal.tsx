import React, { useState } from 'react';
import { ModalSheet } from '../common/ModalSheet';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { GlassBadge } from '../common/GlassBadge';
import { CreditCard, Upload, CheckCircle2, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  programTitle?: string;
  price?: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  programTitle = 'دوره تخصصی هایپرتروفی و حجم عضلانی (۴ روزه)',
  price = 850000,
}) => {
  const [method, setMethod] = useState<'gateway' | 'card_to_card'>('gateway');
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const handleGatewayPay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaymentDone(true);
      setTimeout(() => {
        onPaymentSuccess();
        onClose();
      }, 1500);
    }, 1200);
  };

  const handleCardToCardSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaymentDone(true);
      setTimeout(() => {
        onPaymentSuccess();
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <ModalSheet isOpen={isOpen} onClose={onClose} title="پرداخت شهریه دوره تمرینی">
      <div className="space-y-4 text-right">
        {paymentDone ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-blue-50 text-[#0066FF] border border-blue-200 flex items-center justify-center mx-auto shadow-md animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-slate-900">پرداخت با موفقیت ثبت شد</h3>
            <p className="text-xs text-slate-600">
              دسترسی به تمامی روزهای تمرینی این دوره در سرور دیتابیس برای شما فعال گردید.
            </p>
          </div>
        ) : (
          <>
            {/* Amount Summary */}
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block">عنوان دوره:</span>
                <span className="text-xs font-bold text-slate-900">{programTitle}</span>
              </div>
              <div className="text-left font-mono">
                <span className="text-xs text-slate-500 block">مبلغ قابل پرداخت:</span>
                <span className="text-sm font-bold text-[#0066FF]">
                  {price.toLocaleString('fa-IR')} تومان
                </span>
              </div>
            </div>

            {/* Method Tabs */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMethod('gateway')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  method === 'gateway'
                    ? 'bg-blue-50 border-[#0066FF] text-[#0066FF] shadow-sm font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-black'
                }`}
              >
                <CreditCard className="w-4 h-4 mx-auto mb-1" />
                <span className="text-xs">درگاه آنلاین بانکی</span>
              </button>
              <button
                type="button"
                onClick={() => setMethod('card_to_card')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  method === 'card_to_card'
                    ? 'bg-blue-50 border-[#0066FF] text-[#0066FF] shadow-sm font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-black'
                }`}
              >
                <Upload className="w-4 h-4 mx-auto mb-1" />
                <span className="text-xs">کارت‌به‌کارت و آپلود فیش</span>
              </button>
            </div>

            {method === 'gateway' ? (
              <div className="space-y-4 pt-2">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>اتصال امن به درگاه شاپرک (زرین‌پال / سامان‌کیش)</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    پس از پرداخت، بلافاصله پلیر تمرین و تمام روزها در پنل شما آنلاک می‌شوند.
                  </p>
                </div>

                <GlassButton
                  variant="primary"
                  size="lg"
                  className="w-full justify-center shadow-lg shadow-blue-500/25"
                  onClick={handleGatewayPay}
                  disabled={loading}
                  icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                >
                  {loading ? 'در حال اتصال به درگاه پرداخت...' : `پرداخت آنلاین ${price.toLocaleString('fa-IR')} تومان`}
                </GlassButton>
              </div>
            ) : (
              <div className="space-y-3 pt-2 text-xs">
                {/* Bank Card Info */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-md space-y-2">
                  <span className="text-[10px] text-blue-100 block">شماره کارت مربی (بانک ملی):</span>
                  <p className="text-base font-black font-mono tracking-widest text-center" dir="ltr">
                    6037 - 9975 - 1234 - 5678
                  </p>
                  <div className="flex justify-between items-center text-[11px] text-blue-100 pt-1">
                    <span>به نام: محمدجواد محمدی</span>
                    <span>مبلغ: {price.toLocaleString('fa-IR')} تومان</span>
                  </div>
                </div>

                {/* Upload Receipt UI */}
                <div
                  onClick={() => setReceiptUploaded(!receiptUploaded)}
                  className={`p-4 rounded-2xl border-2 border-dashed text-center transition-colors cursor-pointer ${
                    receiptUploaded
                      ? 'border-emerald-500 bg-emerald-50/50 text-emerald-700'
                      : 'border-slate-300 hover:border-[#0066FF] bg-slate-50/50'
                  }`}
                >
                  <Upload className="w-6 h-6 mx-auto mb-1 text-slate-400" />
                  <span className="text-xs font-bold block">
                    {receiptUploaded ? 'فیش واریزی پیوست گردید ✓' : 'تصویر رسید یا اسکرین‌شات واریز را اینجا آپلود کنید'}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">فرمت JPG یا PNG، حداکثر ۵ مگابایت</span>
                </div>

                <GlassButton
                  variant="primary"
                  size="lg"
                  className="w-full justify-center shadow-lg shadow-blue-500/25"
                  onClick={handleCardToCardSubmit}
                  disabled={loading || !receiptUploaded}
                  icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                >
                  {loading ? 'در حال ثبت در سرور...' : 'ثبت فیش جهت تأیید مربی'}
                </GlassButton>
              </div>
            )}
          </>
        )}
      </div>
    </ModalSheet>
  );
};
