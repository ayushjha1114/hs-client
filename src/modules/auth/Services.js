import * as React from 'react';
import { DoubleRightOutlined } from '@ant-design/icons';
import PublicPage from '../../layout/PublicLayout';
import { Card } from 'antd';
import { Col, Divider, Row } from 'antd';
import  IconButton  from '../../components/IconButton/index'
const { Meta } = Card;

 
const Services = (props) => {
   const data = [{
    id: 'modal1',
    title : 'Computer services',
    imgSrc: 'https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg',
   },
   {
    id: 'modal1',
    title : 'Computer services',
    imgSrc: 'https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg',

   },
   {
    id: 'modal1',
    title : 'Computer services',
    imgSrc: 'https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg',


   },
   {
    id: 'modal1',
    title : 'Computer services',
    imgSrc: 'https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg',

   },
   {
    id: 'modal1',
    title : 'Computer services',
    imgSrc: 'https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg',

   },
   {
    id: 'modal1',
    title : 'Computer services',
    imgSrc: 'https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg',


   },
   {
    id: 'modal1',
    title : 'Computer services',
    imgSrc: 'https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg',


   },
   {
    id: 'modal1',
    title : 'Computer services',
    imgSrc: 'https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg',


   },
   {
    id: 'modal1',
    title : 'Computer services',
    imgSrc: 'https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg',


   }]

  return (
    <PublicPage>
         <div className="service-container">
         <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
    >
          {data.map((element) => (
            <Col  span={8}>
            <Card hoverable className ='service-card'
    style={{
      width: 300, 
    }}
    cover={
      <img
        alt="example"
        src={element.imgSrc}
      />
    }
    actions={[
        <IconButton> </IconButton>,
      
    ]} 
  >
    <Meta className='service-meta'
      title={element.title}
    />
    </Card>
    </Col>
          ))}
          </Row>
         
    </div>
    </PublicPage>
  )
}

export default Services;
