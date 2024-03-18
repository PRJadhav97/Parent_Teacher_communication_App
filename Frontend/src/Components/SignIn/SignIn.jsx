import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Modal, Button} from '@mui/material';

import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const style3 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: "570px",
  // height: "580px",
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4
};

function SignIn() {

  const [resetData, setResetData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });

  const Role = sessionStorage.getItem('role');

  //----- Otp ------
  const[ updatedTeacher, setUpdatedTeacher] = useState({
       teacherId: '',
        teacherName: '',
        teacherEmail: '',
        className: '',
        teacherPassword: '',
        students: []
  });

  const[ updatedParent, setUpdatedParent] = useState({
    parentId: '',
    parentName: '',
    parentEmail: '',
    parentPassword: '',
     students: []
});

  const[ updatedAdmin, setUpdatedAdmin] = useState({
    adminId: '',
     adminName: '',
     adminEmail: '',
     adminPassword: ''
});

  const [generatedOtp, setGeneratedOtp] = useState('');
  const [showOtpInput,setShowOtpInput] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const validateInputs = () => {
    const newErrors = {};
  
    // Password validation
    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    // if (!passwordRegex.test(resetData.password)) {
    //   newErrors.teacherPassword = 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character, 1 number, and be at least 8 characters long';
    // }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetData.email)) {
      newErrors.teacherEmail = 'Invalid email format';
    }
  
  
    // Update state with new errors
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // const notify = () => {
    
  //   toast.success(`Your Otp is ${generatedOtp}`,{
  //     closeButton: true, // Enable close button
  //     autoClose: false, // Disable auto close
  //   } )
  //   console.log("notify");
  // }

  const generateOtp = async () => {
    // Validate email
  if (!resetData.email) {
    setEmailError('Email is required');
    return;
  }

    try{
      console.log(Role);
      let response = {};
      // Fetching user data from the backend
      if(Role === "Parent"){
         response = await axios.get(`https://localhost:7225/getParentByEmail/${resetData.email.toLowerCase()}`);

         if (!validateInputs()) {
          return;
        }
        const parent = response.data;
        console.log(parent);
    // Create the updated teacher object with the new values
     setUpdatedParent ({
      parentId: parent.parentId,
      parentName: parent.parentName,
      parentEmail: parent.parentEmail,
      parentPassword: '',
        students: []
    });
    console.log("in generateOtp"+updatedParent.parentId);

      }
      if(Role === "Teacher"){
        response = await axios.get(`https://localhost:7225/getTeacherByEmail/${resetData.email.toLowerCase()}`);

        if (!validateInputs()) {
          return;
        }
        const teacher = response.data;
        console.log(teacher);
    // Create the updated teacher object with the new values
     setUpdatedTeacher ({
        teacherId: teacher.teacherId,
        teacherName: teacher.teacherName,
        teacherEmail: teacher.teacherEmail,
        className: teacher.className,
        teacherPassword: '',
        students: []
    });
    console.log("in generateOtp"+updatedTeacher.teacherId);

     }

     if(Role === "Admin"){
      response = await axios.get(`https://localhost:7225/getAdminByEmail/${resetData.email.toLowerCase()}`);

      if (!validateInputs()) {
        return;
      }
      const admin = response.data;
      console.log(admin);
  // Create the updated teacher object with the new values
   setUpdatedAdmin ({
      adminId: admin.adminId,
      adminName: admin.adminName,
      adminEmail: admin.adminEmail,
      adminPassword: ''
  });
  console.log("in generateOtp"+updatedTeacher.teacherId);

   }
    }catch(errors){
      console.log(errors);
    }
     // Generate a random 6-digit number
    setShowOtpInput(true);
  const otpG = Math.floor(100000 + Math.random() * 900000);
  setGeneratedOtp(otpG);
  setOtpSent(true);
  // toast.success("Otp is sent to email.")
  // notify();
  toast.success(`Your Otp is ${otpG}`,{
    closeButton: true, // Enable close button
    autoClose:false, // Disable auto close
  } )
  console.log(otpG);
  }

  const [verified, setVerified] = useState(false);

  const handleEmailVerify =()=>{
     // Validate OTP
  if (!resetData.otp) {
    setOtpError('OTP is required');
    return;
  }
    if(generatedOtp == resetData.otp){    
      setVerified(true);
      setOtpError(false);
      setOtpSent(false);
    }else{
      setOtpError(true);
      setVerified(false);
      setOtpSent(false);
    }
  }

  //-------------------
  // Add state variables for error messages
