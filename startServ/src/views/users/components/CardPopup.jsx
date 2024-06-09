import "./popup.css";

const CardPopup = ({ description, prescription }) => {
  return (
    <>
      <div className="popup-card" style={{ overflow: "auto" }}>
        <p
          style={{
            fontSize: "15px",
          }}
        >
          Descripcion:
        </p>
        <p
          style={{
            fontSize: "10px",
          }}
        >
          {description}
        </p>
        <p
          style={{
            fontSize: "15px",
          }}
        >
          Prescription
        </p>
        <p
          style={{
            fontSize: "10px",
          }}
        >
          {prescription}
        </p>
      </div>
    </>
  );
};

export default CardPopup;
