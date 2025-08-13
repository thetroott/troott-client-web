import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { sermonReducer, initialSermonState } from './sermon.reducer';
import type { SermonState, SermonAction, Sermon, SermonFilters } from './sermon.types';

interface SermonContextType {
  state: SermonState;
  dispatch: React.Dispatch<SermonAction>;
  // Helper functions
  loadSermons: () => Promise<void>;
  addSermon: (sermon: Sermon) => void;
  updateSermon: (sermon: Sermon) => void;
  deleteSermon: (sermonId: string) => void;
  setFilters: (filters: Partial<SermonFilters>) => void;
  applyFilters: () => void;
}

const SermonContext = createContext<SermonContextType | undefined>(undefined);

export const useSermon = () => {
  const context = useContext(SermonContext);
  if (context === undefined) {
    throw new Error('useSermon must be used within a SermonProvider');
  }
  return context;
};

interface SermonProviderProps {
  children: React.ReactNode;
}

export const SermonProvider: React.FC<SermonProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(sermonReducer, initialSermonState);

  // Mock data loader - replace with actual API call
  const loadSermons = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockSermons: Sermon[] = [
        {
          id: '1',
          title: 'The Power of Faith',
          description: 'A powerful message about faith and its transformative power in our daily lives.',
          duration: '45:30',
          uploadDate: '2024-01-15',
          status: 'published',
          plays: 1250,
          likes: 89,
          shares: 23,
          audioUrl: '/audio/sermon1.mp3',
          tags: ['faith', 'inspiration', 'christian living'],
          preacher: 'Pastor John Smith'
        },
        {
          id: '2',
          title: 'Walking in Love',
          description: 'Understanding Gods love and how to share it with others.',
          duration: '38:15',
          uploadDate: '2024-01-10',
          status: 'published',
          plays: 892,
          likes: 67,
          shares: 15,
          audioUrl: '/audio/sermon2.mp3',
          tags: ['love', 'relationships', 'community'],
          preacher: 'Pastor John Smith'
        },
        {
          id: '3',
          title: 'Hope in Difficult Times',
          description: 'Finding hope and strength during challenging seasons of life.',
          duration: '42:20',
          uploadDate: '2024-01-05',
          status: 'draft',
          plays: 0,
          likes: 0,
          shares: 0,
          audioUrl: '/audio/sermon3.mp3',
          tags: ['hope', 'trials', 'perseverance'],
          preacher: 'Pastor John Smith'
        },
        {
          id: '4',
          title: 'The Joy of Salvation',
          description: 'Celebrating the gift of salvation and eternal life through Christ.',
          duration: '50:45',
          uploadDate: '2024-01-01',
          status: 'pending_review',
          plays: 0,
          likes: 0,
          shares: 0,
          audioUrl: '/audio/sermon4.mp3',
          tags: ['salvation', 'joy', 'eternal life'],
          preacher: 'Pastor John Smith'
        }
      ];

      dispatch({ type: 'SET_SERMONS', payload: mockSermons });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load sermons';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  };

  const addSermon = (sermon: Sermon) => {
    dispatch({ type: 'ADD_SERMON', payload: sermon });
  };

  const updateSermon = (sermon: Sermon) => {
    dispatch({ type: 'UPDATE_SERMON', payload: sermon });
  };

  const deleteSermon = (sermonId: string) => {
    dispatch({ type: 'DELETE_SERMON', payload: sermonId });
  };

  const setFilters = (filters: Partial<SermonFilters>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const applyFilters = () => {
    let filtered = [...state.sermons];
    const { status, searchQuery, sortBy } = state.filters;

    // Filter by status
    if (status !== 'all') {
      filtered = filtered.filter(sermon => sermon.status === status);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(sermon =>
        sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sermon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sermon.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort sermons
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime());
        break;
      case 'most_played':
        filtered.sort((a, b) => b.plays - a.plays);
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    dispatch({ type: 'SET_FILTERED_SERMONS', payload: filtered });
  };

  // Apply filters whenever filters or sermons change
  useEffect(() => {
    applyFilters();
  }, [state.filters, state.sermons]);

  const value: SermonContextType = {
    state,
    dispatch,
    loadSermons,
    addSermon,
    updateSermon,
    deleteSermon,
    setFilters,
    applyFilters
  };

  return (
    <SermonContext.Provider value={value}>
      {children}
    </SermonContext.Provider>
  );
};