import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function HomeCard() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '35vh' }}>
      <Card sx={{ minWidth: 400,borderRadius:'1.2rem', background: 'linear-gradient(-45deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)' }}>
        <CardContent>
          <Typography variant="h4" component="div" align="center" sx={{ color: 'black' }}>
            Learning {bull} starts {bull} with {bull} meaningful {bull} engagement
          </Typography>
          <Typography variant="h6" align="center" sx={{ color: 'white' }}>
            Our platform powers the relationships that support student success.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
