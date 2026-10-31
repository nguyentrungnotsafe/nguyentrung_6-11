import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Smile, Volume2 } from 'lucide-react';
import { CAT_STICKERS } from '../utils/birthday';
import { soundManager } from '../utils/audio';

export const CatGallery: React.FC = () => {
  const [activeCatId, setActiveCatId] = useState<string | null>(null);

  const handleCatClick = (catId: string) => {
    setActiveCatId(catId);
    soundManager.playMeow();
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.7 }
    });
  };

  return (
    <section id="stickers" className="py-10 sm:py-16 bg-white relative">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Phòng Trưng Bày Sticker Mèo Cưng</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-950 font-cute">
            Bộ Sưu Tập Sticker Mèo Của Trung 🐱
          </h2>

          <p className="text-blue-600/80 text-xs sm:text-sm max-w-lg mx-auto mt-2">
            Chạm vào từng chú mèo để nghe tiếng meo meo siêu đáng yêu và nhận thông điệp sinh nhật thú vị nha!
          </p>
        </div>

        {/* Gallery Grid of 7 Cats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CAT_STICKERS.map((cat) => {
            const isActive = activeCatId === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => handleCatClick(cat.id)}
                className={`bg-blue-50/50 hover:bg-white rounded-3xl p-3.5 sm:p-4 border-2 transition-all cursor-pointer group relative flex flex-col justify-between ${
                  isActive
                    ? 'border-blue-500 shadow-xl scale-102 ring-4 ring-blue-200'
                    : 'border-blue-100 hover:border-blue-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 border border-blue-100 bg-white shadow-inner">
                  <img
                    src={cat.src}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/95 text-blue-800 shadow-xs border border-blue-100">
                    {cat.badge}
                  </span>
                  <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2 bg-white/90 rounded-full shadow-md text-blue-600">
                      <Volume2 className="w-4 h-4 animate-bounce-cute" />
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-blue-950 font-cute truncate">
                    {cat.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                    {cat.caption}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-blue-100/80">
                  <span className="text-[11px] text-blue-700 font-medium block italic">
                    "{cat.meowQuote}"
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
