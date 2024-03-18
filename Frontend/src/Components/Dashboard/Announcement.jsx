import axios from 'axios';
import { useState, useEffect } from 'react';

const baseURL = 'https://localhost:7225/api/Announcements'; // Update with your actual API base URL

const AnnouncementCrud = {

    getAllAnnouncements: async () => {
        try {
            const response = await axios.get(`${baseURL}`);
            return response.data;
        } catch (error) {
            console.error('Error getting announcements:', error);
            throw error;
        }
    },

    createAnnouncement: async (announcementData) => {
        try {console.log(JSON.stringify(announcementData));
            const response = await axios.post(`${baseURL}`, announcementData);
            return response.data;
        } catch (error) {
            console.error('Error creating announcement:', error);
            throw error;
        }
    },

    updateAnnouncement: async (id, announcementData) => {
        try {
            const response = await axios.put(`${baseURL}/${id}`, announcementData);
            return response.data;
        } catch (error) {
            console.error(`Error updating announcement ${id}:`, error);
            throw error;
        }
    },

    getAnnouncementsByClassname: async (classname) => {
      try {
          const response = await axios.get(`${baseURL}/classname/${classname}`);
          return response.data;
      } catch (error) {
          console.error(`Error getting announcements for class ${classname}:`, error);
          throw error;
      }
  },


    deleteAnnouncement: async (id) => {
        try {
            await axios.delete(`${baseURL}/${id}`);
        } catch (error) {
            console.error(`Error deleting announcement ${id}:`, error);
            throw error;
        }
    }
};

export default AnnouncementCrud;
