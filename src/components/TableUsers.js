import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import { fetchAllUser } from "../services/UserService";

const TableUsers = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Call apis
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await fetchAllUser();
    if (res && res.data) {
      setUserList(res.data);
    }
  };

  return (
    <div>
      <Table striped bordered hover variant="white">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First name</th>
            <th>Last name</th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            userList.length > 0 &&
            userList.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default TableUsers;
