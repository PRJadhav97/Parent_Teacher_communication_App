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
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function TeacherSignUp() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    teacherName: '',
    teacherEmail: '',
    className : '',
    teacherPassword: ''
  });

  const [errors, setErrors] = useState({
    tName: '',
    tEmail: '',
    cName : '',
    tPassword: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  //-------- for class dropdown----

  const handleClassSelect = (className) => {
    // This function handles the selection of class names
    setFormData({ ...formData, className: className });
  };

  //----For registration errors

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

  
  const handleSubmit = async () => {
    // Validation logic
    const newErrors = {};
    if (formData.teacherName.trim() === '') {
      newErrors.tName = 'Name is required';
    } else if (!/^[A-Za-z]+(?: [A-Za-z]+)?$/.test(formData.teacherName.trim())) {
      newErrors.tName = 'Name must contain only alphabets';
    } else if (formData.teacherName.length > 30) {
      newErrors.tName = 'Name cannot exceed 30 characters';
    }
    if (formData.teacherEmail.trim() === '') {
      newErrors.tEmail = 'Email is required';
    } else if (formData.teacherEmail.length > 20) {
      newErrors.tEmail = 'Email cannot exceed 20 characters';
    } else if (!/\S+@\S+\.\S+/.test(formData.teacherEmail)) {
      newErrors.tEmail = 'Email is invalid';
    }
    if (formData.className.trim() === '') {
      newErrors.cName = 'Class Name is required';
    }
    if (formData.teacherPassword.trim() === '') {
      newErrors.tPassword = 'Password is required';
    } else if (formData.teacherPassword.length > 14) {
      newErrors.tPassword = 'Password cannot exceed 14 characters';
    } else if (formData.teacherPassword.length < 6) {
      newErrors.tPassword = 'Password must be at least 6 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}/.test(formData.teacherPassword)) {
      newErrors.tPassword = 'Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const existingTeacher = {};
        if(formData.className !== "Substitute"){
          // Check if the teacher email and class already exist
        const response = await axios.get(`https://localhost:7225/api/Teachers?teacherEmail=${formData.teacherEmail}&className=${formData.className}`);
         existingTeacher = response.data;
        const EmailClass = existingTeacher.filter(e=>{
           if(e.teacherEmail==formData.teacherEmail && e.className==formData.className)
           {return e;}
          }
        )

        const EmailExist= existingTeacher.filter(e=>{
          if(e.teacherEmail==formData.teacherEmail)
          {return e;}
       })
       const ClassExist= existingTeacher.filter(e=>{
        if(e.className==formData.className)
        {return e;}
        
     })

console.log(EmailClass);
if(EmailClass.length>0)
{
  SwalAlert("Teacher with the same email and class already exists");
return;
}

if(EmailExist.length>0)
{
  SwalAlert("Teacher with the same email already exists");
return;
}

if(ClassExist.length>0)
{
SwalAlert("This class already has a teacher.");
return;
}
        }

//console.log(EmailClass);
        console.log(existingTeacher);
  
  
        // If the teacher does not exist, proceed with form submission
        const submitResponse = await axios.post('https://localhost:7225/api/Teachers', formData);
        console.log('Form submitted:', submitResponse.data);

        Swal.fire({
          position: "center",
          icon: "success",
          title:"Congratulations!",
          text: "You are successfully registered.",
          imageUrl:"./Images/thumbsUp.gif",
          imageHeight:"60px",
          imageWidth:"60px",
          showConfirmButton: false,
          timer: 1850,
          customClass: {
              popup: 'center-popup'
          }
      });
        // Reset form data after successful submission
        setFormData({
          teacherName: '',
          teacherEmail: '',
          className: '',
          teacherPassword: ''
        });

        setTimeout(() => {          
          navigate("/"); // Navigate to the homepage
        }, 2000); 
      } catch (error) {
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
            <p className="text-center h3 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up as Teacher</p>
            <div className="mb-4">
              <label className="d-flex align-items-center">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput label='Your Name' id='teacherName'className='bg-white' type='text' onChange={handleInputChange} />
              </label>
            </div>
            <div>
              <h6 style={{fontWeight:"bold"}}>{errors.tName && <div className="text-danger">{errors.tName}</div>}</h6>
            </div>
            <div className="mb-4">
              <label className="d-flex align-items-center">
                <MDBIcon fas icon="envelope me-3" size='lg' />
                <MDBInput label='Your Email' id='teacherEmail' className='bg-white' type='email' onChange={handleInputChange} />
              </label>
              
            </div>
            <div>
            <h6 style={{fontWeight:"bold"}}>{errors.tEmail && <div className="text-danger">{errors.tEmail}</div>}</h6>
            </div>
           
           <div className="mb-4 position-relative">
            <label className="d-flex align-items-center">
              <MDBIcon fas icon="chalkboard-teacher me-2" size='lg' />
              <select
                className="form-select bg-white"
                value={formData.className}
                onChange={(e) => handleInputChange(e)}
                id="className"
                style={{ width: '220px', height:"38px" }} // Set the width to 100%
              >
      <option value="">Select Class Name</option>
      <option value="1st">1st</option>
      <option value="2nd">2nd</option>
      <option value="3rd">3rd</option>
      <option value="4th">4th</option>
      <option value="5th">5th</option>
      <option value="6th">6th</option>
      <option value="7th">7th</option>
      <option value="8th">8th</option>
      <option value="9th">9th</option>
      <option value="10th">10th</option>
      <option value="Substitute">Substitue</option>

    </select>
  </label>
</div>


            <div>
            <h6 style={{fontWeight:"bold"}}>{errors.cName && <div className="text-danger">{errors.cName}</div>}</h6>

            </div>
            <div className="mb-4">
              <label className="d-flex align-items-center">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput label='Password' id='teacherPassword' className='bg-white' type='password' onChange={handleInputChange} />
              </label>
              
            </div>
            <div>
            <h6 style={{fontWeight:"bold"}}>{errors.tPassword && <div className="text-danger">{errors.tPassword}</div>}</h6>

            </div>
            <MDBBtn className='mb-4' size='lg' style={{ padding: '8px 16px' }} onClick={handleSubmit}>Register</MDBBtn>
          </MDBCol>
          <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
            <MDBCardImage style={{ borderRadius: "25px" }} src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  </MDBContainer>
  );
}

export default TeacherSignUp;
