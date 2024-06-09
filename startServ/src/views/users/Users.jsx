import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import userimg from "../../assets/user.svg";
import PrevDescription from "./components/PrevDescription";
import CardInfo from "./components/CardInfo";
import NavigationBar from "../../shared/NavigationBar";
import "./Users.css";

const Users = () => {
  const { id } = useParams();
  const [descrip, setDescrip] = useState([]);
  const [form, setForm] = useState({ description: "", prescription: "" });
  const [fileUr, setFileUr] = useState({ fileUrls: [""], tag: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [user, setUser] = useState([]);
  const [fileID, setFileID] = useState("");
  const [nearQuery, setNearQuery] = useState("");
  const [nearPrompt, setNearPrompt] = useState("");
  const [flag, setFlag] = useState(false);

  const navigate = useNavigate();
  const toggleFlag = () => {
    setFlag(!flag); // Toggle the flag value
  };
  const handleValue = (e) => {
    const { name, value } = e.target;
    const newValues = { ...form, [name]: value };
    setForm(newValues);
  };

  const generateHelp = async () => {
    const prompt = {
      prompt: "",
    };
    if (flag === true) {
      if (nearPrompt !== "") {
        prompt.prompt =
          "Contesta esto: " +
          form.description +
          ". En base a esta informacion:" +
          nearPrompt;
      } else {
        alert("No hay conexto provicionado");
      }
    } else {
      prompt.prompt = form.description;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/chat/gemini`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prompt),
      });
      const data = await response.json();
      console.log(data);

      const responseT = data.response;
      console.log(responseT);
      setForm({
        description: form.description,
        prescription: responseT,
      });
      setIsLoading(false);

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUrlForm = async () => {
    setIsLoading2(true);

    try {
      const res = await fetch("http://localhost:3000/nearbyy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fileUr),
      });

      const data = await res.json();
      if (res.status === 200) {
        const fileId = data.data.files[0].id;
        setFileID(fileId);
        setIsLoading2(false);

        alert("Registro Exitoso!");
      } else {
        alert("ERROR al registro");
      }
    } catch (error) {
      alert("Documento no válido");
    }
  };

  const handleFileUrl = (e) => {
    const { name, value } = e.target;
    if (name === "fileUrls") {
      // Ensure fileUrls is always an array
      const newFileUrl = { ...fileUr, [name]: [value] };
      setFileUr(newFileUrl);
    } else {
      const newFileUrl = { ...fileUr, [name]: value };
      setFileUr(newFileUrl);
    }
  };

  const handleNearQuery = (e) => {
    setNearQuery(e.target.value);
  };

  const handleNearChunk = async () => {
    const encodedQuery = encodeURIComponent(nearQuery);
    console.log(encodedQuery);
    try {
      const res = await fetch(
        `http://localhost:3000/nearbyy/chunks?query=${encodedQuery}&tag=${fileUr.tag}&limit=10&fileId=${fileID}`
      );

      if (res.status === 200) {
        const data = await res.json();
        const chun = data.chunks.data;
        let nearprom = "";
        chun.items.forEach((chunk) => {
          const { text } = chunk;
          nearprom += text + "\n\n"; // Concatenate the text of each chunk
        });
        setNearPrompt(nearprom);

        alert("Contexto Exitoso!");
      } else {
        alert("ERROR al registro");
      }
    } catch (error) {
      alert("No se genero correctamente");
    }
  };

  const handleUploadedFiles = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/nearbyy/get-upload-url?contentType=application/pdf`
      );
      const data = await res.json();

      console.log(data);
    } catch (error) {
      alert("malo");
    }
  };

  const fetchDescriptions = async () => {
    const response = await fetch("http://localhost:3000/description/" + id);
    const data = await response.json();
    setDescrip(data);
  };

  const fetchUserById = async () => {
    const response = await fetch("http://localhost:3000/users/" + id);
    const data = await response.json();
    setUser(data);
    console.log(data);

    return data;
  };

  useEffect(() => {
    fetchDescriptions();
    fetchUserById();
  }, []);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handlePrescription = async () => {
    try {
      const res = await fetch(`http://localhost:3000/description/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.status === 201) {
        alert("Guardado Exitosamente!");
        window.location.reload(); // Reload the page
      } else {
        alert("ERROR al guardar");
      }
    } catch (error) {
      alert("Error al registrar");
    }
  };
  return (
    <>
      <NavigationBar>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "200px",
              margin: "20px",
            }}
          >
            <PrevDescription descriptions={descrip} />
          </div>
          <div
            style={{
              width: "100%",
              height: "400px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              justifySelf: "center",
              alignSelf: "center",
            }}
          >
            <div>
              <CardInfo user={user} />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignContent: "center",
                width: "50%",
                height: "100%",
                margin: "50px",
              }}
            >
              <div
                style={{
                  color: "white",
                  fontSize: "20px",
                  display: "flex",

                  alignContent: "center",
                  justifyContent: "left",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <p>Description:</p>
                  <button
                    onClick={toggleFlag}
                    style={{
                      width: "10x",
                      height: "15px",
                      marginLeft: "10px",
                      backgroundColor: flag ? "blue" : "white",
                      color: flag ? "white " : "black",
                      border: "solid 2px gray",
                    }}
                  >
                    {flag ? "Contexto" : "Sin Contexto"}
                  </button>
                </div>
                <textarea
                  name="description"
                  id="des"
                  value={form.description}
                  onChange={handleValue}
                  style={{ height: "60px" }}
                ></textarea>
                <p>Prescription:</p>
                <textarea
                  name="prescription"
                  id="pres"
                  value={form.prescription}
                  onChange={handleValue}
                  style={{ height: "100px" }}
                ></textarea>
              </div>
              <button
                style={{
                  height: "30px",
                  width: "100px",

                  alignSelf: "center",
                  marginTop: "5px",
                }}
                type="submit"
                onClick={generateHelp}
                className="button-menu"
              >
                {isLoading ? "Cargando..." : "Generar Ejercicio"}
              </button>
              <button
                style={{
                  height: "30px",
                  width: "100px",
                  alignSelf: "center",
                  marginTop: "5px",
                }}
                type="submit"
                onClick={handlePrescription}
                className="button-menu"
              >
                Guardar
              </button>
            </div>
            <div
              style={{
                width: "18%",
                height: "380px",
                color: "white",
                fontSize: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                backgroundColor: "black",
                boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "start",
                  width: "80%",
                  margin: "10px",
                }}
              >
                Contexto:
              </div>
              <textarea
                name="nearQuery"
                id="2"
                placeholder="Ingresa el tema del documento en el que quieres que se contextúe la respuesta"
                style={{ width: "80%", height: "30%" }}
                onChange={handleNearQuery}
              ></textarea>
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "start",
                  width: "80%",
                  margin: "10px",
                }}
              >
                Doc URL:
                <p
                  style={{
                    fontSize: "10px",
                    alignSelf: "center",
                    marginLeft: "10px",
                    color: "red",
                  }}
                >
                  Se recomienda /pdf
                </p>
              </div>
              <input
                name="fileUrls"
                id="1"
                style={{ width: "80%", margin: "3px" }}
                onChange={handleFileUrl}
                placeholder="Url para el documento de referencia"
              ></input>
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "start",
                  width: "80%",
                  margin: "10px",
                }}
              >
                Tag:
              </div>
              <input
                name="tag"
                id="3"
                style={{ width: "80%", margin: "3px" }}
                onChange={handleFileUrl}
                placeholder="Tag para el documento"
              ></input>
              <button
                style={{
                  height: "30px",
                  width: "100px",
                  alignSelf: "center",
                  marginTop: "20px",
                }}
                type="submit"
                onClick={handleFileUrlForm}
                className="button-menu2"
              >
                {isLoading2 ? "Cargando..." : "Guardar Documento"}
              </button>
              <button
                style={{
                  height: "30px",
                  width: "100px",
                  alignSelf: "center",
                  marginTop: "20px",
                }}
                type="submit"
                onClick={handleNearChunk}
                className="button-menu3"
              >
                Guardar Contexto
              </button>
            </div>
            <button
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                textAlign: "center",
                padding: "10px",
                backgroundColor: "black",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
              onClick={handleBack}
            >
              Back
            </button>
          </div>
        </div>
      </NavigationBar>
    </>
  );
};

export default Users;
