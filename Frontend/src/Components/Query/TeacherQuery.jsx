import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";

import QueryCrud from "../AdminCRUD/QueryCrud";
import { Box, Modal, Button, TextField } from '@mui/material';
import './Query.css';


const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const style3 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};


export default function TeacherQuery(){

const [queries, setQueries] = useState([]);
const [answerText, setAnswerText] = useState('');
const [answerQueryId, setAnswerQueryId] = useState(null);
const[openQueryModal,setOpenQueryModal]=useState(false);
const navigate= useNavigate();
const [teacher, setTeacher] = useState(null);
const [className, setClassName] = useState(null);
const [loading, setLoading] = useState(true);



  //get teachers by classname

useEffect(() => {
    axios.get(`https://localhost:7225/api/Teachers/${sessionStorage.getItem("userId")}`)
        .then((response) => {
            setTeacher(response.data);
            setClassName(response.data.className);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching teacher:', error);
            setLoading(false);
        });
}, []);

// for answering query
const handleAnswerQuery = async () => {
    if (!answerText || answerText.trim() === "") {
        alert("Please enter a valid query.");
        return;
    }
    try {
        await QueryCrud.answerQuery(answerQueryId, { queryAnswer: answerText });
        // alert('Query answered successfully!');

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Query answered successfully!",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'center-popup'
            }
        });

        

        const updatedQueries = queries.map(query => {
            if (query.queryId === answerQueryId) {
                return { ...query, queryAnswer: answerText };
            }
            return query;
        });
        setQueries(updatedQueries);
        setOpenQueryModal(false);
    } catch (error) {

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong Answering Query!",
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
        //console.error(`Error answering query ${answerQueryId}:`, error);
    }
};


// for viewing query reply
const handleViewReply = async (queryId) => {
    try {
        const currentQuery= await QueryCrud.getQueryById(queryId);
        const question=currentQuery.askedQuery;
        const reply = await QueryCrud.viewQueryReply(queryId);

      
    Swal.fire({title: "QueryAnswer:",
    text: `${reply}`},)

    } catch (error) {
        console.error('Error viewing query reply:', error);
    }
};


const handleShowQueries = async () => {
    try {
        if(className){
        const queries = await QueryCrud.getQueriesByClassName(className);
        setQueries(queries);
        }
    } catch (error) {
        console.error('Error fetching queries:', error);
    }
};

useEffect(()=>{
    handleShowQueries();
})

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
        <Button variant="contained" onClick={() => navigate("/dashboardTeacher")}>Back to Dashboard</Button>
    </div>

    <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>

    <div>

<br />
                    {/* Render table for queries */}
                    <div >
                        <div >
                        <h3 style={{ color:"white"}}>• Class:{" "+sessionStorage.getItem("class")}</h3>
                        <h3 style={{ color:"white"}}>• List of Queries:</h3>

                        </div>
                        
                        
                        <table className="table" style={{ width: "auto" }}>
                            <thead style={{ fontWeight: "bold" }} className="thead-dark">
                                <tr>
                                    <th>QueryID</th>
                                    <th>Parent Name</th>
                                    <th>Student Name</th>
                                    <th>Asked Query</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {queries.map((query, index) => (
                                    <tr key={index}>
                                        <td>{query.queryId}</td>
                                        <td>{query.userName}</td>
                                        <td>{query.studentName}</td>
                                        <td>{query.askedQuery}</td>
                                        <td>
                                            {query.queryAnswer === "" ?
                                                <Button variant="contained" color="primary" onClick={() => {
                                                    setAnswerQueryId(query.queryId);
                                                    setOpenQueryModal(true);
                                                }}>Answer Query</Button> :
                                                <Button variant="contained" color="secondary" onClick={() => handleViewReply(query.queryId)}>View Reply</Button>
                                            }
                                        </td>           

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <br />

                     {/* modal for query */}
<Modal open={openQueryModal} onClose={() => setOpenQueryModal(false)}>
    <Box sx={style2} className="custom-modal">
        <h2 id="modal-title">Give reply</h2>
        <textarea value={answerText} onChange={(e) => setAnswerText(e.target.value)} />
        <br></br>
        <div className="button-container">
            <Button variant="contained" onClick={handleAnswerQuery}>Submit</Button>
            <Button style={{marginLeft:"10px"}} variant="contained" className="secondary-btn" onClick={() => setOpenQueryModal(false)}>Cancel</Button>
        </div>
    </Box>
</Modal>
</div>

</div>
</>
)
                                        
}