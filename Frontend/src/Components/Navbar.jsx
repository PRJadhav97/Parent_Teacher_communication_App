import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


function NavBar() {
  // var[demo, setDemo]=useState('');
  const navigate = useNavigate();
  const location = useLocation();

   // Initialize sessionStorage.isLoggedIn to "false" when the component mounts
   const checkLogIn = () => {
    if (sessionStorage.getItem("isLoggedIn") === null) {
      sessionStorage.setItem("isLoggedIn", "false");
    }
  }
 

  return (
    <>
    {checkLogIn()}
      <Navbar bg='light' style={{ fontWeight: "bolder", backgroundImage: "linear-gradient(142.4deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)" }} className="text-white sticky-top" data-bs-theme="light">
        <Container>
          <Navbar.Brand style={{ fontFamily: "unset", fontWeight: "bolder", fontSize: "1.4rem", color: "white" }} href="/">
            <img src="./Images/Logo7.png" height="55" alt="Communica Logo" className="d-inline-block align-top" />
            <img src="./Images/SiteName2.png" height="45" alt="Communica Logo" className="d-inline-block align-top" />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {/* <Nav.Link href="#features">Features</Nav.Link> */}
          </Nav>
          <Nav>
            {sessionStorage.getItem("isLoggedIn") === "true" ? (
              <Nav.Link onClick={() => {
                sessionStorage.clear();
                sessionStorage.setItem("isLoggedIn", "false");
                // setDemo("False");
                navigate("/");
              }}>Log Out</Nav.Link>
            ) : (
              // Check if not on sign-up or login page
              !['/role','/signin'].includes(location.pathname) && (
                <Nav.Link href="/role" onClick={() => {
                  // setDemo("True");
                  sessionStorage.setItem("isLoggedIn", "false");
                }}>Log In</Nav.Link>
              )
            )}
            {sessionStorage.getItem("isLoggedIn") === "false" && !(location.pathname === '/signup' || location.pathname === '/teacherSignUp' || sessionStorage.getItem("role") === "Admin")
             && (
              <Nav.Link href="/signup">Create An Account</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
