import { SERVER_URL } from "../API/config";

export const getUploadsSRC = (url: string | null) => {
  if (url && url.length !== 0) {
    return `${SERVER_URL}${url}`;
  } else {
    return null;
  }
};
