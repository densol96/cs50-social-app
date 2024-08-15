import axios from "axios";

import { BASE_API } from "../helpers/helpers";

const SETTINGS_ENDPOINT = `${BASE_API}/settings`;

export async function uploadAvatar(formData) {
  const response = await axios.patch(`${SETTINGS_ENDPOINT}/avatar`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return response.data.avatar;
}

export async function updateSettings(path, formData) {
  const response = await axios.patch(`${SETTINGS_ENDPOINT}/${path}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
}
