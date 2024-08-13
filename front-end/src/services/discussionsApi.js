import axios from "axios";

import { BASE_API } from "../helpers/helpers";

const DISCUSSIONS_ENDPOINT = `${BASE_API}/discussions`;

export async function getAllDiscussions(page, searchTitle) {
  const response = await axios.get(
    `${DISCUSSIONS_ENDPOINT}?page=${page}${
      searchTitle ? `&searchTitle=${searchTitle}` : ""
    }`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }
  );
  return { topics: response.data.topics, pagesTotal: response.data.pagesTotal };
}

export async function getPostsPerTopic(topicId, page) {
  // /posts/:topicId
  const response = await axios.get(
    `${DISCUSSIONS_ENDPOINT}/${topicId}?page=${page || 1}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }
  );
  return { posts: response.data.posts, pagesTotal: response.data.pagesTotal };
}

export async function publishPost(topicId, text) {
  // /posts/:topicId
  const response = await axios.post(
    `${DISCUSSIONS_ENDPOINT}/${topicId}`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }
  );

  /*
   * I am returning the totalPages, because after submitting the new post, I want to redirect to the last page
   */
  return { postId: response.data.postId, pagesTotal: response.data.pagesTotal };
}
