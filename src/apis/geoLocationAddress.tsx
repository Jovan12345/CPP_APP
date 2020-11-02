import axios from 'axios';

// https://opencagedata.com/dashboard#api-keys
// https://opencagedata.com/api#request
const jsonPlaceholder = axios.create({
    baseURL: 'https://api.opencagedata.com/geocode/v1/json',
    params: {
        key: '410e214de44847cd83f6caca388b8ec8'
    }
})

export default jsonPlaceholder;