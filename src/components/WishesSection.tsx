import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  MessageSquareHeart,
  Send,
  Heart,
  Sparkles,
  User,
  CheckCircle,
  PartyPopper
} from 'lucide-react';
import { Wish } from '../types';
import { CAT_STICKERS, validateWish } from '../utils/birthday';
import { soundManager } from '../utils/audio';

export const WishesSection: React.FC = () => {
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('Bạn thân 9C2');
  const [content, setContent] = useState('');
  const [selectedStickerId, setSelectedStickerId] = useState(CAT_STICKERS[0].id);
  const [formError, setFormError] = useState('');
  const [lastSubmittedWish, setLastSubmittedWish] = useState<Wish | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playPop();

    const validation = validateWish(author, content);
    if (!validation.valid) {
      soundManager.playError();
      setFormError(validation.error || 'Vui lòng kiểm tra lại thông tin.');
      return;
    }

    setFormError('');
    const newWish: Wish = {
      id: `wish-${Date.now()}`,
      author: author.trim(),
      role: role.trim() || 'Bạn thân',
      content: content.trim(),
      stickerId: selectedStickerId,
      timestamp: Date.now(),
      likes: 1
    };

    setLastSubmittedWish(newWish);
    setAuthor('');
    setContent('');
    soundManager.playSuccess();

    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#fb7185', '#60a5fa', '#34d399', '#facc15']
    });
  };

  const selectedCat = CAT_STICKERS.find((c) => c.id === selectedStickerId) || CAT_STICKERS[0];
  const lastWishCat = lastSubmittedWish
    ? CAT_STICKERS.find((c) => c.id === lastSubmittedWish.stickerId) || CAT_STICKERS[0]
    : null;

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
            Điền tên và miêu tả lời chúc ngọt ngào nhất kèm sticker mèo để tiếp thêm năng lượng cho Trung nhé! ✨
          </p>
        </div>

        {/* Wish Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-200/90 shadow-xl relative">
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-blue-100">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-blue-950 font-cute">
                Viết Lời Chúc Mừng Sinh Nhật
              </h3>
              <span className="text-xs text-blue-500">
                Gửi những tình cảm chân thành nhất đến Trung 🐾
              </span>
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-sky-600 to-blue-700 hover:from-blue-700 hover:to-sky-700 text-white font-bold rounded-2xl shadow-md shadow-blue-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Gửi Lời Chúc Cho Trung</span>
            </button>
          </form>

          {/* Success Card when user submits a wish */}
          {lastSubmittedWish && lastWishCat && (
            <div className="mt-6 p-4 sm:p-5 bg-sky-50/90 rounded-2xl border-2 border-sky-200 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Lời chúc của bạn đã được gửi thành công! Cảm ơn bạn rất nhiều! 🎉</span>
              </div>
              <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-sky-100 shadow-xs">
                <img
                  src={lastWishCat.src}
                  alt={lastWishCat.name}
                  className="w-12 h-12 rounded-xl object-cover ring-1 ring-blue-200"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-blue-950">
                    <span>{lastSubmittedWish.author}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                      {lastSubmittedWish.role}
                    </span>
                  </div>
                  <p className="text-slate-700 mt-1 italic leading-relaxed">
                    "{lastSubmittedWish.content}"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
