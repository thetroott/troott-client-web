import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, FileAudio, AlertCircle, CloudUpload, CheckCircle2, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUpload, uploadActions } from '@/context/upload/upload.context';

const FileUploadZone: React.FC = () => {
  const { state, dispatch } = useUpload();
  const { uploadData, isLoading } = state;
  
  const [isDragActive, setIsDragActive] = useState(false);
  const [validationError, setValidationError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Configuration - Audio formats only
  const acceptedTypes = [
    'audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/wave', 'audio/x-wav',
    'audio/m4a', 'audio/mp4', 'audio/aac', 'audio/ogg', 'audio/webm',
    'audio/flac', 'audio/x-flac', 'audio/wma', 'audio/x-ms-wma'
  ];
  const maxSize = 100 * 1024 * 1024; // 100MB (reduced for audio files)

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize) {
      return `File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`;
    }
    
    // Check file type - audio only
    const fileType = file.type.toLowerCase();
    const isValidType = acceptedTypes.includes(fileType) || fileType.startsWith('audio/');
    
    if (!isValidType) {
      return 'Please upload a valid audio file (MP3, WAV, M4A, AAC, FLAC, etc.)';
    }
    
    return null;
  };

  const handleFileSelect = (file: File) => {
    const error = validateFile(file);
    if (error) {
      setValidationError(error);
      return;
    }
    
    setValidationError('');
    dispatch(uploadActions.setFile(file));
  };

  const handleRemoveFile = () => {
    setValidationError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    dispatch(uploadActions.setFile(null));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = () => {
    // Always return audio icon since we only accept audio files
    return <FileAudio className="h-8 w-8 text-green-500" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const hasError = validationError;

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      {!uploadData.file && (
        <div className="relative">
          <div 
            className={cn(
              "border-2 border-dashed border-border/50 rounded-2xl p-12 transition-all duration-200 cursor-pointer",
              isDragActive && "border-primary bg-primary/5",
              isLoading && "pointer-events-none opacity-50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            <div className="flex flex-col items-center justify-center space-y-6">
              {/* Cloud Upload Icon */}
              <div className="relative text-muted-foreground">
                <div className="relative">
                  <CloudUpload className="h-12 w-12" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ArrowUp className="h-4 w-4 text-background" />
                  </div>
                </div>
              </div>
              
              {/* Upload Text */}
              <div className="text-center space-y-2">
                <p className="text-lg text-foreground">
                  Drag and drop audio sermon to upload or select
                </p>
                <p className="text-lg text-foreground">
                  audio file from your device.
                </p>
                <p className="text-sm text-muted-foreground">
                  Supported formats: MP3, WAV, M4A, AAC, FLAC
                </p>
              </div>
              
              {/* Select Files Button */}
              <Button 
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-md font-medium"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Select audio file'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* File Preview */}
      {uploadData.file && (
        <div className="relative">
          <div className="border border-border/50 rounded-2xl p-6 bg-gradient-to-br from-background to-muted/10 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  {getFileIcon()}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate text-lg">
                    {uploadData.file.name}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatFileSize(uploadData.file.size)} • Ready to upload
                  </p>
                </div>
              </div>
              
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemoveFile}
                disabled={isLoading}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {hasError && (
        <div className="relative">
          <div className="flex items-center space-x-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{validationError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Continue Button */}
      {uploadData.file && !hasError && (
        <div className="flex justify-center pt-6">
          <Button
            onClick={() => dispatch(uploadActions.setStep('details'))}
            size="lg"
            className="px-12 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
          >
            Continue to Details
            <Upload className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
};

export default FileUploadZone;