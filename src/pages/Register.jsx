import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import { useState } from 'react';
import api from '../api/axiosConfig';

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    const name = `${firstName} ${lastName}`.trim();
    try {
      await api.post('/auth/register', { name, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || 'An error occurred during registration');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Row className="w-100 justify-content-center">
        <Col md={7} lg={6} xl={5}>
          <div className="glass-panel p-4 p-md-5">
            <div className="text-center mb-4">
              <FaUserPlus size={50} color="var(--secondary)" className="mb-3" />
              <h2 className="mb-1">Join the Campus</h2>
              <p className="text-muted">Create your Campus Connect account</p>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleRegister}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium text-muted small">First Name</Form.Label>
                    <Form.Control type="text" placeholder="John" required value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium text-muted small">Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Doe" required value={lastName} onChange={(e)=>setLastName(e.target.value)} />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label className="fw-medium text-muted small">University Email</Form.Label>
                <Form.Control type="email" placeholder="student@university.edu" required value={email} onChange={(e)=>setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-medium text-muted small">Password</Form.Label>
                <Form.Control type="password" placeholder="Create a strong password" required value={password} onChange={(e)=>setPassword(e.target.value)} />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mb-3 py-2 btn-primary">
                Sign Up
              </Button>
            </Form>
            
            <div className="text-center mt-3">
              <span className="text-muted">Already have an account? </span>
              <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
                Sign In
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
