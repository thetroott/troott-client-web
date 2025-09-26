import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FileAudio, CheckCircle2, Trash2 } from 'lucide-react';
import { useUpload, uploadActions } from '@/context/upload/upload.context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const UploadProgressStep: React.FC = () => {
  const { state, dispatch } = useUpload();
  const { uploadData, progress, uploadComplete } = state;
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef(progress);

  // Update progress ref when progress changes
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    if (!uploadData.file) return;

    // Start loading state
    dispatch(uploadActions.setLoading(true));

    // Calculate timing based on file size (simulate realistic upload)
    const fileSizeInMB = uploadData.file.size / (1024 * 1024);
    const estimatedTimeInSeconds = Math.max(10, Math.min(60, fileSizeInMB * 2)); // 10-60 seconds
    const totalSteps = 100;
    const intervalTime = (estimatedTimeInSeconds * 1000) / totalSteps; // ms per step

    intervalRef.current = setInterval(() => {
      const currentProgress = progressRef.current;
      const newProgress = currentProgress + 1;
      
      if (newProgress >= 100) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        dispatch(uploadActions.setUploadComplete(true));
        dispatch(uploadActions.setLoading(false));
        dispatch(uploadActions.setProgress(100));
      } else {
        dispatch(uploadActions.setProgress(newProgress));
      }
    }, intervalTime);

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [uploadData.file, dispatch]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleRemoveAudio = () => {
    setShowRemoveDialog(true);
  };

  const handleConfirmRemove = () => {
    // Move to drafts logic would go here
    dispatch(uploadActions.resetUpload());
    setShowRemoveDialog(false);
  };

  const handleCancelRemove = () => {
    setShowRemoveDialog(false);
  };

  if (!uploadData.file) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          No file selected. Please select an audio file to upload.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* File Info */}
        <div className="border border-border/50 rounded-lg p-6 bg-gradient-to-br from-background to-muted/10">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FileAudio className="h-10 w-10 text-blue-500" />
              {uploadComplete && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-foreground truncate">
                {uploadData.file.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {formatFileSize(uploadData.file.size)} • Audio File
              </p>
            </div>
          </div>
        </div>

        {/* Upload Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground">
              {uploadComplete ? 'Upload Complete' : 'Uploading...'}
            </h4>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          
          <Progress value={progress} className="h-2" />
          
          {uploadComplete && (
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm font-medium">File uploaded successfully</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {uploadComplete && (
          <div className="pt-4 border-t">
            <div className="flex justify-center items-center gap-4">
              <Button
                onClick={() => dispatch(uploadActions.setStep('details'))}
                className="px-8 py-2 bg-primary hover:bg-primary/90"
              >
                Continue to Details
              </Button>
              <Button
                variant="outline"
                onClick={handleRemoveAudio}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove Audio
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Remove Audio Confirmation Dialog */}
      <Dialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Trash2 className="h-5 w-5 text-destructive" />
              <span>Remove audio?</span>
            </DialogTitle>
            <DialogDescription>
              This will remove the uploaded audio file and move it to drafts. You can access it later from your drafts folder.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={handleCancelRemove}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleConfirmRemove}
              className="bg-destructive hover:bg-destructive/90"
            >
              Move to Drafts
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadProgressStep;