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