import React, { useState } from "react";
import PublicPage from "../../layout/PublicLayout";
import { Col, Divider, InputNumber, Row, Slider } from "antd";
import { Link } from "react-router-dom";
import { Card, Button } from "antd";
const { Meta } = Card;

const AMCPlanDetails = (props) => {
  const [inputValue, setInputValue] = useState(1);
  const [size] = useState("large");

  const onChange = (value) => {
    setInputValue(value);
  };

  const bronzeFeatures = [
    "Consulting with experts 20 times for year",
    "Add friends for free 1 months",
    "Free 5 fonts",
  ];

  const silverFeatures = [
    "Consulting with experts 20 times for year",
    "Add friends for free 1 months",
    "Free Unlimited Font",
    "Q&A  in the forum for 3 months",
    "Unlimited use and consultation",
    "Share history and awards",
  ];

  const goldFeatures = [
    "Consulting with experts 20 times for year",
    "Add friends for free 1 months",
    "Free Unlimited Font",
    "Q&A  in the forum for 3 months",
    "Unlimited use and consultation",
    "Share history and awards",
    "Get the plugin for custom",
  ];

  const features = [
    {
      label: "Bronze Plan",
      description: "For trails and you can experience our first service.",
      price: "Free",
      feature: bronzeFeatures,
      logo: "/assets/images/bronze-badge.svg",
    },
    {
      label: "Silver Plan",
      description: "This plan gives our intermediate service.",
      price: "$65",
      feature: silverFeatures,
      logo: "/assets/images/silver-badge.svg",
    },
    {
      label: "Gold Plan",
      description: "This plan gives the best service from us.",
      price: "$110",
      feature: goldFeatures,
      logo: "/assets/images/gold-badge.svg",
    },
  ];

  return (
    <PublicPage>
      <div>
        <Card
          className="amc-card"
          title="AMC Plans"
          bordered={true}
          style={{
            width: 1300,
            borderRadius: 10,
            position: "inherit",
          }}
        >
          <div className="amc-card-slider">
            <Row>
              <Col span={18} className="amc-slider-col">
                <Slider
                  min={1}
                  max={25}
                  onChange={onChange}
                  value={typeof inputValue === "number" ? inputValue : 0}
                />
              </Col>
            </Row>
            <p>
              You have selected {inputValue} devices. If you want to buy more
              than 25 devices <Link to="/">Click here.</Link>
            </p>
          </div>
          <Row className="amc-plans">
            {features.map((plan) => (
              <Col span={8}>
                <Card
                  className="amc-plan-detail"
                  style={{
                    width: 300,
                  }}
                  cover={<img src={plan.logo} alt="" />}
                >
                  <Meta title={plan.label} description={plan.description} />
                  <h2>{plan.price}</h2>
                  <Divider className="amc-plan-divider" />
                  {plan.feature.map((data) => (
                    <div className="amc-plan-features">
                      <Row>
                        <Col span={3} style={{ marginRight: 10 }}>
                          <img src="/assets/images/check-mark.svg" alt="" />
                        </Col>
                        <Col>
                          <p>{data}</p>
                        </Col>
                      </Row>
                    </div>
                  ))}
                  <div className="amc-plan-detail-button">
                    <Button type="primary" size={size} shape="round">
                      Select Plan
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </div>
    </PublicPage>
  );
};

export default AMCPlanDetails;
