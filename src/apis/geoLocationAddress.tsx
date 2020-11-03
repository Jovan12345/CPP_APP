import axios from 'axios';

// https://opencagedata.com/dashboard#api-keys
// https://opencagedata.com/api#request
const jsonPlaceholder = axios.create({
    baseURL: 'https://api.opencagedata.com/geocode/v1/json',
})

export default jsonPlaceholder;