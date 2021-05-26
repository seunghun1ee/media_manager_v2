const axios = require("axios");
const BASE_URL = process.env.VUE_APP_API_URL;

export function getRandomMetadatas(limit) {
    return axios.get(`${BASE_URL}/api/getRandomMetadatas?limit=${limit}`).then(res => res.data);
}

export function getMetadatasByTags(tags) {
    let queryString = "tags[]=" + tags.join("&tags[]=");
    return axios.get(`${BASE_URL}/api/getMetadatasByTags?${queryString}`).then(res => res.data);
}

export function getMetadataById(id) {
    return axios.get(`${BASE_URL}/api/getMetadataById?id=${id}`).then(res => res.data);
}

export function toggleFavouriteById(id) {
    return axios.post(`${BASE_URL}/api/toggleFavouriteById?id=${id}`).then(res => res.data);
}

export function getTagsBuTypes(type) {
    return axios.get(`${BASE_URL}/api/getTagsByType?type=${type}`).then(res => res.data);
}