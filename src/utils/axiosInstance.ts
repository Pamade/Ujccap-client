import axios from "axios"

const axiosInstance = (authNeeded = false, token:string) => {
  return axios.create({
    baseURL: "/api/v1",
    headers: authNeeded ? { Authorization: `Bearer ${token}` } : {},
  });
}

export default axiosInstance

