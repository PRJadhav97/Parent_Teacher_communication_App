import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
}
from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    parentName: '',
    parentEmail: '',
    parentPassword: ''
  });

  const [errors, setErrors] = useState({
    pName: '',
    pEmail: '',
    pPassword: ''
  });

  const SwalAlert =(msg) => {
    Swal.fire({
      position: "center",
      icon: "error",
      title:"Registration Error!",
      text: msg,
      imageUrl:"./Images/no.gif",
      imageHeight:"60px",
      imageWidth:"60px",
      showConfirmButton: false,
      timer: 1850,
      customClass: {
          popup: 'center-popup'
      }
  });
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleNavigation = () => {
    navigate("/teacherSignUp");
  }

  const handleSubmit = async () => {
    // Validation logic
    const newErrors = {};
    if (formData.parentName.trim() === '') {
      newErrors.pName = 'Name is required';
    } else if (!/^[A-Za-z]+(?: [A-Za-z]+)?$/.test(formData.parentName.trim())) {
      newErrors.pName = 'Name must contain only alphabets.';
    } else if (formData.parentName.length > 30) {
      newErrors.pName = 'Name cannot exceed 30 characters';
    }
    if (formData.parentEmail.trim() === '') {
      newErrors.pEmail = 'Email is required';
    } else if (formData.parentEmail.length > 30) {
      newErrors.pEmail = 'Email cannot exceed 30 characters';
    } else if (!/\S+@\S+\.\S+/.test(formData.parentEmail)) {
      newErrors.pEmail = 'Email is invalid';
    }
    if (formData.parentPassword.trim() === '') {
      newErrors.pPassword = 'Password is required';
    } else if (formData.parentPassword.length > 14) {
      newErrors.pPassword = 'Password cannot exceed 14 characters';
    } else if (formData.parentPassword.length < 6) {
      newErrors.pPassword = 'Password must be at least 6 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}/.test(formData.parentPassword)) {
      newErrors.pPassword = 'Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number';
    }
    setErrors(newErrors);

    // If there are no errors, proceed with form submission
    if (Object.keys(newErrors).length === 0) {
      try {
        // Make POST request to your backend API
        const formResponse = await axios.get(`https://localhost:7225/api/Parents?parentEmail=${formData.parentEmail}`);
        const existingParent = formResponse.data;
        const Email= existingParent.filter(p=>{
           if(p.parentEmail==formData.parentEmail)
           {return p;}
        })
        console.log("The parents are"+ Email);
if(Email.length>0)
{
  SwalAlert("Parent with given Email already exists")
  return;
}

else{
        const response = await axios.post('https://localhost:7225/api/Parents', formData);
        console.log('Form submitted:', response.data);
        // Reset form data after successful submission
        setFormData({
          parentName: '',
          parentEmail: '',
          parentPassword: ''
        });

        Swal.fire({
          position: "center",
          icon: "success",
          title:"Congratulations!",
          text: "Registered successfully!",
          imageUrl:"./Images/thumbsUp.gif",
          imageHeight:"60px",
          imageWidth:"60px",
          showConfirmButton: false,
          timer: 1850,
          customClass: {
              popup: 'center-popup'
          }
      });
        setTimeout(() => {          
          navigate("/"); // Navigate to the homepage
        }, 2000); // Adjust the time as needed
      }}
       catch (error) {
        console.error('Error submitting form:', error);
        // Handle error
      }
    }
  
  };

  return (
    <MDBContainer fluid>
    <MDBCard className='text-black m-5' style={{ borderRadius: '25px', background: "linear-gradient(-45deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)" }}>
      <MDBCardBody>
        <MDBRow>
          <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
            <p className="text-center h3 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up As Parent </p>
            <div className="mb-4">
              <label className="d-flex align-items-center">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput label='Your Name' id='parentName' type='text' className='w-100 bg-white' onChange={handleInputChange} max={10} />
              </label>
            </div>
            <div>
              <h6 style={{fontWeight:"bold"}}>{errors.pName && <div className="text-danger">{errors.pName}</div>}</h6>
            </div>
            
            <div className="mb-4">
              <label className="d-flex align-items-center">
                <MDBIcon fas icon="envelope me-3" size='lg' />
                <MDBInput label='Your Email' id='parentEmail' className='bg-white' type='email' onChange={handleInputChange} />
              </label>
            </div>
            <div>
            <h6 style={{fontWeight:"bold"}}>{errors.pEmail && <div className="text-danger">{errors.pEmail}</div>} </h6>

            </div>
            <div className="mb-4">
              <label className="d-flex align-items-center">
                <MDBIcon fas icon="lock me-3" size='lg' />
                <MDBInput label='Password' id='parentPassword' className='bg-white' type='password' onChange={handleInputChange} />
              </label>
            </div>
            <div>
           <h6 style={{fontWeight:"bold"}}> {errors.pPassword && <div className="text-danger">{errors.pPassword}</div>} </h6>
            </div>
            <MDBBtn className='mb-4' size='lg' onClick={handleSubmit} style={{ padding: '8px 16px' }}>Register</MDBBtn>
            <MDBBtn className='mb-4' size='lg' onClick={handleNavigation} style={{ padding: '8px 16px' }}>Register as Teacher</MDBBtn>
          </MDBCol>
          <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
            <MDBCardImage style={{ borderRadius: '25px' }} src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  </MDBContainer>

  );
}

export default SignUp;
