import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Row , Col} from 'react-bootstrap';

export default function HomeCard2() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', padding: '15px 50px 20px' }}>
      <Row className="justify-content-center">
        <Col md={4} >
          <Card sx={{ height:"100%",borderRadius:'1.2rem',width: '100%', background:'linear-gradient(-45deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)' }}>
            <CardContent>
              <Typography variant="h4" component="div" align="center" sx={{ color: 'black' }}>
                Equitable Communication
              </Typography>
              <Typography variant="h6" align="center" sx={{ color: 'white' }}>
                Students, families, and educators on the same page, on any device.
              </Typography>
            </CardContent>
          </Card>
        </Col>
        <Col md={4}>
          <Card sx={{ height: '100%',borderRadius:'1.2rem', width: '100%',  background:'linear-gradient(-45deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)' }}>
            <CardContent>
              <Typography variant="h4" component="div" align="center" sx={{ color: 'black' }}>
                Adoption & Usage
              </Typography>
              <Typography variant="h6" align="center" sx={{ color: 'white' }}>
                Simple, effective, and surprisingly easy to use. Students, families, and educators love using Our App.
              </Typography>
            </CardContent>
          </Card>
        </Col>
        <Col md={4} >
          <Card sx={{ height: '100%',borderRadius:'1.2rem', width: '100%',  background:'linear-gradient(-45deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)' }}>
            <CardContent>
              <Typography variant="h4" component="div" align="center" sx={{ color: 'black' }}>
                Chat
              </Typography>
              <Typography variant="h6" align="center" sx={{ color: 'white' }}>
                Two-way text messaging for the classroom in families preferred languages. Always free.
              </Typography>
            </CardContent>
          </Card>
        </Col>
      </Row>
    </Box>
  );
}
