import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import utmlogo from "../assets/utm-logo.svg";
import { logout } from "../actions/auth";
import { Button, Nav, Navbar, Container, Offcanvas } from "react-bootstrap";
import {
  Boxes,
} from "lucide-react";

const SideMenu = ({ logout, isAuthenticated, user }) => {
  const navigate = useNavigate();

  const logout_user = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      {isAuthenticated && (
        <Navbar sticky="top" key={false} expand={false} className="bg-body">
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
            <Navbar.Brand href="#">
              <img src={utmlogo} alt="logo" height={50} />
            </Navbar.Brand>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${false}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                  <h4>{user?.username}</h4>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="d-flex flex-column justify-content-between">
                
                  <Nav className="justify-content-start flex-grow-1 sidebar">


                    <Nav.Link href="/equipment-list">
                      <Boxes size={30} className="link-icon" />
                      <h5>Equipments</h5>
                    </Nav.Link>

                  </Nav>
                
                <Button className="w-25 mx-auto" variant="outline-dark" onClick={logout_user}>
                  Logout
                </Button>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(SideMenu);
