import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import logoApp from "../assets/images/logo192.png";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const { user, logout } = useContext(UserContext);

  const navigate = useNavigate();

  const [isShowDropdown, setIsShowDropdown] = useState(false);

  const handleShowDropdown = () => {
    setIsShowDropdown(true);
  };

  const handleHideDropdown = () => {
    setIsShowDropdown(false);
  };

  const handleLogout = () => {
    logout();
    toast.success("Log out success!");
    navigate("/");
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logoApp}
              width="30"
              height="30"
              alt="Logo app"
              className="me-2"
            />
            <span>Internship ReactJS</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {user && window.location.pathname !== "/login" && (
              <>
                <Nav className="me-auto">
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                  <NavLink to="/users" className="nav-link">
                    Manage users
                  </NavLink>
                </Nav>
                <Nav>
                  {user && user.email && (
                    <span className="nav-link">Welcome {user.email}</span>
                  )}
                  <NavDropdown
                    title="Setting"
                    id="basic-nav-dropdown"
                    show={isShowDropdown}
                    onMouseEnter={handleShowDropdown}
                    onMouseLeave={handleHideDropdown}
                  >
                    {user && user.auth === true ? (
                      <NavDropdown.Item
                        className="dropdown-item"
                        onClick={handleLogout}
                      >
                        Logout
                      </NavDropdown.Item>
                    ) : (
                      <NavLink
                        to="/login"
                        className="dropdown-item"
                        onClick={handleHideDropdown}
                      >
                        Login
                      </NavLink>
                    )}
                  </NavDropdown>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
