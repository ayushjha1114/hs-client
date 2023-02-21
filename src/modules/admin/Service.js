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
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import ModeEditIcon from "@mui/icons-material/ModeEdit";


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
    setIsEdit(false);
    setServiceId("");
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

  const columns = React.useMemo(() => [
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "description",
      headerName: "Description",
      width: 300,
    },
    {
      field: "service_provided",
      headerName: "Service Provide",
      width: 500,
      renderCell: (params) => {
        return Helper.removeCommaFromServiceProvide(
          params.row.service_provided
        );
      },
    },
    {
      field: "service_type",
      headerName: "Service Type",
      width: 100,
      renderCell: (params) => {
        return Helper.removeCommaFromServiceType(
          params.row.service_type
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ModeEditIcon color="primary" />}
          label="Edit Details"
          onClick={() => handleEditBtn(params.row.id)}
        />,
      ],
    },
  ]);

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
                  <DataGrid
                sx={{
                  height: "calc(100vh - 180px)",
                }}
                columns={columns}
                rows={data.data.rows}
                components={{ Toolbar: GridToolbar }}
              />
              </>
            ) : (
              <></>
            )}
            
        
        </Card>
       
      </UserLayout>
      {serviceModalShow ? <NewServiceModal
          show={serviceModalShow}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
          isEdit={isEdit}
          serviceId={serviceId}
          onHide={handleclose}
          closeEdit={() => setIsEdit(false)}
        />: ''}
    </>
  );
};

export default Service;
