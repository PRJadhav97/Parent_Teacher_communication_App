
import axios from 'axios';
import { useState } from 'react';

const baseURL = 'https://localhost:7225/api/Queries'; // Update with your actual API base URL

const QueryCrud = {

  
  getAllQueries: async () => {
    try {
      const response = await axios.get(`${baseURL}`);
      return response.data;
    } catch (error) {
      console.error('Error getting queries:', error);
      throw error;
    }
  },

  getQueryById: async (id) => {
    try {
      const response = await axios.get(`${baseURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting query ${id}:`, error);
      throw error;
    }
  },

  getQueriesByClassName: async (className) => {
    try {
      const response = await axios.get(`${baseURL}/classname/${className}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting queries for class ${className}:`, error);
      throw error;
    }
  },

  createQuery: async (queryData) => {
    try {
      const response = await axios.post(`${baseURL}`, queryData);
      return response.data;
    } catch (error) {
      console.error('Error creating query:', error);
      throw error;
    }
  },
  answerQuery: async (id, queryAnswer) => {
    try {
      const ans=queryAnswer;
      const patchData = [
        {
          operationType: 0,
          from: "string",
          op: 'replace',
          path: '/QueryAnswer',
          value: ans.queryAnswer
        }
      ];
    
      const response = await axios.patch(`${baseURL}/${id}`, patchData);
      return response.data;
    } catch (error) {
      console.error(`Error answering query ${id}:`, error);
      throw error;
    }
  },


  updateQuery: async (id, queryData) => {
    try {
      const response = await axios.put(`${baseURL}/${id}`, queryData);
      return response.data;
    } catch (error) {
      console.error(`Error updating query ${id}:`, error);
      throw error;
    }
  },

  viewQueryReply: async (queryId) => {
    try {
        // Make a GET request to fetch the query by ID
        const response = await axios.get(`${baseURL}/${queryId}`);
        // response.then(console.log(response));
        
        // Extract the QueryAnswer field from the response data
        const queryAnswer = response.data.queryAnswer;

        // Return the QueryAnswer value
        return queryAnswer;
    } catch (error) {
        console.error('Error fetching query reply:', error);
        throw error; // Propagate the error to the caller
    }
},

  deleteQuery: async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
    } catch (error) {
      console.error(`Error deleting query ${id}:`, error);
      throw error;
    }
  }
};

export default QueryCrud;