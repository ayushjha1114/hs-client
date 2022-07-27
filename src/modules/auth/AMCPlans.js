import React, { useEffect } from 'react';
import PublicPage from '../../layout/PublicLayout';
import { Divider } from 'antd';


const AMCPlans = (props) => {
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
        <div className="container">
            <div className="silver">
                <img src="assets/images/bronze-badge.svg" alt="" />
                <h1>Bronze Plan</h1>
                <h2>For trails and you can experience our first service.</h2>
                <div className="price">FREE</div>
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
                <div className="price">$65</div>
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
                <div className="price">$110</div>
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
