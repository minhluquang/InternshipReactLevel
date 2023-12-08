import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

import { deleteUser } from "../services/UserService";

const ModalDeleteUser = (props) => {
  const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } =
    props;

  const confirmDelete = async () => {
    const res = await deleteUser();
    if (res && +res.statusCode === 204) {
      handleDeleteUserFromModal(dataUserDelete);
      toast.success("Delete user is succeed!");
      handleClose();
    } else {
      toast.error("An error when delete user");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This action can't be undone! Do you want to delete this user ?
          <br />
          <b>email = "{dataUserDelete.email}"</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
