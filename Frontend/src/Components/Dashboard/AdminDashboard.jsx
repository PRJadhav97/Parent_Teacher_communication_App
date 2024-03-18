

import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Admin_dashboard.css';
import Button from '@mui/material/Button';


export default function AdminDashboard() {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [student, setStudent] = useState([]);

  //----------for counts-------

  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [parentCount, setParentCount] = useState(0);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const studentsResponse = await axios.get("https://localhost:7225/api/Students/count");
  //       setStudentCount(studentsResponse.data.count);

  //       const teachersResponse = await axios.get("https://localhost:7225/api/Teachers/count");
  //       setTeacherCount(teachersResponse.data.count);

  //       const parentsResponse = await axios.get("https://localhost:7225/api/Parents/count");
  //       setParentCount(parentsResponse.data.count);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // ------------- for sidebar sitename----

  const [showLogo, setShowLogo] = useState(true);

  const handleSidebarClick = () => {
        setShowLogo(!showLogo);
};

//--------------------

  React.useEffect(() => {
    if(sessionStorage.getItem("userId") === null){
      navigate("/error");
      return;
  }
    try{
    axios.get("https://localhost:7225/api/Announcements").then((response) => {
      setPost(response.data);
    });
  }catch(error){
    console.log(error);
  }}, []);

  React.useEffect(() => {

    if(sessionStorage.getItem("userId") === null){
      navigate("/error");
      return;
  }
  try{
    axios.get("https://localhost:7225/api/Students").then((response) => {
      setStudent(response.data);
    });
  }catch(error){
    console.log(error);
  }}, []);

  const handleQueryClick = (path) => {
    navigate(path);
  }

  //------handling error-----
  const handleError = () =>{
    if(sessionStorage.getItem("isLoggedIn") === "false"){
        navigate("/error");
    }
}

  return (
    <>
    {handleError()}
    <Row style={{ justifyContent:"center",maxWidth:"100%",overflowX:"hidden"}}>
      {/* <Col style={{ height: "400px" }}>
        <CDBSidebar textColor="#fff" backgroundColor="#333"> */}
         <Col xs={3} style={{height:"450px",position: 'sticky', top: 0 }}>
         <CDBSidebar textColor="#333" backgroundColor="linear-gradient(109.6deg, rgba(177, 173, 219, 1) 11.2%, rgba(245, 226, 226, 1) 91.1%)">
          <CDBSidebarHeader prefix={<i onClick={handleSidebarClick} className="fa fa-bars" />}>
            Welcome {sessionStorage.getItem("name")}
          </CDBSidebarHeader>
          <CDBSidebarContent>
            <CDBSidebarMenu>
              <CDBSidebarMenuItem icon="sticky-note">Calender</CDBSidebarMenuItem>
              {/* <CDBSidebarMenuItem icon="th-large" onClick={() => handleQueryClick("/teacher")}>Events</CDBSidebarMenuItem> */}
              {/* <CDBSidebarMenuItem icon="sticky-note" onClick={()=>{
              sessionStorage.setItem("isLoggedIn", "false");
              // loginStatus = sessionStorage.getItem("isLoggedIn");
              navigate("/");
            } }>Log-out</CDBSidebarMenuItem> */}
            </CDBSidebarMenu>
          
          </CDBSidebarContent>
          <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div>
           {/* className="sidebar-btn-wrapper"
            style={{ padding: '20px 5px', fontFamily:"serif", fontWeight:"bold", fontSize:"1.3rem",  backgroundImage: "linear-gradient(111.1deg, rgb(251, 140, 0) 3.2%, rgb(98, 0, 234) 90.3%)",
                   WebkitBackgroundClip: "text",
                    color: "transparent" }} >
                            COMMUNICA */}

           <img
              src= "./Images/Logo7.png" // Use the imported logo image
              height="45"
              alt="Communica Logo"
              className="d-inline-block align-top"
            />{" "}
            { showLogo &&
            <img
              src= "./Images/SiteName2.png" // Use the imported logo image
              height="25"
              style={{marginTop:"10px"}}
              alt="Communica Logo"
              className="d-inline-block align-top"
            />
            }             
       </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </Col>

      <Col>
  <Card style={{ width: "210px", marginTop:"30px",background: "linear-gradient(-45deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)" }}> {/* Centering the card */}
    <Card.Img variant="top" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtL1ty4wBoC1uqTbMtbbpNjsljK3rUBaupUA&usqp=CAU' />
    <Card.Body>
      <Card.Title style={{fontWeight:"bold"}}>Teacher Operations</Card.Title>
      <Button
       variant="contained"
       color="primary"
       type="button"
       onClick={() => {
       sessionStorage.setItem("role", "Teacher");
       handleQueryClick("/teacher");
  }}
  >
   Select
   </Button>
    </Card.Body>
  </Card>
</Col>

<Col>
  <Card style={{ width: "210px", marginTop: "30px",background: "linear-gradient(-45deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)" }}> {/* Centering the card */}
    <Card.Img variant="top" src={"https://png.pngtree.com/png-vector/20200813/ourmid/pngtree-student-kid-ready-go-to-school-with-his-parents-flat-cartoon-png-image_2325792.jpg"} />
    <Card.Body>
      <Card.Title   style={{fontWeight:"bold"}}>Parent Operations</Card.Title>
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={() => {
          sessionStorage.setItem("role", "Parent");
          handleQueryClick("/parent");
        }}
      >
        Select
      </Button>
    </Card.Body>
  </Card>
</Col>

<Col>
  <Card style={{ width: "210px", marginTop: "30px",background: "linear-gradient(-45deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)"}}> {/* Centering the card */}
    <Card.Img variant="top"  src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDXRqQHfyK9BpTEcZ5aBODr1RbBVjLQehEJw74Bk1wXlgoHSGdKtxtysgfw-44_vTzK2c&usqp=CAU"} />
    <Card.Body>
      <Card.Title  style={{fontWeight:"bold"}}>Student Operations</Card.Title>
      <Button
        variant="contained"
        color="primary" 
        type="button"
        onClick={() => {
          sessionStorage.setItem("role", "Admin");
          handleQueryClick("/student");
        }}
      >
        Select
      </Button>
    </Card.Body>
  </Card>
</Col>

<Col>
  <Card style={{ width: "210px", marginTop: "30px",background:"linear-gradient(-45deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)"}}> {/* Centering the card */}
    <Card.Img variant="top" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiygVDCKEXGDRTNoFOG1iABJnqjRaC1aV7wY9ZQGHAUlllpqV7p4TiRM98xmvqRPYVHXc&usqp=CAU"} />
    <Card.Body>
      <Card.Title  style={{fontWeight:"bold"}}>Announcements</Card.Title>
      <br></br>
      
      <Button
  variant="contained"
  color="primary" 
  type="button"
  onClick={() => handleQueryClick("/announcement")}
  >Select</Button>
    </Card.Body>
  </Card>
</Col>

    </Row>

    </>
  );
};


