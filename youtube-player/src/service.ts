import axios from 'axios';

const URL = "http://localhost:3333"

const api = {
    getVideos: async () => {
        const response = await axios.get(`${URL}/api/videos`)
        return response.data
    },
    addVideo: async (url: string) => {
        const response = await axios.post(`${URL}/api/video`, {url})
        return response.data
    },
    removeVideo: async (id: string) => {
        const response = await axios.delete(`${URL}/api/video/${id}`)
        return response.data
    }
}

export default api;
