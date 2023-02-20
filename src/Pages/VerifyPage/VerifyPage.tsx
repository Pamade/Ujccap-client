import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import VerifyBox from "../../Components/verifyBox/VerifyBox";
import { useHandleApiCall } from "../../hooks/useHandleApiCall";

const VerifyPage = () => {
  const { id, token } = useParams();
  const { handleApiCall } = useHandleApiCall("GET");
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (id && token) {
      handleApiCall(`/auth/${id}/verify/${token}`, {}, {}, (data, error) => {
        if (typeof data === "string") {
          setData(data);
        } else if (typeof error === "string") {
          setError(error);
        }
      });
    }
  }, [id, token, data, error]);

  const {
    state: { loading },
  } = useContext(AuthContext);

  if (loading) return <></>;
  if ((data || error) && !loading)
    return (
      <>
        <VerifyBox msg={data || error} to="/login" textColor="black" />
      </>
    );
  return <></>;
};

export default VerifyPage;
