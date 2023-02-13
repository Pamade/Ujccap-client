import status from "../../styles/loginRegisterStatus.module.scss";

interface Props {
  error: string;
}

const ValidationError = ({ error }: Props) => {
  return (
    <>
      {error ? (
        <div className={`${status.error} ${status.message_box}`}>
          <p>{error}</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ValidationError;
