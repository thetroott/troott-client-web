import React from 'react';
import UploadLayout from '@/components/layouts/UploadLayout';
import { UploadProvider, useUpload, uploadActions } from '@/context/upload/upload.context';
import FileUploadZone from '@/components/containers/upload/FileUploadZone';
import UploadModal from '@/components/containers/upload/UploadModal';

const UploadContent: React.FC = () => {
  const { state, dispatch } = useUpload();
  const { currentStep } = state;

  // Modal is open when step is not 'file'
  const isModalOpen = currentStep !== 'file';

  const handleModalOpenChange = (open: boolean) => {
    if (!open) {
      // When modal closes, reset to file step
      dispatch(uploadActions.setStep('file'));
    }
  };

  return (
    <UploadLayout>
      <FileUploadZone />
      <UploadModal 
        open={isModalOpen} 
        onOpenChange={handleModalOpenChange}
      />
    </UploadLayout>
  );
};

const UploadSermon: React.FC = () => {
  return (
    <UploadProvider>
      <UploadContent />
    </UploadProvider>
  );
};

export default UploadSermon;