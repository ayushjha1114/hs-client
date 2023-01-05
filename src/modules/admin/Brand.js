import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import UserLayout from "../../layout/User";

const Brand = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState('');
  const [statusColor, setStatusColor] = useState('');
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const error = '';
  const isLoading  = false;
  const data = {
      data: {
          totalCount: 5,
          rows: [{
                  name: 'Dell', 
                  description: 'something...',
              }
          ]
      }
  }

  const handlePriority = (priority) => {
    handleClose();
  };

  const handleStatus = (status, color) => {
    setStatus(status);
    setStatusColor(color);
    handleClose();
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
                                        {data?.data && data?.data?.rows?.length > 0 && data.data.rows.map((item, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{item.name}</td>
                                                    <td>{item.description}</td>
                                                    <td  className='admin-actions'>
                                                        <button 
                                                            className="user-mngt-edit-btn" 
                                                            type="button"
                                                            // onClick={() => handleEditBtn(item.mobile)}
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : <></>}
                </div>
            </div>
            </UserLayout>
        </>
	)
}

export default Brand;
