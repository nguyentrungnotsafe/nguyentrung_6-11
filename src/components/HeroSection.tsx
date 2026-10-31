import React from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, PartyPopper, Cake, Star, Award, School } from 'lucide-react';
import { CAT_STICKERS, TRUNG_BIRTHDAY_INFO } from '../utils/birthday';
import { soundManager } from '../utils/audio';

export const HeroSection: React.FC = () => {
  const triggerConfetti = () => {
    soundManager.playSparkle();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#3b82f6', '#60a5fa', '#93c5fd', '#38bdf8', '#f43f5e', '#fbbf24']
    });
  };

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-blue-300/30 to-sky-200/40 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/90 text-blue-800 text-xs sm:text-sm font-bold border border-blue-200/80 shadow-xs animate-bounce-cute">
            <Cake className="w-4 h-4 text-blue-600" />
            <span>Kỷ Niệm Sinh Nhật 06 Tháng 11</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-blue-950 font-cute tracking-tight leading-tight">
            Happy Birthday <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600">
              Nguyễn Thành Trung
            </span>
          </h1>

          <p className="text-base sm:text-lg text-blue-800/80 font-medium max-w-xl mx-auto leading-relaxed">
            Chào mừng bạn đến với góc nhỏ mừng sinh nhật tuổi mới của chàng trai lớp 9C2 – luôn vui vẻ, yêu mèo và quyết tâm đỗ vào{' '}
            <span className="font-bold text-blue-900 underline decoration-sky-400 decoration-wavy">
              THPT Nam Tiền Hải
            </span>
            !
          </p>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-blue-700 rounded-xl text-xs sm:text-sm font-semibold border border-blue-200 shadow-xs">
              <School className="w-4 h-4 text-blue-600" /> Lớp 9C2
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-sky-700 rounded-xl text-xs sm:text-sm font-semibold border border-sky-200 shadow-xs">
              <Cake className="w-4 h-4 text-sky-600" /> 06/11/2012
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-indigo-700 rounded-xl text-xs sm:text-sm font-semibold border border-indigo-200 shadow-xs">
              <Award className="w-4 h-4 text-indigo-600" /> Mục tiêu Nam Tiền Hải
            </span>
          </div>

          {/* Interactive Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => {
                soundManager.playPop();
                document.getElementById('wishes')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold shadow-lg shadow-blue-500/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Gửi Lời Chúc Cho Trung</span>
            </button>

            <button
              onClick={triggerConfetti}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-blue-50 text-blue-700 font-bold border-2 border-blue-200 hover:border-blue-300 shadow-sm active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <PartyPopper className="w-4 h-4 text-amber-500" />
              <span>Bắn Pháo Hoa 🎊</span>
            </button>
          </div>
        </div>

        {/* Hero Interactive Floating Cat Stickers Showcase */}
        <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {CAT_STICKERS.slice(0, 4).map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => {
                soundManager.playMeow();
                confetti({
                  particleCount: 20,
                  spread: 40,
                  origin: { y: 0.7 }
                });
              }}
              className={`p-3 bg-white/90 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group text-center ${
                idx % 2 === 0 ? 'animate-float-slow' : 'animate-float-reverse'
              }`}
            >
              <div className="relative aspect-square rounded-xl overflow-hidden mb-2 border border-blue-100 group-hover:ring-2 group-hover:ring-blue-400 transition-all">
                <img
                  src={cat.src}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <span className="absolute top-1.5 right-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-white/90 text-blue-700 border border-blue-100">
                  {cat.badge}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-blue-950 font-cute truncate">
                {cat.name}
              </h4>
              <p className="text-[11px] text-blue-600/80 truncate mt-0.5">
                Chạm để meo meo 🐾
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
