import {
  DashboardOutlined,
  CustomerServiceOutlined,
    UserOutlined,
    DatabaseOutlined,
    ExclamationCircleOutlined,
  } from '@ant-design/icons';
  import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
  import React ,{useState}from 'react';
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem('DashBoard','dashboard',<DashboardOutlined />),
    getItem('User', 'user-management', <UserOutlined />),
    getItem('Tickets', 'tickets', <ExclamationCircleOutlined />),
    getItem('Brand', 'brand', <DatabaseOutlined />),
    getItem('Services', 'service', <CustomerServiceOutlined />),
  ];
  const Navigation = (props) => {
    const navigate = useNavigate();
    const {collapsed} = props;
    const [isAdmin] = useState(props.isAdminLogin);
    const handleMenuItems = ({ item, key, keyPath, domEvent }) => {
      navigate(`/admin/${key}`);
    }
    return (
      <>
      { isAdmin === "admin" ? 
      <div 
          
        >
          <Menu
            defaultSelectedKeys={['dashboard']}
            defaultOpenKeys={['dashboard']}
            mode="inline"
            theme="light"
            inlineCollapsed={collapsed}
            items={items}
            onClick={handleMenuItems}
            // selectedKeys={['dashboard','user-management']}
            
          />
        </div>
        : ""
      }
      </>
      
    );
  };

export default Navigation;
