import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import _ from "lodash";
import { debounce } from "lodash";
import { CSVLink, CSVDownload } from "react-csv";

import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";

import { fetchAllUser } from "../services/UserService";
import ModalDeleteUser from "./ModalDeleteUser";

const TableUsers = () => {
  const [userList, setUserList] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});

  const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});

  const [sortBy, setSortBy] = useState("acs");
  const [sortField, setSortField] = useState("id");

  const handleClose = () => {
    setIsShowModalEditUser(false);
    setIsShowModalAddNew(false);
    setIsShowModalDeleteUser(false);
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

  const handleDeleteUser = (user) => {
    setDataUserDelete(user);
  };

  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(userList);
    cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
    setUserList(cloneListUsers);
  };

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneListUsers = _.cloneDeep(userList);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    setUserList(cloneListUsers);
  };

  const handleSearch = debounce((event) => {
    let term = event.target.value;
    if (term) {
      let cloneListUsers = _.cloneDeep(userList);
      cloneListUsers = cloneListUsers.filter((item) =>
        item.email.includes(term)
      );
      setUserList(cloneListUsers);
    } else {
      getUsers(1);
    }
  }, 500);

  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"],
  ];

  return (
    <>
      <div className="my-3 d-flex justify-content-between">
        <b>List users:</b>
        <div className="d-flex justify-content-center gap-3">
          <label htmlFor="importFile" className="btn btn-warning text-white">
            <i class="fa-solid fa-file-import"></i> Import
          </label>
          <input type="file" id="importFile" hidden/>
          <CSVLink
            data={csvData}
            filename={"my-file.csv"}
            className="btn btn-primary"
          >
            <i class="fa-solid fa-file-export"></i> Export
          </CSVLink>
          <button
            className="btn btn-success"
            onClick={() => setIsShowModalAddNew(true)}
          >
            <i className="fa-solid fa-user-plus"></i> Add new user
          </button>
        </div>
      </div>
      <div className="col-4 my-3">
        <input
          className="form-control"
          placeholder="Search user by email..."
          onChange={(event) => {
            handleSearch(event);
          }}
        />
      </div>
      <div>
        <Table striped bordered hover variant="white">
          <thead>
            <tr>
              <th>
                <div className="d-flex justify-content-between">
                  <span>ID</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long btn"
                      onClick={() => {
                        handleSort("desc", "id");
                      }}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long btn"
                      onClick={() => {
                        handleSort("asc", "id");
                      }}
                    ></i>
                  </span>
                </div>
              </th>
              <th>Email</th>
              <th>
                <div className="d-flex justify-content-between">
                  <span>First name</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long btn"
                      onClick={() => {
                        handleSort("desc", "first_name");
                      }}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long btn"
                      onClick={() => {
                        handleSort("asc", "first_name");
                      }}
                    ></i>
                  </span>
                </div>
              </th>
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
                      <button
                        className="btn btn-danger ms-3"
                        onClick={() => {
                          setIsShowModalDeleteUser(true);
                          handleDeleteUser(item);
                        }}
                      >
                        Delete
                      </button>
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
        dataUserEdit={dataUserEdit}
        handleEditUserFromModal={handleEditUserFromModal}
      />

      <ModalDeleteUser
        show={isShowModalDeleteUser}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
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
