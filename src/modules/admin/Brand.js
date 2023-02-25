import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserLayout from "../../layout/User";
import {
  useGetAllBrandQuery,
  useCreateBrandMutation,
  useUpdateBrandDetailMutation,
} from "../../services/admin";
import TablePagination from "@mui/material/TablePagination";
import { Card, CardHeader, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import { SET_LOADING, SET_SNACKBAR } from "../auth/authSlice";

const Brand = () => {
  const dispatch = useDispatch();
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
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  const { data, error, isLoading, refetch } = useGetAllBrandQuery({
    limit: rowsPerPage,
    offset: page * rowsPerPage,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (isLoading) {
      dispatch(SET_LOADING({ data: true }));
    } else if (error) {
      dispatch(SET_LOADING({ data: false }));
      dispatch(
        SET_SNACKBAR({
          open: true,
          message: "Technical Error",
          variant: "error",
        })
      );
    } else if (data) {
      dispatch(SET_LOADING({ data: false }));
    }
  }, [data, isLoading, error]);

  const handleAddBtn = async () => {
    if (isAddOpen) {
      if (!brandName) {
        dispatch(
          SET_SNACKBAR({
            open: true,
            message: "Please enter brand name.",
            variant: "error",
          })
        );
      } else if (!brandDescription) {
        dispatch(
          SET_SNACKBAR({
            open: true,
            message: "Please enter the brand description.",
            variant: "error",
          })
        );
      } else {
        dispatch(SET_LOADING({ data: true }));
        const response = await createBrand({
          name: brandName,
          description: brandDescription,
        });
        if (response?.data?.success) {
          dispatch(SET_LOADING({ data: false }));
          dispatch(
            SET_SNACKBAR({
              open: true,
              message: "Brand Created Successfully !",
              variant: "success",
            })
          );
          refetch();
          setBrandName("");
          setBrandDescription("");
          setIsAddOpen(!isAddOpen);
        } else {
          dispatch(SET_LOADING({ data: false }));
          dispatch(
            SET_SNACKBAR({
              open: true,
              message: "Technical Error",
              variant: "error",
            })
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
    dispatch(SET_LOADING({ data: true }));
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
      dispatch(SET_LOADING({ data: false }));
      dispatch(
        SET_SNACKBAR({
          open: true,
          message: "Brand Update Successfully !",
          variant: "success",
        })
      );
      refetch();
      setBrandName("");
      setBrandDescription("");
      setDefaultName("");
      setDefaultDescription("");
      setIsEditable(false);
    } else {
      dispatch(SET_LOADING({ data: false }));
      dispatch(
        SET_SNACKBAR({
          open: true,
          message: "Technical Error",
          variant: "error",
        })
      );
    }
  };

  return (
    <>
      <UserLayout>
        <Card
          sx={{
            margin: "4% 0%",
            padding: "20px 10px",
            borderRadius: "8px",
            height: "calc(100vh - 90px)",
          }}
        >
          <CardHeader
            title="Brands"
            action={
              <Button
                variant="contained"
                startIcon={!isAddOpen ? <AddIcon /> : <TaskAltIcon />}
                onClick={() => handleAddBtn()}
              >
                {!isAddOpen ? "Add Brand" : "Save Brand"}
              </Button>
            }
          ></CardHeader>
          {data ? (
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
                                  <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e) =>
                                      handleInputChange(e, "name")
                                    }
                                    defaultValue={defaultName}
                                    className='brandTxtField'
                                  />
                                </td>
                                <td>
                                  <TextField
                                    margin="dense"
                                    id="name"
                                    label="Description"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    defaultValue={defaultDescription}
                                    onChange={(e) =>
                                      handleInputChange(e, "description")
                                    }
                                    className='brandTxtField'
                                  />
                                </td>
                                <td className="admin-actions">
                                  <a onClick={() => handleUpdateBtn(item.id)}>
                                    <CheckCircleSharpIcon
                                      style={{ marginRight: "10px", marginTop: '10px' }}
                                    />
                                  </a>
                                  <a onClick={() => undoEditAction(i)}>
                                    <DeleteIcon className="brandDelete" />
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
                                    <ModeEditIcon style={{ marginTop: '5px' }}/>
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
                          <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            placeholder="Enter the brand name"
                            onChange={(e) => handleInputChange(e, "name")}
                            className='brandTxtField'
                          />
                        </td>
                        <td>
                          <TextField
                            margin="dense"
                            id="name"
                            type="text"
                            label="Description"
                            fullWidth
                            variant="outlined"
                            placeholder="Enter the description"
                            onChange={(e) =>
                              handleInputChange(e, "description")
                            }
                            className='brandTxtField'
                          />
                        </td>
                        <td onClick={() => handleDeleteIcon()}>
                          <DeleteIcon className="brandDelete" />
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
            <><h2>No Brand Found</h2></>
          )}
        </Card>
      </UserLayout>
    </>
  );
};

export default Brand;
