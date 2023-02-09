import {useState} from "react"
import { useHandleApiCall } from "./useHandleApiCall";

type Credentials =  {
    password: string;
    repeatPassword: string;
    newPassword: string;
} | {
    email:string | undefined
}
type Endpoints = "/auth/changePassword" | "/auth/changeEmail"

export const useChangeCredentials = (credentials:Credentials, endpoint:Endpoints) => {
    
    const { handleApiCall, loading } = useHandleApiCall("PATCH", true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
   
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        handleApiCall(endpoint, credentials, {}, (data, err, user) => {
            if (typeof data === "string") {
              setSuccess(data);
              setError("");
            }
            if (typeof err === "string" && err !== "") {
              setSuccess("");
              setError(err);
            }
          });
    }
    return {success, error, loading, handleSubmit}

}