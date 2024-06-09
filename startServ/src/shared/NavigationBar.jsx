import { IoHomeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavigationBar = ({ children, setQuery }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const que = e.target.value;

    setQuery(que);
  };

  const handleNavigate = (value) => {
    navigate(`/${value}`);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "40px",
          boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div
            style={{ display: "flex", cursor: "pointer", alignItems: "center" }}
            onClick={() => handleNavigate("dashboard")}
            className="navtext"
          >
            <IoHomeOutline />
            <p>Dashboard</p>
          </div>

          <p
            style={{ cursor: "pointer" }}
            onClick={() => handleNavigate("register")}
            className="navtext"
          >
            Registro
          </p>
          <input
            style={{
              border: "solid 1px gray",
              height: "20px",
              width: "80px",
              borderRadius: "5px",
            }}
            type="text"
            placeholder="Buscar por nombre"
            onChange={handleChange}
            className="navtext"
          />
        </div>

        {children}
      </div>
    </>
  );
};

export default NavigationBar;
