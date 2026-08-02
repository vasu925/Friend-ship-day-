import { ScrapbookData } from '../types';

export const DEFAULT_PHOTOS = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    caption: 'Laughter, endless chats & coffee dates ☕️',
    date: 'Best Days Ever',
    tag: 'Memories' as const,
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    caption: 'Partner in crime since day one! 👯‍♀️',
    date: 'Always Together',
    tag: 'Images' as const,
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    caption: 'Making core memories everywhere we go 🌸',
    date: 'Sunny Moments',
    tag: 'Memories' as const,
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
    caption: 'Late night talks & deep secrets 🌙',
    date: 'Unfiltered Joy',
    tag: 'All' as const,
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    caption: 'Forever my favorite person to laugh with ✨',
    date: 'Golden Days',
    tag: 'Images' as const,
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    caption: 'Road trips, wrong directions & pure fun 🚗',
    date: 'Adventures',
    tag: 'Maps' as const,
  },
];

export const DEFAULT_SCRAPBOOK_DATA: ScrapbookData = {
  bestieName: 'My Dearest Bestie',
  senderName: 'Your Forever Friend',
  userPhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  dictionaryDefinition: 'A soulmate in friendship form; someone who knows all your flaws and loves you anyway. The one who turns ordinary moments into unforgettable memories and stands by you through everything.',
  awardMessage: 'For being the most loyal, loving, hilariously supportive, and irreplaceable friend in the entire universe!',
  mindmapLabels: [
    'My Lifeline',
    'Google Maps',
    'Food Partner',
    'Secret Keeper',
    'Cry Baby',
    'Bank Account 😂',
    'Entertainment Source',
    'Shopping Partner',
    'Favorite Human',
    'Bestie By Choice',
    'Personal Therapist',
    'Happiness'
  ],
  envelopeLetterText: `Dear Bestie,\n\nI just wanted to take a moment to tell you how truly special you are to me. Life is infinitely sweeter, funnier, and warmer with you by my side. Thank you for listening to my endless rants, sharing every meal, wiping away tears, and filling my world with non-stop laughter.\n\nYou are rare, priceless, and irreplaceable. Happy Friendship Day! 💖`,
  finalDiaryText: `Thank you for being one of the best people in my life. Every laugh, every memory, every silly conversation has made my world brighter. No matter where life takes us, I hope our friendship lasts forever. Wishing you endless happiness, success, peace, love, and smiles. Thank you for always being you. ❤️`,
  photos: DEFAULT_PHOTOS,
  themePattern: 'stripes',
  isLocked: false,
};

const STORAGE_KEY = 'friendship_day_scrapbook_v1';

export function loadScrapbookData(): ScrapbookData {
  // First check if data is encoded in URL hash or query param (for sharing across domains)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const hashData = window.location.hash.startsWith('#data=') ? window.location.hash.replace('#data=', '') : null;
    const rawEncoded = urlParams.get('data') || hashData;
    if (rawEncoded) {
      const decoded = decodeURIComponent(atob(rawEncoded));
      const parsed = JSON.parse(decoded);
      return { ...DEFAULT_SCRAPBOOK_DATA, ...parsed };
    }
  } catch (e) {
    console.warn('Could not parse URL shared data:', e);
  }

  // Next check localStorage
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_SCRAPBOOK_DATA, ...parsed };
    }
  } catch (e) {
    console.warn('Failed to load local storage:', e);
  }
  return { ...DEFAULT_SCRAPBOOK_DATA };
}

export function saveScrapbookData(data: ScrapbookData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save to local storage:', e);
  }
}

export function encodeScrapbookData(data: ScrapbookData): string {
  try {
    const jsonStr = JSON.stringify(data);
    return btoa(encodeURIComponent(jsonStr));
  } catch (e) {
    console.warn('Failed to encode data:', e);
    return '';
  }
}
