import React, { useEffect, useRef, useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';
import { Col, Row } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./Announcement.css";
import "./Query.css";
import QueryCrud from '../AdminCRUD/QueryCrud';
import Swal from 'sweetalert2';


// Modal Graph
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import Button from '@mui/material/Button';

import { BarChart } from '@mui/x-charts/BarChart';

// const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
  'Maths',
  'Physics',
  'Chemistry',
  'History',
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
// background: 'linear-gradient(-45deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    // background: 'linear-gradient(-45deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



const ParentDashboard = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState([]);
    // const [student, setStudent] = useState([]);
    const [parent, setParent] = useState({ students: [] }); // Initialize with an empty array
    const [loading1, setLoading1] = useState(true); // Add loading state

    // for query operations
    // const [loading, setLoading] = useState(true);
    const [queries, setQueries] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [queryText, setQueryText] = useState('');
    const [selectedClass, setSelectedClass] = useState('');

    // for messages
    const[messages,setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const[showMsgs,setShowMsgs] = useState(false);
    const[tId,setTid] = useState(0);
    const[tName,settName] = useState('');
    const [messageError, setMessageError] = useState('');

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


    const [showQueries, setShowQueries] = useState(false);

    const [studentName, setStudentName] = useState('');



    useEffect(() => {
        try {
        axios.get("https://localhost:7225/getAnnByClassname/all").then((response) => {
            setPost(response.data);
        });
    }catch(error){
        navigate("/error");
    }}, []);


    useEffect(() =>{
        if(sessionStorage.getItem("userId") === null){
            navigate("/error");
            return;
        }
    try{
        axios.get(`https://localhost:7225/api/Parents/${sessionStorage.getItem("userId")}`).then((response) => {
            setParent(response.data);
            setLoading1(false); // Set loading to false once data is fetched
        });
    }catch(error){
        navigate("/error");
    }}, []);

    const handleCreateQuery = async (username, className,stuName) => {
        setShowModal(true);
        setSelectedClass(className);
        setStudentName(stuName);
    }

    const [errorMessage, setErrorMessage] = useState("");

    const handleModalSubmit = async () => {
        if (queryText.trim() !== "") {
            try {
                await QueryCrud.createQuery({
                    username: parent.parentName,
                    askedQuery: queryText,
                    className: selectedClass,
                    studentName: studentName
                });
               
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Query submitted successfully!",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'center-popup'
            }
        });

                setShowModal(false);
                setQueryText('');
            } catch (error) {
                console.error("Error submitting query:", error);
                alert("Failed to submit query. Please try again.");
            }
        } else {
            setErrorMessage("Please enter a valid query.");
        }
    }

    const handleModalClose = () => {
        setShowModal(false);
        setQueryText('');
        setErrorMessage("");
    }

    const handleQueryClick = async (className) => {
        try {
            const classQueries = await QueryCrud.getQueriesByClassName(className);
            setQueries(classQueries);
            setShowQueries(!showQueries);

        } catch (error) {
            console.error('Error fetching class queries:', error);
        }
    }

    // for messages
    const handleConnect = async (teacherId) => {
        // Set parId immediately before calling axios.get
        setShowMsgs(true);
        setTid(teacherId);
        await axios.get(`https://localhost:7225/api/Teachers/${teacherId}`)
                   .then((res) => {
                      settName(res.data.teacherName);
                   })
        //  console.log(parId); // This will show the updated value of parId
          await axios.get(`https://localhost:7225/api/Messages/getMessagesByTIdAndPId/${teacherId}/${sessionStorage.getItem('userId')}`)
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
          parentId: sessionStorage.getItem('userId'),
          teacherId : tId,
          role : "parent"
        }
        await axios.post("https://localhost:7225/api/Messages",msg)
        .then((res)=>setMessages([...messages,res.data]));
        console.log(messages);
        setNewMessage('');
      }

    const handleNavClick = (path) => {
        navigate(path);
    }


    // Modal graph

  const [open, setOpen] = React.useState(false);

  const handleOpen = () =>  setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setData('');
}


  //  For message modal

  const [openMessage, setOpenMessage] = React.useState(false);

  const handleOpenMessage = () =>  setOpenMessage(true);
  const handleCloseMessage = () => {
    setOpenMessage(false);
    setMessageError('');
  }

  // Ref for the message section
  const messageSectionRef = useRef(null);

  // Handler to scroll to the last message when message modal is opened
  useEffect(() => {
      if (openMessage && messageSectionRef.current) {
          messageSectionRef.current.scrollTop = messageSectionRef.current.scrollHeight;
      }
  }, [openMessage]);

  // For Announcement Modal
  const [isOpen, setIsOpen] = React.useState(false);

  const handleIsOpen = () =>  setIsOpen(true);
  const handleIsClose = () => setIsOpen(false);

   

  //-----------

  const [data, setData] = useState([]);
  const [classAnnData , setClassAnnData] = useState([]);

  const fetchAnnouncements = async (name,cl) =>{
    sessionStorage.setItem("sname", name );
    sessionStorage.setItem("class", cl );

    try {
        const response = await axios.get(`https://localhost:7225/getAnnByClassname/${cl}`);
        // alert(JSON.stringify(response.data))
       
        setClassAnnData(response.data);
       
        // alert(JSON.stringify(classAnnData))
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  }

  const fetchData = async (id,name,cl) => {
    sessionStorage.setItem("sname", name );
    sessionStorage.setItem("class", cl );
    console.log(sessionStorage.getItem("sname"));
    console.log(sessionStorage.getItem("class"));

     try {
       const response = await axios.get(`https://localhost:7225/api/Marks/${id}`);
       setData(response.data); // Assuming the API returns an array of data
     } catch (error) {
       console.error('Error fetching data:', error);
     }
   };
  
const handleError = () =>{
    if(sessionStorage.getItem("isLoggedIn") === "false"){
        navigate("/error");
    }
}

// ------------- for sidebar sitename----

const [showLogo, setShowLogo] = useState(true);

const handleSidebarClick = () => {
      setShowLogo(!showLogo);
};

//-------------------------

//   if (loading) {
//     return <div>Loading...</div>;
//   }
  console.log(data)
  // Assuming your response data has the structure like [{ page: 'Page A', value: 4000 }, ...]
const uData = [Math.min(data.maths, 100), Math.min(data.physics, 100), Math.min(data.chemistry, 100), Math.min(data.history, 100)];


    return (
        <>
        {handleError()}

{ sessionStorage.getItem("isLoggedIn") === "true" && 
        <Row className='container' style={{justifyContent:"center", maxWidth:"auto",overflowX:"hidden"}}>
            <Col xs={3} style={{height:"auto",maxWidth:"auto",position: 'sticky', top: 0, padding: 0, margin: 0 }}>
                <CDBSidebar  textColor="#333" backgroundColor="linear-gradient(109.6deg, rgba(177, 173, 219, 1) 11.2%, rgba(245, 226, 226, 1) 91.1%)">
                    <CDBSidebarHeader prefix={<i onClick={handleSidebarClick} className="fa fa-bars" />}>

                        Welcome {sessionStorage.getItem("name")}
                    </CDBSidebarHeader>
                    <CDBSidebarContent>
                        <CDBSidebarMenu>
                            {/* <CDBSidebarMenuItem icon="chart-line" iconType="solid">Student Progress</CDBSidebarMenuItem> */}
                            <CDBSidebarMenuItem icon="sticky-note" >Calendar</CDBSidebarMenuItem>
                            {/* <CDBSidebarMenuItem icon="th-large" onClick={() => handleNavClick("/query")}>Ask Query</CDBSidebarMenuItem> */}
                            {/* <CDBSidebarMenuItem icon="th-large" onClick={() => handleNavClick("/")}>Log-out</CDBSidebarMenuItem> */}
                        </CDBSidebarMenu>
                    </CDBSidebarContent>

                    <CDBSidebarFooter style={{ textAlign: 'center' }}>
                        <div>
                            {/* className="sidebar-btn-wrapper"
                            style={{ padding: '20px 5px', fontFamily:"serif", fontWeight:"bold", fontSize:"1.3rem",  backgroundImage: "linear-gradient(111.1deg, rgb(251, 140, 0) 3.2%, rgb(98, 0, 234) 90.3%)",
                            WebkitBackgroundClip: "text",
                            color: "transparent" }}
                        >
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


            <Col style={{ width:"auto", textAlign: 'center' }} >

                {/* Render parent data only when loading is false */}
                {!loading1 &&
                    <>
                        <div>
                            <table className="table" >
                                <thead style={{ fontWeight: "bold" }} className="thead-dark">
                                    <tr>
                                        <th style={{ fontWeight: "bold",textAlign: "center" }} scope="col">Roll No.</th>
                                        <th style={{ fontWeight: "bold",textAlign: "center" }} scope="col">Student Name</th>
                                        <th style={{ fontWeight: "bold",textAlign: "center" }} scope="col">Class</th>
                                        <th style={{ fontWeight: "bold",textAlign: "center"  }} scope="col">Teacher Name</th>
                                        <th style={{ fontWeight: "bold",textAlign: "center"  }} scope="col">Contact Teacher</th>
                                        <th style={{ fontWeight: "bold",textAlign: "center" }} scope="col">Class Announcements</th>
                                        <th style={{ fontWeight: "bold", textAlign: "center"  }} scope="col">Any Queries?</th>
                                        <th style={{ fontWeight: "bold",textAlign: "center"  }} scope="col">Classroom Queries</th>
                                        <th style={{ fontWeight: "bold",textAlign: "center" }} scope="col">See Report</th>


                                    </tr>
                                </thead>

                                <tbody>
                                    {parent.students.map((st, id) => {
                                        return (
                                            <tr key={id}>
                                                <td style={{ textAlign: "center", fontWeight:"bold" }}>{st.studentId}</td>
                                                <td style={{ textAlign: "center", fontWeight:"bold" }}>{st.studentName}</td>
                                                <td style={{ textAlign: "center", fontWeight:"bold" }}>{st.className}</td>
                                                <td style={{ textAlign: "center", fontWeight:"bold" }}>{st.teacher_.teacherName}</td>

                                                <td style={{ textAlign: "center", fontWeight:"bold" }}><Button onClick={() =>{
                                                    sessionStorage.setItem("sname", st.studentName);
                                                    sessionStorage.setItem("class", st.className );
                                                    sessionStorage.setItem("teacherName" ,st.teacher_.teacherName)
                                                    handleOpenMessage();
                                                    handleConnect(st.teacherId); }}
                                                variant="contained"
                                                style={{ backgroundColor: '#4caf50', color: '#fff',
                                                padding: '4px 6px',
                                                fontSize: '12px',
                                                minWidth: '80px' }}
                                                >Connect</Button>
                                               </td>

                                               <td style={{ textAlign: "center"}}><Button onClick={()=>{
                                                    handleIsOpen();
                                                    fetchAnnouncements(st.studentName,st.className);
                                                }}
                                                variant="contained"
                                                style={{ backgroundColor: '#4caf50', color: '#fff' ,
                                                 padding: '4px 6px',
                                                fontSize: '12px'
                                               }}
                                                >Check</Button>
                                               </td>

                                               <td  style={{ textAlign: "center"}}>
                                                    <Button 
                                                    variant="contained"
                                                    style={{ backgroundColor: '#4caf50', color: '#fff',
                                                    padding: '4px 6px',
                                                    fontSize: '12px',
                                                    minWidth: '80px' }}
                                                    onClick={() => handleCreateQuery(parent.parentName, st.className, st.studentName)}>Ask</Button>
                                                </td>
                                                <td  style={{ textAlign: "center"}}>
                                                    <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: '#4caf50', color: '#fff',
                                                    padding: '4px 6px',
                                                    fontSize: '12px',
                                                    minWidth: '80px' }} 
                                                    onClick={() => handleQueryClick(st.className)}>
                                                    View</Button>
                                                </td>

                                                <td style={{ textAlign: "center", fontWeight:"bold" }}><Button onClick={()=>{
                                                    handleOpen();
                                                    fetchData(st.studentId,st.studentName,st.className);
                                                }}
                                                variant="contained"
                                                style={{ backgroundColor: '#4caf50', color: '#fff',
                                                padding: '4px 6px',
                                                fontSize: '12px',
                                                minWidth: '80px' }}
                                                >View</Button>
                                               </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        </>
               }


                <br />
                <div>
                    <div className="alert alert-primary alert-dismissible fade show announcement-top-bar" role="alert" style={{backgroundColor: "#343a40"}}>
                        <h5 className='announcement-heading' >• School Announcements:</h5>
                    </div>
                    <section className="alert alert-primary alert-dismissible fade show announcement-top-bar" role="alert" style={{ textAlign:"left",height: '200px', overflowY: 'auto', width: "auto" , backgroundColor:" #f8f9fa", color:"#343a40" }}>
                        {post.map((a) => {
                            return (
                                <h5 className='announcement-content'><li style={{fontWeight:'bold'}}>{a.announcementTitle}</li>{a.announcementDescription}</h5>   
                                )                               
                        })}
                    </section>
                </div>
            </Col>

        </Row>
}

 {/* -------- modal for classroom queries---- */}

 <Modal
                          open={showQueries}
                          onClose={() => setShowQueries(false)}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                            <Box sx={style2}>
                            <h3 style={{ textAlign: "center", color: "black" }}>• Class Queries</h3>
                                
                                    {(queries.length > 0) &&
                            <div>
                                <table className="table">
                                    <thead style={{ fontWeight: "bold" }} className="thead-dark">
                                        <tr>
                                            <th style={{ textAlign: "center", fontWeight: "bold" }}>Qasked</th>
                                            <th style={{  textAlign: "center",fontWeight: "bold" }}>Answer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {queries.map((query, index) => (
                                            <tr key={index} style={{textAlign:"left"}}>
                                                <td>{query.askedQuery}</td>
                                                <td>{query.queryAnswer ? query.queryAnswer : "Not answered"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div style={{display:"flex", justifyContent:"center"}}>
                                <Button variant="contained" onClick={() => setShowQueries(false)}>
                                    Close
                                </Button>
                               </div>
                            </div>
                            
                        }      

                            </Box>

                        </Modal>

        {/* Modal for Chart */}
        <div>

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h5 style={{fontWeight:"bold"}}> Student Name: {" "+sessionStorage.getItem("sname")+" | "} Class: {" "+sessionStorage.getItem("class")} </h5>
        <BarChart
      width={500}
      height={300}
      series={[{ data: uData, label: 'Scored Marks', id: 'uvId' }]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
     
        </Box>
      </Modal>

        </div>

        {/* Modal for class Announcements */}
        <div>

        <Modal
        open={isOpen}
        onClose={handleIsClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style2}>
          <h5 style={{fontWeight:"bold"}}> Student Name: {" "+sessionStorage.getItem("sname")+" | "} Class: {" "+sessionStorage.getItem("class")} </h5>
          <div>
                    <div className="alert alert-primary alert-dismissible fade show announcement-top-bar" role="alert" style={{backgroundColor: "#343a40"}}>
                        <h4 className='announcement-heading' >• Announcements:</h4>
                    </div>
                    <section className="alert alert-primary alert-dismissible fade show announcement-top-bar" role="alert" style={{ textAlign:"left",height: '200px', overflowY: 'auto', width: "auto",backgroundColor:"#e6eaee", color:"#343a40" }}>
                        {
                        
                        classAnnData.map((a) => {
                            // console.log(a);
                            return (
                                <h5 className='announcement-content'><li style={{fontWeight:'bold'}}>{a.announcementTitle}</li>{a.announcementDescription}</h5>                            
                                )
                        })}
                    </section>
                </div>
        </Box>
      </Modal>

        </div>


        <div>

             
         {/* Modal for query input */}
        
             <Modal open={showModal} onClose={handleModalClose}>
                    
                    <Box sx={style2}>
                        
                        <div>
                            <h2>Enter your query</h2>
                            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                            <textarea value={queryText} onChange={(e) => setQueryText(e.target.value)} />
                            <div style={{ marginTop: 20, textAlign: 'center' }}>
                                <Button variant="contained" onClick={handleModalClose}>
                                    Cancel
                                </Button>
                                <Button variant="contained" onClick={handleModalSubmit} style={{ marginLeft: 10 }}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                        </Box>
                    </Modal>
                   
        </div>

       
       {/* ------------ Message Modal--------- */}
        <div>

        <Modal
        open={openMessage}
        onClose={handleCloseMessage}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style2}>
          <h5 style={{fontWeight:"bold"}}> Student Name: {" "+sessionStorage.getItem("sname")+" | "} Class: {" "+sessionStorage.getItem("class")+" | "}  Teacher Name:{" "+sessionStorage.getItem("teacherName")} </h5>
          <div>
          { showMsgs &&
      <>
          <div className="alert alert-primary alert-dismissible fade show announcement-top-bar" role="alert" style={{backgroundColor: "#343a40",height:"50px"}}>
                <h4 className='announcement-heading' >• Messages:</h4>
          </div>
                <section ref={chatContainerRef} className="alert alert-primary alert-dismissible fade show announcement-top-bar" role="alert" style={{ height: '280px', overflowY: 'auto', width:"auto",backgroundColor:"#e6eaee", color:"#343a40" }}>       
                    
                     {messages.map((m)=>{
                         const messageDateTime = "2024-03-13T16:13:20";

                         // Create a new Date object from the messageDateTime string
                         const messageDate = new Date(messageDateTime);
                       
                         // Extract date and time separately
                        //  const formattedDate = messageDate.toDateString(); // Get date in "Day Month Date Year" format
                        //  const formattedTimeOld = messageDate.toLocaleTimeString();
                        const formattedTimeOld = messageDate.toLocaleTimeString('en-US', {hour12: false});

                         console.log(formattedTimeOld);


                        console.log(m);
                        // const messageDate = new Date(m.messageDate);
                        const formattedDate = messageDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
                         // Parse messageTime manually
                        const timeParts = formattedTimeOld.split(':');
                        const hours = parseInt(timeParts[0], 10);
                        const minutes = parseInt(timeParts[1], 10);
                         // Construct AM/PM string
                        const ampm = hours >= 12 ? 'PM' : 'AM';
                        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
                        const formattedTime = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
                        
                        console.log(formattedTime);
                      if(m.role === 'parent' && m.parentId == sessionStorage.getItem('userId')){
                        return ( 
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
                      else if(m.role === 'teacher' && m.teacherId == tId) {
                        return (
                            <>
                            <div className='announcement-content d-flex justify-content-start' style={{paddingBottom:"10px"}}>
                            <div className="avatar" style={{ backgroundColor: "grey", color: "white", borderRadius: "75%", padding: "5px 10px" }}>
                              {sessionStorage.getItem("teacherName").charAt(0)}
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
                                    New messages
                                </button>
                                </div>
                
          <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                             <input
                              type="text"
                              className="form-control"
                              id="newMessage"
                              placeholder='Message'
                              value={newMessage}
                              onChange={handleNewMessage}
                            />
                        {messageError && <p className="text-danger">{messageError}</p>}

                     </div>
                          <button style={{marginTop:"7px"}} type="submit" className="btn btn-primary">
                            Send Message
                          </button>

               </form>
              
                </div>

                </>
}
                </div>
        </Box>
      </Modal>

        </div>                  
    </>

    );
    
};

export default ParentDashboard;
