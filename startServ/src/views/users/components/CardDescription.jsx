const CardDescription = ({ user }) => {
  return (
    <>
      <div
        style={{
          width: "250px",
          height: "400px",
          backgroundColor: "black",
          boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <img
            src={userImage}
            alt="avatar"
            style={{ width: "100px", marginRight: "15px" }}
          />
        </div>
        <div>
          <p style={{ fontSize: "15px" }}>{user.name}</p>
          <p>Description: </p>
          <p>{user.description}</p>
        </div>
      </div>
    </>
  );
};

export default CardDescription;
