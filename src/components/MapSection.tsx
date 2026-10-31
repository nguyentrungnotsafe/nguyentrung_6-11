import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, ExternalLink, Compass, Map as MapIcon } from 'lucide-react';
import { TRUNG_BIRTHDAY_INFO, CAT_STICKERS } from '../utils/birthday';
import { soundManager } from '../utils/audio';

export const MapSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const coordsStr = `${TRUNG_BIRTHDAY_INFO.coordinates.latStr} ${TRUNG_BIRTHDAY_INFO.coordinates.lngStr}`;
  const gmapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(coordsStr)}`;
  const embedUrl = `https://maps.google.com/maps?q=${TRUNG_BIRTHDAY_INFO.coordinates.lat},${TRUNG_BIRTHDAY_INFO.coordinates.lng}&hl=vi&z=15&output=embed`;

  const handleCopyCoords = () => {
    soundManager.playPop();
    navigator.clipboard.writeText(coordsStr).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section id="map" className="py-10 sm:py-14 bg-white relative">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5 text-sky-600" />
            <span>Địa Điểm & Bản Đồ Google Maps</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-950 font-cute">
            Tọa Độ Quê Hương
          </h2>

          <p className="text-blue-600/80 text-xs sm:text-sm max-w-lg mx-auto mt-2">
            Xã Hưng Phú, Tỉnh Hưng Yên – nơi gắn liền với tuổi thơ, gia đình và những kỷ niệm thân thương của Trung!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Info Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-3xl p-6 border-2 border-blue-200/80 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-md">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                    Tọa độ chính xác
                  </span>
                  <h3 className="text-lg font-bold text-blue-950 font-cute">
                    {coordsStr}
                  </h3>
                </div>
              </div>

              {/* Coordinates Detail */}
              <div className="space-y-3 text-xs bg-white/90 p-4 rounded-2xl border border-blue-100 shadow-xs">
                <div>
                  <span className="text-slate-500 font-medium block">Vĩ độ (Latitude):</span>
                  <strong className="text-blue-900 font-mono text-sm">
                    {TRUNG_BIRTHDAY_INFO.coordinates.latStr} ({TRUNG_BIRTHDAY_INFO.coordinates.lat})
                  </strong>
                </div>

                <div>
                  <span className="text-slate-500 font-medium block">Kinh độ (Longitude):</span>
                  <strong className="text-blue-900 font-mono text-sm">
                    {TRUNG_BIRTHDAY_INFO.coordinates.lngStr} ({TRUNG_BIRTHDAY_INFO.coordinates.lng})
                  </strong>
                </div>

                <div className="pt-2 border-t border-blue-100">
                  <span className="text-slate-500 font-medium block">Khu vực:</span>
                  <strong className="text-blue-950 text-xs">
                    {TRUNG_BIRTHDAY_INFO.coordinates.address}
                  </strong>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyCoords}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-blue-50 text-blue-700 font-bold border border-blue-300 text-xs shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Đã sao chép tọa độ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Sao chép tọa độ</span>
                    </>
                  )}
                </button>

                <a
                  href={gmapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playPop()}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Mở Google Maps</span>
                </a>
              </div>
            </div>

            {/* Cat guide speech bubble */}
            <div className="bg-sky-50 rounded-2xl p-4 border border-sky-100 flex items-center gap-3">
              <img
                src={CAT_STICKERS[5].src}
                alt="Mèo Hướng Dẫn"
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-sky-300 shrink-0 cursor-pointer"
                onClick={() => soundManager.playMeow()}
              />
              <p className="text-xs text-sky-900 italic leading-relaxed">
                "Đây là tọa độ thân thương ở nhà tớ! Bạn bè nào có dịp ghé thăm nhớ alo cho Trung để cùng đi ăn bánh kem nhó 🐾"
              </p>
            </div>
          </div>

          {/* Embedded Map (7 cols) */}
          <div className="lg:col-span-7 h-full min-h-[340px] sm:min-h-[420px] rounded-3xl overflow-hidden border-2 border-blue-200/90 shadow-xl relative bg-blue-50 flex flex-col">
            <div className="bg-white/90 backdrop-blur-xs px-4 py-2.5 border-b border-blue-100 flex items-center justify-between z-10">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                <MapIcon className="w-4 h-4 text-blue-600" />
                <span>Bản đồ trực quan vệ tinh & đường phố</span>
              </div>
              <span className="text-[11px] font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                Zoom 15x
              </span>
            </div>

            <div className="relative flex-1 w-full h-full">
              <iframe
                title="Bản đồ tọa độ Nguyễn Thành Trung 20°17'58.6N 106°33'56.6E"
                src={embedUrl}
                className="w-full h-full min-h-[300px] border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