const [emailError, setEmailError] = useState('');
const [passwordError, setPasswordError] = useState('');
const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault(); // Prevent the default behavior of the anchor tag
    setOpen(true);
  };
  const handleClose = () =>{
    setOpen(false);
    setVerified(false);
    setGeneratedOtp('');
    setResetData({
      email: '',
      password: '',
      confirmPassword: '',
      otp:''
    });
    setShowOtpInput(false);
    setOtpError(false);
  }

  

  const handleResetInputChange = (e, field) => {
    const value = e.target.value;
    setResetData({ ...resetData, [field]: value });
     // Reset previous error messages
  if (field === 'email') setEmailError('');
  if (field === 'password') setPasswordError('');
  if (field === 'confirmPassword') setConfirmPasswordError('');
  };

 
  
  const handleResetPassword = async () => {

     // Validate email
  if (!resetData.email) {
    setEmailError('Email is required');
    return;
  }

  // Validate new password
  if (!resetData.password) {
    setPasswordError('New password is required');
    return;
  }

  // Validate confirm password
  if (!resetData.confirmPassword) {
    setConfirmPasswordError('Confirm password is required');
    return;
  }

  // Check if new password and confirm password match
  if (resetData.password !== resetData.confirmPassword) {
    setConfirmPasswordError('Passwords do not match');
    return;
  }

    if(Role === "Teacher"){

      try {
        console.log(resetData.password);
        let formData1 = new FormData();
        formData1.append("teacherPassword",resetData.password);
        formData1.append("teacherId",updatedTeacher.teacherId);
        formData1.append("teacherName",updatedTeacher.teacherName);
        formData1.append("className",updatedTeacher.className);
        formData1.append("teacherEmail",updatedTeacher.teacherEmail);
        formData1.append("students",JSON.stringify(updatedTeacher.students));


        console.log(formData1);
          // Check if the teacher email and class already exist
  console.log("in handleResetPassword"+updatedTeacher.teacherId);
  // Send a PUT request to update the teacher data
  await axios.put(`https://localhost:7225/api/Teachers/${updatedTeacher.teacherId}`, formData1,{
    headers:{
      "Content-Type":"multipart/form-data"
    }
  });

  handleClose();


  // Show success message
  Swal.fire({
      position: "center",
      icon: "success",
      title: "Success!",
      text: "Password updated successfully.",
      showConfirmButton: false,
      timer: 1800
  });

  
} catch (error) {
  console.error('Error updating teacher data:', error);

  // Show error message
  Swal.fire({
      position: "center",
      icon: "error",
      title: "Error!",
      text: "Failed to update Password.",
      showConfirmButton: false,
      timer: 1800
  });
}
}
    if(Role === "Parent"){
      try {
        console.log(resetData.password);
        let formData1 = new FormData();
        formData1.append("parentPassword",resetData.password);
        formData1.append("parentId",updatedParent.parentId);
        formData1.append("parentName",updatedParent.parentName);
        formData1.append("parentEmail",updatedParent.parentEmail);
        formData1.append("students",JSON.stringify(updatedParent.students));


        console.log(formData1);
          // Check if the teacher email and class already exist
  console.log("in handleResetPassword"+updatedTeacher.teacherId);
  // Send a PUT request to update the teacher data
  await axios.put(`https://localhost:7225/api/Parents/${updatedParent.parentId}`, formData1,{
    headers:{
      "Content-Type":"multipart/form-data"
    }
  });

  handleClose();


  // Show success message
  Swal.fire({
      position: "center",
      icon: "success",
      title: "Success!",
      text: "Password updated successfully.",
      showConfirmButton: false,
      timer: 1800
  });

  
} catch (error) {
  console.error('Error updating teacher data:', error);

  // Show error message
  Swal.fire({
      position: "center",
      icon: "error",
      title: "Error!",
      text: "Failed to update Password.",
      showConfirmButton: false,
      timer: 1800
  });
}

    }
    if(Role === "Admin"){
      
      try {
        console.log(resetData.password);
        let formData1 = new FormData();
        formData1.append("adminPassword",resetData.password);
        formData1.append("adminId",updatedAdmin.adminId);
        formData1.append("adminName",updatedAdmin.adminName);
        formData1.append("adminEmail",updatedAdmin.adminEmail);


        console.log(formData1);
          // Check if the teacher email and class already exist
  console.log("in handleResetPassword"+updatedTeacher.teacherId);
  // Send a PUT request to update the teacher data
  await axios.put(`https://localhost:7225/api/Admins/${updatedAdmin.adminId}`, formData1,{
    headers:{
      "Content-Type":"multipart/form-data"
    }
  });

  handleClose();


  // Show success message
  Swal.fire({
      position: "center",
      icon: "success",
      title: "Success!",
      text: "Password updated successfully.",
      showConfirmButton: false,
      timer: 1800
  });

  
} catch (error) {
  console.error('Error updating teacher data:', error);
handleClose();
  // Show error message
  Swal.fire({
      position: "center",
      icon: "error",
      title: "Error!",
      text: "Failed to change password.",
      showConfirmButton: false,
      timer: 1800
  });
}
    }

  }
  //------------------

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    login:''
  });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();


  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' }); // Clear previous errorss when input changes
  };
  

  const handleLogin = async () => {
    // to check if user is already logged in
    if (sessionStorage.getItem("isLoggedIn") === "true") {

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You Are Already logged-In! Log-Out First.",
        // footer: '<a href="#">Why do I have this issue?</a>'
      });
      return;
  }

  // to check if email and password is null
    if (!formData.email.trim() || !formData.password.trim()) {
      setErrors({
        email: !formData.email.trim() ? 'Email is required' : '',
        password: !formData.password.trim() ? 'Password is required' : '',
        login: ''
      });
      return;
    }

 // Max character limits
 const MAX_EMAIL_LENGTH = 30;
 const MAX_PASSWORD_LENGTH = 16;
 let newErrors = {};

 // Check if email exceeds the maximum length
 if (formData.email.trim().length > MAX_EMAIL_LENGTH) {
   newErrors.email = `Email should not exceed ${MAX_EMAIL_LENGTH} characters`;
 }

 // Check if password exceeds the maximum length
 if (formData.password.trim().length > MAX_PASSWORD_LENGTH) {
   newErrors.password = `Password should not exceed ${MAX_PASSWORD_LENGTH} characters`;
 }

 // Set errors if any
 if (Object.keys(newErrors).length > 0) {
   setErrors(newErrors);
   return;
 }

    try {
      let response = {};
      // Fetching user data from the backend
      if(Role === "Parent"){
         response = await axios.get(`https://localhost:7225/getParentByEmail/${formData.email.toLowerCase()}`);
      }
      if(Role === "Teacher"){
        response = await axios.get(`https://localhost:7225/getTeacherByEmail/${formData.email.toLowerCase()}`);
     }
     if(Role === "Admin"){
      response = await axios.get(`https://localhost:7225/getAdminByEmail/${formData.email.toLowerCase()}`);
    }

      const user = response.data;
      console.log(user);
      
      if (user != null) {
    
        // Check if the password matches
        if (Role === "Parent" && formData.password === user.parentPassword) {
          // Store necessary user information in sessionStorage
          sessionStorage.setItem("userId", user.parentId);
          sessionStorage.setItem("name", user.parentName);
          sessionStorage.setItem("emailId", user.parentEmail);
          sessionStorage.setItem("isLoggedIn", "true");

      if(user.students.length > 0){
        if(user.students.length > 1){
          sessionStorage.setItem("child1", JSON.stringify(user.students[0].studentName) );
          sessionStorage.setItem("child1Class", JSON.stringify(user.students[0].className) );

          sessionStorage.setItem("child2", JSON.stringify(user.students[1].studentName) );
        }else{
          sessionStorage.setItem("child1", JSON.stringify(user.students[0].studentName) );
        }
      }


          // Navigate to dashboard

          navigate('/dashboardParent');
        } 
        // For teacher 

        if (Role === "Teacher" && formData.password === user.teacherPassword) {
          // Store necessary user information in sessionStorage
          sessionStorage.setItem("userId", user.teacherId);
          sessionStorage.setItem("name", user.teacherName);
          sessionStorage.setItem("emailId", user.teacherEmail);
          sessionStorage.setItem("class", user.className);
          sessionStorage.setItem("isLoggedIn", "true");


          // Navigate to dashboard
          navigate('/dashboardTeacher');
        }
        
        if (Role === "Admin" && formData.password === user.adminPassword) {
          // Store necessary user information in sessionStorage
          sessionStorage.setItem("userId", user.adminId);
          sessionStorage.setItem("name", user.adminName);
          sessionStorage.setItem("emailId", user.adminEmail);
          sessionStorage.setItem("isLoggedIn", "true");


          // Navigate to dashboard
          navigate('/dashboardAdmin');
        }else {
          setErrors({ password: 'Invalid password' });
        }
      } else {
        setErrors({ login: 'Invalid email or password' });
      }
    } catch (errors) {
      setErrors({ login: 'Invalid email or password' });
    }
  }

  return (
    <>
{console.log(verified)}
      <MDBContainer fluid>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
            <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '450px', background: "linear-gradient(-45deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)" }}>
              <MDBCardBody className='p-5 w-100 d-flex flex-column'>
  
                <h2 className="fw-bold mb-2 text-center">Log in To Communica</h2>
                <p className="text-white-50 mb-3">Please enter your login and password!</p>
  
                {/* <MDBInput
                  wrapperClass='mb-4 w-100'
                  label='Email address'
                  id='email'
                  type='email'
                  size="lg"
                  onChange={(e) => handleInputChange(e, 'email')}
                  value={formData.email}
                /> */}

