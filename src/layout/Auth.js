import React from 'react';
import { Col, Row } from 'antd';

const AuthLayout = (props) => {
	return (
		<Row>
		<Col span={12}>
		{/* <Col span={24}> */}
			{props.children}
		</Col>
		<Col span={12} className="auth-right-layout">
			<div className="">
				<img src="/assets/images/login-page.jpg" alt="login-page" style={{ height: '100vh'}} />
			</div>
			{/* <h1>WELCOME TO THE DGSOFT</h1> */}
		</Col>
	  </Row>
	)

}

export default AuthLayout;