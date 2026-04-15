import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaUserCircle, FaPaperPlane, FaCode, FaPaintBrush, FaVideo } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const Collaboration = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [content, setContent] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/collaborations');
      setPosts(response.data.reverse()); // Latest first
      setError('');
    } catch (err) {
      setError('Failed to safely fetch collaboration requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setError('');
    try {
      await api.post('/collaborations', { content });
      setContent('');
      fetchPosts(); // Refresh board
    } catch (err) {
      setError('An error occurred while posting your request.');
    }
  };

  return (
    <Container className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
           <h2 className="brand-text m-0">Student Collaboration</h2>
           <p className="text-muted mt-2">Find teammates, offer your skills, or team up for hackathons.</p>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="g-4">
        {/* Collaboration Feed */}
        <Col lg={8}>
          {loading ? (
             <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
          ) : posts.length === 0 ? (
             <div className="text-center text-muted py-5 glass-panel">No collaboration posts found. Be the first to start a project!</div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {posts.map((post) => (
                <Card key={post.id} className="glass-panel border-0 mb-2">
                  <Card.Body className="p-4">
                    <div className="d-flex mb-3 align-items-center">
                      <FaUserCircle size={40} className="text-secondary me-3" />
                      <div>
                        {/* If user relationship isn't mapped, default it until backend links it securely */}
                        <h6 className="m-0 fw-bold">{post.user?.name || "Campus Connect Student"}</h6>
                        <small className="text-muted">{new Date(post.createdAt || Date.now()).toLocaleString()}</small>
                      </div>
                    </div>
                    <Card.Text className="fs-6 lh-lg text-muted">
                      {post.content}
                    </Card.Text>
                    <div className="d-flex gap-2 mt-3">
                      <BadgePill icon={<FaCode />} text="Development" />
                      <BadgePill icon={<FaPaintBrush />} text="Design" />
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Col>

        {/* Post Collaboration Form */}
        <Col lg={4}>
          <div className="glass-panel p-4 position-sticky" style={{ top: '100px' }}>
            <h5 className="mb-3 fw-bold">Looking for teammates?</h5>
            <Form onSubmit={handleCreatePost}>
              <Form.Group className="mb-3">
                <Form.Control 
                   as="textarea" 
                   rows={5} 
                   placeholder="E.g. I'm a React dev looking for a backend student to build a hackathon project this weekend!" 
                   required
                   value={content}
                   onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="btn-primary w-100 py-2 d-flex align-items-center justify-content-center">
                <FaPaperPlane className="me-2"/> Post Request
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

// Helper tiny component for tags
const BadgePill = ({ icon, text }) => (
  <span className="badge bg-light text-dark border px-2 py-1 d-flex align-items-center rounded-pill">
    <span className="text-primary me-1 d-flex">{icon}</span> {text}
  </span>
);

export default Collaboration;
