import { useEffect, useContext} from 'react';
import { AuthContext } from "../context/AuthContext/AuthContext";
import { useNavigate } from 'react-router-dom';
import { User, Seller } from "../types/types";
export const useVerifyPermissions = (IsRoleType:boolean | undefined | User | Seller) => {
    const navigate = useNavigate()
    const {
        state: { loading, user },
      } = useContext(AuthContext);

    useEffect(() => {
        if (!loading) {
            if (IsRoleType === false || typeof IsRoleType==="undefined" || !user) {
                navigate("/")
            }
        }
    }, [loading, navigate, IsRoleType, user])

}

