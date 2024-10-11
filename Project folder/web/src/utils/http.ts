import axios from "axios";
import token from "./token";
import { G_API_URL, G_APP_PLATFORM_BY, G_APP_VERSION_CODE } from "../platform";

const BASE_URL = G_API_URL;

export function buildAuthorization() {
  const tokenVal = token.get();
  return tokenVal !== null && tokenVal !== "" && tokenVal !== "null"
    ? `Bearer ${tokenVal}`
    : null;
}

export const getRequestHeaders = () => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    // "Accept-Language": "en-US,en;",
    // Customversioncode: G_APP_VERSION_CODE,
    // Customplatformby: G_APP_PLATFORM_BY,
  };

  if (buildAuthorization()) {
    headers.Authorization = buildAuthorization();
  }
  return headers;
};

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use((request) => {
  return {
    // ...config,
    ...request,
    headers: {
      ...getRequestHeaders(),
    },
  };
});

apiClient.interceptors.response.use(
  (response) => {
    // Take the axios response and return the json data
    return response.data;
  },
  (error) => {
    // if (error.response.status === 401) {
    //   token.remove();
    //   window.location.href = "/login";
    // }
    // return Promise.reject(error);
  }
);

const _get = (url, config = {}) => {
  return apiClient.get(url, config);
};

const _delete = (url, config = {}) => {
  return apiClient.delete(url, config);
};

const _put = (url, data = {}, config = {}) => {
  return apiClient.put(url, data, config);
};

const _post = (url, data = {}, config = {}) => {
  return apiClient.post(url, data, config);
};

// Export API methods
export { _get, _delete, _put, _post };
