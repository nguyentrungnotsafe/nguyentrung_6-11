import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  MessageSquareHeart,
  Send,
  Heart,
  Sparkles,
  User,
  CheckCircle,
  Clock,
  Trash2,
  Gift,
  Globe2,
  Loader2
} from 'lucide-react';
import { Wish } from '../types';
import { CAT_STICKERS, validateWish } from '../utils/birthday';
import { soundManager } from '../utils/audio';
import {
  subscribeToWishes,
  sendCloudWish,
  likeCloudWish,
  deleteCloudWish
} from '../utils/firebase';

const LOCAL_STORAGE_KEY = 'trung_birthday_wishes_saved_v3';

export const WishesSection: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch {
        // ignore
      }
    }
    return [];
  });

  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('Bạn thân 9C2');
  const [content, setContent] = useState('');
  const [selectedStickerId, setSelectedStickerId] = useState(CAT_STICKERS[0].id);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

  // Subscribe to real-time Cloud Firestore updates across all devices
  useEffect(() => {
    const unsubscribe = subscribeToWishes((cloudWishes) => {
      setWishes(cloudWishes);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playPop();

    const validation = validateWish(author, content);
    if (!validation.valid) {
      soundManager.playError();
      setFormError(validation.error || 'Vui lòng kiểm tra lại thông tin.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    try {
      await sendCloudWish({
        author: author.trim(),
        role: role.trim() || 'Bạn thân',
        content: content.trim(),
        stickerId: selectedStickerId,
        timestamp: Date.now(),
        likes: 1
      });

      setAuthor('');
      setContent('');
      setJustSubmitted(true);
      soundManager.playSuccess();

      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#fb7185', '#60a5fa', '#34d399', '#facc15']
      });

      setTimeout(() => {
        setJustSubmitted(false);
      }, 4000);
    } catch (err) {
      console.error(err);
      setFormError('Không thể gửi lời chúc lúc này, vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeWish = async (wishId: string) => {
    soundManager.playPop();
    // Optimistic UI update
    setWishes((prev) =>
      prev.map((w) => (w.id === wishId ? { ...w, likes: w.likes + 1 } : w))
    );
    await likeCloudWish(wishId);
  };

  const handleDeleteWish = async (wishId: string) => {
    soundManager.playPop();
    // Optimistic UI update
    setWishes((prev) => prev.filter((w) => w.id !== wishId));
    await deleteCloudWish(wishId);
  };

  const formatWishTime = (ts: number) => {
    const d = new Date(ts);
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${hours}:${minutes} • ${day}/${month}/${year}`;
  };

  const selectedCat = CAT_STICKERS.find((c) => c.id === selectedStickerId) || CAT_STICKERS[0];

  return (
    <section id="wishes" className="py-10 sm:py-16 bg-gradient-to-b from-sky-50/60 via-blue-50/40 to-white relative">
      <div className="max-w-3xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquareHeart className="w-3.5 h-3.5 text-rose-600" />
            <span>Gửi Lời Chúc Của Bạn Thân</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-950 font-cute">
            Gửi Lời Chúc Cho Nguyễn Thành Trung
          </h2>

          <p className="text-blue-600/80 text-xs sm:text-sm max-w-md mx-auto mt-2">
            Lời chúc được lưu trữ trực tuyến trên đám mây – mọi người ở mọi thiết bị đều có thể xem cùng nhau! ✨
          </p>
        </div>

        {/* Wish Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-200/90 shadow-xl relative">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-blue-100">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-blue-950 font-cute">
                  Viết Lời Chúc Mừng Sinh Nhật
                </h3>
                <span className="text-xs text-blue-500">
                  Gửi gắm tình cảm thân thương đến Trung 🐾
                </span>
              </div>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
              <Globe2 className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>Đám mây trực tuyến</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Sender Name */}
            <div>
              <label htmlFor="wishAuthor" className="block text-xs font-bold text-blue-900 mb-1 ml-1">
                Tên của bạn: <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="wishAuthor"
                  type="text"
                  required
                  placeholder="Nhập tên của bạn..."
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value);
                    if (formError) setFormError('');
                  }}
                  className="w-full pl-10 pr-3 py-2.5 bg-blue-50/50 focus:bg-white border border-blue-200 focus:border-blue-500 rounded-xl text-blue-950 text-sm outline-none transition-all"
                />
              </div>
            </div>

            {/* Relationship / Role */}
            <div>
              <label htmlFor="wishRole" className="block text-xs font-bold text-blue-900 mb-1 ml-1">
                Bạn là:
              </label>
              <select
                id="wishRole"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2.5 bg-blue-50/50 focus:bg-white border border-blue-200 focus:border-blue-500 rounded-xl text-blue-950 text-sm outline-none transition-all cursor-pointer"
              >
                <option value="Bạn thân 9C2">Bạn thân 9C2 🎓</option>
                <option value="Bạn cùng bàn">Bạn cùng bàn 📚</option>
                <option value="Cạ cứng Tiền Hải">Cạ cứng Tiền Hải 🌊</option>
                <option value="Người anh em">Người anh em 👊</option>
                <option value="Tập thể lớp 9C2">Tập thể lớp 9C2 🌟</option>
                <option value="Người thân trong gia đình">Người thân trong gia đình 👨‍👩‍👦</option>
                <option value="Người hâm mộ">Người hâm mộ 💌</option>
              </select>
            </div>

            {/* Sticker Selector */}
            <div>
              <label className="block text-xs font-bold text-blue-900 mb-1.5 ml-1">
                Chọn sticker mèo kèm lời chúc:
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {CAT_STICKERS.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      soundManager.playPop();
                      setSelectedStickerId(cat.id);
                    }}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all p-0.5 cursor-pointer ${
                      selectedStickerId === cat.id
                        ? 'border-blue-600 ring-2 ring-blue-300 scale-105 shadow-sm'
                        : 'border-slate-200 hover:border-blue-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={cat.src}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </button>
                ))}
              </div>
              <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-blue-600 font-medium">
                <span>Đã chọn:</span>
                <strong className="text-blue-950">{selectedCat.name}</strong>
                <span>({selectedCat.badge})</span>
              </div>
            </div>

            {/* Wish Description */}
            <div>
              <label htmlFor="wishContent" className="block text-xs font-bold text-blue-900 mb-1 ml-1">
                Miêu tả lời chúc: <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="wishContent"
                rows={3}
                required
                placeholder="Viết lời chúc sinh nhật dành cho Trung..."
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  if (formError) setFormError('');
                }}
                className="w-full p-3 bg-blue-50/50 focus:bg-white border border-blue-200 focus:border-blue-500 rounded-xl text-blue-950 text-sm outline-none transition-all resize-none"
              />
            </div>

            {/* Error feedback */}
            {formError && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-600 font-medium animate-bounce-cute">
                {formError}
              </div>
            )}

            {/* Submit Success feedback toast */}
            {justSubmitted && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-semibold flex items-center gap-2 animate-fadeIn">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Lời chúc của bạn đã được lưu lên đám mây thành công! Mọi người ở máy khác đều xem được ngay! 🎉</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-sky-600 to-blue-700 hover:from-blue-700 hover:to-sky-700 text-white font-bold rounded-2xl shadow-md shadow-blue-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang lưu lên đám mây...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Gửi Lời Chúc Cho Trung</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Saved Wishes List that PERSISTS across all devices & refreshes */}
        {wishes.length > 0 && (
          <div className="mt-8 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-blue-600" />
                <h3 className="text-base sm:text-lg font-bold text-blue-950 font-cute">
                  Lời Chúc Bạn Bè Đã Gửi ({wishes.length})
                </h3>
              </div>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1">
                <Globe2 className="w-3 h-3 text-emerald-600" />
                <span>Đồng bộ mọi thiết bị ✨</span>
              </span>
            </div>

            <div className="space-y-3">
              {wishes.map((wish) => {
                const sticker = CAT_STICKERS.find((c) => c.id === wish.stickerId) || CAT_STICKERS[0];
                return (
                  <div
                    key={wish.id}
                    className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-blue-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-3.5 items-start relative group"
                  >
                    {/* Attached Cat Sticker Avatar */}
                    <div
                      className="relative shrink-0 cursor-pointer"
                      onClick={() => soundManager.playMeow()}
                      title="Bấm để nghe mèo meo meo"
                    >
                      <img
                        src={sticker.src}
                        alt={sticker.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover ring-2 ring-blue-200 group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute -bottom-1 -right-1 text-[9px] font-bold px-1 rounded-md bg-sky-100 text-sky-800 border border-sky-200">
                        {sticker.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 w-full">
                      <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-blue-950 font-cute">
                            {wish.author}
                          </h4>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                            {wish.role || 'Bạn thân'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatWishTime(wish.timestamp)}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteWish(wish.id)}
                            title="Xóa lời chúc này"
                            className="text-slate-300 hover:text-rose-500 p-1 rounded-md transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mt-1 whitespace-pre-wrap">
                        {wish.content}
                      </p>

                      {/* Bottom Footer Quote & Like */}
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-sky-600 italic">
                          🐾 "{sticker.meowQuote}"
                        </span>

                        <button
                          type="button"
                          onClick={() => handleLikeWish(wish.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold border border-rose-200 transition-all cursor-pointer active:scale-95"
                        >
                          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                          <span>{wish.likes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
