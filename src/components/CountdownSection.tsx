import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Clock, Cake, Sparkles, Hourglass, CalendarHeart, Gift } from 'lucide-react';
import { getBirthdayCountdown, CountdownResult } from '../utils/birthday';
import { soundManager } from '../utils/audio';

export const CountdownSection: React.FC = () => {
  const [countdown, setCountdown] = useState<CountdownResult>(() => getBirthdayCountdown());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getBirthdayCountdown());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerCelebrate = () => {
    soundManager.playSparkle();
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#60a5fa', '#93c5fd', '#f43f5e', '#facc15', '#a855f7']
    });
  };

  return (
    <section id="countdown" className="py-10 sm:py-14 bg-gradient-to-b from-blue-50/50 via-sky-50/80 to-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Đồng Hồ Đếm Ngược Sinh Nhật</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-950 font-cute">
            {countdown.isBirthdayToday
              ? '🎉 Hôm Nay Chính Là Sinh Nhật Của Trung! 🎂'
              : `Đếm Ngược Đến Sinh Nhật 06/11/${countdown.targetYear}`}
          </h2>

          <p className="text-blue-600/80 text-xs sm:text-sm max-w-md mx-auto mt-2">
            {countdown.isBirthdayToday
              ? 'Chúc Nguyễn Thành Trung một ngày sinh nhật ngập tràn hạnh phúc và nhận thật nhiều lời chúc tốt đẹp!'
              : 'Từng giây từng phút trôi qua đều là những khoảnh khắc đáng nhớ của tuổi học trò tươi đẹp!'}
          </p>
        </div>

        {/* Big Countdown Clock Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
          {/* Days */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-blue-200/90 shadow-lg text-center relative overflow-hidden group hover:border-blue-400 transition-all">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-sky-400" />
            <span className="text-3xl sm:text-5xl font-extrabold text-blue-950 font-cute block tracking-tight">
              {String(countdown.days).padStart(2, '0')}
            </span>
            <span className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-wider mt-1 block">
              Ngày
            </span>
          </div>

          {/* Hours */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-blue-200/90 shadow-lg text-center relative overflow-hidden group hover:border-blue-400 transition-all">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 to-cyan-400" />
            <span className="text-3xl sm:text-5xl font-extrabold text-blue-950 font-cute block tracking-tight">
              {String(countdown.hours).padStart(2, '0')}
            </span>
            <span className="text-xs sm:text-sm font-bold text-sky-600 uppercase tracking-wider mt-1 block">
              Giờ
            </span>
          </div>

          {/* Minutes */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-blue-200/90 shadow-lg text-center relative overflow-hidden group hover:border-blue-400 transition-all">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 to-indigo-400" />
            <span className="text-3xl sm:text-5xl font-extrabold text-blue-950 font-cute block tracking-tight">
              {String(countdown.minutes).padStart(2, '0')}
            </span>
            <span className="text-xs sm:text-sm font-bold text-cyan-600 uppercase tracking-wider mt-1 block">
              Phút
            </span>
          </div>

          {/* Seconds */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-blue-200/90 shadow-lg text-center relative overflow-hidden group hover:border-blue-400 transition-all">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-400 to-rose-400" />
            <span className="text-3xl sm:text-5xl font-extrabold text-rose-600 font-cute block tracking-tight animate-pulse">
              {String(countdown.seconds).padStart(2, '0')}
            </span>
            <span className="text-xs sm:text-sm font-bold text-rose-600 uppercase tracking-wider mt-1 block">
              Giây
            </span>
          </div>
        </div>

        {/* Milestone Statistics Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto text-center">
          <div className="bg-white/90 p-3.5 rounded-2xl border border-blue-100 shadow-xs">
            <div className="flex items-center justify-center gap-1.5 text-blue-700 text-xs font-bold mb-1">
              <CalendarHeart className="w-4 h-4 text-rose-500" />
              <span>Cột mốc tuổi</span>
            </div>
            <p className="text-sm font-extrabold text-blue-950">
              Bước sang tuổi {countdown.ageTurning} 🎉
            </p>
          </div>

          <div className="bg-white/90 p-3.5 rounded-2xl border border-blue-100 shadow-xs">
            <div className="flex items-center justify-center gap-1.5 text-blue-700 text-xs font-bold mb-1">
              <Hourglass className="w-4 h-4 text-amber-500" />
              <span>Hành trình trưởng thành</span>
            </div>
            <p className="text-sm font-extrabold text-blue-950">
              ~{countdown.totalDaysLived.toLocaleString('vi-VN')} ngày yêu thương
            </p>
          </div>

          <div className="bg-white/90 p-3.5 rounded-2xl border border-blue-100 shadow-xs">
            <div className="flex items-center justify-center gap-1.5 text-blue-700 text-xs font-bold mb-1">
              <Cake className="w-4 h-4 text-sky-500" />
              <span>Ngày sinh chính xác</span>
            </div>
            <p className="text-sm font-extrabold text-blue-950">
              06 / 11 / 2012
            </p>
          </div>
        </div>

        {/* Interactive Celebrate Button */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={triggerCelebrate}
            className="px-6 py-3 rounded-2xl bg-white hover:bg-blue-50 text-blue-700 font-bold border-2 border-blue-300 shadow-sm hover:shadow-md active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Chúc Mừng Ngay Bằng Pháo Giấy 🎊</span>
          </button>
        </div>
      </div>
    </section>
  );
};
