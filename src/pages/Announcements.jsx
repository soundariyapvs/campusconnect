import { Container, Card, Badge, Alert, Spinner, Form, Button } from 'react-bootstrap';
import { FaBullhorn } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [message, setMessage] = useState('');

  const fetchAnnouncements = async () => {
    try {
      const response = await api.get('/announcements');
      // Reverse array to show newest at the top
      setAnnouncements(response.data.reverse());
    } catch (err) {
      setError('Failed to load announcements from the server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);
  
  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      await api.post('/announcements', { message });
      setMessage('');
      fetchAnnouncements();
    } catch (err) {
      setError('Failed to broadcast announcement.');
    }
  }

  return (
    <Container className="py-4" style={{ maxWidth: '800px' }}>
      <div className="d-flex align-items-center mb-4">
        <FaBullhorn size={28} className="text-primary me-3" />
        <h2 className="mb-0 brand-text">Official Announcements</h2>
      </div>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <div className="glass-panel p-3 mb-5">
         <Form onSubmit={handleCreateAnnouncement} className="d-flex gap-2">
            <Form.Control type="text" placeholder="Broadcast a new campus announcement..." required value={message} onChange={(e) => setMessage(e.target.value)}/>
            <Button type="submit" variant="primary" className="btn-primary fw-medium px-4">Post</Button>
         </Form>
      </div>
      
      {loading ? (
         <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
      ) : announcements.length === 0 ? (
         <div className="text-center text-muted py-4">No recent official broadcasts.</div>
      ) : (
        <div className="d-flex flex-column gap-4">
          {announcements.map((item) => (
            <Card key={item.id} className="glass-panel border-0 position-relative overflow-hidden">
              <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'var(--bg-gradient)', opacity: 0.1, zIndex: 0 }}></div>
              <Card.Body className="p-4" style={{ zIndex: 1 }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Badge bg="danger" className="bg-gradient rounded-pill px-3 py-2">Notice</Badge>
                  <small className="text-muted fw-medium">
                     {new Date(item.createdAt).toLocaleString()}
                  </small>
                </div>
                <Card.Text className="text-muted fs-5 fw-medium" style={{ lineHeight: '1.6', color: 'var(--text-main) !important' }}>
                  {item.message}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};
export default Announcements;
