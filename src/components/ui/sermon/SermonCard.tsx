import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Box
} from '@mui/material';
import {
  MoreVert,
  PlayArrow,
  Pause,
  Edit,
  Delete,
  Share,
  Visibility,
  AccessTime,
  PlayCircleOutline
} from '@mui/icons-material';

interface Sermon {
  id: string;
  title: string;
  description: string;
  duration: string;
  uploadDate: string;
  status: 'published' | 'draft' | 'pending_review' | 'archived';
  plays: number;
  likes: number;
  shares: number;
  thumbnailUrl?: string;
  audioUrl: string;
  tags: string[];
  preacher: string;
}

interface SermonCardProps {
  sermon: Sermon;
  onEdit: () => void;
  onDelete: () => void;
  onShare: () => void;
  getStatusColor: (status: string) => 'success' | 'default' | 'warning' | 'error';
  getStatusLabel: (status: string) => string;
}

const SermonCard: React.FC<SermonCardProps> = ({
  sermon,
  onEdit,
  onDelete,
  onShare,
  getStatusColor,
  getStatusLabel
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // Implement audio play/pause logic here
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Thumbnail/Audio Visual */}
      <Box
        sx={{
          height: 200,
          background: sermon.thumbnailUrl 
            ? `url(${sermon.thumbnailUrl})` 
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <IconButton
          onClick={handlePlay}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            },
            width: 60,
            height: 60
          }}
        >
          {isPlaying ? <Pause sx={{ fontSize: 30 }} /> : <PlayArrow sx={{ fontSize: 30 }} />}
        </IconButton>
        
        {/* Status Chip */}
        <Chip
          label={getStatusLabel(sermon.status)}
          color={getStatusColor(sermon.status)}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8
          }}
        />

        {/* Menu Button */}
        <IconButton
          onClick={handleMenuOpen}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }
          }}
        >
          <MoreVert />
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3" gutterBottom noWrap>
          {sermon.title}
        </Typography>
        
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 2
          }}
        >
          {sermon.description}
        </Typography>

        {/* Duration and Date */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {sermon.duration}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            {formatDate(sermon.uploadDate)}
          </Typography>
        </Box>

        {/* Tags */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          {sermon.tags.slice(0, 3).map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.7rem', height: 20 }}
            />
          ))}
          {sermon.tags.length > 3 && (
            <Chip
              label={`+${sermon.tags.length - 3}`}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.7rem', height: 20 }}
            />
          )}
        </Box>

        {/* Stats */}
        {sermon.status === 'published' && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <PlayCircleOutline sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {sermon.plays.toLocaleString()} plays
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {sermon.likes} likes • {sermon.shares} shares
            </Typography>
          </Box>
        )}
      </CardContent>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => { onEdit(); handleMenuClose(); }}>
          <Edit sx={{ mr: 1, fontSize: 18 }} />
          Edit
        </MenuItem>
        {sermon.status === 'published' && (
          <MenuItem onClick={() => { onShare(); handleMenuClose(); }}>
            <Share sx={{ mr: 1, fontSize: 18 }} />
            Share
          </MenuItem>
        )}
        <MenuItem onClick={() => { window.open(`/sermon/${sermon.id}`, '_blank'); handleMenuClose(); }}>
          <Visibility sx={{ mr: 1, fontSize: 18 }} />
          View
        </MenuItem>
        <MenuItem onClick={() => { onDelete(); handleMenuClose(); }} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1, fontSize: 18 }} />
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default SermonCard;