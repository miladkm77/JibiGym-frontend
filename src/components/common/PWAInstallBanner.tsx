import React, { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { GlassButton } from './GlassButton';
import { Download, Share, X, Smartphone } from 'lucide-react';

export const PWAInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSTip, setShowIOSTip] = useState(false);

  useEffect(() => {
    // Check if already in standalone PWA mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      setShowBanner(false);
      return;
    }

    // Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isAppleDevice);

    // Listen for Chrome/Android install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // On mobile web, show install banner after 3 seconds if not installed
    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem('jibigym_pwa_dismissed');
      if (!dismissed) {
        setShowBanner(true);
      }
    }, 2500);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSTip(true);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setShowIOSTip(false);
    localStorage.setItem('jibigym_pwa_dismissed', 'true');
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 max-w-md mx-auto z-50 animate-in slide-in-from-bottom-4 text-right">
      <GlassCard className="p-3.5 bg-white/95 backdrop-blur-2xl border-blue-200 shadow-2xl flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/icon-192.png"
              alt="JibiGym"
              className="w-11 h-11 rounded-2xl shadow-sm border border-slate-100 shrink-0"
            />
            <div>
              <h4 className="text-xs font-black text-slate-900">نصب اپلیکیشن جیبی‌جیم (PWA)</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                دسترسی سریع، بدون نیاز به اپ‌استور و با کارکرد آفلاین
              </p>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {showIOSTip ? (
          <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-blue-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <Share className="w-4 h-4 text-[#0066FF]" />
              نحوه نصب در آیفون (iOS):
            </p>
            <p className="text-[11px] leading-relaxed">
              در نوار پایین مرورگر سافاری روی دکمه <strong>Share (اشتراک‌گذاری)</strong> بزنید و گزینه <strong>Add to Home Screen (افزودن به صفحه اصلی)</strong> را انتخاب کنید.
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2 pt-1">
            <GlassButton
              variant="primary"
              size="sm"
              className="flex-1 justify-center shadow-md shadow-blue-500/20"
              onClick={handleInstallClick}
              icon={<Download className="w-4 h-4" />}
            >
              نصب روی گوشی
            </GlassButton>
            <GlassButton
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
            >
              بعداً
            </GlassButton>
          </div>
        )}
      </GlassCard>
    </div>
  );
};
