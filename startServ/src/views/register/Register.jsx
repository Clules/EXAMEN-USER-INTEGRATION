import Form from "./components/Form";
import form from "../../assets/forms.svg";
import NavigationBar from "../../shared/NavigationBar";
const Register = () => {
  return (
    <NavigationBar>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          height: "650px",
        }}
      >
        <div style={{ width: "50%" }}>
          <img src={form} alt="formImage" style={{ width: "100%" }} />
        </div>
        <div
          style={{
            width: "40%",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            border: "solid 2px white",
            marginLeft: "15px",
            backgroundColor: "black",
          }}
        >
          <Form />
        </div>
      </div>
    </NavigationBar>
  );
};

export default Register;
