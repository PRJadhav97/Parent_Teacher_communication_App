
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Modal, Button, TextField } from '@mui/material';

const RecycleTeacherCrud = () => {
  const [teachers, setTeachers] = useState([]);

  const [showModal, setShowModal] = useState(false); // Define showModal state


  const [className, setClassName] = useState('');



  useEffect(() => {
    fetchTeachers();
  }, []);

 

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('https://localhost:7225/api/Teachers/getAllInActiveTeachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const deleteTeacher = async (teacherId)=>{

    await axios.delete(`https://localhost:7225/api/Teachers/${teacherId}`);
  }

  // await axios.delete(`https://localhost:7225/api/Teachers/${teacherId}`);
  const restoreTeacher = async (teacherId) => {
    try {

      sessionStorage.setItem("NewTeacherId",teacherId);
     // sessionStorage.setItem("ClassName",className);
      setShowModal(true); // Open the modal when delete button is clicked
    } catch (error) {
      console.error('Error getting teacher details:', error);
    }
  };

  const handleSubmit = async (className) => {
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

    } catch (error) {
      console.error('Error updating teacher or recycling data:', error);
    }
  };

  return (
    <div className="container">
     
      <div>
        <h3>•Deleted Teachers:</h3>
        <ul className="list-group">
          {teachers.map(teacher => (
            <li key={teacher.teacherId} className="list-group-item d-flex justify-content-between align-items-center">
              Teacher Name: {" " + teacher.teacherName}
              <button className="btn btn-danger" onClick={() => deleteTeacher(teacher.teacherId)}>Delete</button>
              <button onClick={()=>restoreTeacher(teacher.teacherId)}>Restore</button>
            </li>
          ))}
        </ul>
      </div>
      {/* Modal for entering new teacher details */}
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
          <TextField label="Enter the Classroom you want to assign" value={className} onChange={(e) => setClassName(e.target.value)} />
          {/* <TextField label="Teacher Email" value={storeTemp.teacherEmail} onChange={(e) => setStoreTemp({ ...storeTemp, teacherEmail: e.target.value })} /> */}
          <Button onClick={()=>handleSubmit(className)}>Submit</Button>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
        </Box>
      </Modal>
      <br />
    </div>
  );
};

export default RecycleTeacherCrud;