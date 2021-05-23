const axios = require("axios");
const BASE_URL = process.env.VUE_APP_API_URL;

export function getRandomMetadatas() {
    return axios.get(`${BASE_URL}/api/getRandomMetadatas`).then(res => res.data);
}