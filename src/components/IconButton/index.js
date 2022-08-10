import React from 'react';
import './index.scss';
import { Col, Row } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';


const IconButton = () => {

return (
     <Row>
      <Col span={18}>Book a Service</Col>
        
      <Col span={6}><DoubleRightOutlined key='Booking' /></Col>
    </Row>
);
}
export default IconButton;