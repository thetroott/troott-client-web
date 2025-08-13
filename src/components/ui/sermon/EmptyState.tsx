import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { CloudUpload, Search, FilterList } from '@mui/icons-material';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: 'upload' | 'search' | 'filter';
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon = 'upload'
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'search':
        return <Search sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />;
      case 'filter':
        return <FilterList sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />;
      default:
        return <CloudUpload sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />;
    }
  };

  return (
    <Paper 
      sx={{ 
        p: 6, 
        textAlign: 'center',
        backgroundColor: 'grey.50',
        border: '2px dashed',
        borderColor: 'grey.300'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {getIcon()}
        
        <Typography variant="h5" component="h3" gutterBottom color="text.secondary">
          {title}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
          {description}
        </Typography>
        
        {actionText && onAction && (
          <Button
            variant="contained"
            onClick={onAction}
            startIcon={<CloudUpload />}
            size="large"
          >
            {actionText}
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default EmptyState;