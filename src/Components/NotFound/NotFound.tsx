const NotFound = ({
  value,
}: {
  value: "User not found" | "No offers" | "Offer not found";
}) => {
  return (
    <p style={{ textAlign: "center", fontSize: "2rem", marginTop: "2rem" }}>
      {value}
    </p>
  );
};

export default NotFound;
