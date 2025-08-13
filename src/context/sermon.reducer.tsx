import type { SermonState, SermonAction, SermonStats, Sermon } from './sermon.types';

export const initialSermonState: SermonState = {
  sermons: [],
  filteredSermons: [],
  loading: false,
  error: null,
  filters: {
    status: 'all',
    searchQuery: '',
    sortBy: 'newest'
  },
  stats: {
    totalSermons: 0,
    totalPlays: 0,
    totalLikes: 0,
    totalShares: 0,
    publishedSermons: 0,
    draftSermons: 0,
    pendingReviewSermons: 0,
    archivedSermons: 0
  },
  selectedSermon: null
};

const calculateStats = (sermons: Sermon[]): SermonStats => {
  return {
    totalSermons: sermons.length,
    totalPlays: sermons.reduce((sum, sermon) => sum + sermon.plays, 0),
    totalLikes: sermons.reduce((sum, sermon) => sum + sermon.likes, 0),
    totalShares: sermons.reduce((sum, sermon) => sum + sermon.shares, 0),
    publishedSermons: sermons.filter(s => s.status === 'published').length,
    draftSermons: sermons.filter(s => s.status === 'draft').length,
    pendingReviewSermons: sermons.filter(s => s.status === 'pending_review').length,
    archivedSermons: sermons.filter(s => s.status === 'archived').length
  };
};

export const sermonReducer = (state: SermonState, action: SermonAction): SermonState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case 'SET_SERMONS': {
      const stats = calculateStats(action.payload);
      return {
        ...state,
        sermons: action.payload,
        filteredSermons: action.payload,
        stats,
        loading: false,
        error: null
      };
    }

    case 'SET_FILTERED_SERMONS':
      return {
        ...state,
        filteredSermons: action.payload
      };

    case 'ADD_SERMON': {
      const newSermons = [...state.sermons, action.payload];
      return {
        ...state,
        sermons: newSermons,
        stats: calculateStats(newSermons)
      };
    }

    case 'UPDATE_SERMON': {
      const updatedSermons = state.sermons.map(sermon =>
        sermon.id === action.payload.id ? action.payload : sermon
      );
      return {
        ...state,
        sermons: updatedSermons,
        stats: calculateStats(updatedSermons)
      };
    }

    case 'DELETE_SERMON': {
      const remainingSermons = state.sermons.filter(sermon => sermon.id !== action.payload);
      return {
        ...state,
        sermons: remainingSermons,
        filteredSermons: state.filteredSermons.filter(sermon => sermon.id !== action.payload),
        stats: calculateStats(remainingSermons)
      };
    }

    case 'SET_FILTERS':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };

    case 'SET_STATS':
      return {
        ...state,
        stats: action.payload
      };

    case 'SET_SELECTED_SERMON':
      return {
        ...state,
        selectedSermon: action.payload
      };

    case 'RESET_STATE':
      return initialSermonState;

    default:
      return state;
  }
};