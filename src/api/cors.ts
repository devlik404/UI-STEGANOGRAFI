import axios from 'axios';

export const corsApi = axios.create({
    baseURL:"http://localhost:8080/api/files"
    
})
// axios.get('http://localhost:8080/api/files')
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   });
