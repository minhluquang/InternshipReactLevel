import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";

import { fetchAllUser } from "../services/UserService";

const TableUsers = () => {
  const [userList, setUserList] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  const handleClose = () => {
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

      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateUser={handleUpdateUser}
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
