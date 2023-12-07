import { useState } from "react";

import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";
import ModalAddNew from "./components/ModalAddNew";

import "./App.scss";

function App() {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  const handleClose = () => {
    setIsShowModalAddNew(false);
  };

  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className="my-3 d-flex justify-content-between">
          <b>List users:</b>
          <button
            className="btn btn-success"
            onClick={() => setIsShowModalAddNew(true)}
          >
            Add new user
          </button>
        </div>

        <TableUsers />
      </Container>

      <ModalAddNew show={isShowModalAddNew} handleClose={handleClose} />
    </div>
  );
}

export default App;
