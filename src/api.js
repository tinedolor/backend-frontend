import axios from 'axios';

// Use the correct port where your backend is running
const API_BASE_URL = 'http://localhost:5166/api'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSections = async () => {
  try {
    const response = await api.get('/Sections');
    return response.data;
  } catch (error) {
    console.error('Error fetching sections:', error);
    throw error;
  }
};

export const getStudents = async () => {
  try {
    const response = await api.get('/Students'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const getSubjects = async () => {
  try {
    const response = await api.get('/Subjects'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
};