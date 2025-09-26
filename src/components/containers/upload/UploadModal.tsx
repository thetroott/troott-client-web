import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { X, Upload, ArrowUp, CheckCircle2 } from 'lucide-react';
import { useUpload, uploadActions } from '@/context/upload/upload.context';
import UploadProgressStep from './UploadProgressStep';
import SermonDetailsForm from './SermonDetailsForm';
import ListenerSettings from './ListenerSettings';
import ReviewSubmit from './ReviewSubmit';

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ open, onOpenChange }) => {
  const { state, dispatch } = useUpload();
  const { currentStep, uploadData, uploadComplete, progress, isLoading } = state;

  // Auto-switch to details step when upload completes
  useEffect(() => {
    if (uploadData.file && currentStep === 'progress' && uploadComplete) {
      dispatch(uploadActions.setStep('details'));
    }
  }, [uploadData.file, currentStep, uploadComplete, dispatch]);

  // Remove this problematic auto-switch effect that switches too early
  // useEffect(() => {
  //   if (uploadData.file && currentStep === 'progress' && progress > 0 && !uploadComplete) {
  //     dispatch(uploadActions.setStep('details'));
  //   }
  // }, [uploadData.file, currentStep, progress, uploadComplete, dispatch]);

  // Auto-switch to details step when upload starts
  useEffect(() => {
    if (uploadData.file && currentStep === 'progress' && progress > 0 && !uploadComplete) {
      dispatch(uploadActions.setStep('details'));
    }
  }, [uploadData.file, currentStep, progress, uploadComplete, dispatch]);

  // Step configuration
  const steps = [
    { key: 'progress', label: 'Upload Progress', completed: false },
    { key: 'details', label: 'Details', completed: false },
    { key: 'settings', label: 'Listener Settings', completed: false },
    { key: 'review', label: 'Review & Submit', completed: false },
  ];

  // Update step completion status
  const updatedSteps = steps.map(step => ({
    ...step,
    completed: 
      (step.key === 'progress' && uploadData.file && uploadComplete) ||
      (step.key === 'details' && uploadData.title?.trim() && uploadData.description?.trim() && uploadData.category?.trim()) ||
      (step.key === 'settings' && uploadData.isPublic !== undefined) || // Only completed when user has made a choice
      (step.key === 'review' && uploadData.title?.trim() && uploadData.description?.trim() && uploadData.category?.trim() && uploadComplete) 
  }));

  const currentStepIndex = updatedSteps.findIndex(step => step.key === currentStep);

  const handleStepClick = (stepKey: string) => {
    const stepIndex = updatedSteps.findIndex(step => step.key === stepKey);
    
    // Don't allow going back to progress step if upload has started
    if (stepKey === 'progress' && uploadData.file && progress > 0) {
      return;
    }
    
    // Allow navigation to previous steps or current step
    if (stepIndex <= currentStepIndex) {
      dispatch(uploadActions.setStep(stepKey));
      return;
    }
    
    // For forward navigation, check if current step is completed
    if (stepIndex === currentStepIndex + 1 && canProceed()) {
      dispatch(uploadActions.setStep(stepKey));
    }
    
    // Don't allow skipping steps - must complete current step first
  };

  const handleNext = () => {
    if (!canProceed()) {
      return; // Don't proceed if current step is not valid
    }
    
    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex < updatedSteps.length) {
      dispatch(uploadActions.setStep(updatedSteps[nextStepIndex].key));
    }
  };

  const handleClose = () => {
    // Clear stored data when closing modal without completing upload
    if (!uploadComplete && (uploadData.file || uploadData.title || uploadData.description)) {
      dispatch(uploadActions.clearStoredData());
    }
    
    onOpenChange(false);
    // Reset to file step when closing
    dispatch(uploadActions.setStep('file'));
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 'progress':
        return <UploadProgressStep />;
      case 'details':
        return <SermonDetailsForm />;
      case 'settings':
        return <ListenerSettings />;
      case 'review':
        return <ReviewSubmit onModalClose={() => onOpenChange(false)} />;
      default:
        return <UploadProgressStep />;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'progress':
        return 'Upload Progress';
      case 'details':
        return 'Sermon Details';
      case 'settings':
        return 'Listener Settings';
      case 'review':
        return 'Review & Submit';
      default:
        return 'Upload Sermon';
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'progress':
        return uploadData.file && uploadComplete;
      case 'details':
        return uploadData.title?.trim() && 
               uploadData.description?.trim() && 
               uploadData.category?.trim() &&
               uploadData.title.length >= 3 &&
               uploadData.description.length >= 10;
      case 'settings':
        return true; // Settings are optional
      case 'review':
        return uploadData.file && uploadData.title;
      default:
        return false;
    }
  };

  const isLastStep = currentStepIndex === updatedSteps.length - 1;

  // Calculate estimated time remaining
  const getEstimatedTimeRemaining = () => {
    if (!uploadData.file || uploadComplete || progress === 0) return null;
    
    const fileSizeInMB = uploadData.file.size / (1024 * 1024);
    const baseTimePerMB = 2; // seconds per MB (adjust based on your upload speed)
    const totalEstimatedTime = fileSizeInMB * baseTimePerMB;
    const timeElapsed = (progress / 100) * totalEstimatedTime;
    const timeRemaining = totalEstimatedTime - timeElapsed;
    
    if (timeRemaining < 60) {
      return `${Math.ceil(timeRemaining)}s left`;
    } else {
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = Math.ceil(timeRemaining % 60);
      return `${minutes}m ${seconds}s left`;
    }
  };

  // Helper function to get breadcrumb item styling
  const getBreadcrumbItemStyle = (stepKey: string, stepIndex: number) => {
    const step = updatedSteps[stepIndex];
    const isActive = currentStep === stepKey;
    const isCompleted = step.completed;
    const isAccessible = stepIndex <= currentStepIndex || isCompleted;
    
    // Don't allow access to progress step if upload has started
    const isProgressStepBlocked = stepKey === 'progress' && uploadData.file && progress > 0;
    
    let className = 'cursor-pointer transition-all duration-200 flex items-center gap-2 px-3 py-2 rounded-md ';
    
    if (isProgressStepBlocked) {
      className += 'opacity-50 cursor-not-allowed text-muted-foreground';
    } else if (isActive) {
      className += 'text-primary font-semibold bg-primary/10 border border-primary/20';
    } else if (isCompleted) {
      className += 'text-green-600 font-medium hover:bg-green-50';
    } else if (isAccessible) {
      className += 'text-foreground hover:bg-muted/50';
    } else {
      className += 'opacity-50 cursor-not-allowed text-muted-foreground';
    }
    
    return className;
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="w-[min(800px,85vw)] h-[min(450px,75vh)] !max-w-none aspect-[16/9] overflow-hidden p-0 flex flex-col" 
        showCloseButton={false}
      >
        {/* Header with breadcrumbs and close button */}
        <DialogHeader className="px-6 py-4 border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <DialogTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                {getStepTitle()}
              </DialogTitle>
              
              {/* Enhanced Breadcrumb Navigation with Active States */}
              <Breadcrumb>
                <BreadcrumbList className="gap-2">
                  <BreadcrumbItem>
                    <BreadcrumbLink 
                      onClick={() => handleStepClick('progress')}
                      className={getBreadcrumbItemStyle('progress', 0)}
                    >
                      {updatedSteps[0].completed && <CheckCircle2 className="h-4 w-4" />}
                      Upload Progress
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink 
                      onClick={() => handleStepClick('details')}
                      className={getBreadcrumbItemStyle('details', 1)}
                    >
                      {updatedSteps[1].completed && <CheckCircle2 className="h-4 w-4" />}
                      Details
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink 
                      onClick={() => handleStepClick('settings')}
                      className={getBreadcrumbItemStyle('settings', 2)}
                    >
                      {updatedSteps[2].completed && <CheckCircle2 className="h-4 w-4" />}
                      Listener Settings
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    {currentStep === 'review' ? (
                      <BreadcrumbPage className={getBreadcrumbItemStyle('review', 3)}>
                        {updatedSteps[3].completed && <CheckCircle2 className="h-4 w-4" />}
                        Review & Submit
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink 
                        onClick={() => handleStepClick('review')}
                        className={getBreadcrumbItemStyle('review', 3)}
                      >
                        {updatedSteps[3].completed && <CheckCircle2 className="h-4 w-4" />}
                        Review & Submit
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 min-h-0">
          <div className="w-full max-w-none">
            {getStepContent()}
          </div>
        </div>

        {/* Enhanced Footer with upload progress and buttons */}
        <div className="px-6 py-4 border-t bg-muted/30">
          <div className="flex items-center justify-between">
            {/* Left: Upload Progress Info (show during upload regardless of current step) */}
            {uploadData.file && !uploadComplete && isLoading && progress > 0 && (
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2 text-blue-600">
                  <ArrowUp className="h-4 w-4 animate-pulse" />
                  <span className="font-semibold">{Math.round(progress)}%</span>
                </div>
                <div className="text-muted-foreground">
                  Uploading {uploadData.file.name}
                </div>
                {getEstimatedTimeRemaining() && (
                  <div className="text-muted-foreground">
                    • {getEstimatedTimeRemaining()}
                  </div>
                )}
              </div>
            )}
            
            {/* Show upload complete status */}
            {uploadData.file && uploadComplete && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                <span className="font-medium">Upload completed successfully</span>
              </div>
            )}
            
            {/* Spacer when no progress info */}
            {!(uploadData.file && ((!uploadComplete && isLoading && progress > 0) || uploadComplete)) && (
              <div></div>
            )}
            
            {/* Right: Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={handleClose}
                className="min-w-[100px]"
              >
                Close
              </Button>
              
              {/* Hide the Continue/Publish button on Review step since ReviewSubmit has its own buttons */}
              {currentStep !== 'review' && (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`min-w-[120px] transition-all ${
                    isLastStep 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : ''
                  }`}
                >
                  {isLastStep ? (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Publish Sermon
                    </>
                  ) : (
                    'Continue'
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
