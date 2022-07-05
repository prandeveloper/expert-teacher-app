import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://13.235.2.176:5000/api/admin',
});

export default instance;
