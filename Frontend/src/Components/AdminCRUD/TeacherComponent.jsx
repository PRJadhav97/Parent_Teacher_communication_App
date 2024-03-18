import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Box, Modal, Button, TextField} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const buttonStyle = {
  backgroundColor: '#4caf50', color: '#fff',
  adding: '4px 6px',
  fontSize: '12px',
  minWidth: '80px' 
}

const style3 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "auto",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const TeacherCrud = () => {
  const [teachers, setTeachers] = useState([]);
  const [teacherId, setTeacherId] = useState(0);
  const [teacherName, setTeacherName] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [className, setClassroom] = useState('');

  //------------- soft delete------
  const [showModal, setShowModal] = useState(false); // Define showModal state

  const [storeTemp, setStoreTemp] = useState({
    teacherId:0,
   
  });

  useEffect(() => {}, [storeTemp]);// to update the teacher to recycle


  const navigate = useNavigate();


  //---------For Update----------

  const [openUpdate, setOpenUpdate] = React.useState(false);

  const handleOpenUpdate = () =>  setOpenUpdate(true);
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setErrors({
    teacherName: '',
    teacherPassword: '',
    teacherEmail: '',
    className: ''
    });

    setTeacherName('');
      setTeacherPassword('');
      setTeacherEmail('');
      setClassroom('');
  }

  const [errors, setErrors] = useState({
    teacherName: '',
    teacherPassword: '',
    teacherEmail: '',
    className: ''
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  // const SwalAlert =(msg) => {
  //   Swal.fire({
  //     position: "center",
  //     icon: "error",
  //     title:"Registration Error!",
  //     text: msg,
  //     showConfirmButton: false,
  //     timer: 1500,
  //     customClass: {
  //         popup: 'center-popup'
  //     }
  // });
  // }

  const fetchTeachers = async () => {

    try {
      const response = await axios.get('https://localhost:7225/api/Teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const fetchTeacherByEmail = async (email) => {

    try {
      const response = await axios.get(`https://localhost:7225/getTeacherByEmail/${email}`);
      const teacher = response.data;
      console.log(teacher);
      setTeacherId(teacher.teacherId);
      setTeacherName(teacher.teacherName);
      setTeacherPassword(teacher.teacherPassword);
      setTeacherEmail(teacher.teacherEmail);
      setClassroom(teacher.className);

    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

//   const addTeacher = async () => {
//     if (!validateInputs()) {
//       return;
//     }
//     try {
//         // Check if the teacher email and class already exist
//         const response = await axios.get(`https://localhost:7225/api/Teachers?teacherEmail=${teacherEmail}&className=${className}`);
//         const existingTeacher = response.data;
//         const EmailClass= existingTeacher.filter(e=>{
//            if(e.teacherEmail== teacherEmail && e.className==className)
//            {return e;}
//         })

//         const EmailExist= existingTeacher.filter(e=>{
//           if(e.teacherEmail==teacherEmail)
//           {return e;}
//        })
//        const ClassExist= existingTeacher.filter(e=>{
//         if(e.className==className)
//         {return e;}
//      })

// console.log(EmailClass);
// if(EmailClass.length>0)
// {
//   SwalAlert("Teacher with the same email and class already exists");
// return;
// }

// if(EmailExist.length>0)
// {
//   SwalAlert("Teacher with the same email already exists");
// return;
// }

// if(ClassExist.length>0)
// {
// SwalAlert("This class already has a teacher.");
// return;
// }


//       await axios.post('https://localhost:7225/api/Teachers', {
//         teacherName,
//         teacherPassword,
//         teacherEmail,
//         className
//       });

//       Swal.fire({
//         position: "center",
//         icon: "success",
//         title:"Congratulations!",
//         text: "Teacher Successfully registered.",
//         showConfirmButton: false,
//         timer: 1500,
//         customClass: {
//             popup: 'center-popup'
//         }
//     });

//       fetchTeachers();
//       setTeacherName('');
//       setTeacherPassword('');
//       setTeacherEmail('');
//       setClassroom('');
//     } catch (error) {
//       console.error('Error adding teacher:', error);
//     }
//   };

  // const deleteTeacher = async (teacherId) => {
  //   try {
  //     await axios.delete(`https://localhost:7225/api/Teachers/${teacherId}`);
  //     fetchTeachers();
  //   } catch (error) {
  //     console.error('Error deleting teacher:', error);
  //   }
  // };

  //----------soft delete-----

  const deleteTeacher = async (teacherId, className) => {
    try {

      setStoreTemp({
        teacherId  
      });

      sessionStorage.setItem("OldTeacherId",teacherId);
      sessionStorage.setItem("ClassName",className);
      setShowModal(true); // Open the modal when delete button is clicked
    } catch (error) {
      console.error('Error getting teacher details:', error);
    }
  };

  const handleSubmit = async () => {
    try {
     
      const oldId=sessionStorage.getItem("OldTeacherId");
      const newId=storeTemp.teacherId;
      const className=sessionStorage.getItem("ClassName");

      const patchData = [
        {
          operationType: 0,
          from: "string",
          op: 'replace',
          path: '/className',
          value: className
        }
      ];
    
      console.log(newId);
      const response=await axios.patch(`https://localhost:7225/replaceTeacher/${oldId}/${newId}/${className}`,patchData);

      setShowModal(false);

      Swal.fire({
        position: "center",
        icon: "success",
        text: "Deleted successfully!",
        imageUrl:"./Images/thumbsUp.gif",
        imageHeight:"60px",
        imageWidth:"60px",
        showConfirmButton: false,
        timer: 1850,
        customClass: {
            popup: 'center-popup'
        }
    });
      

    } catch (error) {
      console.error('Error updating teacher or recycling data:', error);
    }
  };
  
  //-------- Restore ------

  const [showRestoreModal, setShowRestoreModal] = useState(false); // Define showModal state


  const restoreTeacher = async (teacherId) => {
    try {

      sessionStorage.setItem("NewTeacherId",teacherId);
     // sessionStorage.setItem("ClassName",className);
      setShowRestoreModal(true); // Open the modal when delete button is clicked
    } catch (error) {
      console.error('Error getting teacher details:', error);
    }
  };

  const handleRestoreSubmit = async (className) => {
    try {
     
      const newId=sessionStorage.getItem("NewTeacherId");
      const className_1=className;

      const patchData = [
        {
          operationType: 0,
          from: "string",
          op: 'replace',
          path: '/className',
          value: className_1
        }
      ];
    
      console.log(newId);
      const response=await axios.patch(`https://localhost:7225/restoreTeacher/${newId}/${className_1}`,patchData);
      console.log("success"+response.data);

      setShowRestoreModal(false);

      Swal.fire({
        position: "center",
        icon: "success",
        text: "Restored successfully!",
        imageUrl:"./Images/thumbsUp.gif",
        imageHeight:"60px",
        imageWidth:"60px",
        showConfirmButton: false,
        timer: 1850,
        customClass: {
            popup: 'center-popup'
        }
    });

    } catch (error) {
      console.error('Error updating teacher or recycling data:', error);
    }
  };

  //--------hard delete--------

  
  const hardDeleteTeacher = async (teacherId)=>{

    await axios.delete(`https://localhost:7225/api/Teachers/${teacherId}`);

    Swal.fire({
      position: "center",
      icon: "success",
      text: "Deleted successfully!",
      imageUrl:"./Images/thumbsUp.gif",
      imageHeight:"60px",
      imageWidth:"60px",
      showConfirmButton: false,
      timer: 1850,
      customClass: {
          popup: 'center-popup'
      }
  });
  }


  //------ method or update-----

  const handleUpdate = async () => {

      if (!validateInputs()) {
              return;
            }
            try {
              handleCloseUpdate();
                // Check if the teacher email and class already exist
              
        // Create the updated teacher object with the new values
        const updatedTeacher = {
            teacherId: teacherId,
            teacherName: teacherName,
            teacherEmail: teacherEmail,
            teacherPassword: teacherPassword,
            className: className,
            students: []
        };

        // Send a PUT request to update the teacher data
        await axios.put(`https://localhost:7225/update/${teacherId}`, updatedTeacher);

        // Show success message
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Success!",
            text: "Teacher data updated successfully.",
            showConfirmButton: false,
            timer: 1800
        });

        // Fetch updated list of teachers
        fetchTeachers();

        // Close the modal
        handleCloseUpdate();
    } catch (error) {
        console.error('Error updating teacher data:', error);

        // Show error message
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Error!",
            text: "Failed to update teacher data.",
            showConfirmButton: false,
            timer: 1800
        });
    }
};


  const validateInputs = () => {
    const newErrors = {};
  
    // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(teacherPassword)) {
      newErrors.teacherPassword = 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character, 1 number, and be at least 8 characters long';
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(teacherEmail)) {
      newErrors.teacherEmail = 'Invalid email format';
    }
  
    // Classroom validation
    if (!className.trim()) {
      newErrors.classroom = 'Classroom is required.';
    }
  
    // Teacher Name validation
    if (!teacherName.trim()) {
      newErrors.teacherName = 'Teacher Name is required';
    }
  
    // Update state with new errors
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //------handling error-----
  const handleError = () =>{
    if(sessionStorage.getItem("isLoggedIn") === "false"){
        navigate("/error");
    }
}
  

  return (
<>
{handleError()};
<br></br>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" onClick={() => navigate("/dashboardAdmin")}>Back to Dashboard</Button>
    </div>
    <div className="container">
      <br></br>
      {/* <h2 style={{color:"white"}}>• Add Teacher Details</h2>
      <div className="mb-3">
        <input 
          type="text" 
          className="form-control" 
          style={{width: '450px'}} 
          placeholder="Teacher Name" 
          value={teacherName} 
          onChange={(e) => setTeacherName(e.target.value)} 
        />
        {errors.teacherName && <div className="text-danger">{errors.teacherName}</div>}
        <br/>
        <input 
          type="text" 
          className="form-control" 
          style={{width: '450px'}} 
          placeholder="Teacher Password" 
          value={teacherPassword} 
          onChange={(e) => setTeacherPassword(e.target.value)} 
        />
        {errors.teacherPassword && <div className="text-danger">{errors.teacherPassword}</div>}
        <br/>
        <input 
          type="text" 
          className="form-control" 
          style={{width: '450px'}} 
          placeholder="Teacher Email" 
          value={teacherEmail} 
          onChange={(e) => setTeacherEmail(e.target.value)} 
        />
        {errors.teacherEmail && <div className="text-danger">{errors.teacherEmail}</div>}
        <br/>
        <input 
          type="text" 
          className="form-control" 
          style={{width: '450px'}} 
          placeholder="Classroom" 
          value={className} 
          onChange={(e) => setClassroom(e.target.value)} 
        />
        {errors.classroom && <div className="text-danger">{errors.classroom}</div>}
        <br/>
        <button className="btn btn-primary mt-3" onClick={addTeacher}>Add Teacher</button>
      </div> */}
      <div>
        <h3 style={{color:"white"}}>• Teachers:</h3>
        <table className='table'>

        <thead style={{fontWeight:"bold"}} className="thead-dark">
           <tr>
             <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Teacher Id</th>
             <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Teacher Name</th>
             <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Teacher Email</th>
             <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Class</th>
             <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Edit Data</th>

             <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Remove Teacher</th>
      
           </tr>
         </thead>

         <tbody>

          {teachers.filter(t=>t.isActive==1).map(teacher => (

            <tr key={teacher.teacherId} style={{fontWeight:"bold",textAlign: "center"}}>
              <td>{teacher.teacherId}</td> 
              <td>{teacher.teacherName}</td>
              <td>{teacher.teacherEmail}</td>
              <td>{teacher.className}</td>
              <td>
               <button className="btn btn-info" onClick={() => {
                handleOpenUpdate();
                fetchTeacherByEmail(teacher.teacherEmail);

               }} >Update</button>
              </td>
<td>
 <button className="btn btn-danger" onClick={() => {

 deleteTeacher(teacher.teacherId, teacher.className);

// Swal.fire({
// title: "Are you sure?",
// text: "You won't be able to revert this!",
// icon: "warning",
// showCancelButton: true,
// confirmButtonColor: "#3085d6",
// cancelButtonColor: "#d33",
// confirmButtonText: "Yes, delete it!"
// }).then((result) => {
// if (result.isConfirmed) {
// deleteTeacher(teacher.teacherId)
// Swal.fire({
// title: "Deleted!",
// text: "Teacher data has been deleted.",
// icon: "success",
// timer: 1500,
// showConfirmButton: false

// });
// }
// });
}
}>Delete</button>
</td>
</tr>
          ))}
        

         </tbody>
        </table>

<br></br>
<h3 style={{color:"white"}}>• Substitute Teachers:</h3>


        <table className='table'>

<thead style={{fontWeight:"bold"}} className="thead-dark">
   <tr>
     <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Teacher Id</th>
     <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Teacher Name</th>
     <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Teacher Email</th>
     <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Class</th>
     <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Edit Data</th>
     <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Restore</th>
     <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Remove Teacher</th>

   </tr>
 </thead>
{/* for substitute teachers */}
 <tbody>

  {teachers.filter(t=>t.isActive==0).map(teacher => (

    <tr key={teacher.teacherId} style={{fontWeight:"bold",textAlign: "center"}}>
      <td>{teacher.teacherId}</td> 
      <td>{teacher.teacherName}</td>
      <td>{teacher.teacherEmail}</td>
      <td>{teacher.className}</td>
      <td>
       <button className="btn btn-info" onClick={() => {
        handleOpenUpdate();
        fetchTeacherByEmail(teacher.teacherEmail);

       }} >Update</button>
      </td>
      <td> <button className='btn btn-success' onClick={()=>restoreTeacher(teacher.teacherId)}>Restore</button> </td>
<td>
<button className="btn btn-danger" onClick={() => {


Swal.fire({
title: "Are you sure?",
text: "You won't be able to revert this!",
icon: "warning",
showCancelButton: true,
confirmButtonColor: "#3085d6",
cancelButtonColor: "#d33",
confirmButtonText: "Yes, delete it!"
}).then((result) => {
if (result.isConfirmed) {
hardDeleteTeacher(teacher.teacherId)
Swal.fire({
title: "Deleted!",
text: "Teacher data has been deleted.",
icon: "success",
timer: 1500,
showConfirmButton: false

});
}
});
}
}>Delete</button>
</td>
</tr>
  ))}


 </tbody>
</table>


        {/* // <ul className="list-group">
        //   {teachers.map(teacher => (
            <li key={teacher.teacherId} className="list-group-item d-flex justify-content-between align-items-center">
              Teacher Name: {" "+teacher.teacherName} | Class: {" "+teacher.className}
              <button className="btn btn-danger" onClick={() => deleteTeacher(teacher.teacherId)}>Delete</button>
            </li>
          ))}
        </ul> */}

      </div>
     
      <br></br>
      {/* ---------modal for update------ */}
      <div>
  <Modal open={openUpdate} onClose={handleCloseUpdate}>
    <Box sx={style3}>
      <div>
        <h2>Update Teacher Details:</h2>
        <div className="mb-3">
          <label style={{fontWeight:"bold"}} htmlFor="teacherName">Name</label>
          <input 
            type="text" 
            id="teacherName"
            className="form-control" 
            style={{width: '450px'}} 
            placeholder="Teacher Name" 
            value={teacherName} 
            onChange={(e) => setTeacherName(e.target.value)} 
          />
          {errors.teacherName && <div className="text-danger">{errors.teacherName}</div>}
          <br/>
          <label style={{fontWeight:"bold"}} htmlFor="teacherEmail">Email</label>
          <input 
            type="email" 
            id="teacherEmail"
            className="form-control" 
            style={{width: '450px'}} 
            placeholder="Teacher Email" 
            value={teacherEmail} 
            onChange={(e) => setTeacherEmail(e.target.value)} 
          />
          {errors.teacherEmail && <div className="text-danger">{errors.teacherEmail}</div>}
          <br/>
          {/* <label style={{fontWeight:"bold"}} htmlFor="className">Class</label>
          <input 
            type="text" 
            id="className"
            className="form-control" 
            style={{width: '450px'}} 
            placeholder="Classroom" 
            value={className} 
            onChange={(e) => setClassroom(e.target.value)} 
          /> */}
          <div className="mb-4 position-relative">
            <label className="d-flex align-items-center">
              <select
                className="form-select bg-white"
                value={className}
                onChange={(e) => setClassroom(e.target.value)}
                id="className"
                style={{ height:"38px" }} // Set the width to 100%
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
      <option value="Substitue">Substitue</option>

    </select>
  </label>
</div>
          {errors.classroom && <div className="text-danger">{errors.classroom}</div>}
          <br/>
        </div>
                      
        <div>
          <button className='btn btn-info' onClick={()=>{
            handleUpdate();
            handleCloseUpdate();
            }}  >Submit</button>
          <button onClick={handleCloseUpdate} className="btn btn-danger" style={{ marginLeft: '10px' }}>Cancel</button>
        </div>
      </div>
    </Box>
  </Modal>
</div>

{/* --------modal for recycle------- */}

<Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <h2>Enter New Teacher's Details</h2>
          <TextField label="New Teacher's Id" value={storeTemp.teacherId} onChange={(e) => setStoreTemp({ ...storeTemp, teacherId: e.target.value })} />
          {/* <TextField label="Teacher Email" value={storeTemp.teacherEmail} onChange={(e) => setStoreTemp({ ...storeTemp, teacherEmail: e.target.value })} /> */}
          <div style={{ marginTop: '20px' }}>
           <button className='btn btn-info' onClick={handleSubmit} variant="contained" color="primary">Submit</button>
          <button className='btn btn-danger' style={{marginLeft:"10px"}} onClick={() => setShowModal(false)}>Cancel</button>
         </div>
        </Box>
      </Modal>

      {/* ---------- Modal For Restore------- */}

       {/* Modal for entering new teacher details */}
       <Modal
        open={showRestoreModal}
        onClose={() => setShowRestoreModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <h2>Enter New Teacher's Details</h2>
          {/* <TextField label="Enter the Classroom you want to assign" value={className} onChange={(e) => setClassroom(e.target.value)} /> */}
          <div className="mb-4 position-relative">
            <label className="d-flex align-items-center">
              <select
                className="form-select bg-white"
                value={className}
                onChange={(e) => setClassroom(e.target.value)}
                id="className"
                style={{ height:"38px" }} // Set the width to 100%
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
      <option value="Substitue">Substitue</option>

    </select>
  </label>
</div>
          {/* <TextField label="Teacher Email" value={storeTemp.teacherEmail} onChange={(e) => setStoreTemp({ ...storeTemp, teacherEmail: e.target.value })} /> */}
          <div style={{marginTop:"20px"}}>
          <button className='btn btn-info' onClick={()=>handleRestoreSubmit(className)}>Submit</button>
          <button className='btn btn-danger' style={{marginLeft:"10px"}} onClick={() => setShowRestoreModal(false)}>Cancel</button>
          </div>
        </Box>
      </Modal>

      {/* <div>

<Modal open={openUpdate} onClose={handleCloseUpdate}>
                        <Box sx={style3}>
                        <div>
                        <h2>Update Teacher Details:</h2>
                <div className="mb-3">
        <label>Name</label>          
        <input 
          type="text" 
          className="form-control" 
          style={{width: '450px'}} 
          placeholder="Teacher Name" 
          value={teacherName} 
          onChange={(e) => setTeacherName(e.target.value)} 
        />
        {errors.teacherName && <div className="text-danger">{errors.teacherName}</div>}
        <br/>
        <input 
          type="text" 
          className="form-control" 
          style={{width: '450px'}} 
          placeholder="Teacher Password" 
          value={teacherPassword} 
          onChange={(e) => setTeacherPassword(e.target.value)} 
        />
        {errors.teacherPassword && <div className="text-danger">{errors.teacherPassword}</div>}
        <br/>
        <input 
          type="text" 
          className="form-control" 
          style={{width: '450px'}} 
          placeholder="Teacher Email" 
          value={teacherEmail} 
          onChange={(e) => setTeacherEmail(e.target.value)} 
        />
        {errors.teacherEmail && <div className="text-danger">{errors.teacherEmail}</div>}
        <br/>
        <input 
          type="text" 
          className="form-control" 
          style={{width: '450px'}} 
          placeholder="Classroom" 
          value={className} 
          onChange={(e) => setClassroom(e.target.value)} 
        />
        {errors.classroom && <div className="text-danger">{errors.classroom}</div>}
        <br/>
      </div>
                
                    <br></br>
                    <div>
                        <button variant="contained" className='btn btn-info' onClick={handleUpdate}  type="submit">Submit</button>
                        <button  onClick={handleCloseUpdate} variant="contained" className="btn btn-danger" style={{ marginLeft: '10px', adding: '4px 6px',fontSize: '12px',minWidth: '80px' }}>Cancel</button>
                    </div>
                
    </div>
  </Box>
 </Modal>

</div> */}

    </div>

    </>
  );
};

export default TeacherCrud;
