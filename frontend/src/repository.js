const axios = require("axios");
const BASE_URL = process.env.VUE_APP_API_URL;

export function getRandomMetadatas(limit) {
    return axios.get(`${BASE_URL}/api/getRandomMetadatas?limit=${limit}`).then(res => res.data);
}

export function getAllMetadatas(sortField, direction) {
    return axios.get(`${BASE_URL}/api/getAllMetadatas?sortField=${sortField}&direction=${direction}`).then(res => res.data);
}

export function getAllMetadatasWithPagination(page,sortField,direction) {
    return axios.get(`${BASE_URL}/api/getAllMetadatasWithPagination?page=${page}&sortField=${sortField}&direction=${direction}`).then(res => res.data);
}

export function getMetadatasByTags(tags, sortField, direction) {
    let tagsString = "tags[]=" + tags.join("&tags[]=");
    return axios.get(`${BASE_URL}/api/getMetadatasByTags?${tagsString}&sortField=${sortField}&direction=${direction}`).then(res => res.data);
}

export function getMetadatasByTagsWithPagination(page,tags,sortField,direction) {
    let tagString = "tags[]=" + tags.join("&tags[]=");
    return axios.get(`${BASE_URL}/api/getMetadatasByTagsWithPagination?${tagString}&page=${page}&sortField=${sortField}&direction=${direction}`).then(res => res.data);
}

export function getMetadataById(id) {
    return axios.get(`${BASE_URL}/api/getMetadataById?id=${id}`).then(res => res.data);
}

export function getFavouriteMetadatas(sortField, direction) {
    return axios.get(`${BASE_URL}/api/getFavouriteMetadatas?sortField=${sortField}&direction=${direction}`).then(res => res.data);
}

export function getFavouriteMetadatasWithPagination(page,sortField,direction) {
    return axios.get(`${BASE_URL}/api/getFavouriteMetadatasWithPagination?page=${page}&sortField=${sortField}&direction=${direction}`).then(res => res.data);
}

export function toggleFavouriteById(id) {
    return axios.post(`${BASE_URL}/api/toggleFavouriteById?id=${id}`).then(res => res.data);
}

export function incScoreById(id) {
    return axios.post(`${BASE_URL}/api/incScoreById?id=${id}`).then(res => res.data);
}

export function decScoreById(id) {
    return axios.post(`${BASE_URL}/api/decScoreById?id=${id}`).then(res => res.data);
}

export function getAllTags() {
    return axios.get(`${BASE_URL}/api/getAllTags`).then(res => res.data);
}

export function getTagsByTypes(type) {
    return axios.get(`${BASE_URL}/api/getTagsByType?type=${type}`).then(res => res.data);
}

export function getTagByValue(value) {
    return axios.get(`${BASE_URL}/api/getTagByValue?value=${value}`).then(res => res.data);
}

export function postUploadFiles(data) {
    return axios.post(`${BASE_URL}/api/uploadFiles`,data).then(res => res.data);
}

export function postEditItem(id, changes) {
    return axios.post(`${BASE_URL}/api/editItemById?id=${id}`, changes).then(res => res.data);
}

export function postCreateTag(data) {
    return axios.post(`${BASE_URL}/api/create_tag`,data).then(res => res.data);
}

export function postEditTag(data) {
    return axios.post(`${BASE_URL}/api/edit_tag`, data).then(res => res.data);
}