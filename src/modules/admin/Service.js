import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserLayout from "../../layout/User";
import { useGetAllServiceQuery } from "../../services/admin";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { SET_SERVICE_LIST } from "./adminSlice";
import NewServiceModal from "./NewServiceModal";
import Helper from "../../util/helper";
import { Tooltip, Modal } from "antd";
import {
  PlusOutlined
  } from '@ant-design/icons';
import {Card, CardHeader ,Button} from '@mui/material';
import AddIcon from "@mui/icons-material/Add";


const Service = () => {
  const dispatch = useDispatch();
  const serviceList = useSelector((state) => state.admin.serviceList);
  const { data, error, isLoading } = useGetAllServiceQuery();

  const [serviceModalShow, setServiceModalShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [serviceId, setServiceId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
 
  const handleOk = (event) => {
    console.log(event);
    event.stopPropagation();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const isOpen = () => {
    console.log("ttt" + isModalOpen);
    return isModalOpen;
  }

  const handleEditBtn = (id) => {
    if (serviceList.length > 0) {
      serviceList.map((item) => {
        if (item.id === id) {
          setServiceId(item.id);
        }
      });
    }
    setIsEdit(true);
    setServiceModalShow(true);
  };

  const handleclose =() =>{
    console.log(serviceModalShow);
    setServiceModalShow(!serviceModalShow);
    console.log(serviceModalShow);

  }
  console.log(isModalOpen);

  const handleNewServiceBtn = () => {
    setServiceModalShow(true);
  };

  useEffect(() => {
    dispatch(SET_SERVICE_LIST({ data: data?.data?.rows }));
  }, [data, isEdit]);

  const getCombineServiceProvideDescription = (service) => {
    let result = "";
    service.map((item) => {
      result += `${item.description} | `;
    });
    return result.substring(0, result.length - 2);
  };

  return (
    <>
      <UserLayout>
      <Card
    sx={{
      margin: '4% 0%',
      padding: '20px 10px',
      borderRadius: '8px',
      height : 'calc(100vh - 90px)'
    }}
    >
      <CardHeader title="Services" action={<Button variant="contained"  startIcon={<AddIcon />} onClick={() => handleNewServiceBtn()}>
      New Service
     </Button>}></CardHeader>
            
            {error ? (
              <>Oh no, there was an error</>
            ) : isLoading ? (
              <>Loading...</>
            ) : data ? (
              <>
                <h5>
                  {data?.data?.totalCount ? data?.data?.totalCount : 0} services
                  found
                </h5>
                <div className="user-management-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Service Provide</th>
                        <th>Service Type</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.data &&
                        data?.data?.rows?.length > 0 &&
                        data.data.rows.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{item.name}</td>
                              <td>{item.description}</td>
                              <td style={{ cursor: "pointer" }}>
                                <Tooltip
                                  color="#108ee9"
                                  title={getCombineServiceProvideDescription(
                                    item.service_provided
                                  )}
                                >
                                  {Helper.removeCommaFromServiceProvide(
                                    item.service_provided
                                  )}
                                </Tooltip>
                              </td>
                              <td>
                                {Helper.removeCommaFromServiceType(
                                  item.service_type
                                )}
                              </td>
                              <td className="admin-actions">
                                <a
                                  className="serviceEditBtn"
                                  onClick={() => handleEditBtn(item.id)}
                                >
                                  <EditTwoTone />
                                </a>
                                {/* <a
                                  onClick={() =>
                                    handleEditBtn(
                                      item.name,
                                      item.description,
                                      i
                                    )
                                  }
                                >
                                  <DeleteTwoTone />
                                </a> */}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <></>
            )}
            
        <NewServiceModal
          show={serviceModalShow}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
          isEdit={isEdit}
          serviceId={serviceId}
          onHide={handleclose}
          closeEdit={() => setIsEdit(false)}
        />
        </Card>
       
      </UserLayout>
    </>
  );
};

export default Service;
