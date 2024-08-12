import axios from "axios";

import { BASE_API } from "../helpers/helpers";

const DISCUSSIONS_ENDPOINT = `${BASE_API}/discussions`;




export async function getAllDiscussions(page, searchTitle) {
    const response = await axios.get(`${DISCUSSIONS_ENDPOINT}?page=${page}${searchTitle ? `&searchTitle=${searchTitle}` : ''}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        }
    })
    return {topics: response.data.topics, pagesTotal: response.data.pagesTotal};
}

export async function getAllTopicMessages(topicId, page) {
    const response = await axios.get(`${DISCUSSIONS_ENDPOINT}/topics/${topicId}?page=${page || 1}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        }
    })
    return {topics: response.data.topics, pagesTotal: response.data.pagesTotal};
}