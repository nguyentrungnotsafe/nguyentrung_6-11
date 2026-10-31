/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { LockScreen } from './components/LockScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProfileSection } from './components/ProfileSection';
import { CountdownSection } from './components/CountdownSection';
import { MapSection } from './components/MapSection';
import { WishesSection } from './components/WishesSection';
import { CatGallery } from './components/CatGallery';
import { Footer } from './components/Footer';
import { CAT_STICKERS } from './utils/birthday';
import { soundManager } from './utils/audio';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('autostart') === '1') {
        return true;
      }
      return localStorage.getItem('trung_birthday_unlocked') === 'true';
    }
    return false;
  });

  const [activeFloatingMascot, setActiveFloatingMascot] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
    localStorage.setItem('trung_birthday_unlocked', 'true');
  };

  const handleLock = () => {
    setIsUnlocked(false);
    localStorage.removeItem('trung_birthday_unlocked');
  };

  const handleMascotClick = () => {
    soundManager.playMeow();
    setActiveFloatingMascot(true);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { x: 0.9, y: 0.9 }
    });
    setTimeout(() => setActiveFloatingMascot(false), 2000);
  };

  if (!isUnlocked) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return (
    <div className="min-h-screen bg-[#f0f7ff] text-blue-950 flex flex-col selection:bg-blue-200 selection:text-blue-900">
      {/* Top Navbar */}
      <Navbar onLock={handleLock} />

      {/* Main Page Content */}
      <main className="flex-1">
        <HeroSection />
        <ProfileSection />
        <CountdownSection />
        <MapSection />
        <WishesSection />
        <CatGallery />
      </main>

      {/* Floating Interactive Cat Mascot Button */}
      <aside aria-label="Mèo cưng trợ lý" className="fixed bottom-5 right-5 z-30">
        <div className="relative group">
          {activeFloatingMascot && (
            <div className="absolute bottom-16 right-0 bg-white text-blue-900 text-xs font-bold px-3 py-1.5 rounded-2xl shadow-xl border border-blue-200 whitespace-nowrap animate-bounce-cute">
              Meo meo~ Chúc Trung vui vẻ! 🐾
            </div>
          )}
          <button
            type="button"
            onClick={handleMascotClick}
            title="Chạm vào mèo để meo meo và bắn tim!"
            aria-label="Chạm vào mèo để meo meo"
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-blue-300 shadow-xl p-1 hover:scale-110 active:scale-95 transition-all overflow-hidden cursor-pointer ring-4 ring-blue-100"
          >
            <img
              src={CAT_STICKERS[0].src}
              alt="Mascot Mèo"
              className="w-full h-full object-cover rounded-xl"
            />
          </button>
        </div>
      </aside>

      {/* Footer */}
      <Footer />
    </div>
  );
}
