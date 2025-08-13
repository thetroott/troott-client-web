import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button,
  Fade,
  Skeleton,
  Fab,
  Tooltip
} from '@mui/material';
import { 
  LibraryMusic, 
  Publish, 
  Edit, 
  TrendingUp,
  Add
} from '@mui/icons-material';
import SermonCard from '../../components/ui/sermon/SermonCard';
import SermonFilters from '../../components/ui/sermon/SermonFilters';
import EmptyState from '../../components/ui/sermon/EmptyState';
import { useSermon } from '../../context/sermon.context';
import type { Sermon } from '../../context/sermon.types';

const MySermons: React.FC = () => {
  const { state, loadSermons, deleteSermon, setFilters } = useSermon();
  const { filteredSermons, loading, filters, stats } = state;
  
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Load sermons on component mount
  useEffect(() => {
    loadSermons();
  }, [loadSermons]);

  const handleEditSermon = (sermon: Sermon) => {
    setSelectedSermon(sermon);
    setEditDialogOpen(true);
  };

  const handleDeleteSermon = (sermon: Sermon) => {
    setSelectedSermon(sermon);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedSermon) {
      deleteSermon(selectedSermon.id);
      setDeleteDialogOpen(false);
      setSelectedSermon(null);
    }
  };

  const handleShareSermon = (sermon: Sermon) => {
    // Implement share functionality
    navigator.share?.({
      title: sermon.title,
      text: sermon.description,
      url: `${window.location.origin}/sermon/${sermon.id}`
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'success';
      case 'draft': return 'default';
      case 'pending_review': return 'warning';
      case 'archived': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'Published';
      case 'draft': return 'Draft';
      case 'pending_review': return 'Pending Review';
      case 'archived': return 'Archived';
      default: return status;
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
        {/* Header Skeleton */}
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="text" width={200} height={40} />
          <Skeleton variant="text" width={400} height={24} />
        </Box>

        {/* Stats Skeleton */}
        <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
          {[1, 2, 3, 4].map((i) => (
            <Box key={i} sx={{ flex: '1 1 200px', minWidth: '200px' }}>
              <Skeleton variant="rectangular" height={100} />
            </Box>
          ))}
        </Box>

        {/* Filters Skeleton */}
        <Skeleton variant="rectangular" height={80} sx={{ mb: 3 }} />

        {/* Cards Skeleton */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: 3 
        }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} variant="rectangular" height={400} />
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Sermons
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your sermon library, track performance, and engage with your audience.
        </Typography>
      </Box>

      {/* Stats Overview */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        <Fade in timeout={300}>
          <Card sx={{ 
            flex: '1 1 200px', 
            minWidth: '200px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            '&:hover': {
              transform: 'translateY(-2px)',
              transition: 'transform 0.2s ease-in-out'
            }
          }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LibraryMusic sx={{ fontSize: 40, opacity: 0.9 }} />
              <Box>
                <Typography color="inherit" gutterBottom sx={{ opacity: 0.9 }}>
                  Total Sermons
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {stats.totalSermons}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Fade>
        <Fade in timeout={400}>
          <Card sx={{ 
            flex: '1 1 200px', 
            minWidth: '200px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            '&:hover': {
              transform: 'translateY(-2px)',
              transition: 'transform 0.2s ease-in-out'
            }
          }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Publish sx={{ fontSize: 40, opacity: 0.9 }} />
              <Box>
                <Typography color="inherit" gutterBottom sx={{ opacity: 0.9 }}>
                  Published
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {stats.publishedSermons}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Fade>
        <Fade in timeout={500}>
          <Card sx={{ 
            flex: '1 1 200px', 
            minWidth: '200px',
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            '&:hover': {
              transform: 'translateY(-2px)',
              transition: 'transform 0.2s ease-in-out'
            }
          }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Edit sx={{ fontSize: 40, opacity: 0.9 }} />
              <Box>
                <Typography color="inherit" gutterBottom sx={{ opacity: 0.9 }}>
                  Drafts
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {stats.draftSermons}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Fade>
        <Fade in timeout={600}>
          <Card sx={{ 
            flex: '1 1 200px', 
            minWidth: '200px',
            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            color: 'white',
            '&:hover': {
              transform: 'translateY(-2px)',
              transition: 'transform 0.2s ease-in-out'
            }
          }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
               <TrendingUp sx={{ fontSize: 40, opacity: 0.9 }} />
               <Box>
                 <Typography color="inherit" gutterBottom sx={{ opacity: 0.9 }}>
                   Total Plays
                 </Typography>
                 <Typography variant="h4" sx={{ fontWeight: 600 }}>
                   {filteredSermons.reduce((total: number, sermon: Sermon) => total + (sermon.plays || 0), 0)}
                 </Typography>
               </Box>
             </CardContent>
          </Card>
        </Fade>
      </Box>

      {/* Filters */}
      <SermonFilters
        selectedStatus={filters.status}
        onStatusChange={(status) => setFilters({ status })}
        searchQuery={filters.searchQuery}
        onSearchChange={(searchQuery) => setFilters({ searchQuery })}
        sortBy={filters.sortBy}
        onSortChange={(sortBy) => setFilters({ sortBy })}
      />

      {/* Sermon Grid */}
      {filteredSermons.length === 0 ? (
        <Fade in timeout={500}>
          <Box>
            <EmptyState 
              title="No sermons found"
              description={filters.searchQuery ? `No sermons match "${filters.searchQuery}"` : "You haven't uploaded any sermons yet"}
              actionText="Upload Sermon"
              onAction={() => {/* Handle upload */}}
            />
          </Box>
        </Fade>
      ) : (
        <Fade in timeout={700}>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: 3,
            '& > *': {
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)'
              }
            }
          }}>
            {filteredSermons.map((sermon, index) => (
              <Fade in timeout={800 + (index * 100)} key={sermon.id}>
                <Box>
                  <SermonCard
                    sermon={sermon}
                    onEdit={() => handleEditSermon(sermon)}
                    onDelete={() => handleDeleteSermon(sermon)}
                    onShare={() => handleShareSermon(sermon)}
                    getStatusColor={getStatusColor}
                    getStatusLabel={getStatusLabel}
                  />
                </Box>
              </Fade>
            ))}
          </Box>
        </Fade>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Sermon</DialogTitle>
        <DialogContent>
          {selectedSermon && (
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Title"
                defaultValue={selectedSermon.title}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                defaultValue={selectedSermon.description}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Tags (comma separated)"
                defaultValue={selectedSermon.tags.join(', ')}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Sermon</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{selectedSermon?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Tooltip title="Upload New Sermon" placement="left">
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s ease-in-out',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
          }}
          onClick={() => console.log('Navigate to upload sermon')}
        >
          <Add />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default MySermons;