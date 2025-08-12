import React from 'react';
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
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { X, Upload } from 'lucide-react';
import { useUpload, uploadActions } from '@/context/upload/upload.context';
import SermonDetailsForm from './SermonDetailsForm';
import ThumbnailUpload from './ThumbnailUpload';
import PublishSettings from './PublishSettings';

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ open, onOpenChange }) => {
  const { state, dispatch } = useUpload();
  const { currentStep, uploadData } = state;

  // Step configuration
  const steps = [
    { key: 'details', label: 'Details', completed: false },
    { key: 'thumbnail', label: 'Thumbnail', completed: false },
    { key: 'publish', label: 'Publish', completed: false },
  ];

  // Update step completion status
  const updatedSteps = steps.map(step => ({
    ...step,
    completed: 
      (step.key === 'details' && uploadData.title && uploadData.description && uploadData.category && uploadData.tags.length > 0) ||
      (step.key === 'thumbnail' && uploadData.thumbnailPreview) ||
      (step.key === 'publish' && false) // Will be completed when published
  }));

  const currentStepIndex = updatedSteps.findIndex(step => step.key === currentStep);

  const handleStepClick = (stepKey: string) => {
    // Only allow navigation to completed steps or the next step
    const stepIndex = updatedSteps.findIndex(step => step.key === stepKey);
    const canNavigate = stepIndex <= currentStepIndex + 1 || updatedSteps[stepIndex - 1]?.completed;
    
    if (canNavigate) {
      dispatch(uploadActions.setStep(stepKey));
    }
  };

  const handleNext = () => {
    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex < updatedSteps.length) {
      dispatch(uploadActions.setStep(updatedSteps[nextStepIndex].key));
    }
  };

  const handlePrevious = () => {
    const prevStepIndex = currentStepIndex - 1;
    if (prevStepIndex >= 0) {
      dispatch(uploadActions.setStep(updatedSteps[prevStepIndex].key));
    } else {
      // Go back to file upload
      dispatch(uploadActions.setStep('file'));
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset to file step when closing
    dispatch(uploadActions.setStep('file'));
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 'details':
        return <SermonDetailsForm />;
      case 'thumbnail':
        return <ThumbnailUpload />;
      case 'publish':
        return <PublishSettings />;
      default:
        return <SermonDetailsForm />;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'details':
        return 'Sermon Details';
      case 'thumbnail':
        return 'Upload Thumbnail';
      case 'publish':
        return 'Publish Settings';
      default:
        return 'Upload Sermon';
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'details':
        return uploadData.title && uploadData.description && uploadData.category && uploadData.tags.length > 0;
      case 'thumbnail':
        return true; // Thumbnail is optional
      case 'publish':
        return true;
      default:
        return false;
    }
  };

  const isLastStep = currentStepIndex === updatedSteps.length - 1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="w-[827px] h-[531px] max-w-[95vw] max-h-[95vh] overflow-hidden p-0 flex flex-col" 
        showCloseButton={false}
      >
        {/* Header with breadcrumbs and close button */}
        <DialogHeader className="px-6 py-4 border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <DialogTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                {getStepTitle()}
              </DialogTitle>
              
              {/* Breadcrumb Navigation */}
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink 
                      onClick={() => handleStepClick('details')}
                      className={`cursor-pointer ${currentStep === 'details' ? 'text-primary font-medium' : ''}`}
                    >
                      Details
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink 
                      onClick={() => handleStepClick('thumbnail')}
                      className={`cursor-pointer ${currentStep === 'thumbnail' ? 'text-primary font-medium' : ''} ${!updatedSteps[0].completed ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      Thumbnail
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {currentStep === 'publish' ? (
                      <BreadcrumbPage>Publish</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink 
                        onClick={() => handleStepClick('publish')}
                        className={`cursor-pointer ${!updatedSteps[1].completed ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        Publish
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

        {/* Footer with navigation buttons */}
        <div className="px-6 py-4 border-t bg-muted/30">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
            >
              {currentStepIndex === 0 ? 'Back to Upload' : 'Previous'}
            </Button>
            
            <div className="flex items-center gap-2">
              {/* Step indicators */}
              {updatedSteps.map((step, index) => (
                <div
                  key={step.key}
                  className={`h-2 w-8 rounded-full transition-colors ${
                    index <= currentStepIndex 
                      ? 'bg-primary' 
                      : 'bg-muted-foreground/20'
                  }`}
                />
              ))}
            </div>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {isLastStep ? 'Publish Sermon' : 'Continue'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;