import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaCalendarPlus, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form state
  const [title, setTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [description, setDescription] = useState('');

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await api.get('/events');
      setEvents(response.data);
      setError('');
    } catch (err) {
      setError('Failed to safely fetch events from the server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/events', { 
        title, 
        eventDate, 
        description 
      });
      setTitle('');
      setEventDate('');
      setDescription('');
      fetchEvents(); // Refresh feed
    } catch (err) {
      setError('An error occurred while creating the event.');
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4 brand-text">Campus Events</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row className="g-4">
        {/* Event List */}
        <Col lg={8}>
          {loading ? (
             <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
          ) : events.length === 0 ? (
             <div className="text-center text-muted py-5 glass-panel">No events officially scheduled yet. Why not host one?</div>
          ) : (
            <Row className="g-4">
              {events.map((evt) => (
                <Col md={6} key={evt.id}>
                  <Card className="glass-panel border-0 h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between mb-3">
                        <span className="badge bg-primary bg-gradient px-2 py-1 rounded-pill">Upcoming</span>
                        <small className="text-muted fw-medium"><FaClock className="me-1 text-primary"/> 
                          {new Date(evt.eventDate).toLocaleDateString()}
                        </small>
                      </div>
                      <Card.Title className="fw-bold">{evt.title}</Card.Title>
                      <Card.Text className="text-muted small mb-3">
                        {evt.description}
                      </Card.Text>
                      <div className="text-muted small fw-medium"><FaMapMarkerAlt className="me-1 text-secondary"/> Main Campus</div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>

        {/* Create Event Form */}
        <Col lg={4}>
          <div className="glass-panel p-4 position-sticky" style={{ top: '100px' }}>
            <h4 className="mb-4 d-flex align-items-center"><FaCalendarPlus className="me-2 text-primary"/> Host Event</h4>
            <Form onSubmit={handleCreateEvent}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Event Title</Form.Label>
                <Form.Control type="text" placeholder="Algorithm Workshop" required value={title} onChange={(e) => setTitle(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Date & Time</Form.Label>
                <Form.Control type="datetime-local" required value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-muted">Description</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="What is this event about?" required value={description} onChange={(e) => setDescription(e.target.value)} />
              </Form.Group>
              <Button type="submit" className="btn-primary w-100 py-2">Create Event</Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Events;
