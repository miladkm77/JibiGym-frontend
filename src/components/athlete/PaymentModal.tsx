import React, { useState } from 'react';
import { ModalSheet } from '../common/ModalSheet';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { GlassBadge } from '../common/GlassBadge';
import { CURRENT_COACH, MOCK_ASSIGNMENT } from '../../data/mockData';
import { CreditCard, Upload, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
}) => {
  const [method, setMethod] = useState<'gateway' | 'card_to_card'>('gateway');
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const handleGatewayPay = () => {
    setLoading(true);
    // Simulate gateway redirect and verification
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
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-glass-glow animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-white">پرداخت با موفقیت ثبت شد</h3>
            <p className="text-xs text-slate-300">
              دسترسی به تمامی روزهای تمرینی این دوره برای شما فعال گردید.
            </p>
          </div>
        ) : (
          <>
            {/* Amount Summary */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">عنوان دوره:</span>
                <span className="text-xs font-bold text-white">{MOCK_ASSIGNMENT.program.title}</span>
              </div>
              <div className="text-left font-mono">
                <span className="text-xs text-slate-400 block">مبلغ قابل پرداخت:</span>
                <span className="text-sm font-bold text-emerald-400">
                  {MOCK_ASSIGNMENT.price.toLocaleString('fa-IR')} تومان
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
                    ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-glass-glow'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                <div className="text-xs font-bold">درگاه پرداخت شتاب</div>
                <div className="text-[10px] opacity-75 mt-0.5">زرین‌پال / فعال‌سازی فوری</div>
              </button>

              <button
                type="button"
                onClick={() => setMethod('card_to_card')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  method === 'card_to_card'
                    ? 'bg-purple-500/20 border-purple-400 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                <Upload className="w-5 h-5 mx-auto mb-1 text-purple-400" />
                <div className="text-xs font-bold">کارت‌به‌کارت</div>
                <div className="text-[10px] opacity-75 mt-0.5">آپلود فیش واریزی</div>
              </button>
            </div>

            {/* Gateway View */}
            {method === 'gateway' && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-300 leading-relaxed">
                  با اتصال امن به درگاه شاپرک/زرین‌پال، پس از پرداخت موفق، دوره تمرینی به‌صورت خودکار در اکانت شما فعال خواهد شد.
                </p>
                <GlassButton
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={loading}
                  onClick={handleGatewayPay}
                  icon={<ShieldCheck className="w-5 h-5" />}
                >
                  انتقال امن به درگاه و پرداخت
                </GlassButton>
              </div>
            )}

            {/* Card-to-Card View */}
            {method === 'card_to_card' && (
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/15 space-y-2">
                  <span className="text-xs text-slate-400 block">اطلاعات حساب مربی:</span>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">نام دارنده:</span>
                    <strong className="text-white">{CURRENT_COACH.cardHolderName}</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">شماره کارت:</span>
                    <strong className="text-emerald-400 tracking-wider">{CURRENT_COACH.cardNumber}</strong>
                  </div>
                </div>

                {/* Upload Area */}
                <div
                  onClick={() => setReceiptUploaded(true)}
                  className={`p-5 rounded-2xl border-2 border-dashed text-center transition-all cursor-pointer ${
                    receiptUploaded
                      ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300'
                      : 'border-white/20 bg-white/5 text-slate-400 hover:border-white/40'
                  }`}
                >
                  <Upload className="w-6 h-6 mx-auto mb-1.5" />
                  <span className="text-xs font-bold block">
                    {receiptUploaded ? 'تصویر فیش انتخاب شد (رسید_بانکی.jpg)' : 'برای انتخاب تصویر فیش کلیک کنید'}
                  </span>
                  <span className="text-[10px] opacity-75 mt-0.5 block">فرمت‌های JPG, PNG حداکثر ۵ مگابایت</span>
                </div>

                <GlassButton
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={!receiptUploaded}
                  loading={loading}
                  onClick={handleCardToCardSubmit}
                  icon={<CheckCircle2 className="w-5 h-5" />}
                >
                  ارسال رسید برای تأیید مربی
                </GlassButton>
              </div>
            )}
          </>
        )}
      </div>
    </ModalSheet>
  );
};
