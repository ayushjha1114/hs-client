import React, { useState } from 'react';
import PublicPage from '../../layout/PublicLayout';
import { Col, Divider, InputNumber, Row, Slider  } from 'antd';
import { Link } from 'react-router-dom';


const AMCPlans = (props) => {

    const [inputValue, setInputValue] = useState(1);
    const [bronzePrice, setBronzePrice] = useState(299);
    const [sliverPrice, setSliverPrice] = useState(599);
    const [goldPrice, setGoldPrice] = useState(999);

    const onChange = (value) => {
        setInputValue(value);
        setBronzePrice(value * 299);
        setSliverPrice(value * 599);
        setGoldPrice(value * 999);
    };

    const bronzeFeatures = [
        'Consulting with experts 20 times for year', 
        'Add friends for free 1 months',
        'Free 5 fonts'
    ];

    const silverFeatures = [
        'Consulting with experts 20 times for year', 
        'Add friends for free 1 months',
        'Free Unlimited Font',
        'Q&A  in the forum for 3 months',
        'Unlimited use and consultation',
        'Share history and awards'
    ];

    const goldFeatures = [
        'Consulting with experts 20 times for year', 
        'Add friends for free 1 months',
        'Free Unlimited Font',
        'Q&A  in the forum for 3 months',
        'Unlimited use and consultation',
        'Share history and awards',
        'Get the plugin for custom'
    ];

  return (
    <PublicPage>
        <div className="amcCard">
            <h1 className="amcCardHeading">AMC Plans</h1>
            <Row className="amcCardSlider">
                <Col span={12}>
                    <Slider
                    min={1}
                    max={25}
                    onChange={onChange}
                    value={typeof inputValue === 'number' ? inputValue : 0}
                    />
                </Col>
            </Row>
            <p>You have selected {inputValue} devices. If you want to buy more than 25 devices <Link to='/'>Click here.</Link></p>
        </div>
        <div className="container">
            <div className="silver">
                <img src="assets/images/bronze-badge.svg" alt="" />
                <h1>Bronze Plan</h1>
                <h2>For trails and you can experience our first service.</h2>
                <div className="price">
                    &#8377; {bronzePrice}
                    <p>/devices</p>
                </div>
                <Divider className="AMCPlanDivider"/>
                {
                    bronzeFeatures.map((feature) => (
                        <div className="AMCPlanFeatures">
                            <img src="assets/images/check-mark.svg" alt="" />
                            <p>{feature}</p>
                        </div>
                    ))
                }
                <button>Select Plan</button>
            </div>
            <div className="gold">
                <img src="assets/images/silver-badge.svg" alt="" />
                <h1>Silver Plan</h1>
                <h2>This plan gives our intermediate service.</h2>
                <div className="price">
                    &#8377; {sliverPrice}
                    <p>/devices</p>
                </div>
                <Divider className="AMCPlanDivider" />
                {
                    silverFeatures.map((feature) => (
                        <div className="AMCPlanFeatures">
                            <img src="assets/images/check-mark.svg" alt="" />
                            <p>{feature}</p>
                        </div>
                    ))
                }
                <button>Select Plan</button>
            </div>
            <div className="plat">
                <img src="assets/images/gold-badge.svg" alt="" />
                <h1>Gold Plan</h1>
                <h2>This plan gives the best service from us.</h2>
                <div className="price">
                    &#8377; {goldPrice}
                    <p>/devices</p>
                </div>
                <Divider className="AMCPlanDivider" />
                {
                    goldFeatures.map((feature) => (
                        <div className="AMCPlanFeatures">
                            <img src="assets/images/check-mark.svg" alt="" />
                            <p>{feature}</p>
                        </div>
                    ))
                }
                <button>Select Plan</button>
            </div>
        </div>
    </PublicPage>
  )
}

export default AMCPlans;
