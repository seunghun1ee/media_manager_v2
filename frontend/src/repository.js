const axios = require("axios");
const BASE_URL = process.env.VUE_APP_API_URL;

export function getRandomMetadatas(limit) {
    return axios.get(`${BASE_URL}/api/getRandomMetadatas?limit=${limit}`).then(res => res.data);
}

export function getMetadatasByTags(tags) {
    let queryString = "tag=" + tags.join("&tag=");
    return axios.get(`${BASE_URL}/api/getMetadatasByTags?${queryString}`).then(res => res.data);
}