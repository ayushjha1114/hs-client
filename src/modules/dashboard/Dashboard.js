import React, { useEffect, useReducer, useState, useRef } from 'react';
import { connect } from 'react-redux';
import './Dashboard.css';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import UserLayout from '../../layout/User';


let Dashboard = (props) => {

  const { width } = useWindowDimensions();

  const totalCount = 100;

  return (
    <>
      {width > 767 ?
        <UserLayout>
          <div className="distributor-main-page">
          <div className="distributor-info-block">
              Hi there
          </div>

          <div className="card">
            <div className="card-row">
              <div className="card-row-col">
                <h3>Heading</h3>
                <h5>{totalCount} records found</h5>
              </div>
              </div>

            </div>
        </div>
        </UserLayout>
        :
        <></>
      }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const ConnectDashboard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

export default ConnectDashboard;
