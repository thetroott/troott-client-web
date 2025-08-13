export interface Sermon {
  id: string;
  title: string;
  description: string;
  duration: string;
  uploadDate: string;
  status: 'published' | 'draft' | 'pending_review' | 'archived';
  plays: number;
  likes: number;
  shares: number;
  thumbnailUrl?: string;
  audioUrl: string;
  tags: string[];
  preacher: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SermonStats {
  totalSermons: number;
  totalPlays: number;
  totalLikes: number;
  totalShares: number;
  publishedSermons: number;
  draftSermons: number;
  pendingReviewSermons: number;
  archivedSermons: number;
}

export interface SermonFilters {
  status: string;
  searchQuery: string;
  sortBy: string;
  tags?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface SermonState {
  sermons: Sermon[];
  filteredSermons: Sermon[];
  loading: boolean;
  error: string | null;
  filters: SermonFilters;
  stats: SermonStats;
  selectedSermon: Sermon | null;
}

export type SermonAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SERMONS'; payload: Sermon[] }
  | { type: 'SET_FILTERED_SERMONS'; payload: Sermon[] }
  | { type: 'ADD_SERMON'; payload: Sermon }
  | { type: 'UPDATE_SERMON'; payload: Sermon }
  | { type: 'DELETE_SERMON'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<SermonFilters> }
  | { type: 'SET_STATS'; payload: SermonStats }
  | { type: 'SET_SELECTED_SERMON'; payload: Sermon | null }
  | { type: 'RESET_STATE' };