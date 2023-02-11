import axios from "axios"
const BASE = 'https://ujccap-server-production.up.railway.app/' as const
const axiosInstance = (authNeeded = false, token:string) => {
  return axios.create({
    baseURL: `${BASE}/api/v1`,
    headers: authNeeded ? { Authorization: `Bearer ${token}` } : {},
  });
}

export default axiosInstance

