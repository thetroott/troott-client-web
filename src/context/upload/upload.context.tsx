import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { IUploadContext, ISermonUpload, IUploadFormErrors } from '@/utils/interfaces.util';

// Action types
type UploadAction =
  | { type: 'SET_STEP'; payload: string }
  | { type: 'SET_FILE'; payload: File | null }
  | { type: 'SET_UPLOAD_DATA'; payload: Partial<ISermonUpload> }
  | { type: 'SET_ERRORS'; payload: IUploadFormErrors }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_PROGRESS'; payload: number }
  | { type: 'RESET_UPLOAD' }
  | { type: 'LOAD_FROM_STORAGE'; payload: ISermonUpload };

// Initial state
const initialUploadData: ISermonUpload = {
  file: null,
  title: '',
  description: '',
  category: '',
  tags: [],
  thumbnail: null,
  thumbnailPreview: null,
  isPublic: true,
};

const initialState: IUploadContext = {
  currentStep: 'file',
  uploadData: initialUploadData,
  errors: {},
  isLoading: false,
  progress: 0,
};

// Reducer
const uploadReducer = (state: IUploadContext, action: UploadAction): IUploadContext => {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_FILE':
      return {
        ...state,
        uploadData: { ...state.uploadData, file: action.payload },
        errors: { ...state.errors, file: undefined },
      };
    case 'SET_UPLOAD_DATA':
      return {
        ...state,
        uploadData: { ...state.uploadData, ...action.payload },
      };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    case 'RESET_UPLOAD':
      return { ...initialState };
    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        uploadData: { ...state.uploadData, ...action.payload },
      };
    default:
      return state;
  }
};

// Context
const UploadContext = createContext<{
  state: IUploadContext;
  dispatch: React.Dispatch<UploadAction>;
} | null>(null);

// Storage key
const UPLOAD_STORAGE_KEY = 'sermon_upload_draft';

// Provider
export const UploadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(uploadReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(UPLOAD_STORAGE_KEY);
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsedData });
      } catch (error) {
        console.warn('Failed to load upload draft from storage:', error);
      }
    }
  }, []);

  // Save to localStorage when upload data changes
  useEffect(() => {
    if (state.uploadData.title || state.uploadData.description || state.uploadData.file) {
      localStorage.setItem(UPLOAD_STORAGE_KEY, JSON.stringify(state.uploadData));
    }
  }, [state.uploadData]);

  return (
    <UploadContext.Provider value={{ state, dispatch }}>
      {children}
    </UploadContext.Provider>
  );
};

// Hook
export const useUpload = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error('useUpload must be used within an UploadProvider');
  }
  return context;
};

// Helper functions
export const uploadActions = {
  setStep: (step: string) => ({ type: 'SET_STEP' as const, payload: step }),
  setFile: (file: File | null) => ({ type: 'SET_FILE' as const, payload: file }),
  setUploadData: (data: Partial<ISermonUpload>) => ({ type: 'SET_UPLOAD_DATA' as const, payload: data }),
  setErrors: (errors: IUploadFormErrors) => ({ type: 'SET_ERRORS' as const, payload: errors }),
  setLoading: (loading: boolean) => ({ type: 'SET_LOADING' as const, payload: loading }),
  setProgress: (progress: number) => ({ type: 'SET_PROGRESS' as const, payload: progress }),
  resetUpload: () => ({ type: 'RESET_UPLOAD' as const }),
};