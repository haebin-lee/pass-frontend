import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createMeeting = (name, description) => {
  return api.post('/meetings', { name, description });
};

export const findMeetings = () => {
    return api.get('/meetings');
}