import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Tag } from 'antd';
import UserLayout from "../../layout/User";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Check from '@mui/icons-material/Check';
import Divider from '@mui/material/Divider';
import TicketModal from "./TicketModal";

const Tickets = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState('');
  const [statusColor, setStatusColor] = useState('');
  const [ticketModalShow, setTicketModalShow] = useState(false);

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
                  name: 'ayush', 
                  service: 'shipped',
                  engineer: 'ddd',
                  status: 'open',
                  last_message: '2 min ago',
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

  const handleNewTicketBtn = () => {
    setTicketModalShow(true);
  };

	return (
        <>
            <UserLayout>
            <div className="">
                <div className="user-management-card">
                  <div className="ticket-heading">
                    <h3>Tickets</h3>
                    <Button 
                      className="new-ticket-btn" 
                      type="primary" 
                      ghost
                      onClick={() => handleNewTicketBtn()}
                    >
                      New Ticket
                    </Button>
                  </div>
                    {error ? (
                        <>Oh no, there was an error</>
                        ) : isLoading ? (
                        <>Loading...</>
                        ) : data ? (
                            <>
                            <h5>{data?.data?.totalCount ? data?.data?.totalCount : 0} tickets</h5>
                            <div className="user-management-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Service</th>
                                            <th>Engineer</th>
                                            <th>Status</th>
                                            <th>Last message</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.data && data?.data?.rows?.length > 0 && data.data.rows.map((item, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{item.name}</td>
                                                    <td>{item.service}</td>
                                                    <td>{item.engineer}</td>
                                                    <td><Tag color={statusColor ? statusColor: 'green' }>{status ? status : item.status}</Tag></td>
                                                    <td>{item.last_message}</td>
                                                    <td>
                                                      <a onClick={handleClick}>
                                                        <i class="fa-solid fa-ellipsis"></i>
                                                      </a>
                                                      <Menu
                                                        id="basic-menu"
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleClose}
                                                        MenuListProps={{
                                                          'aria-labelledby': 'basic-button',
                                                        }}
                                                      >
                                                        <MenuItem onClick={() => handlePriority('open')}>
                                                          Set priority to Urgent
                                                        </MenuItem>
                                                        <MenuItem onClick={() => handlePriority('open')}>
                                                          Set priority to High
                                                        </MenuItem>
                                                        <MenuItem onClick={() => handlePriority('open')}>
                                                          Set priority to Medium
                                                        </MenuItem>
                                                        <MenuItem>
                                                          <ListItemIcon>
                                                            <Check />
                                                          </ListItemIcon>
                                                          Set priority to Low
                                                        </MenuItem>
                                                        <Divider />
                                                        <MenuItem onClick={() => handleStatus('Open', 'green')}>
                                                          Set as Open
                                                        </MenuItem>
                                                        <MenuItem onClick={() => handleStatus('Pending', 'blue')}>
                                                          Set as Pending
                                                        </MenuItem>
                                                        <MenuItem onClick={() => handleStatus('On Hold', 'orange')}>
                                                          Set as On hold
                                                        </MenuItem>
                                                        <MenuItem onClick={() => handleStatus('Closed', 'red')}>
                                                          <ListItemIcon>
                                                            <Check />
                                                          </ListItemIcon>
                                                          Set as Closed
                                                        </MenuItem>
                                                      </Menu>
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
            <TicketModal
              show={ticketModalShow}
              onHide={() => setTicketModalShow(false)}
            />
            </UserLayout>
        </>
	)
}

export default Tickets;
