import React, { useState } from "react";
import "./Dashboard.css";
import UserLayout from "../../layout/User";
import { useGetAllUserQuery } from "../../services/admin";
import RegisterUserModal from "./RegisterUserModal";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


const AdminDashboard = (props) => {
  const [registerModalShow, setRegisterModalShow] = useState(false);
  const { data, error, isLoading } = useGetAllUserQuery();
  
  const handlePlusBtn = () => {
    setRegisterModalShow(true);
    console.log("🚀 ~ file: Dashboard.js:13 ~ AdminDashboard ~ data, error, isLoading", data, error)

  }


  return (
    <>
        <UserLayout>
          <div className="">
            <div className="distributor-info-block">Hi there yo man!!!</div>

            <div className="card">
              <div className="card-row">
                <div className="card-row-col">
                  <h3>User Management</h3>
                  {error ? (
                    <>Oh no, there was an error</>
                    ) : isLoading ? (
                      <>Loading...</>
                      ) : data ? (
                        <>
                        <h5>{data.data.totalCount} records found</h5>
                        <table>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                          </tr>
                          {
                            data.data.rows.map(item => (
                              <tr>
                                <td>{item.first_name} {item.last_name}</td>
                                <td>{item.email}</td>
                                <td>{item.mobile}</td>
                              </tr>
                            ))
                          }
                        </table>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <div class="plus-btn-block">
              <Fab color="primary" aria-label="add" onClick={() => handlePlusBtn()}>
                <AddIcon />
              </Fab>
              {/* <button 
                className="plus-btn"
                onClick={() => handlePlusBtn()}
              >
                <img src="/assets/images/plus-btn.svg" alt="" />
              </button> */}
            </div>
          </div>
          <RegisterUserModal
            show={registerModalShow}
            onHide={() => setRegisterModalShow(false)}
          />
        </UserLayout>
    </>
  );
};

export default AdminDashboard;