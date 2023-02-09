import axios from "axios"
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
export const useResendVerificationToken = () => {
    const {
        state: { user },
      } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const sendToken = async () => {
        try {
            setLoading(true);
            await axios.post("/api/v1/auth/resendToken", { email: user?.email });
            localStorage.removeItem("showModal");
            toast.success("Email sent!");
            setLoading(false);
          } catch (err: any) {
            toast.error(err.response.data.err);
            setLoading(false);
          }
    }

    return {sendToken, loading}
}