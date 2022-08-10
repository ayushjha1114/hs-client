import React from 'react';
import { Carousel } from 'antd';


let WelcomePage = () => {

  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    // background: 'black',
  };

  return (
    <>
      <div className="homeBody">
        <h2>        
          Communicate.
          Collaborate. Create.
        </h2>
        <p>
          XYZ provides an effective and powerful way to manage your projects
        </p>
      </div>
      <div className="homeCarousel"> 
        <Carousel autoplay dots='false'>
          <div>
            <h3 style={contentStyle}>              
              <i class="fa-brands fa-square-facebook"></i> &nbsp;
              <i class="fa-brands fa-instagram"></i> &nbsp;
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
      </div>
    </>

  )
}

export default WelcomePage;
