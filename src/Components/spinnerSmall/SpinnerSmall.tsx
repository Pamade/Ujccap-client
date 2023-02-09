import { ClipLoader } from "react-spinners";

const override_wrapper = {
  display: "flex",
  margin: "0 auto",
  marginTop: "10%",
  justifyContent: "center",
  alignContent: "center",
};

const SpinnerSmall = () => {
  return (
    <div style={override_wrapper}>
      <ClipLoader size={200} color={"#26b0ff"} />
    </div>
  );
};

export default SpinnerSmall;
