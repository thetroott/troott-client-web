import axios from "axios";
import storage from "../utils/storage.util";
import Auth from "./auth";
import Bite from "./bite";
import Catalog from "./catalog";
import Email from "./email";
import Feed from "./feed";
import Invitation from "./invitation";
import Library from "./library";
import Notification from "./notification";
import Playlist from "./playlist";
import Preacher from "./preacher";
import Search from "./search";
import Sermon from "./sermon";
import Staff from "./staff";
import Subscription from "./subscription";
import User from "./user";

const BaseURL = import.meta.env.REACT_TROOTT_API_URL as string;

export const axiosPublic = axios.create({
  baseURL: BaseURL,
});

export const axiosPrivate = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const api = {
  auth: new Auth(axiosPublic, axiosPrivate),
  bite: new Bite(axiosPrivate),
  catalog: new Catalog(axiosPrivate),
  email: new Email(axiosPrivate),
  feed: new Feed(axiosPrivate),
  invitation: new Invitation(axiosPrivate),
  library: new Library(axiosPrivate),
  notification: new Notification(axiosPrivate),
  playlist: new Playlist(axiosPrivate),
  preacher: new Preacher(axiosPrivate),
  search: new Search(axiosPrivate),
  sermon: new Sermon(axiosPrivate),
  staf: new Staff(axiosPrivate),
  subsription: new Subscription(axiosPrivate),
  user: new User(axiosPrivate),
};

/**
 * Axios request interceptor that adds device ID and authentication headers
 * @param {AxiosRequestConfig} config - The axios request configuration
 * @returns {Promise<AxiosRequestConfig>} Modified request configuration
 */
axiosPrivate.interceptors.request.use(
  async function (config) {
    const accessToken = await storage.("accessToken");
    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const status = error?.response?.status;

    if (!status) {
      console.error("Network error:", error.message);
      return Promise.reject({ message: "Network Error. Please check your connection." });
    }

    if (status === 401 || status === 403) {
      await storage.removeData("accessToken");
      console.warn("Session expired. Redirecting to login...");
      window.location.href = "/login";
    }

    if (error.code === "ECONNABORTED") {
      console.error("Request timeout:", error.message);
      return Promise.reject({ message: "Request Timeout. Please try again." });
    }

    return Promise.reject(error);
  }
)

export default api;
