import React, { useState } from "react";
import UserLayout from "../../layout/User";
import { useGetAllUserQuery } from "../../services/admin";
import { Card, CardHeader } from "@mui/material";

const AdminDashboard = (props) => {
  const { data, error, isLoading } = useGetAllUserQuery({
    limit: 10,
    offset: 0,
  });

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
          <CardHeader title="Dashboard"></CardHeader>
          {error ? (
            <>Oh no, there was an error</>
          ) : isLoading ? (
            <>Loading...</>
          ) : data ? (
            <>
              <h5>
                {data?.data?.totalCount ? data?.data?.totalCount : 0} records
                found
              </h5>
              <table>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                </tr>
                {data?.data &&
                  data?.data?.rows?.length > 0 &&
                  data?.data?.rows.map((item) => (
                    <tr>
                      <td>
                        {item.first_name} {item.last_name}
                      </td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                    </tr>
                  ))}
              </table>
            </>
          ) : null}
        </Card>
      </UserLayout>
    </>
  );
};

export default AdminDashboard;
