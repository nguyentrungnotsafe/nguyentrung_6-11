import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Lock, Sparkles, KeyRound, Heart, Gift } from 'lucide-react';
import { validateBirthdayPassword, CAT_STICKERS } from '../utils/birthday';
import { soundManager } from '../utils/audio';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    soundManager.playPop();

    if (validateBirthdayPassword(password)) {
      setErrorMsg('');
      soundManager.playSuccess();
      
      // Burst celebratory confetti
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#60a5fa', '#93c5fd', '#ffffff', '#fb7185']
      });

      // Quick delay to let confetti pop
      setTimeout(() => {
        onUnlock();
      }, 500);
    } else {
      soundManager.playError();
      setIsShaking(true);
      setErrorMsg('Mật khẩu chưa chính xác rồi nè! Thử lại nha meo meo 🐾');
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-sky-50 to-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative floating cute elements */}
      <div className="absolute top-6 left-6 w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-blue-200/50 blur-xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-sky-200/40 blur-2xl pointer-events-none" />

      {/* Floating Cat Sticker corners */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 animate-float-slow">
        <div className="relative group cursor-pointer" onClick={() => soundManager.playMeow()}>
          <img
            src={CAT_STICKERS[0].src}
            alt="Mèo Nơ Hồng"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-lg border-2 border-white ring-2 ring-blue-300 transform -rotate-6 hover:scale-110 transition-transform"
          />
          <span className="absolute -bottom-2 -right-1 bg-pink-100 text-pink-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-pink-200 shadow-xs">
            Meo!
          </span>
        </div>
      </div>

      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 animate-float-reverse">
        <div className="relative group cursor-pointer" onClick={() => soundManager.playMeow()}>
          <img
            src={CAT_STICKERS[6].src}
            alt="Mèo Nơ Xanh"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-lg border-2 border-white ring-2 ring-sky-300 transform rotate-6 hover:scale-110 transition-transform"
          />
          <span className="absolute -bottom-2 -left-1 bg-blue-100 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-blue-200 shadow-xs">
            💙 Hi
          </span>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 hidden sm:block animate-bounce-cute">
        <img
          src={CAT_STICKERS[2].src}
          alt="Mèo Bình Sữa"
          className="w-16 h-16 rounded-2xl object-cover shadow-md border-2 border-white ring-2 ring-blue-200"
          onClick={() => soundManager.playMeow()}
        />
      </div>

      <div className="absolute bottom-6 right-6 hidden sm:block animate-float-slow">
        <img
          src={CAT_STICKERS[5].src}
          alt="Mèo Minion"
          className="w-16 h-16 rounded-2xl object-cover shadow-md border-2 border-white ring-2 ring-yellow-200"
          onClick={() => soundManager.playMeow()}
        />
      </div>

      {/* Main Lock Card */}
      <div
        className={`w-full max-w-md bg-white/90 backdrop-blur-md border border-blue-100 rounded-3xl shadow-2xl p-6 sm:p-8 relative z-10 transition-transform ${
          isShaking ? 'translate-x-[-8px] animate-pulse' : ''
        }`}
      >
        <div className="text-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100/80 text-blue-700 rounded-full text-xs font-semibold mb-4 border border-blue-200">
            <Gift className="w-3.5 h-3.5 text-blue-600" />
            <span>Hộp Quà Sinh Nhật Bí Mật</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
          </div>

          {/* Central Avatar */}
          <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 mb-4">
            <div className="w-full h-full rounded-3xl overflow-hidden ring-4 ring-blue-400/30 shadow-xl border-2 border-white bg-blue-50">
              <img
                src={CAT_STICKERS[1].src}
                alt="Avatar Mèo Sinh Nhật"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-sky-500 text-white p-2 rounded-2xl shadow-md border-2 border-white">
              <Lock className="w-4 h-4" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-blue-950 font-cute tracking-tight">
            Nguyễn Thành Trung
          </h1>
          <p className="text-blue-600 text-sm font-medium mt-1 flex items-center justify-center gap-1">
            <span>🎂 Happy Birthday Website</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span>Lớp 9C2</span>
          </p>

          <p className="text-slate-600 text-xs sm:text-sm mt-3 px-2 leading-relaxed bg-blue-50/70 p-3 rounded-2xl border border-blue-100">
            Xin chào bạn thân mến! Hãy nhập mật khẩu ngày sinh nhật để mở khóa trang web nha 🐾
          </p>
        </div>

        {/* Password Form */}
        <form onSubmit={handleUnlock} className="mt-6 space-y-4">
          <div>
            <label htmlFor="birthdayPassword" className="block text-xs font-semibold text-blue-900 mb-1.5 ml-1">
              Mật khẩu:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-400">
                <KeyRound className="w-5 h-5" />
              </div>
              <input
                id="birthdayPassword"
                type="password"
                autoFocus
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                className="w-full pl-11 pr-4 py-3 bg-blue-50/50 hover:bg-blue-50 focus:bg-white border-2 border-blue-200 focus:border-blue-500 rounded-2xl text-blue-900 placeholder:text-blue-300 font-semibold text-center text-base sm:text-lg tracking-wider outline-none transition-all shadow-inner"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-600 font-medium mt-2 bg-rose-50 p-2 rounded-xl border border-rose-200 text-center animate-bounce-cute">
                {errorMsg}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-sky-600 to-blue-700 hover:from-blue-700 hover:to-sky-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
          >
            <Sparkles className="w-5 h-5" />
            <span>Mở Khóa Trang Web</span>
          </button>
        </form>

        {/* Bottom cute tag */}
        <div className="mt-6 text-center">
          <span className="text-[11px] text-blue-400 font-medium inline-flex items-center gap-1">
            <span>Thiết kế xanh dương & trắng cùng hội bạn thân 9C2</span>
            <Heart className="w-3 h-3 text-red-400 fill-red-400" />
          </span>
        </div>
      </div>
    </div>
  );
};
