import React from "react";

export default function Footer() {
  return (
    <div
      style={{
        padding: "12px 0px",
        backgroundColor: "rgb(232, 227, 227)",
        textAlign: "center",
        position: "fixed",
        width: "100%",
        height: "85px",
        bottom: "0",
        left: "0",
        right: "0",
        zIndex: "999",
      }}
    >
      <div className="text-center">
        <h5>
          Made by{" "}
          <a href="" style={{ textDecoration: "none", color: "red" }}>
            Yash Bhargava
          </a>
        </h5>
      </div>
      <div className="text-center pt-1"></div>
    </div>
  );
}
