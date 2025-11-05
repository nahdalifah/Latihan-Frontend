import React from 'react';
import { Navbar as BSNavbar, Container, Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <BSNavbar bg="primary" variant="dark" expand="lg" className="shadow-sm mb-4">
      <Container>
        <BSNavbar.Brand
          href="/dashboard"
          className="fw-bold"
          style={{ fontSize: '1.5rem', letterSpacing: '1px' }}
        >
          📝 Latihan Frontend
        </BSNavbar.Brand>
        <Nav className="ms-auto">
          <Button
            variant="light"
            size="sm"
            className="d-flex align-items-center"
            onClick={handleLogout}
            style={{ fontWeight: 'bold' }}
          >
            <FaSignOutAlt className="me-1" /> Logout
          </Button>
        </Nav>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;