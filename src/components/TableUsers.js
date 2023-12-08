import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import _ from "lodash";

import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";

import { fetchAllUser } from "../services/UserService";

const TableUsers = () => {
  const [userList, setUserList] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});

  const handleClose = () => {
    setIsShowModalEditUser(false);
    setIsShowModalAddNew(false);
  };

  useEffect(() => {
    // Call apis
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    const res = await fetchAllUser(page);
    if (res && res.data) {
      setUserList(res.data);
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
    }
  };

  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };

  const handleUpdateUser = (user) => {
    setUserList([user, ...userList]);
  };

  const handleEditUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(userList);
    let index = userList.findIndex((item) => item.id === user.id);
    cloneListUsers[index].first_name = user.first_name;
    setUserList(cloneListUsers);
  };

  return (
    <>
      <div className="my-3 d-flex justify-content-between">
        <b>List users:</b>
        <button
          className="btn btn-success"
          onClick={() => setIsShowModalAddNew(true)}
        >
          Add new user
        </button>
      </div>
      <div>
        <Table striped bordered hover variant="white">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Actions</th>
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
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          setIsShowModalEditUser(true);
                          setDataUserEdit(item);
                        }}
                      >
                        Edit
                      </button>
                      <button className="btn btn-danger ms-3">Delete</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>

      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateUser={handleUpdateUser}
      />

      <ModalEditUser
        show={isShowModalEditUser}
        handleClose={handleClose}
        handleEditUserFromModal={handleEditUserFromModal}
        dataUserEdit={dataUserEdit}
      />

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </>
  );
};

export default TableUsers;
