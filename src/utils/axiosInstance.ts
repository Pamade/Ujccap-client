import axios from "axios"
const BASE = 'https://ujccap-server-production.up.railway.app/api/v1' as const

const axiosInstance = (authNeeded = false, token:string) => {
  return axios.create({
    baseURL: BASE,
    headers: authNeeded ? { Authorization: `Bearer ${token}` } : {},
  });
}

export default axiosInstance

