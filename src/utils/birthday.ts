import { CatSticker, Wish, BirthdayInfo } from '../types';

export const TRUNG_BIRTHDAY_INFO: BirthdayInfo = {
  fullName: 'Nguyễn Thành Trung',
  birthDateStr: '06/11/2012',
  birthDay: 6,
  birthMonth: 11, // November (1-indexed)
  birthYear: 2012,
  schoolClass: '9C2',
  wish: 'Đỗ được THPT Nam Tiền Hải :>>',
  messageToParentsAndFriends:
    'Con xin gửi trọn tình yêu thương và lòng biết ơn sâu sắc nhất tới bố mẹ – những người đã sinh ra con, luôn chăm sóc, yêu thương và dìu dắt con khôn lớn từng ngày. Đồng thời, Trung cũng muốn gửi lời cảm ơn chân thành đến tất cả bạn bè lớp 9C2 và các anh chị em đã luôn bên cạnh, cùng chia sẻ bao kỷ niệm tuổi học trò thật tuyệt vời! ❤️✨',
  coordinates: {
    latStr: `20°17'58.6"N`,
    lngStr: `106°33'56.6"E`,
    lat: 20.299611,
    lng: 106.565722,
    address: 'Xã Hưng Phú, Tỉnh Hưng Yên',
    nearSchool: 'Khu vực THPT Nam Tiền Hải'
  }
};

export const CAT_STICKERS: CatSticker[] = [
  {
    id: 'cat_ribbon',
    name: 'Mèo Nơ Hồng Baby',
    src: './assets/aistudio/download_6829546b.jpg',
    caption: 'Mèo nơ hồng kute phô mai que',
    meowQuote: 'Meo meo~ Chúc Trung sinh nhật siêu vui vẻ nha!',
    badge: '🎀 Cute'
  },
  {
    id: 'cat_flower',
    name: 'Mèo Bông Hoa Hồng',
    src: './assets/aistudio/download_8895f34f.jpg',
    caption: 'Mắt to tròn lấp lánh như sao biển',
    meowQuote: 'Purrr~ Cố lên nhé, THPT Nam Tiền Hải thẳng tiến!',
    badge: '🌸 Ngọt ngào'
  },
  {
    id: 'cat_milk',
    name: 'Mèo Bình Sữa Má Hồng',
    src: './assets/aistudio/download_c16407ef.jpg',
    caption: 'Uống sữa mau lớn, học giỏi đỗ cấp 3',
    meowQuote: 'Ngoan ngoãn uống sữa nè, chúc bạn thêm tuổi mới tràn đầy năng lượng!',
    badge: '🍼 Bé bi'
  },
  {
    id: 'cat_gentle',
    name: 'Mèo Má Phính Đáng Yêu',
    src: './assets/aistudio/download_d0c53874.jpg',
    caption: 'Gương mặt uy tín của lớp 9C2',
    meowQuote: 'Meoww! 9C2 mãi đỉnh, Trung mãi là idol!',
    badge: '👑 Uy tín'
  },
  {
    id: 'cat_sprout',
    name: 'Mèo Mầm Hoa May Mắn',
    src: './assets/aistudio/download_fae31891.jpg',
    caption: 'Cõng bông hoa may mắn trên đầu',
    meowQuote: 'Hoa nở rực rỡ mang đến 100% may mắn thi đỗ Nam Tiền Hải!',
    badge: '🍀 May mắn'
  },
  {
    id: 'cat_minion',
    name: 'Mèo Minion Kính Ngầu',
    src: './assets/aistudio/download_3ada55c7.jpg',
    caption: 'Bộ đồ Minion đeo kính cực chất',
    meowQuote: 'Bello! Sinh nhật quẩy hết mình nha người anh em!',
    badge: '😎 Cực ngầu'
  },
  {
    id: 'cat_angel',
    name: 'Mèo Thiên Thần Nơ Xanh',
    src: './assets/aistudio/download_fafd80be.jpg',
    caption: 'Tone xanh dương trắng tone-sur-tone cực hợp gu',
    meowQuote: 'Ngoan hiền nơ xanh chúc mọi điều ước sinh nhật đều thành hiện thực!',
    badge: '💙 Thiên thần'
  }
];

export const INITIAL_WISHES: Wish[] = [];

/**
 * Validates birthday password.
 * Accepts formats: 06112012, 6112012, 06/11/2012, 6/11/2012, 06-11-2012, 6-11-2012, 06.11.2012, 6.11.2012, 0611
 */
export function validateBirthdayPassword(input: string): boolean {
  if (!input) return false;
  const cleaned = input.trim().toLowerCase().replace(/[\s\/\-\.]/g, '');
  
  // Cleaned variations for 6/11/2012
  const validVariants = [
    '06112012',
    '6112012',
    '0611',
    '611'
  ];

  return validVariants.includes(cleaned);
}

/**
 * Calculates countdown to next November 6th
 */
export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isBirthdayToday: boolean;
  targetYear: number;
  ageTurning: number;
  totalDaysLived: number;
}

export function getBirthdayCountdown(currentDate: Date = new Date()): CountdownResult {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 1-indexed
  const currentDay = currentDate.getDate();

  // Check if today is birthday
  const isBirthdayToday = currentMonth === 11 && currentDay === 6;

  // Determine next birthday target year
  let targetYear = currentYear;
  // If this year's Nov 6 has already passed (after Nov 6 end-of-day), target next year
  const thisYearBirthday = new Date(currentYear, 10, 6, 0, 0, 0); // month 10 = Nov
  const dayAfterBirthday = new Date(currentYear, 10, 6, 23, 59, 59);

  if (currentDate.getTime() > dayAfterBirthday.getTime()) {
    targetYear = currentYear + 1;
  }

  const targetDate = new Date(targetYear, 10, 6, 0, 0, 0);
  const diffMs = Math.max(0, targetDate.getTime() - currentDate.getTime());

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  const ageTurning = targetYear - 2012;

  // Total days lived from Nov 6, 2012
  const bornDate = new Date(2012, 10, 6);
  const totalDaysLived = Math.max(0, Math.floor((currentDate.getTime() - bornDate.getTime()) / (1000 * 60 * 60 * 24)));

  return {
    days,
    hours,
    minutes,
    seconds,
    isBirthdayToday,
    targetYear,
    ageTurning,
    totalDaysLived
  };
}

export function validateWish(author: string, content: string): { valid: boolean; error?: string } {
  const cleanAuthor = author?.trim();
  const cleanContent = content?.trim();

  if (!cleanAuthor) {
    return { valid: false, error: 'Vui lòng nhập tên của bạn nhé!' };
  }
  if (cleanAuthor.length < 2) {
    return { valid: false, error: 'Tên người gửi cần ít nhất 2 ký tự.' };
  }
  if (cleanAuthor.length > 50) {
    return { valid: false, error: 'Tên người gửi không được vượt quá 50 ký tự.' };
  }
  if (!cleanContent) {
    return { valid: false, error: 'Hãy viết vài dòng lời chúc dễ thương nhé!' };
  }
  if (cleanContent.length < 4) {
    return { valid: false, error: 'Lời chúc quá ngắn, viết thêm chút tình cảm nha!' };
  }
  if (cleanContent.length > 500) {
    return { valid: false, error: 'Lời chúc dài quá 500 ký tự rồi nè.' };
  }

  return { valid: true };
}
