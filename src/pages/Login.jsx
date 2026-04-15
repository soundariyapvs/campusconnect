import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import api from '../api/axiosConfig';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/login', { email, password });
      
      let result = response.data;
      if (typeof response.data === 'string') {
        result = JSON.parse(response.data);
      }
      
      if (result.token) {
        localStorage.setItem('token', result.token);
        navigate('/dashboard');
      } else {
        setError('Login failed: Token not found');
      }
    } catch (err) {
      setError(err.response?.data || 'An error occurred during login');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5} xl={4}>
          <div className="glass-panel p-4 p-md-5">
            <div className="text-center mb-4">
              <FaUserCircle size={60} color="var(--primary)" className="mb-3" />
              <h2 className="mb-1">Welcome Back</h2>
              <p className="text-muted">Sign in to Campus Connect</p>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="fw-medium text-muted small">University Email</Form.Label>
                <Form.Control type="email" placeholder="student@university.edu" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label className="fw-medium text-muted small">Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mb-3 py-2 btn-primary">
                Sign In
              </Button>
            </Form>
            
            <div className="text-center mt-3">
              <span className="text-muted">New here? </span>
              <Link to="/register" style={{ color: 'var(--secondary)', fontWeight: 600, textDecoration: 'none' }}>
                Create an Account
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
