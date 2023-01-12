import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserLayout from "../../layout/User";
import {
  useGetAllBrandQuery,
  useCreateBrandMutation,
  useUpdateBrandDetailMutation,
} from "../../services/admin";
import { Input, notification } from "antd";
import { EditTwoTone, DeleteTwoTone, CheckCircleTwoTone } from '@ant-design/icons';

const Brand = () => {
  const { data, error, isLoading, refetch } = useGetAllBrandQuery();
  const [createBrand] = useCreateBrandMutation();
  const [updateBrandDetail] = useUpdateBrandDetailMutation();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [isEditableIndex, setIsEditableIndex] = useState(null);
  const [defaultName, setDefaultName] = useState("");
  const [defaultDescription, setDefaultDescription] = useState("");
  console.log("🚀 ~ file: Brand.js:8 ~ Brand ~ data", data);

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
        console.log(
          "🚀 ~ file: Brand.js:31 ~ handleAddBtn ~ response",
          response
        );
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

  const handleUpdateBtn = async (id) => {
    console.log("🚀 ~ file: Brand.js:92 ~ handleUpdateBtn ~ id", id);
    if (!brandName) {
      errorHandler("Error occurred", "Please enter brand name.");
    } else if (!brandDescription) {
      errorHandler("Error occurred", "Please enter the brand description.");
    } else {
      const response = await updateBrandDetail({
        id,
        name: brandName,
        description: brandDescription,
      });
      console.log(
        "🚀 ~ file: Brand.js:104 ~ handleUpdateBtn ~ response",
        response
      );

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
    }
  };

  return (
    <>
      <UserLayout>
        <div className="">
          <div className="user-management-card">
            <h3>Brand</h3>
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
                                    <a
                                      onClick={() => handleUpdateBtn(item.id)}
                                    >
                                      <CheckCircleTwoTone />
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
                            <DeleteTwoTone className="brandDelete"/>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <a
                    href="#"
                    className="brandAddIcon"
                    onClick={() => handleAddBtn()}
                  >
                    {!isAddOpen ? (
                      <i class="fa-solid fa-square-plus fa-3x"></i>
                    ) : (
                      <i class="fa-solid fa-square-check fa-3x"></i>
                    )}
                  </a>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </UserLayout>
    </>
  );
};

export default Brand;
