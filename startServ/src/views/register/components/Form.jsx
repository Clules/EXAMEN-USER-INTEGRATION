import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Form.css";

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    lastname: "",
    age: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValues = { ...form, [name]: value };
    setForm(newValues);

    console.log(form);
  };

  const handleSumbitForm = async () => {
    navigate("/dashboard");

    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      return res.status == 200
        ? alert("Registro Exitoso!")
        : alert("ERROR al registro");
    } catch (error) {
      alert("Error al registrar");
    }
  };
  return (
    <div
      style={{
        color: "white",
        padding: "5px",
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        width: "90%",
        aspectRatio: "1.2",
      }}
    >
      <h1>Form</h1>
      <form style={{ display: "flex", flexDirection: "column", height: "80%" }}>
        <p>Name: </p>
        <input
          style={{ height: "25px", padding: "5px" }}
          type="text"
          name="name"
          placeholder="User Name"
          onChange={handleChange}
          value={form.name}
        />
        <p>Last Name: </p>
        <input
          style={{ height: "25px", padding: "5px" }}
          type="text"
          name="lastname"
          placeholder="Last Name"
          onChange={handleChange}
          value={form.lastname}
        />
        <p>Email: </p>
        <input
          style={{ height: "25px", padding: "5px" }}
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
        />
        <p>Age: </p>
        <input
          style={{ height: "25px", padding: "5px" }}
          type="int"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          value={form.age}
        />
        <div
          style={{
            paddingTop: "5px",
            display: "flex",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <button
            style={{
              height: "50px",
              width: "100px",
              border: "none",
            }}
            type="submit"
            onClick={handleSumbitForm}
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
