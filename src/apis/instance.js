import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_DB_HOST;
const BASE_URL = "https://inclxh6sgrsxchhyxtxk4ugrni0fdknh.lambda-url.us-west-2.on.aws/";
// const BASE_URL = "https://shinstarrsimulation.com";

const config = {
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' }, 
	// headers: { 'Content-Type': 'application/xml' }, 
    withCredentials: true
};

const instance = axios.create(config);


export default instance;


