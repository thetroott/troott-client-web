import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Paper,
  Chip,
  Typography
} from '@mui/material';
import { Search, FilterList, Sort } from '@mui/icons-material';

interface SermonFiltersProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const SermonFilters: React.FC<SermonFiltersProps> = ({
  selectedStatus,
  onStatusChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange
}) => {
  const getStatusChipColor = (status: string) => {
    switch (status) {
      case 'published': return 'success';
      case 'draft': return 'default';
      case 'pending_review': return 'warning';
      case 'archived': return 'error';
      default: return 'primary';
    }
  };

  return (
    <Paper 
      sx={{ 
        p: 3, 
        mb: 3, 
        borderRadius: 2,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
        Filter & Search
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
        {/* Search */}
        <TextField
          placeholder="Search sermons by title, description..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: 'primary.main' }} />
              </InputAdornment>
            ),
          }}
          sx={{ 
            minWidth: 300, 
            flexGrow: 1,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: 'grey.50'
              }
            }
          }}
        />

        {/* Status Filter */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={selectedStatus}
            label="Status"
            onChange={(e) => onStatusChange(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <FilterList sx={{ color: 'primary.main' }} />
              </InputAdornment>
            }
            sx={{
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: 'grey.50'
              }
            }}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="published">Published</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="pending_review">Pending Review</MenuItem>
            <MenuItem value="archived">Archived</MenuItem>
          </Select>
        </FormControl>

        {/* Sort */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => onSortChange(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <Sort sx={{ color: 'primary.main' }} />
              </InputAdornment>
            }
            sx={{
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: 'grey.50'
              }
            }}
          >
            <MenuItem value="newest">Newest First</MenuItem>
            <MenuItem value="oldest">Oldest First</MenuItem>
            <MenuItem value="most_played">Most Played</MenuItem>
            <MenuItem value="alphabetical">A-Z</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Active Filters */}
      {(selectedStatus !== 'all' || searchQuery) && (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            Active filters:
          </Typography>
          {selectedStatus !== 'all' && (
            <Chip
               label={`Status: ${selectedStatus.replace('_', ' ')}`}
               color={getStatusChipColor(selectedStatus) as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
               size="small"
               onDelete={() => onStatusChange('all')}
               sx={{ textTransform: 'capitalize' }}
             />
          )}
          {searchQuery && (
            <Chip
              label={`Search: "${searchQuery}"`}
              color="primary"
              size="small"
              onDelete={() => onSearchChange('')}
            />
          )}
        </Box>
      )}
    </Paper>
  );
};

export default SermonFilters;