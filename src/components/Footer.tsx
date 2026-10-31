import React from 'react';
import { ArrowUp } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundManager.playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-blue-900 to-slate-950 text-white pt-12 pb-8 border-t border-blue-800">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-blue-800/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold font-cute tracking-tight text-white">
                Nguyễn Thành Trung
              </span>
              <span className="bg-blue-600 text-sky-100 text-xs font-bold px-2 py-0.5 rounded-md border border-blue-400">
                Lớp 9C2
              </span>
            </div>
            <p className="text-xs sm:text-sm text-sky-200/80 mt-1">
              Website kỷ niệm sinh nhật 06/11/2012 • Chúc ước mơ đỗ THPT Nam Tiền Hải thành hiện thực!
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-2 text-xs font-bold cursor-pointer group"
          >
            <span>Lên đầu trang</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mandatory Copyright exact requirement */}
        <div className="pt-6 text-center">
          <p className="text-xs sm:text-sm text-sky-200/90 font-medium tracking-wide">
            © 2026 nguyentrung_notsafe. All rights reserved .
          </p>
        </div>
      </div>
    </footer>
  );
};
