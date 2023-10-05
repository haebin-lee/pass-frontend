import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 회의 생성 API
export const createMeeting = (name, description) => {
  return api.post('/meetings', { name, description });
};

// 사용자 목록을 가져오는 API
export const getUsers = () => {
  return api.get('/users');
};
