export interface CatSticker {
  id: string;
  name: string;
  src: string;
  caption: string;
  meowQuote: string;
  badge: string;
}

export interface Wish {
  id: string;
  author: string;
  content: string;
  stickerId: string;
  timestamp: number;
  likes: number;
  role?: string;
}

export interface BirthdayInfo {
  fullName: string;
  birthDateStr: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  schoolClass: string;
  wish: string;
  messageToParentsAndFriends: string;
  coordinates: {
    latStr: string;
    lngStr: string;
    lat: number;
    lng: number;
    address: string;
    nearSchool: string;
  };
}
