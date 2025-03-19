import axios from 'axios';

const serverUrl = process.env.REACT_APP_BASE_URL;

const client = axios.create({
    baseURL: serverUrl,
});

export default client;
