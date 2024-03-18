import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const AnnouncementCrudOld = () => {
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();
  const [newAnnouncement, setNewAnnouncement] = useState({
    AnnouncementTitle: '',
    AnnouncementDescription: '',
    className: '',
    TeacherId: 0
  });
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({
    AnnouncementTitle: '',
    AnnouncementDescription: '',
    className: '',
    TeacherId: ''
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get("https://localhost:7225/api/Announcements");
      setAnnouncements(response.data.reverse());
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      AnnouncementTitle: '',
      AnnouncementDescription: '',
      className: '',
      TeacherId: ''
    };

    if (!newAnnouncement.AnnouncementTitle) {
      newErrors.AnnouncementTitle = 'Title is required';
      valid = false;
    }

    if (!newAnnouncement.AnnouncementDescription) {
      newErrors.AnnouncementDescription = 'Description is required';
      valid = false;
    }

   

    setErrors(newErrors);
    return valid;
  };

  const addAnnouncement = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await axios.post("https://localhost:7225/api/Announcements", newAnnouncement);
      fetchAnnouncements();
      setNewAnnouncement({
        AnnouncementTitle: '',
        AnnouncementDescription: '',
        className: '',
        TeacherId: 0
      });

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

      setShowForm(false);
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  };

  const deleteAnnouncement = async (announcementId) => {
    try {
      await axios.delete(`https://localhost:7225/api/Announcements/${announcementId}`);
      fetchAnnouncements();
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  return (

    <>
    <br></br>
    
    <div className="container">
      <h2 className="text-center mt-3" style={{color:'white'}}>Announcement </h2>
      <div className="text-center mb-3">
        <Button variant='contained' onClick={() => setShowForm(true)}>Add Announcement</Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" onClick={() => navigate("/dashboardAdmin")}>Back to Dashboard</Button>
    </div>
    <br></br>
      {showForm && (
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Announcement Title"
            value={newAnnouncement.AnnouncementTitle}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, AnnouncementTitle: e.target.value })}
          />
          {errors.AnnouncementTitle && <p style={{fontWeight:"bold"}} className="text-danger">{errors.AnnouncementTitle}</p>}
          <br></br>
          <textarea
            className="form-control"
            placeholder="Announcement Description"
            value={newAnnouncement.AnnouncementDescription}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, AnnouncementDescription: e.target.value })}
          />
          {errors.AnnouncementDescription && <p style={{fontWeight:"bold"}} className="text-danger">{errors.AnnouncementDescription}</p>}
          <br></br>
          {/* <input
            type="text"
            className="form-control"
            placeholder="Class Name"
            value={newAnnouncement.className}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, className: e.target.value })}
          /> */}

<div className="mb-4 position-relative">
            <label className="d-flex align-items-center">
              <select
                className="form-select bg-white"
                value={newAnnouncement.className}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, className: e.target.value })}
                id="className"
                style={{ width: '400px', height:"38px" }} // Set the width to 100%
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
      <option value="All">All</option>

    </select>
  </label>
</div>
          <br></br>
          {/* <input
            type="number"
            className="form-control"
            placeholder="Teacher ID"
            value={newAnnouncement.TeacherId}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, TeacherId: parseInt(e.target.value) })}
          /> */}
          <button className="btn btn-primary mt-3" onClick={addAnnouncement}>Save Announcement</button>
        </div>
      )}
      <div>
        <h3 style={{color:'white'}}>• Announcements:</h3>
        {announcements.map(announcement => (
          <div key={announcement.AnnouncementId} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{announcement.announcementTitle}</h5>
              <p className="card-text">{announcement.announcementDescription}</p>
              <p className="card-text">Sent to: {announcement.className ? announcement.className : 'All'}</p>
              <button className="btn btn-danger" onClick={() => deleteAnnouncement(announcement.announcementId)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default AnnouncementCrudOld;
