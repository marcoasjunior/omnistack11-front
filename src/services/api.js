import axios from 'axios'

const api = axios.create({
    baseURL: 'https://omnistack11-marcoasjunior.herokuapp.com',
})

export default api