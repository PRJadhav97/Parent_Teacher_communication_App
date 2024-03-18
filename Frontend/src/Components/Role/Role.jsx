// Role.js

import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';


export default function Role() {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    sessionStorage.setItem("role", role);
    navigate("/signin");
  };

  return (
    <>
      <br />
      <br />
      <br />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', padding: '15px 20px' }}>
      <Row className="justify-content-center">

      {/* <Row   style={{ maxWidth: "100%", overflowX: "hidden" }} > */}
        <Col md={4}>
        {/* <Card style={{ width: "250px", marginLeft: "150px", background: "linear-gradient(142.4deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)" }}> */}

          <Card style={{ width: "250px", background: "linear-gradient(142.4deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)" }}>
            <Card.Img variant="top" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtL1ty4wBoC1uqTbMtbbpNjsljK3rUBaupUA&usqp=CAU' />
            <Card.Body>
              <Card.Title >I'm a Teacher</Card.Title>
              <Button
                variant="dark"
                type="button"
                onClick={() => handleRoleSelection("Teacher")}
              >
                Select
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
        <Card style={{ width: "250px", background: "linear-gradient(142.4deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)" }}>
          {/* <Card style={{ width: "250px", marginLeft: "70px", background: "linear-gradient(142.4deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)" }}> */}
            <Card.Img variant="top" src={"https://png.pngtree.com/png-vector/20200813/ourmid/pngtree-student-kid-ready-go-to-school-with-his-parents-flat-cartoon-png-image_2325792.jpg"} />
            <Card.Body>
              <Card.Title >I'm a Parent</Card.Title>
              <Button
                variant="dark"
                type="button"
                onClick={() => handleRoleSelection("Parent")}
              >
                Select
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
        <Card style={{ width: "250px", background: "linear-gradient(142.4deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)" }}>
          {/* <Card style={{ width: "250px", background: "linear-gradient(142.4deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)" }}> */}
            <Card.Img variant="top" src={"https://t3.ftcdn.net/jpg/01/21/24/20/360_F_121242015_hRYuVPJmzhWQdvrkh3dk5MqjNxY3JzTr.jpg"} />
            <Card.Body>
              <Card.Title >I'm an Admin</Card.Title>
              <Button
                variant="dark"
                type="button"
                onClick={() => handleRoleSelection("Admin")}
              >
                Select
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Box>
      <br />
      <br />
      <br />
    </>
  );
}
