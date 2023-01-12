import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserLayout from "../../layout/User";
import {
  useGetAllServiceQuery,
  useCreateBrandMutation,
  useUpdateBrandDetailMutation,
} from "../../services/admin";
import { Button } from "antd";
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { SET_SERVICE_LIST } from './adminSlice';
import NewServiceModal from "./NewServiceModal";

const Service = () => {
  const dispatch = useDispatch();
  const serviceList = useSelector((state) => state.admin.serviceList);
  const { data, error, isLoading } = useGetAllServiceQuery();

  const [serviceModalShow, setServiceModalShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [serviceId, setServiceId] = useState('');

  const handleEditBtn = (id) => {
    if (serviceList.length > 0) {
      serviceList.map(item => {
        if(item.id === id) {
          setServiceId(item.id);
        }
      });
  }
    setIsEdit(true);
    setServiceModalShow(true);
  };

  const handleNewServiceBtn = () => {
    setServiceModalShow(true);
  };

  useEffect(() => {
    dispatch(SET_SERVICE_LIST({ data: data?.data?.rows }));
  }, [data, isEdit]);

  return (
    <>
      <UserLayout>
        <div className="">
          <div className="user-management-card">
          <div className="service-heading">
                    <h3>Service</h3>
                    <Button 
                      className="new-service-btn" 
                      type="primary" 
                      ghost
                      onClick={() => handleNewServiceBtn()}
                    >
                      New Service
                    </Button>
                  </div>
            {error ? (
              <>Oh no, there was an error</>
            ) : isLoading ? (
              <>Loading...</>
            ) : data ? (
              <>
                <h5>{data?.data?.totalCount ? data?.data?.totalCount : 0} services found</h5>
                <div className="user-management-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Service Provided</th>
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
                              <td>{item.service_provided.map(type => {
                                return `${type.label}, `
                              })}</td>
                              <td>{item.service_type.map(type => {
                                return `${type}, `
                              })}</td>
                              <td className="admin-actions">
                                <a
                                  className="serviceEditBtn"
                                  onClick={() =>  handleEditBtn(item.id)}
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
          </div>
        </div>
        <NewServiceModal
                show={serviceModalShow}
                isEdit={isEdit}
                serviceId={serviceId}
                onHide={() => setServiceModalShow(false)}
                closeEdit={() => setIsEdit(false)}
            />
      </UserLayout>
    </>
  );
};

export default Service;
