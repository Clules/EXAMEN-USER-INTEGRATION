import React, { useState, useEffect } from "react";
import ReactCardCarousel from "react-card-carousel";
import "./prevdescription.css";
import CardPopup from "./CardPopup";

const PrevDescription = ({ descriptions }) => {
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleClick = (index) => {
    setClickedIndex(clickedIndex === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (clickedIndex !== null) {
        const cardElements = document.querySelectorAll(".card");
        let isOutside = true;
        cardElements.forEach((cardElement) => {
          if (cardElement.contains(event.target)) {
            isOutside = false;
          }
        });
        if (isOutside) {
          setClickedIndex(null);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [clickedIndex]);

  return (
    <>
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {descriptions.length === 0 ? (
          <div
            style={{
              width: "250px",
              height: "150px",
              backgroundColor: "gray",
              borderRadius: "10px",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              margin: "10px",
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            No hay descripciones previas aún!
            <br />
            Agrega una nueva!
          </div>
        ) : (
          <ReactCardCarousel spread={"wide"} disable_box_shadow={true}>
            {descriptions.map((des, idx) => (
              <div key={idx} className="card" onClick={() => handleClick(idx)}>
                <p
                  style={{
                    color: "white",
                    fontSize: "15px",
                    margin: "0 0 5px 0",
                  }}
                >
                  Descripcion:
                </p>
                <p
                  style={{
                    color: "white",
                    fontSize: "10px",
                    margin: "0 0 5px 0",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                >
                  {des.description}
                </p>
                <p
                  style={{
                    color: "white",
                    fontSize: "15px",
                    margin: "0 0 5px 0",
                  }}
                >
                  Prescription
                </p>
                <p
                  style={{
                    color: "white",
                    fontSize: "10px",
                    margin: "0 0 5px 0",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                >
                  {des.prescription}
                </p>
                {clickedIndex === idx && (
                  <CardPopup
                    description={des.description}
                    prescription={des.prescription}
                  />
                )}
              </div>
            ))}
          </ReactCardCarousel>
        )}
      </div>
    </>
  );
};

export default PrevDescription;
