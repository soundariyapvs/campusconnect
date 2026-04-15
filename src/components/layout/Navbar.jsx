import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';

const MainNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="glass-nav fixed-top" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 brand-text">
          <FaGraduationCap size={28} color="var(--primary)" />
          Campus Connect
        </Navbar.Brand>
        {!isAuthPage && (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto fw-medium">
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/events">Events</Nav.Link>
                <Nav.Link as={Link} to="/announcements">Announcements</Nav.Link>
                <Nav.Link as={Link} to="/collaboration">Collaboration</Nav.Link>
                <Nav.Link as="button" onClick={handleLogout} className="text-danger ms-lg-3 border-0 bg-transparent text-start fw-medium pt-2">Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
