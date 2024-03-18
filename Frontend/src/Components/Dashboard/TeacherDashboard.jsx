import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
    CDBSidebarFooter,
  } from 'cdbreact';
  import { Col, Row } from 'react-bootstrap';
import { Input } from 'semantic-ui-react';
import { Box, Modal, Button, TextField } from '@mui/material';
import AnnouncementCrud from "./Announcement";

import Swal from "sweetalert2";

//-------for marks----

import { BarChart } from '@mui/x-charts/BarChart';

// const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
  'Maths',
  'Physics',
  'Chemistry',
  'History',
];


// ------Style for modal
const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  height: "auto",
  maxWidth: "750px",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
  width: "400px",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', padding: '15px 50px 20px' 

};
const inputStyle = {
  padding: "5px",
  width: "200px"
}

const labelStyle = {
  display: 'inline-block',
  width: '100px',
  textAlign: 'right',
  marginRight: '10px'


}

export default function TeacherDashboard(){
    
    const navigate = useNavigate();
    const[post, setPost] = useState([]);

    //-----For view marks------
    const [data, setData] = useState([]);

    const uData = [Math.min(data.maths, 100), Math.min(data.physics, 100), Math.min(data.chemistry, 100), Math.min(data.history, 100)];

    const [open, setOpen] = React.useState(false);

  const handleOpen = () =>  setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setData('');
}

const fetchData = async (id,name,cl) => {
  sessionStorage.setItem("sname", name );
  sessionStorage.setItem("class", cl );
  console.log(sessionStorage.getItem("sname"));
  console.log(sessionStorage.getItem("class"));

   try {
     const response = await axios.get(`https://localhost:7225/api/Marks/${id}`);
     setData(response.data); // Assuming the API returns an array of data
     console.log("data"+data);
     console.log(response.data);
   } catch (error) {
     console.error('Error fetching data:', error);
   }
 };



    //-------Add Marks ---------

   

    const [openMarks, setOpenMarks] = React.useState(false);

  const handleOpenMarks = () =>  setOpenMarks(true);
  const handleCloseMarks = () => {
    setOpenMarks(false);
    setMarksErrors({
      mathsError: '',
      physicsError: '',
      chemistryError: '',
      historyError: ''
    })
  }
    const [studentMarks, setStudentMarks] = useState({
      studentId: '',
      studentName: '',
      className:'',
      maths: '',
      physics: '',
      chemistry: '',
      history: ''
    });

    const [marksErrors, setMarksErrors] = useState({
      mathsError: '',
      physicsError: '',
      chemistryError: '',
      historyError: ''
  });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setStudentMarks(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleMarksSubmit = async (e) => {
      e.preventDefault();

      let errors = {};
      let hasErrors = false;

      // Validate marks
      Object.entries(studentMarks).forEach(([key, value]) => {
          if (key !== 'studentId' && key !== 'studentName' && key !== 'className') {
              if (!value.trim()) {
                  errors = { ...errors, [`${key}Error`]: 'This field is required' };
                  hasErrors = true;
              } else if (parseInt(value) > 100) {
                  errors = { ...errors, [`${key}Error`]: 'Marks cannot exceed 100' };
                  hasErrors = true;
              } else if (parseInt(value) < 0) {
                errors = { ...errors, [`${key}Error`]: 'Marks cannot be negative' };
                hasErrors = true;
              }else {
                  errors = { ...errors, [`${key}Error`]: '' };
              }
          }
      });

      if (hasErrors) {
          setMarksErrors(errors);
          return;
      }



      try {
        await axios.post('https://localhost:7225/api/Marks', studentMarks);
        console.log('Marks added successfully');
        // Optionally, you can reset the form after successful submission
        setStudentMarks({
          maths: '',
          physics: '',
          chemistry: '',
          history: ''
        });

        handleCloseMarks();

        Swal.fire({
          position: "center",
          icon: "success",
          text: "Marks added successfully.",
          showConfirmButton: false,
          timer: 1600,
          customClass: {
              popup: 'center-popup'
          }
      });

      } catch (error) {
        console.error('Error adding marks:', error);
      }
    };

    //------------for message---------------
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const[messages,setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const[showMsgs,setShowMsgs] = useState(false);
    const[parId,setPid] = useState(0);
    const[pName,setpName] = useState('');
    const[students,setStudents] = useState([]);
    const [className, setClassName] = useState(null);

    const [messageError, setMessageError] = useState('');



    //----------For Announcements---
    const [announcementTitle, setAnnouncementTitle] = useState('');
    const [announcementDescription, setAnnouncementDescription] = useState('');
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [openModal, setOpenModal] = useState(false);

    // ------------- for sidebar sitename----

    const [showLogo, setShowLogo] = useState(true);

    const handleSidebarClick = () => {
          setShowLogo(!showLogo);
  };

    //  For message modal

  const [openMessage, setOpenMessage] = React.useState(false);

  const handleOpenMessage = () =>  setOpenMessage(true);
  const handleCloseMessage = () => {
    setOpenMessage(false);
    setMessageError('');
  }

  

  //-----------------------------

  // ----------For Announcement post modal

  const handlePostAnnouncement = async () => {
    try {
        setTitleError('');
        setDescriptionError('');

        if (!announcementTitle.trim()) {
            setTitleError('Enter valid title');
            return;
        }
        

        if (!announcementDescription.trim()) {
            setDescriptionError('Enter valid description');
            return;
        }
        

        await AnnouncementCrud.createAnnouncement({
            announcementTitle: announcementTitle,
            announcementDescription: announcementDescription,
            teacherId: sessionStorage.getItem("userId"),
            className: className
        });
        console.log( "announcementTitle:"+ announcementTitle
          +"announcementDescription:" +announcementDescription
          +"teacherId:"+ sessionStorage.getItem("userId")
          +"classroom:" +className);

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Announcement posted successfully!",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'center-popup'
            }
        });
        // alert('Announcement posted successfully!');
        
        setOpenModal(false);
        setAnnouncementTitle('');
        setAnnouncementDescription('');
        
    } catch (error) {
        console.error('Error posting announcement:', error);
       // alert('Failed to post announcement!');
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });

          
    }
};
//----------------------------

    useEffect(() => {
      if(sessionStorage.getItem("userId") === null){
        navigate("/error");
        return;
    }
      
      try{
      axios.get(`https://localhost:7225/api/Students/students/${sessionStorage.getItem('userId')}`).then((response) => {
      setStudents(response.data);
      // setPid(response.data.parent_.parentId)
      });
      console.log(students);
      //console.log(filteredResults);
    //  setLoading(false); // Set loading to false once data is fetched
}catch(error){
  console.log(error);
}},[]);

