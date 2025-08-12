import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUpload, uploadActions } from '@/context/upload/upload.context';
import type { IUploadFormErrors } from '@/utils/interfaces.util';

const SermonDetailsForm: React.FC = () => {
  const { state, dispatch } = useUpload();
  const { uploadData, errors } = state;
  
  const [localData, setLocalData] = useState({
    title: uploadData.title || '',
    description: uploadData.description || '',
    category: uploadData.category || '',
  });
  
  const [tagInput, setTagInput] = useState('');
  const [localErrors, setLocalErrors] = useState<IUploadFormErrors>({});

  // Sync with context
  useEffect(() => {
    setLocalData({
      title: uploadData.title || '',
      description: uploadData.description || '',
      category: uploadData.category || '',
    });
  }, [uploadData]);

  const validateForm = (): IUploadFormErrors => {
    const newErrors: IUploadFormErrors = {};
    
    if (!localData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (localData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (localData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    if (!localData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (localData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    } else if (localData.description.length > 1000) {
      newErrors.description = 'Description must be less than 1000 characters';
    }
    
    if (!localData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    if (uploadData.tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    }
    
    return newErrors;
  };

  const handleInputChange = (field: keyof typeof localData, value: string) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (localErrors[field]) {
      setLocalErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Update context
    dispatch(uploadActions.setUploadData({ [field]: value }));
  };

  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !uploadData.tags.includes(tag) && uploadData.tags.length < 10) {
      const newTags = [...uploadData.tags, tag];
      dispatch(uploadActions.setUploadData({ tags: newTags }));
      setTagInput('');
      
      // Clear tags error
      if (localErrors.tags) {
        setLocalErrors(prev => ({ ...prev, tags: undefined }));
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = uploadData.tags.filter(tag => tag !== tagToRemove);
    dispatch(uploadActions.setUploadData({ tags: newTags }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleValidation = () => {
    const validationErrors = validateForm();
    setLocalErrors(validationErrors);
    dispatch(uploadActions.setErrors(validationErrors));
    return Object.keys(validationErrors).length === 0;
  };

  // Auto-validate on blur
  const handleBlur = () => {
    const validationErrors = validateForm();
    setLocalErrors(validationErrors);
    dispatch(uploadActions.setErrors(validationErrors));
  };

  const categories = [
    'Sermon',
    'Bible Study',
    'Prayer',
    'Worship',
    'Testimony',
    'Teaching',
    'Conference',
    'Youth',
    'Children',
    'Other'
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
          Sermon Title *
        </Label>
        <Input
          id="title"
          value={localData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          onBlur={handleBlur}
          placeholder="Enter your sermon title..."
          className={cn(
            'w-full',
            (errors.title || localErrors.title) && 'border-destructive focus-visible:ring-destructive'
          )}
          maxLength={100}
        />
        {(errors.title || localErrors.title) && (
          <p className="text-sm text-destructive">{errors.title || localErrors.title}</p>
        )}
        <p className="text-xs text-muted-foreground">
          {localData.title.length}/100 characters
        </p>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Description *
        </Label>
        <textarea
          id="description"
          value={localData.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('description', e.target.value)}
          onBlur={handleBlur}
          placeholder="Describe your sermon content, key points, and what listeners can expect..."
          className={cn(
            'w-full min-h-[120px] resize-none px-3 py-2 border border-input bg-background rounded-md text-sm',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
            (errors.description || localErrors.description) && 'border-destructive focus-visible:ring-destructive'
          )}
          maxLength={1000}
        />
        {(errors.description || localErrors.description) && (
          <p className="text-sm text-destructive">{errors.description || localErrors.description}</p>
        )}
        <p className="text-xs text-muted-foreground">
          {localData.description.length}/1000 characters
        </p>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category" className="text-sm font-medium">
          Category *
        </Label>
        <select
          id="category"
          value={localData.category}
          onChange={(e) => handleInputChange('category', e.target.value)}
          onBlur={handleBlur}
          className={cn(
            'w-full px-3 py-2 border border-input bg-background rounded-md text-sm',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
            (errors.category || localErrors.category) && 'border-destructive focus:ring-destructive'
          )}
        >
          <option value="">Select a category...</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {(errors.category || localErrors.category) && (
          <p className="text-sm text-destructive">{errors.category || localErrors.category}</p>
        )}
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags" className="text-sm font-medium">
          Tags * <span className="text-xs text-muted-foreground">(Help people discover your sermon)</span>
        </Label>
        
        {/* Tag Input */}
        <div className="flex gap-2">
          <Input
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a tag..."
            className="flex-1"
            maxLength={30}
          />
          <Button
            type="button"
            onClick={handleAddTag}
            disabled={!tagInput.trim() || uploadData.tags.length >= 10}
            size="sm"
            variant="outline"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Tags Display */}
        {uploadData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {uploadData.tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 hover:bg-secondary-foreground/10 rounded p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {(errors.tags || localErrors.tags) && (
          <p className="text-sm text-destructive">{errors.tags || localErrors.tags}</p>
        )}
        
        <p className="text-xs text-muted-foreground">
          {uploadData.tags.length}/10 tags • Press Enter to add
        </p>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={handleValidation}
          className="px-8"
        >
          Continue to Thumbnail
        </Button>
      </div>
    </div>
  );
};

export default SermonDetailsForm;