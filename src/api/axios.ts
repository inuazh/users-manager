import axios  from "axios";

export const api = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
});

api.interceptors.response.use(
    (response) => response,
    (error)=> {
        const message =
        error.response?.data?.message ||
        error.message || 
         'something went wrong'; 
         // its english in this hw because i sick of changing the keyboad layout
         return Promise.reject(new Error(message));
    }
    );
    
