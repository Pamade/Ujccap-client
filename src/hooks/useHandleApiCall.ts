import {useState, useContext} from "react"
import { AuthContext } from "../context/AuthContext/AuthContext";
import { User, Error, LoginData, Offer, OffersForSingleOfferPage } from "../types/types";
import { OffersWithCount } from "../types/types";
import axiosInstance from "../utils/axiosInstance";

export type Data =  OffersWithCount | Offer | User | User[]|LoginData | null | string | OffersForSingleOfferPage
type RequestTypes = "GET" | "PUT" | "PATCH" | "DELETE" | "POST"

export function CheckType<T extends Data | Data[]>(item: Data | Data[]): item is T {

    if (typeof item !== "string") {
      for (const val in item) {
        if (val in item) {
          return true;
        }
      }
    }
  
    return false;
  }

export const useHandleApiCall = (type:RequestTypes, authNeeded = false, userUpdate=true) => {
  const {dispatch} = useContext(AuthContext)
    const token = authNeeded ? JSON.parse(localStorage.getItem("token")!) : null
    const axiosInstanceCreate = axiosInstance(authNeeded, token)
    const [loading, setLoading] = useState(false)
    
      const handleApiCall =(async(url:string, data = {}, config = {}, cb:(data:Data, error:Error, user?:User)  => void) => {
        setLoading(true)
        
        try {
            const  response = await axiosInstanceCreate({
                method:type,
                url,
                data,
                ...config
            })
            
            if (response.data) {
                cb(response.data.data, "", response.data.user)
            }
            if (response.data.err) {
                cb(null, response.data.err)
            }
            //update user
            if (response.data.user && userUpdate){
              dispatch({type:'LOGIN_SUCCESS', payload:response.data.user})
            }
            setLoading(false)
        }
            catch (err:any) {
                console.log(err.response.data.err)
                cb(null,err.response.data.err)
                setLoading(false)
            }
      })
      return {  handleApiCall, loading }
}
