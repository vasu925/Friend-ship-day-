export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  date?: string;
  location?: string;
  tag?: 'All' | 'Images' | 'Memories' | 'Videos' | 'News' | 'Maps';
}

export interface MindmapNode {
  id: string;
  label: string;
  angle: number; // angle in degrees around center
  distance: number; // percentage radius
}

export interface ScrapbookData {
  bestieName: string;
  senderName: string;
  userPhotoUrl: string;
  dictionaryDefinition: string;
  awardMessage: string;
  mindmapLabels: string[];
  envelopeLetterText: string;
  finalDiaryText: string;
  photos: PhotoItem[];
  themePattern: 'stripes' | 'dots' | 'plain';
  isLocked?: boolean;
}

export interface AudioSettings {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  track: string;
}
