import userImage from "../../../assets/user.svg";

const CardInfo = ({ user }) => {
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
          <p>Email: {user.email}</p>
          <p>Last Name: {user.lastname}</p>
          <p>Age: {user.age}</p>
        </div>
      </div>
    </>
  );
};

export default CardInfo;
