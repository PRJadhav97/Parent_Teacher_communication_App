import React from "react";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  }

  return (<>
<br></br>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button variant="contained" onClick={() => handleClick("/role")}>Login First</Button>
      <Button style={{ marginLeft: "50px" }} variant="contained" onClick={() => handleClick("/")}>Go Back To Home</Button>
</div>

    <br></br>

    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
      <img 
        src="https://sitechecker.pro/wp-content/uploads/2023/06/404-status-code.png" 
        alt="Error 404" 
        style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" }} 
      />
    </div>

    <br></br>

    </>
  );
}
