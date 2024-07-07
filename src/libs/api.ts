import { extractError } from "@libs/alert";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
api.interceptors.request.use((configs) => configs, extractError);

export default api;
