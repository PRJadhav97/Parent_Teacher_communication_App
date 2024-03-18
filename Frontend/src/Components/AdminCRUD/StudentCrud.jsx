import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Box, Modal} from '@mui/material';


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

const StudentCrud = () => {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState(0);
  const [studentName, setStudentName] = useState('');
  const [className, setClassName] = useState('');
  const [parentId, setParentId] = useState('');
  const [teacherId,setTeacherId] = useState('');
  const [showStudents, setShowStudents] = useState(false);
  const navigate = useNavigate();
  
 // const [teacherId, setTeacherId] = useState('');

  const [errors, setErrors] = useState({
    studentName: '',
    className: '',
    parentId: '',
    teacherId: sessionStorage.getItem("teacherId")
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('https://localhost:7225/api/Students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };
//------- update student --------
const [openUpdate, setOpenUpdate] = React.useState(false);

const handleOpenUpdate = () =>  {
  setOpenUpdate(true);
  setStudentName(studentName);
  setClassName(className);
  setParentId(parentId);
  setTeacherId(teacherId);
}
const handleCloseUpdate = () => {
  setOpenUpdate(false);
  setErrors({
  studentName: '',
  teacherId: '',
  className: '',
  parentId:'',
  });

    setStudentName('');
    setParentId('');
    setTeacherId('');
    setClassName('');
}


const fetchStudentById = async (id) => {

  try {
    const response = await axios.get(`https://localhost:7225/api/Students/${id}`);
    const student = response.data;
    console.log(student);
    setStudentId(student.studentId);
    setStudentName(student.studentName);
    setClassName(student.className);
    setParentId(student.parentId);
    setTeacherId(student.teacherId);

  } catch (error) {
    console.error('Error fetching Student:', error);
  }
};

const handleUpdate = async () => {

  // if (!validateInputs()) {
  //         return;
  //       }
        try {
          handleCloseUpdate();
            // Check if the teacher email and class already exist
          
    // Create the updated teacher object with the new values
    const updatedStudent = {
        studentId: studentId,
        studentName: studentName,
        className: className,
        parentId: parentId,
        teacherId: teacherId,
        parent:{},
        teacher_:{}

    };

    // Send a PUT request to update the teacher data
    await axios.put(`https://localhost:7225/api/Students/${studentId}`, updatedStudent);

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
    fetchStudents();

    // Close the modal
    handleCloseUpdate();
} catch (error) {
    console.error('Error updating student data:', error);

    // Show error message
    Swal.fire({
        position: "center",
        icon: "error",
        title: "Error!",
        text: "Failed to update student data.",
        showConfirmButton: false,
        timer: 1800
    });
}
};


//----------------------------
  const addStudent = async () => {
    if (!validateInputs()) {
      return;
    }
    try {
      const response = await axios.get(`https://localhost:7225/api/Students?studentName=${studentName}&className=${className}`);
        const existingStudent = response.data;
        const nameClass= existingStudent.filter(e=>{
           if(e.studentName== studentName && e.className==className)
           {return e;}
        })

        if(nameClass.length>0)
        {
          Swal.fire({
            position: "center",
            icon: "error",
            title:"Registration Error!",
            text: "Student with the same name and class already exists",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'center-popup'
            }
        });
        return;
        }

      const teacherData=await axios.get(`https://localhost:7225/getTeacherByClassname/${className}`);
      const tId=teacherData.data.teacherId;

      const teacherId=tId;
      await axios.post('https://localhost:7225/api/Students', {
        studentName,
        className,
        parentId,
        teacherId,
        
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title:"Congratulations!",
        text: "Student Added Successfully.",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
            popup: 'center-popup'
        }
    });
      fetchStudents();
      setStudentName('');
      setClassName('');
      setParentId('');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const deleteStudent = async (studentId) => {
    try {
      await axios.delete(`https://localhost:7225/api/Students/${studentId}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleShowStudents = () => {
    setShowStudents(true); 
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!studentName.trim()) {
      newErrors.studentName = 'Student Name is required';
    }
    if (!className.trim()) {
      newErrors.className = 'Class Name is required';
    }
    if (!parentId.trim()) {
      newErrors.parentId = 'Parent ID is required';
    }
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
  {handleError()} 

    <br></br>
<div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" onClick={() => navigate("/dashboardAdmin")}>Back to Dashboard</Button>
    </div>

    <div className="container">
      <br></br>
      <h3 style={{color:"white"}}>• Add Student Details</h3>
      <div className="mb-3">
        <input 
          type="text" 
          className="form-control" 
          style={{width: '450px'}} 
          placeholder="Student Name" 
          value={studentName} 
          onChange={(e) => setStudentName(e.target.value)} 
        />
        {errors.studentName && <div className="text-danger">{errors.studentName}</div>}
        <br/>
        {/* <input 
          type="text" 
          className="form-control" 
          style={{width: '450px'}} 
          placeholder="Class Name" 
          value={className} 
          onChange={(e) => setClassName(e.target.value)} 
        /> */}
         <div className="mb-4 position-relative">
            <label className="d-flex align-items-center">
              <select
                className="form-select bg-white"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                id="className"
                style={{ width:"450px", height:"38px" }} // Set the width to 100%
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

    </select>
  </label>
</div>
        
        {errors.className && <div className="text-danger">{errors.className}</div>}
        <br/>
        <input 
          type="text" 
          className="form-control" 
          style={{width: '450px'}} 
          placeholder="Parent ID" 
          value={parentId} 
          onChange={(e) => setParentId(e.target.value)} 
        />
        {errors.parentId && <div className="text-danger">{errors.parentId}</div>}

        <br/>

        <button className="btn btn-primary mt-3" onClick={addStudent}>Add Student</button>
      </div>
      {/* // show all students button  */}
      {!showStudents && <button className="btn btn-info mb-3" onClick={handleShowStudents}>Show All Students</button>}
      
      {/* list of students segregated by className */}
      {showStudents && (
        <div>
          {Array.from(new Set(students.map(student => student.className))).map(className => (
            <div key={className}>
              <h3 style={{color:"white"}}>• Class: {" "+className}</h3>
              {/* <ul className="list-group">
                {students.filter(student => student.className === className).map(student => (
                  <li key={student.studentId} className="list-group-item d-flex justify-content-between align-items-center">
                    Student Id: {" "+student.studentId} | Name:{" "+student.studentName} | Parent Name: {" "+student.parent_.parentName}
                    <button className="btn btn-danger" onClick={() => deleteStudent(student.studentId)}>Delete</button>
                  </li>
                ))}
              </ul> */}

     <table className="table">
         <thead style={{fontWeight:"bold"}} className="thead-dark">
           <tr>
             <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Student Id</th>
             <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Student Name</th>
             <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Parent Name</th>
             <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Edit Data</th>
             <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Remove Student</th>
      
           </tr>
         </thead>

         <tbody>

         {students.filter(student => student.className === className).map(student => (
            <tr key={student.studentId} style={{fontWeight:"bold",textAlign: "center"}}>
              <td>{student.studentId}</td>
              <td>{student.studentName}</td>
              <td>{student.parent_.parentName}</td>
              <td>
                <button className="btn btn-info" onClick={()=>{
                   fetchStudentById(student.studentId);
                  handleOpenUpdate();
                 
                }} >Update</button>
              </td>
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
                deleteStudent(student.studentId)
                Swal.fire({
                 title: "Deleted!",
                 text: "Student data has been deleted.",
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

            </div>
          ))}
        </div>
      )}
      <br></br>
    </div>

    {/* ---------modal for update------ */}
    <div>
  <Modal open={openUpdate} onClose={handleCloseUpdate}>
    <Box sx={style3}>
      <div>
        <h2>Update Student Details:</h2>
        <div className="mb-3">
          <label style={{fontWeight:"bold"}} htmlFor="studentName">Name</label>
          <input 
            type="text" 
            id="studentName"
            className="form-control" 
            style={{width: '450px'}} 
            placeholder="Student Name" 
            value={studentName} 
            onChange={(e) => setStudentName(e.target.value)} 
          />
          {errors.studentName && <div className="text-danger">{errors.studentName}</div>}
          <br/>
          {/* <label style={{fontWeight:"bold"}} htmlFor="className">Class</label>
          <input 
            type="text" 
            id="className"
            className="form-control" 
            style={{width: '450px'}} 
            placeholder="Class" 
            value={className} 
            onChange={(e) => setClassName(e.target.value)} 
          /> */}
          <div className="mb-4 position-relative">
            <label className="d-flex align-items-center">
              <select
                className="form-select bg-white"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                id="className"
                style={{  height:"38px" }} // Set the width to 100%
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

    </select>
  </label>
</div>
          {errors.className && <div className="text-danger">{errors.className}</div>}
          <br/>
          
          <label style={{fontWeight:"bold"}} htmlFor="teacherId">Teacher Id</label>
          <input 
            type="text" 
            id="teacherId"
            className="form-control" 
            style={{width: '450px'}} 
            placeholder="Teacher id" 
            value={teacherId} 
            onChange={(e) => setTeacherId(e.target.value)} 
          />
          {errors.teacherId && <div className="text-danger">{errors.teacherId}</div>}
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

    
    </>
  );
};

export default StudentCrud;
