import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserLayout from "../../layout/User";
import {
  useGetAllBrandQuery,
  useCreateBrandMutation,
  useUpdateBrandDetailMutation,
} from "../../services/admin";
import { Input, notification } from "antd";
import {
  EditTwoTone,
  DeleteTwoTone,
  CheckCircleTwoTone,
  PlusOutlined,
  CheckOutlined
} from "@ant-design/icons";
import TablePagination from '@mui/material/TablePagination';
import {Card, CardHeader ,Button} from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const Brand = () => {
  const [createBrand] = useCreateBrandMutation();
  const [updateBrandDetail] = useUpdateBrandDetailMutation();
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [isEditableIndex, setIsEditableIndex] = useState(null);
  const [defaultName, setDefaultName] = useState("");
  const [defaultDescription, setDefaultDescription] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  
  const { data, error, isLoading, refetch } = useGetAllBrandQuery({ limit: rowsPerPage, offset: page * rowsPerPage});
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let errorHandler = (message, description) => {
    setTimeout(() => {
      notification.error({
        message,
        description,
        duration: 8,
        className: "notification-error",
      });
    }, 50);
  };

  const handleAddBtn = async () => {
    if (isAddOpen) {
      if (!brandName) {
        errorHandler("Error occurred", "Please enter brand name.");
      } else if (!brandDescription) {
        errorHandler("Error occurred", "Please enter the brand description.");
      } else {
        const response = await createBrand({
          name: brandName,
          description: brandDescription,
        });
        if (response?.data?.success) {
          notification.success({
            message: "Success",
            description: "Brand Created Successfully !!",
            duration: 4,
            className: "notification-green",
          });
          refetch();
          setBrandName("");
          setBrandDescription("");
          setIsAddOpen(!isAddOpen);
        } else {
          errorHandler(
            "Technical Error",
            "There may be some error occurred while processing the request. Please try after some time."
          );
        }
      }
    } else {
      setIsAddOpen(!isAddOpen);
    }
  };

  const handleInputChange = (event, field) => {
    if (field === "name") {
      setBrandName(event.target.value);
    } else if (field === "description") {
      setBrandDescription(event.target.value);
    }
  };

  const handleDeleteIcon = () => {
    setIsAddOpen(!isAddOpen);
  };

  const handleEditBtn = (name, description, i) => {
    setDefaultName(name);
    setDefaultDescription(description);
    setIsEditable(true);
    setIsEditableIndex(i);
  };

  const undoEditAction = (i) => {
    setDefaultName("");
    setDefaultDescription("");
    setIsEditable(false);
    setIsEditableIndex(i);
  };

  const handleUpdateBtn = async (id) => {
    let updateBrand = {};
    if (brandName) {
      updateBrand.name = brandName;
    } else if (brandDescription) {
      updateBrand.description = brandDescription;
    }
    const response = await updateBrandDetail({
      id,
      ...updateBrand,
    });

    if (response?.data?.success) {
      notification.success({
        message: "Success",
        description: "Brand Update Successfully !!",
        duration: 4,
        className: "notification-green",
      });
      refetch();
      setBrandName("");
      setBrandDescription("");
      setDefaultName("");
      setDefaultDescription("");
      setIsEditable(false);
    } else {
      errorHandler(
        "Technical Error",
        "There may be some error occurred while processing the request. Please try after some time."
      );
    }
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
      <CardHeader title="Brands" action={<Button variant="contained"  startIcon={!isAddOpen? <AddIcon />: <TaskAltIcon/>} onClick={() => handleAddBtn()}>
      {!isAddOpen ? "Add Brand" : "Save Brand"}
     </Button>}></CardHeader>
            {error ? (
              <>Oh no, there was an error</>
            ) : isLoading ? (
              <>Loading...</>
            ) : data ? (
              <>
                <div className="user-management-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.data &&
                        data?.data?.rows?.length > 0 &&
                        data.data.rows.map((item, i) => {
                          return (
                            <tr key={i}>
                              {isEditable && isEditableIndex === i ? (
                                <>
                                  <td>
                                    <Input
                                      defaultValue={defaultName}
                                      onChange={(e) =>
                                        handleInputChange(e, "name")
                                      }
                                    />
                                  </td>
                                  <td>
                                    <Input
                                      defaultValue={defaultDescription}
                                      onChange={(e) =>
                                        handleInputChange(e, "description")
                                      }
                                    />
                                  </td>
                                  <td className="admin-actions">
                                    <a onClick={() => handleUpdateBtn(item.id)}>
                                      <CheckCircleTwoTone
                                        style={{ marginRight: "10px" }}
                                      />
                                    </a>
                                    <a onClick={() => undoEditAction(i)}>
                                      <DeleteTwoTone className="brandDelete" />
                                    </a>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td>{item.name}</td>
                                  <td>{item.description}</td>
                                  <td className="admin-actions">
                                    <a
                                      onClick={() =>
                                        handleEditBtn(
                                          item.name,
                                          item.description,
                                          i
                                        )
                                      }
                                    >
                                      <EditTwoTone />
                                    </a>
                                  </td>
                                </>
                              )}
                            </tr>
                          );
                        })}
                      {isAddOpen && (
                        <tr key="brand">
                          <td>
                            <Input
                              autoFocus
                              placeholder="Enter the brand name"
                              onChange={(e) => handleInputChange(e, "name")}
                            />
                          </td>
                          <td>
                            <Input
                              placeholder="Enter the description"
                              onChange={(e) =>
                                handleInputChange(e, "description")
                              }
                            />
                          </td>
                          <td onClick={() => handleDeleteIcon()}>
                            <DeleteTwoTone className="brandDelete" />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <TablePagination
                  className="userManagementPagination"
                  component="div"
                  count={data?.data?.totalCount ? data?.data?.totalCount : 0}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            ) : (
              <></>
            )}
            </Card>
      </UserLayout>
    </>
  );
};

export default Brand;
