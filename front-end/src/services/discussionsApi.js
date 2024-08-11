import axios from "axios";

import { BASE_API } from "../helpers/helpers";

const DISCUSSIONS_ENDPOINT = `${BASE_API}/discussions`;

export async function getAllDiscussions(page) {
    const response = await axios.get(`${DISCUSSIONS_ENDPOINT}?page=${page}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        }
    })
    return response.data;
}

export async function getAllDiscussionsPageNum() {
    const response = await axios.get(`${DISCUSSIONS_ENDPOINT}/page-num`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        }
    })
    return response.data.pagesTotal;
}