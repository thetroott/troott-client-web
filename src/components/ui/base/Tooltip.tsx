import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Divider,
  Box,
  Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Define custom styles using styled-components or sx prop
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 360,
  backgroundColor: '#333', // Dark background
  color: '#fff', // White text
  borderRadius: theme.shape.borderRadius * 2, // Rounded corners
  padding: theme.spacing(1),
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(76, 175, 80, 0.7)', // Semi-transparent green
  color: '#fff',
  marginBottom: theme.spacing(2),
}));

const NextButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#00bcd4', // Cyan color for Next button
  color: '#000',
  '&:hover': {
    backgroundColor: '#00acc1',
  },
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5, 2),
  textTransform: 'none',
  fontWeight: 'bold',
}));

const SkipLink = styled(Link)(({ theme }) => ({
  color: '#aaa', // Lighter gray for skip link
  textDecoration: 'none',
  cursor: 'pointer',
  fontSize: '0.875rem',
  '&:hover': {
    color: '#fff',
  },
}));

const FooterText = styled(Typography)(({ theme }) => ({
  color: '#fff', // Lighter gray for footer text
  fontSize: '0.875rem',
}));

interface TourTooltipProps {
  title: string;
  description: string;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
}

const TourTooltip: React.FC<TourTooltipProps> = ({
  title,
  description,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSkip,
}) => {
  return (
    <StyledCard elevation={3}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <StyledChip label="Tour & Tutorial" size="small" />
          <SkipLink onClick={onSkip}>Skip tour</SkipLink>
        </Box>

        <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>

        <Typography variant="body2" sx={{ color: '#000', mb: 2 }}>
          {description}
        </Typography>

        <Divider sx={{ backgroundColor: '#555', my: 2 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <FooterText
            onClick={currentStep > 1 ? onPrevious : undefined}
            sx={{ cursor: currentStep > 1 ? 'pointer' : 'default', opacity: currentStep > 1 ? 1 : 0.5 }}
          >
            Previous
          </FooterText>
          <NextButton onClick={onNext} variant="contained" disableElevation>
            Next
          </NextButton>
          <FooterText>
            {currentStep} of {totalSteps}
          </FooterText>
        </Box>
      </CardContent>
    </StyledCard>
  );
};


export default TourTooltip; // Export the component
// export default App; // Or export the example usage for testing