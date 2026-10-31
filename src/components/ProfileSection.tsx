import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  GraduationCap,
  Calendar,
  Heart,
  Target,
  Sparkles,
  Quote,
  CheckCircle2,
  Trophy,
  Flame
} from 'lucide-react';
import { TRUNG_BIRTHDAY_INFO, CAT_STICKERS } from '../utils/birthday';
import { soundManager } from '../utils/audio';

export const ProfileSection: React.FC = () => {
  const [wishSupportCount, setWishSupportCount] = useState(99);
  const [hasCheered, setHasCheered] = useState(false);

  const handleCheerWish = () => {
    soundManager.playSparkle();
    setWishSupportCount((prev) => prev + 1);
    setHasCheered(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#fb7185', '#3b82f6', '#f59e0b']
    });
  };

  return (
    <section id="intro" className="py-10 sm:py-14 bg-white/70 relative">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <User className="w-3.5 h-3.5" />
            <span>Hồ Sơ Cá Nhân & Giới Thiệu</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-950 font-cute">
            Về Tôi – Nguyễn Thành Trung
          </h2>
          <p className="text-blue-600/90 text-sm max-w-lg mx-auto mt-2">
            Một chút thông tin về bản thân, những tình cảm yêu thương gửi đến bố mẹ, bạn bè và ước mơ lớn nhất năm học này!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Profile Card & Quick Stats (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-gradient-to-b from-blue-500 to-sky-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
              {/* Decorative circle */}
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-36 h-36 rounded-full bg-white/10 blur-md pointer-events-none" />

              <div className="flex flex-col items-center text-center relative z-10">
                <div className="relative group cursor-pointer mb-4" onClick={() => soundManager.playMeow()}>
                  <img
                    src={CAT_STICKERS[4].src}
                    alt="Nguyễn Thành Trung Avatar Mèo"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-white/70 shadow-2xl group-hover:scale-105 group-hover:rotate-3 transition-transform"
                  />
                  <div className="absolute -bottom-2 bg-white text-blue-800 text-xs font-bold px-3 py-1 rounded-full shadow-md border border-blue-200">
                    Nguyễn Thành Trung
                  </div>
                </div>

                <h3 className="text-xl font-bold font-cute mt-2">
                  Nguyễn Thành Trung
                </h3>
                <p className="text-sky-100 text-xs font-medium">
                  Học sinh Lớp 9C2 • Niên khóa 2025 - 2026
                </p>

                {/* Profile Grid */}
                <div className="w-full grid grid-cols-2 gap-2 mt-5 text-left text-xs">
                  <div className="bg-white/15 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
                    <span className="text-sky-200 block text-[11px]">Họ và tên</span>
                    <strong className="text-white text-sm font-bold block mt-0.5">
                      {TRUNG_BIRTHDAY_INFO.fullName}
                    </strong>
                  </div>

                  <div className="bg-white/15 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
                    <span className="text-sky-200 block text-[11px]">Lớp</span>
                    <strong className="text-white text-sm font-bold block mt-0.5 flex items-center gap-1">
                      <GraduationCap className="w-4 h-4 text-sky-200" />
                      {TRUNG_BIRTHDAY_INFO.schoolClass}
                    </strong>
                  </div>

                  <div className="bg-white/15 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
                    <span className="text-sky-200 block text-[11px]">Ngày sinh</span>
                    <strong className="text-white text-sm font-bold block mt-0.5 flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-sky-200" />
                      {TRUNG_BIRTHDAY_INFO.birthDateStr}
                    </strong>
                  </div>

                  <div className="bg-white/15 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
                    <span className="text-sky-200 block text-[11px]">Cung hoàng đạo</span>
                    <strong className="text-white text-sm font-bold block mt-0.5">
                      Bọ Cạp ♏ (Scorpio)
                    </strong>
                  </div>
                </div>

                <div className="w-full mt-4 pt-3 border-t border-white/20 text-center">
                  <p className="text-[12px] text-sky-100 italic">
                    "Hạnh phúc là mỗi ngày được học hỏi, vui đùa cùng bạn bè và nuôi dưỡng ước mơ bay xa!"
                  </p>
                </div>
              </div>
            </div>

            {/* Cat Mascot Mini Card */}
            <div className="bg-white p-4 rounded-3xl border border-blue-100 shadow-sm flex items-center gap-3">
              <img
                src={CAT_STICKERS[3].src}
                alt="Cat Sticker"
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-200"
                onClick={() => soundManager.playMeow()}
              />
              <div className="flex-1">
                <h4 className="text-xs font-bold text-blue-900 font-cute">
                  Góc Sticker Mèo Yêu Thích 🐱
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Bộ sưu tập sticker mèo tròn trĩnh cưng xỉu giúp tiếp thêm 200% năng lượng học tập!
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Love Message & The Big Wish (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Heartfelt Letter to Parents & Friends */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-blue-100 shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3 text-rose-500">
                <div className="p-2 bg-rose-50 rounded-xl">
                  <Heart className="w-5 h-5 fill-rose-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-950 font-cute">
                    Lời Yêu Thương Gửi Bố Mẹ & Bạn Bè
                  </h3>
                  <span className="text-xs text-slate-500">
                    Từ tận đáy lòng của con / của Trung ❤️
                  </span>
                </div>
              </div>

              <div className="relative mt-4 pl-4 border-l-4 border-rose-300 bg-rose-50/40 p-4 rounded-2xl">
                <Quote className="w-6 h-6 text-rose-300 absolute -top-3 -left-3 bg-white rounded-full p-1 border border-rose-200" />
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic">
                  "{TRUNG_BIRTHDAY_INFO.messageToParentsAndFriends}"
                </p>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-2 text-blue-800 font-bold text-xs mb-1">
                    <Heart className="w-3.5 h-3.5 fill-blue-500 text-blue-500" />
                    <span>Gửi Bố Mẹ Yêu Thương:</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    Cảm ơn bố mẹ đã luôn thức khuya dậy sớm vì con, luôn ủng hộ mọi ước mơ và là bến đỗ bình yên nhất!
                  </p>
                </div>

                <div className="p-3 bg-sky-50/70 rounded-2xl border border-sky-100">
                  <div className="flex items-center gap-2 text-sky-800 font-bold text-xs mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Gửi Tập Thể Lớp 9C2:</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    Những năm tháng cấp 2 bên nhau là thanh xuân rực rỡ nhất! Cảm ơn các bạn đã luôn kề vai sát cánh!
                  </p>
                </div>
              </div>
            </div>

            {/* The Big Birthday Wish Card: THPT Nam Tiền Hải :>> */}
            <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-100 rounded-3xl p-6 sm:p-7 border-2 border-blue-200/80 shadow-xl relative overflow-hidden">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold shadow-xs">
                    <Target className="w-3.5 h-3.5 text-amber-300" />
                    <span>Điều Ước Sinh Nhật Lớn Nhất</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-cute mt-2">
                    {TRUNG_BIRTHDAY_INFO.wish}
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-800 font-medium pt-1">
                    Mục tiêu số 1: Trở thành học sinh khóa mới của trường THPT Nam Tiền Hải – Thái Bình!
                  </p>
                </div>

                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-md border-2 border-blue-200 p-2 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                </div>
              </div>

              {/* Progress Milestones Checklist */}
              <div className="mt-5 space-y-2 bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-blue-100">
                <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Kế hoạch hành động để biến điều ước thành hiện thực:</span>
                </h4>
                <ul className="text-xs text-slate-700 space-y-2 pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Chăm chỉ ôn luyện Toán, Ngữ Văn, Tiếng Anh lớp 9 vững chắc.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Giải đề thi vào 10 các năm của Thái Bình thật đều đặn.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Giữ vững tinh thần quyết tâm, tự tin bước vào cánh cổng Nam Tiền Hải!</span>
                  </li>
                </ul>
              </div>

              {/* Interactive Wish Cheering Button */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="text-xs text-blue-700 font-medium">
                  Đã có <strong className="text-base text-blue-950 font-bold">{wishSupportCount}</strong> người gửi lời chúc may mắn!
                </div>

                <button
                  type="button"
                  onClick={handleCheerWish}
                  className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer ${
                    hasCheered
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                  }`}
                >
                  <Flame className="w-4 h-4 text-amber-300" />
                  <span>{hasCheered ? 'Đã Tiếp Lửa 100% ✨' : 'Tiếp Lửa Cho Trung Đỗ Nam Tiền Hải!'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
