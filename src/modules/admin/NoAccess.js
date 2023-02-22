import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NoAccess = () => {
  const navigate = useNavigate();
  const redirectToLogin = () => {
    navigate(`/login`);
  };
  return (
    <>
      <Result
        style={{ textAlign: "center", fontSize: "x-large", marginTop: "10%" }}
        status="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary" onClick={() => redirectToLogin()}>
            Log In
          </Button>
        }
      />
    </>
  );
};
export default NoAccess;

// let NoAccess = () => {

// 	return (
// 		<>
// 		<Card
// 		 style={{
// 			margin: '5px 10px',
// 			padding: '20px 10px',
// 			borderRadius: '8px',
// 			minHeight: 'calc(100vh - 55px )',
// 		  }}>
// 		<Empty style={{textAlign: 'center',}} description="You don't have access to admin dashboard"   image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
//    >
// 		<a className="back-to-login" href='/login'>Back to login</a>
// 		</Empty>
// 		</Card>
// 		</>
// 	)
// }

// export default NoAccess;
