import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createMeeting = (data) => {
  return api.post('/meetings', data);
};

export const updateMeeting = (id, data) => {
  return api.put('/meetings/' + id, data)
}

export const findMeetings = () => {
    return api.get('/meetings');
}

export const findMeeting = (id) => {
  return api.get('/meetings/' + id);
}

export const addAttendees = (meeting_id, data) => {
  return api.post('/meetings/' + Number(meeting_id) + '/attendees', data);
}
