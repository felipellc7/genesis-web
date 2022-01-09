import axios from 'axios'

const baseURL = process.env.NODE_ENV == "production" ? process.env.BASE_API_URL : process.env.BASE_API_URL_DEV;

const axiosClient = axios.create({
  baseURL
});

export default axiosClient;