useEffect(()=>{
  if(sessionStorage.getItem("userId") === null){
    navigate("/error");
    return;
}
try{

  axios.get(`https://localhost:7225/api/Teachers/${sessionStorage.getItem('userId')}`)
  .then((response)=>{ setClassName(response.data.className);
    sessionStorage.setItem("class", response.data.className);
    })
}catch(error){
  console.log(error);
}
})

    useEffect(() => {
      if(sessionStorage.getItem("userId") === null){
        navigate("/error");
        return;
    }
    try{
      axios.get("https://localhost:7225/getAnnByClassname/all").then((response) => {
        setPost(response.data);
      });
    }catch(error){
      console.log(error);
    }}, [])

   
    //----------------------------

    const handleConnect = async (id) => {
      // Set parId immediately before calling axios.get
      setShowMsgs(true);
      setPid(id);
      await axios.get(`https://localhost:7225/api/Parents/${id}`)
                 .then((res) => {
                    setpName(res.data.parentName);
                 })
  
      //console.log(parId); 
        await axios.get(`https://localhost:7225/api/Messages/getMessagesByTIdAndPId/${sessionStorage.getItem('userId')}/${id}`)
          .then((res) => {
            setMessages(res.data);
          });
    };
  
    const handleNewMessage = (e) => {
      setNewMessage(e.target.value);

    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!newMessage.trim()) {
        // Set the error message
        setMessageError('Message cannot be empty');
        return;
    }
    // Clear any previous error messages
    setMessageError('');
      const msg = {
        message : newMessage,
        parentId: parId,
        teacherId : sessionStorage.getItem('userId'),
        role : "teacher"
      }
      await axios.post("https://localhost:7225/api/Messages",msg)
      .then((res)=>setMessages([...messages,res.data]));
      console.log(messages);
      setNewMessage('');

    }

    // Ref for the chat container
    const chatContainerRef = useRef(null);

    // Handler to scroll to the bottom of the chat container
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    };

    //---------------------------------

    const searchItems = (searchValue)=>{
      setSearchInput(searchValue);
      if(searchInput !== '')
      {
        const filterdData = students.filter((item) => {
          return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
         })
         setFilteredResults(filterdData);
      }
      else{
        setFilteredResults(students);
      }
  }

    //--------------------------------

    const handleClick=(path) => {
        navigate(path);
    } 

    // ---------------Error handle

    const handleError = () =>{
      if(sessionStorage.getItem("isLoggedIn") === "false"){
          navigate("/error");
      }
  }


    return(

        <>
         {handleError()}


        <Row style={{ justifyContent: 'center', maxWidth:"100%",overflowX:"hidden" }}>

           {/* ---------------Sidebar Code */}
      <Col xs={3} style={{height:"auto",position: 'sticky', top: 0 }}>
      {/* <CDBSidebar textColor="#fff" backgroundColor="#333"> */}
      <CDBSidebar textColor="#333" backgroundColor="linear-gradient(109.6deg, rgba(177, 173, 219, 1) 11.2%, rgba(245, 226, 226, 1) 91.1%)">

        <CDBSidebarHeader prefix={<i onClick={handleSidebarClick} className="fa fa-bars" />}>

          Welcome {sessionStorage.getItem("name")}
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
          {/* <CDBSidebarMenuItem icon="chart-line" iconType="solid">Add Student Marks</CDBSidebarMenuItem> */}
            <CDBSidebarMenuItem icon="sticky-note" >Calender</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="th-large" onClick={()=> handleClick("/teacherQuery")}>Queries</CDBSidebarMenuItem>
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

      <Col style={{ width:"auto", textAlign: 'center' }}>
        <br></br>
      <Button variant="contained" onClick={() => setOpenModal(true)}>Post new announcement</Button>
      
      <>
     
     <div>
        <div style={{ display: 'flex',fontWeight:"bold", alignItems: 'center', padding: 20 }}>
          <span style={{fontSize:"22px",color:"white"}}>• Class: {" "+sessionStorage.getItem("class")}</span>
        <span style={{fontSize:"18px", marginLeft:50, color:"white" }}>• Search Students:</span>
         <Input icon='search'
           placeholder='Student Name...'
           onChange={(e)=> searchItems(e.target.value)}
         />
         
      </div>

         {/* {students && students.length > 0 ? ( */}
         
         {searchInput.length > 1 ? (
           <table className="table" >
           <thead style={{fontWeight:"bold"}} className="thead-dark">
             <tr>
               <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Roll No.</th>
               <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Student Name</th>
               <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Parent Name</th>
               <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Add Marks</th>

               <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Contact Parent</th>
             </tr>
           </thead>

           <tbody>
             
               {filteredResults.map((stu,id) => {
                           return(
                             <tr key={id} style={{fontWeight:"bold",textAlign: "center"}}>
                               <td >{stu.studentId}</td>
                               <td >{stu.studentName}</td>
                               <td >{stu.parent_.parentName}</td>
                               <td><Button
                             onClick={() => {
                              handleOpenMarks();
                              setStudentMarks({
                                studentId: stu.studentId,
                                studentName: stu.studentName,
                                className: stu.className
                              })
                             }
                             }
                              variant="contained"
                              style={buttonStyle}
                              >
                                Add Marks
                                </Button></td>
                               <td><Button onClick={()=>{
                                sessionStorage.setItem("sname", stu.studentName);
                                sessionStorage.setItem("class", stu.className);
                                handleOpenMessage();
                                handleConnect(stu.parentId)}}
                                variant="contained"
                                style={buttonStyle}>Connect</Button></td>
                             </tr>
                           )
                         })}
           </tbody>
         </table> 
         ):(<table className="table">
         <thead style={{fontWeight:"bold"}} className="thead-dark">
           <tr>
             <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Roll No.</th>
             <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Student Name</th>
             <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Parent Name</th>
             <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Add Marks</th>
             <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">View Marks</th>
             <th style={{fontWeight:"bold",textAlign: "center"}}  scope="col">Contact Parent</th>

             
           </tr>
         </thead>

         <tbody>
           
             {students.map((stu,id) => {
                         return(
                           <tr key={id} style={{fontWeight:"bold",textAlign: "center"}}>
                             <td>{stu.studentId}</td>
                             <td>{stu.studentName}</td>
                             <td>{stu.parent_.parentName}</td>
                             <td><Button
                             onClick={() => {
                              sessionStorage.setItem("sname",stu.studentName);
                              handleOpenMarks();
                              setStudentMarks({
                                studentId: stu.studentId,
                                studentName: stu.studentName,
                                className: stu.className
                              })
                             }
                             }
                              variant="contained"
                              style={buttonStyle}
                              >
                                Add Marks
                                </Button></td>
                                {/* --- View marks---- */}
                                <td><Button
                             onClick={() => {
                              sessionStorage.setItem("sname", stu.studentName);
                              handleOpen();
                              fetchData(stu.studentId,stu.studentName,stu.className);
                             }
                             }
                              variant="contained"
                              style={buttonStyle}
                              >
                                View Marks
                                </Button></td>

                             <td><Button onClick={()=>{
                              sessionStorage.setItem("sname", stu.studentName);
                              sessionStorage.setItem("class", stu.className);
                              sessionStorage.setItem("parentName",stu.parent_.parentName);
                              handleOpenMessage();
                              handleConnect(stu.parentId)}}
                              style={buttonStyle}
                              >Connect</Button></td>
                            
                           </tr>
                         )
                       })}
         </tbody>
       </table> )}
           
            {/* : (<h2>Loading data...</h2>) */}
           
     </div>
 </>
 <br></br>
      
              <div style={{width:"100%"}}>
                    <div className="alert alert-primary alert-dismissible fade show announcement-top-bar" role="alert" style={{backgroundColor: "#343a40"}}>
                        <h5 className='announcement-heading' >• School Announcements:</h5>
                    </div>
                    <section className="alert alert-primary alert-dismissible fade show announcement-top-bar" role="alert" style={{ height: '200px',textAlign:"left", overflowY: 'auto', width: "auto" , backgroundColor:" #f8f9fa", color:"#343a40" }}>
                        {post.map((a) => {
                            return (
                             <h5 className='announcement-content'><li style={{fontWeight:'bold'}}>{a.announcementTitle}</li>{a.announcementDescription}</h5>                            )
                        })}
                    </section>
                </div>

    <br></br>
    
      </Col>
      <Col xs={2} style={{overflowX:"hidden"}}></Col>
      </Row>


      {/* ------------ Message Modal--------- */}
      <div>

<Modal
open={openMessage}
onClose={handleCloseMessage}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"
>

<Box sx={style2}>
  <h5> Student Name: {" "+sessionStorage.getItem("sname")+" | "} Parent Name: {" "+sessionStorage.getItem("parentName")} </h5>
  <div>
  { showMsgs &&
 <>
     <div className="alert alert-primary alert-dismissible fade show announcement-top-bar" role="alert" style={{backgroundColor: "#343a40", height:"50px"}}>
           <h4 className='announcement-heading' >• Messages:</h4>
     </div>
           <section ref={chatContainerRef} className="alert alert-primary alert-dismissible fade show announcement-top-bar" role="alert" style={{ height: '280px',textAlign:"left", overflowY: 'auto', width: "auto" , backgroundColor:" #e6eaee", color:"#343a40" }}>       
               
                {messages.map((m)=>{

                const messageDate = new Date(m.messageDate);
                const formattedDate = messageDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
 // Parse messageTime manually
                const timeParts = m.messageTime.split(':');
                const hours = parseInt(timeParts[0], 10);
                const minutes = parseInt(timeParts[1], 10);
 // Construct AM/PM string
                const ampm = hours >= 12 ? 'PM' : 'AM';
                const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
                const formattedTime = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

                 if(m.role === 'teacher' && m.teacherId == sessionStorage.getItem('userId')){
                   return (         
                    
                    //  <h5 className='announcement-content'><li>{sessionStorage.getItem('name')} : {m.message}</li></h5> 
                    <>        
                    <div className='announcement-content d-flex justify-content-end' style={{paddingBottom:"10px"}}>
                    <span style={{
                      backgroundColor: "#4caf50",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      marginRight: "10px",
                      color:"white"
                    }}>
                      {m.message}
                    </span>
                    <div className="avatar" style={{ backgroundColor: "#4caf50", color: "white", borderRadius: "50%", padding: "5px 10px" }}>
                      {sessionStorage.getItem("name").charAt(0)}
                    </div>
                  </div>
                  <div className="d-flex flex-column align-items-end ml-auto">
                  <p className="small mb-2 text-muted">{formattedDate+" - "+formattedTime} </p>
                  {/* <p className="small mb-2 text-muted">{dateFormat[2]+"/"+dateFormat[1]+"/"+dateFormat[0]+"/" +" - "+m.messageTime} </p>  */}
                  </div>
                  </>
                   )
                 }
                 else if (m.role === 'parent' && m.parentId == parId){
                   return (
                            
                    //  <h5 className='announcement-content'><li>{pName} : {m.message}</li></h5>
                    
                    <>
                            <div className='announcement-content d-flex justify-content-start' style={{paddingBottom:"10px"}}>
                            <div className="avatar" style={{ backgroundColor: "grey", color: "white", borderRadius: "75%", padding: "5px 10px" }}>
                              {sessionStorage.getItem("parentName").charAt(0)}
                            </div>
                            <span style={{
                              backgroundColor: "grey",
                              padding: "5px 10px",
                              borderRadius: "5px",
                              marginLeft: "10px",
                              color: "white"
                            }}>{m.message}</span>
                                          
                          </div> 
                          <div >
                          <p className="small mb-2 text-muted">{formattedDate+" - "+formattedTime} </p>
                          </div>
                          

                          </>
                   )
                 }
               })}
           </section>

           <div className='d-flex justify-content-end' style={{marginBottom:"3px"}}>
                <button onClick={scrollToBottom} className="btn btn-primary ">
                                    See new messages</button>
          </div>

     <div>
           <form onSubmit={handleSubmit}>
               <div className="form-group">
                        <input
                         type="text"
                         className="form-control"
                         id="newMessage"
                         placeholder="Message"
                         value={newMessage}
                         onChange={handleNewMessage}
                       />
                   {messageError && <p className="text-danger">{messageError}</p>}

                </div>
                
                     <button style={{marginTop:"5px"}} type="submit" className="btn btn-primary">
                       Send Message
                     </button>
          </form>
        
           </div>
           </>}

        </div>
</Box>
</Modal>

</div>                  


{/* ------------ Modal for view marks chart-------- */}

 <div>

<Modal
open={open}
onClose={handleClose}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"
>
<Box sx={style}>
  <h5> Student Name: {" "+sessionStorage.getItem("sname")+" | "} Class: {" "+sessionStorage.getItem("class")} </h5>
<BarChart
width={500}
height={300}
series={[{ data: uData, label: 'Scored Marks', id: 'uvId' }]}
xAxis={[{ data: xLabels, scaleType: 'band' }]}
/>
  
</Box>
</Modal>

</div>


{/* ------Modal for Announcements------- */}

<div>

<Modal open={openModal} onClose={() => {setOpenModal(false);
                                         setTitleError('');
                                         setDescriptionError('');
                                         }}>
                        <Box sx={style2}>
                            <h2 id="modal-title">What's New?</h2>
                            <TextField
                                id="announcement-title"
                                label="Announcement Title"
                                value={announcementTitle}
                                onChange={(e) => setAnnouncementTitle(e.target.value)}
                                variant="outlined"
                                fullWidth
                                error={!!titleError}
                                helperText={titleError}
                            /><br></br>
                            <br></br>
                            <TextField
                                id="announcement-description"
                                label="Announcement Description"
                                multiline
                                rows={4}
                                value={announcementDescription}
                                onChange={(e) => setAnnouncementDescription(e.target.value)}
                                variant="outlined"
                                fullWidth
                                error={!!descriptionError}
                                helperText={descriptionError}
                            /><br></br>
                            <br></br>
                            <Button variant="contained" onClick={handlePostAnnouncement}>Post</Button>
                            <Button style={{marginLeft:"10px"}} variant="contained" className="secondary-btn" onClick={() => setOpenModal(false)}>Cancel</Button>
                        </Box>
                    </Modal>

</div>

{/* --------- modal for marks------ */}

<div>

<Modal open={openMarks} onClose={handleCloseMarks}>
                        <Box sx={style3}>
                        {/* <div>
                        <h2>Add Student Marks</h2>
                        <h4>Student Name: {" "+sessionStorage.getItem("sname")}</h4>
                <form onSubmit={handleMarksSubmit}>
                    <div>
                        <label>Maths:</label>
                        <input
                            type="number"
                            name="maths"
                            value={studentMarks.maths}
                            onChange={handleChange}
                            required
                        />
                        {marksErrors.mathsError && <p className="text-danger">{marksErrors.mathsError}</p>}
                    </div>
                    <br></br>
                    <div>
                        <label>Physics:</label>
                        <input
                            type="number"
                            name="physics"
                            value={studentMarks.physics}
                            onChange={handleChange}
                            required
                        />
                        {marksErrors.physicsError && <p className="text-danger">{marksErrors.physicsError}</p>}
                    </div>
                    <br></br>
                    <div>
                        <label>Chemistry:</label>
                        <input
                            type="number"
                            name="chemistry"
                            value={studentMarks.chemistry}
                            onChange={handleChange}
                            required
                        />
                        {marksErrors.chemistryError && <p className="text-danger">{marksErrors.chemistryError}</p>}
                    </div>
                    <br></br>
                    <div>
                        <label>History:</label>
                        <input
                            type="number"
                            name="history"
                            value={studentMarks.history}
                            onChange={handleChange}
                            required
                        />
                        {marksErrors.historyError && <p className="text-danger">{marksErrors.historyError}</p>}
                    </div>
                    <br></br>
                    <div>
                        <Button variant="contained" style={buttonStyle} type="submit">Add Marks</Button>
                        <Button  onClick={handleCloseMarks} variant="contained" className="secondary-btn" style={{ marginLeft: '10px', adding: '4px 6px',fontSize: '12px',minWidth: '80px' }}>Cancel</Button>
                    </div>
                </form>
    </div> */}
     <div>
                <h2>Add Student Marks</h2>
                <h4>Student Name: {" " + sessionStorage.getItem("sname")}</h4>
                <form onSubmit={handleMarksSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label style={{ marginRight: '10px' }}>Maths:</label>
                        <input
                            type="number"
                            name="maths"
                            value={studentMarks.maths}
                            onChange={handleChange}
                            required
                        />
                        {marksErrors.mathsError && <p className="text-danger">{marksErrors.mathsError}</p>}
                    </div>
                    <br />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label style={{ marginRight: '10px' }}>Physics:</label>
                        <input
                            type="number"
                            name="physics"
                            value={studentMarks.physics}
                            onChange={handleChange}
                            required
                        />
                        {marksErrors.physicsError && <p className="text-danger">{marksErrors.physicsError}</p>}
                    </div>
                    <br />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label style={{ marginRight: '10px' }}>Chemistry:</label>
                        <input
                            type="number"
                            name="chemistry"
                            value={studentMarks.chemistry}
                            onChange={handleChange}
                            required
                        />
                        {marksErrors.chemistryError && <p className="text-danger">{marksErrors.chemistryError}</p>}
                    </div>
                    <br />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label style={{ marginRight: '10px' }}>History:</label>
                        <input
                            type="number"
                            name="history"
                            value={studentMarks.history}
                            onChange={handleChange}
                            required
                        />
                        {marksErrors.historyError && <p className="text-danger">{marksErrors.historyError}</p>}
                    </div>
                    <br />
                    <div>
                        <Button variant="contained" style={buttonStyle} type="submit">Add Marks</Button>
                        <Button onClick={handleCloseMarks} variant="contained" className="secondary-btn" style={{ marginLeft: '10px', adding: '4px 6px', fontSize: '12px', minWidth: '80px' }}>Cancel</Button>
                    </div>
                </form>
            </div>
  </Box>
 </Modal>

</div>


        </>
    )
}