import axios from 'axios';
const BASE_URL = "https://noembed.com/embed?url=";

export const getId = (url:string)  => {
    const regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regex);
    return match && match[2].length === 11 ? match[2] : ""
}


export const getVideoData = async (url:string) => {
    const res = await axios.get(BASE_URL + url);
    return res.data;
}