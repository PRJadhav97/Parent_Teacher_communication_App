import React, { useState, useEffect } from 'react';
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

const ParentComponent = () => {
  const [parents, setParents] = useState([]);
  // const [newParent, setNewParent] = useState({ ParentName: '', ParentEmail: '', ParentPassword: '' });
  // const [errors, setErrors] = useState({});

  const [parentId, setParentId] = useState(0);
  const [parentName, setParentName] = useState('');
  const [parentPassword, setParentPassword] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  
  const navigate = useNavigate();

  //---------For Update----------

  const [openUpdate, setOpenUpdate] = React.useState(false);

  const handleOpenUpdate = () =>  setOpenUpdate(true);
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setErrors({
      parentName: '',
      parentPassword: '',
      parentEmail: ''
    });

      setParentName('');
      setParentPassword('');
      setParentEmail('');
  }

  
  const [errors, setErrors] = useState({
    parentName: '',
    parentPassword: '',
    parentEmail: ''
  });

  //----------

  useEffect(() => {
    fetchParents();
  }, []);

  const fetchParents = () => {
    axios.get('https://localhost:7225/api/Parents')
      .then(response => {
        setParents(response.data);
      })
      .catch(error => console.error('Error fetching parents:', error));
  };

  const fetchParentByEmail = async (email) => {

    try {
      const response = await axios.get(`https://localhost:7225/getParentByEmail/${email}`);
      const parent = response.data;
      console.log(parent);
      setParentId(parent.parentId);
      setParentName(parent.parentName);
      setParentPassword(parent.parentPassword);
      setParentEmail(parent.parentEmail);

    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  //------ method or update-----

  const handleUpdate = async () => {

    if (!validateInputs()) {
            return;
          }
          try {
            handleCloseUpdate();
              // Check if the teacher email and class already exist
            
      // Create the updated teacher object with the new values
      const updatedParent = {
          parentId: parentId,
          parentName: parentName,
          parentEmail: parentEmail,
          parentPassword: parentPassword,
          students: []
      };

      // Send a PUT request to update the teacher data
      await axios.put(`https://localhost:7225/updateParent/${parentId}`, updatedParent);

      // Show success message
      Swal.fire({
          position: "center",
          icon: "success",
          title: "Success!",
          text: "Parent data updated successfully.",
          showConfirmButton: false,
          timer: 1800
      });

      // Fetch updated list of teachers
      fetchParents();

      // Close the modal
      handleCloseUpdate();
  } catch (error) {
      console.error('Error updating parent data:', error);

      // Show error message
      Swal.fire({
          position: "center",
          icon: "error",
          title: "Error!",
          text: "Failed to update parent data.",
          showConfirmButton: false,
          timer: 1800
      });
  }
};

const validateInputs = () => {
  const newErrors = {};

  // Validate parent name
  const nameRegex = /^[a-zA-Z]{3,25}$/;
  if (!nameRegex.test(parentName)) {
    newErrors.parentName = 'Parent Name must contain only alphabets and be between 3 and 25 characters long';
  }

  // Validate parent email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(parentEmail)) {
    newErrors.parentEmail = 'Invalid email format';
  } else if (parentEmail.length > 50) {
    newErrors.parentEmail = 'Email should be maximum 50 characters';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewParent({ ...newParent, [name]: value });
  //   setErrors({ ...errors, [name]: '' }); // Clear previous error message
  // };

  // const validateInputs = () => {
  //   const newErrors = {};
  //   if (!newParent.ParentName.trim()) {
  //     newErrors.ParentName = 'Parent Name is required';
  //   }
  //   if (!newParent.ParentEmail.trim()) {
  //     newErrors.ParentEmail = 'Parent Email is required';
  //   } else if (!/^\S+@\S+\.\S+$/.test(newParent.ParentEmail)) {
  //     newErrors.ParentEmail = 'Invalid email format';
  //   }
  //   if (!newParent.ParentPassword.trim()) {
  //     newErrors.ParentPassword = 'Parent Password is required';
  //   }
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // const handleAddParent = () => {
  //   if (validateInputs()) {
  //     axios.post('https://localhost:7225/api/Parents', newParent)
  //       .then(() => {
  //         fetchParents();
  //         setNewParent({ ParentName: '', ParentPassword: '', ParentEmail: '' });
  //       })
  //       .catch(error => console.error('Error adding parent:', error));
  //   }
  // };

  const handleDeleteParent = (parentId) => {
    axios.delete(`https://localhost:7225/api/Parents/${parentId}`)
      .then(() => fetchParents())
      .catch(error => console.error('Error deleting parent:', error));
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
      {/* <h2 style={{color:"white"}}>• Add Parent Details </h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Parent Name"
          name="ParentName"
          style={{width:"450px"}}
          value={newParent.ParentName}
          onChange={handleInputChange}
        />
        {errors.ParentName && <div className="text-danger">{errors.ParentName}</div>}
        <br/>
        <input
          type="text"
          className="form-control"
          placeholder="Parent Email"
          name="ParentEmail"
          style={{width:"450px"}}
          value={newParent.ParentEmail}
          onChange={handleInputChange}
        />
        {errors.ParentEmail && <div className="text-danger">{errors.ParentEmail}</div>}
        <br/>
        <input
          type="text"
          className="form-control"
          placeholder="Parent Password"
          name="ParentPassword"
          style={{width:"450px"}}
          value={newParent.ParentPassword}
          onChange={handleInputChange}
        />
        {errors.ParentPassword && <div className="text-danger">{errors.ParentPassword}</div>}
        <br/>
        <button className="btn btn-primary mt-3" onClick={handleAddParent}>Add Parent</button>
      </div> */}
      
      <div>
        <h3 style={{color:"white"}}>• Parents:</h3>

        <table className='table'>

        <thead style={{fontWeight:"bold"}} className="thead-dark">
           <tr>
             <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Parent Id</th>
             <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Parent Name</th>
             <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Parent Email</th>
             <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Edit Data</th>
             <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Remove Parent</th>
      
           </tr>
         </thead>

         <tbody>

         {parents.map(parent => (

           <tr key={parent.parentId} style={{fontWeight:"bold",textAlign: "center"}}>
             <td>{parent.parentId}</td> 
             <td>{parent.parentName}</td>
             <td>{parent.parentEmail}</td>
            <td>
             <button className="btn btn-info" onClick={() => {
              handleOpenUpdate();
              fetchParentByEmail(parent.parentEmail);
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
  handleDeleteParent(parent.parentId)
  Swal.fire({
   title: "Deleted!",
   text: "Parent data has been deleted.",
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
      <br/>
    </div>


    
    <div>
  <Modal open={openUpdate} onClose={handleCloseUpdate}>
    <Box sx={style3}>
      <div>
        <h2>Update Parent Details:</h2>
        <div className="mb-3">
          <label style={{fontWeight:"bold"}} htmlFor="parentName">Name</label>
          <input 
            type="text" 
            id="parentName"
            className="form-control" 
            style={{width: '450px'}} 
            placeholder="Parent Name" 
            value={parentName} 
            onChange={(e) => setParentName(e.target.value)} 
          />
          {errors.parentName && <div className="text-danger">{errors.parentName}</div>}
          <br/>
          <label style={{fontWeight:"bold"}} htmlFor="parentEmail">Email</label>
          <input 
            type="email" 
            id="parentEmail"
            className="form-control" 
            style={{width: '450px'}} 
            placeholder="Parent Email" 
            value={parentEmail} 
            onChange={(e) => setParentEmail(e.target.value)} 
          />
          {errors.parentEmail && <div className="text-danger">{errors.parentEmail}</div>}
          <br/>
  
        </div>
                      
        <div>
          <button className='btn btn-info' onClick={handleUpdate}  >Submit</button>
          <button onClick={handleCloseUpdate} className="btn btn-danger" style={{ marginLeft: '10px' }}>Cancel</button>
        </div>
      </div>
    </Box>
  </Modal>
</div>

    </>
  );
};

export default ParentComponent;
