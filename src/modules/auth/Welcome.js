import React from "react";
import PublicPage from "../../layout/PublicLayout";

let WelcomePage = () => {
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    // background: 'black',
  };

  return (
    <>
      <PublicPage>
        <div className="homeContainer">
          <img
            src="assets/images/home.png"
            alt=""
            style={{ maxWidth: "100%", height: "auto", marginBottom: "20px" }}
          />
          <div className="homeBody">
            <h2 style={{ color: '#ffffff', fontSize: '2rem' }}>Affordable And Reliable IT Solution.</h2>
            <p>
              DGSOFT is one of the fastest growing organization in distribution
              of total it solutions. We offer wide range of Hardware & Software
              solutions.
            </p>
          </div>
        </div>
      </PublicPage>
    </>
  );
};

export default WelcomePage;