<div className="mb-4 d-flex align-items-center">
                  {/* <label htmlFor='email' className="me-3 mb-0" style={{ width: '30%' }}>Email-Id:</label> */}
                  <MDBInput
                  wrapperClass=' w-100'
                  label='Email address'
                    id='email'
                    type='email'
                    size="lg"
                    className='bg-white'
                    style={{ flex: 1 }}
                    onChange={(e) => handleInputChange(e, 'email')}
                    value={formData.email}
                  />
                </div>
                <h6 style={{fontWeight:"bold"}}>{errors.email && <div className="text-danger">{errors.email}</div>}</h6>
{/*   
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  label='Password'
                  id='password'
                  type='password'
                  size="lg"
                  onChange={(e) => handleInputChange(e, 'password')}
                  value={formData.password}
                /> */}
                <div className="mb-4 d-flex align-items-center">
                  {/* <label htmlFor='password' className="me-3 mb-0" style={{ width: '30%' }}>Password</label> */}
                  <MDBInput
                    wrapperClass='w-100'
                    label='Password'
                    id='password'
                    type='password'
                    size="lg"
                    className='bg-white'
                    style={{ flex: 1 }}
                    onChange={(e) => handleInputChange(e, 'password')}
                    value={formData.password}
                  />
                </div>
                <h6 style={{fontWeight:"bold"}}>{errors.password && <div className="text-danger">{errors.password}</div>}</h6>

                <h6 style={{fontWeight:"bold"}}>{errors.login && (
                    <div className="text-danger text-center mb-3">{errors.login}</div>)}</h6>
  
                {/* <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' /> */}

                
  
                <MDBBtn size='lg' onClick={handleLogin}>
                  Login
                </MDBBtn>
                 <hr className="my-4" />

                 <p className="text-white-50 mb-3">
                       <a style={{fontWeight:"bold"}} href='/' onClick={handleOpen}>Forgot Password?</a>
                      </p>
  

                 {Role !== "Admin" && (
                    <p style={{fontWeight:"bold"}} className="text-white-50 mb-3">
                      Not a user? {Role === 'Parent' ? <a href='/signup'>Sign-Up here </a> : <a href='/teacherSignUp'>Sign-Up here </a>}
                      </p>
                     )}  
                {/* <MDBBtn className="mb-2 w-100" size="lg" style={{ backgroundColor: '#dd4b39' }}>
                  <MDBIcon fab icon="google" className="mx-2" />
                  Sign in with google
                </MDBBtn>
  
                <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#3b5998' }}>
                  <MDBIcon fab icon="facebook-f" className="mx-2" />
                  Sign in with facebook
                </MDBBtn> */}
  
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* ----------- modal for Forgot password----- */}

      <div>
  <Modal open={open} onClose={handleClose}>
    <Box sx={style3}>
    <MDBContainer fluid>
      <MDBCard className='bg-white mx-auto' style={{width:"500px", borderRadius: '1rem' }}>
       <MDBCardBody className='p-5 d-flex flex-column align-items-center'>
          <h2 className="fw-bold mb-2 text-center">Set New Password</h2>
        
          <MDBInput
            wrapperClass='mb-2'
            label='Your Email'
            id='email'
            type='email'
            size="lg"
            onChange={(e) => handleResetInputChange(e, 'email')}
            value={resetData.email}
          />
          {emailError && (
           <div className="text-danger">{emailError}</div>
            )}
          
           {verified && (
                  // <span className="text-success ms-4">✓ Verified</span>
                  <div className="d-flex justify-content-start w-100">
                    <span className="text-success"><i className="fas fa-check-circle"></i> Verified</span>
                  </div>
                )}
          <MDBBtn style={{marginLeft:"auto", marginBottom:"8px"}} onClick={generateOtp}>
            Send Otp
          </MDBBtn>
          {/* { otpSent && (
            
             <Stack sx={{ width: '100%' }} spacing={2}>
             <Alert severity="success">Otp is sent to email.</Alert>
           </Stack>
          )

          } */}
          
          { showOtpInput && (
            <>
            <MDBInput
            wrapperClass='mb-2'
            label='OTP'
            id='otp'
            type='otp'
            size="lg"
            onChange={(e) => handleResetInputChange(e, 'otp')}
            value={resetData.otp}
          />
           {otpError && (
           <div className="text-danger">Invalid OTP</div>
           )}
          {console.log(verified)}
          {otpError && (
            <div className="text-danger d-flex justify-content-start w-100">
              <span>
            <i className="fas fa-exclamation-circle me-2"></i>
              Invalid OTP</span>
            </div>
          )}
          
          <MDBBtn style={{marginLeft:"auto", marginBottom:"8px"}} onClick={handleEmailVerify}>
            Verify
          </MDBBtn>

          
         {console.log("after"+verified)}
            </>
          )

          }
          { verified && (
            <>
          <MDBInput
            wrapperClass='mb-2'
            label='New Password'
            id='password'
            type='password'
            size="lg"
            onChange={(e) => handleResetInputChange(e, 'password')}
            value={resetData.password}
          />
          {passwordError && (
             <div className="text-danger">{passwordError}</div> 
            )}
          <MDBInput
            wrapperClass='mb-2'
            label='Confirm Password'
            id='confirmPassword'
            type='password'
            size="lg"
            onChange={(e) => handleResetInputChange(e, 'confirmPassword')}
            value={resetData.confirmPassword}
          />
          {confirmPasswordError && (
          <div className="text-danger">{confirmPasswordError}</div>
            )}

          <MDBBtn style={{ marginBottom:"5px"}} onClick={handleResetPassword}>
            Change Password
          </MDBBtn>
          </>
          )}

        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    </Box>
  </Modal>
</div>

      </>
    );
  
}

export default SignIn;
