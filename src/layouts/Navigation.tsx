import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        {/* Site Logo */}
        <Navbar.Brand href="/">
          <img
            src="path_to_logo.png" 
            alt="Site Logo"
            style={{ height: "40px" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#how-it-works">How it Works</Nav.Link>
            <Nav.Link href="#solution">Solution</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>

          {/* Pay Now Button */}
          <Button variant="primary" className="ms-3">
            Pay Now
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
