import axios from 'axios';

const jsonPlaceholder = axios.create({
    baseURL: 'http://jsonplaceholder.typicode.com'
})

export default jsonPlaceholder;