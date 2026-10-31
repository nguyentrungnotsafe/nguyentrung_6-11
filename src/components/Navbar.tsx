import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Lock, Heart, MapPin, MessageSquareHeart, Sparkles, Image as ImageIcon } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { CAT_STICKERS } from '../utils/birthday';

interface NavbarProps {
  onLock: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLock }) => {
  const [isMuted, setIsMuted] = useState(soundManager.isMuted);
  const [isPlayingMelody, setIsPlayingMelody] = useState(soundManager.getMelodyState());

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    setIsPlayingMelody(soundManager.getMelodyState());
  };

  const handleToggleMelody = () => {
    soundManager.playPop();
    soundManager.playBirthdayMelody();
    setIsPlayingMelody(soundManager.getMelodyState());
  };

  const scrollTo = (id: string) => {
    soundManager.playPop();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-blue-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div
          onClick={() => {
            soundManager.playMeow();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="relative">
            <img
              src={CAT_STICKERS[0].src}
              alt="Cat Sticker"
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-300 shadow-xs group-hover:scale-105 group-hover:rotate-6 transition-transform"
            />
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm sm:text-base text-blue-950 font-cute tracking-tight group-hover:text-blue-600 transition-colors">
                Nguyễn Thành Trung
              </span>
              <span className="bg-blue-100 text-blue-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md border border-blue-200">
                9C2
              </span>
            </div>
            <p className="text-[11px] text-blue-500 font-medium hidden sm:block">
              Sinh nhật 06/11/2012 🎂 Nam Tiền Hải
            </p>
          </div>
        </div>

        {/* Quick Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-blue-700">
          <button
            onClick={() => scrollTo('intro')}
            className="px-3 py-1.5 rounded-xl hover:bg-blue-50 hover:text-blue-900 transition-colors cursor-pointer"
          >
            Giới thiệu
          </button>
          <button
            onClick={() => scrollTo('countdown')}
            className="px-3 py-1.5 rounded-xl hover:bg-blue-50 hover:text-blue-900 transition-colors cursor-pointer"
          >
            Đếm ngược
          </button>
          <button
            onClick={() => scrollTo('map')}
            className="px-3 py-1.5 rounded-xl hover:bg-blue-50 hover:text-blue-900 transition-colors cursor-pointer flex items-center gap-1"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Địa chỉ Map</span>
          </button>
          <button
            onClick={() => scrollTo('wishes')}
            className="px-3 py-1.5 rounded-xl hover:bg-blue-50 hover:text-blue-900 transition-colors cursor-pointer flex items-center gap-1"
          >
            <MessageSquareHeart className="w-3.5 h-3.5 text-rose-500" />
            <span>Gửi lời chúc</span>
          </button>
          <button
            onClick={() => scrollTo('stickers')}
            className="px-3 py-1.5 rounded-xl hover:bg-blue-50 hover:text-blue-900 transition-colors cursor-pointer flex items-center gap-1"
          >
            <ImageIcon className="w-3.5 h-3.5 text-sky-500" />
            <span>Sticker Mèo</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Music Box Happy Birthday */}
          <button
            onClick={handleToggleMelody}
            title={isPlayingMelody ? 'Dừng nhạc sinh nhật' : 'Bật nhạc hộp quà Happy Birthday'}
            className={`p-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
              isPlayingMelody
                ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs animate-pulse'
                : 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700'
            }`}
          >
            <Music className={`w-4 h-4 ${isPlayingMelody ? 'text-amber-600 animate-spin' : 'text-blue-600'}`} />
            <span className="hidden sm:inline text-xs font-bold">
              {isPlayingMelody ? 'Đang phát...' : 'Nhạc Happy Birthday'}
            </span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? 'Bật âm thanh hiệu ứng' : 'Tắt âm thanh'}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isMuted
                ? 'bg-slate-100 text-slate-400 border-slate-200'
                : 'bg-sky-50 hover:bg-sky-100 text-sky-700 border-sky-200'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Re-lock */}
          <button
            onClick={() => {
              soundManager.playPop();
              onLock();
            }}
            title="Khóa lại màn hình bí mật"
            className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl transition-all cursor-pointer"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
