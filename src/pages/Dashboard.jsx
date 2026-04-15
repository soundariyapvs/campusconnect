import { Container, Row, Col, Card, Badge, Spinner, Alert } from 'react-bootstrap';
import { FaCalendarAlt, FaBullhorn, FaUsers, FaArrowRight, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const Dashboard = () => {
  const [data, setData] = useState({ events: [], announcements: [], collaborations: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [eventsRes, announcementsRes, collaborationsRes] = await Promise.all([
          api.get('/events'),
          api.get('/announcements'),
          api.get('/collaborations')
        ]);
        
        setData({
          // Keeping only the top 3 items for the dashboard summary views
          events: (eventsRes.data || []).slice(0, 3), 
          announcements: (announcementsRes.data || []).reverse().slice(0, 3), 
          collaborations: (collaborationsRes.data || []).reverse().slice(0, 3)
        });
      } catch (err) {
        setError('Failed to securely load dashboard overview. Please ensure you are logged in.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
     return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh'}}><Spinner animation="border" variant="primary" /></div>;
  }

  return (
    <Container className="py-4">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
           <h2 className="brand-text m-0">Your Campus Overview</h2>
           <p className="text-muted mt-2">Here's a snapshot of everything happening around your university.</p>
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="g-4 mb-5">
        {/* Welcome Banner */}
        <Col xs={12}>
          <div className="glass-panel p-4 position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(88,86,214,0.05) 0%, rgba(90,200,250,0.05) 100%)' }}>
            <div className="position-relative z-1 d-flex flex-column flex-md-row justify-content-between align-items-md-center">
               <div>
                 <h4 className="fw-bold m-0" style={{ color: 'var(--primary)' }}>You are officially connected.</h4>
                 <p className="text-muted m-0 mt-1">Explore upcoming events, broadcast notices, and find teammates natively.</p>
               </div>
               <div className="mt-3 mt-md-0 d-flex gap-2">
                 <Link to="/events" className="btn btn-outline-primary btn-sm fw-medium px-3 rounded-pill">Host Event</Link>
                 <Link to="/collaboration" className="btn btn-primary btn-sm fw-medium px-3 rounded-pill">Post Request</Link>
               </div>
            </div>
          </div>
        </Col>

        {/* Column 1: Announcements */}
        <Col lg={4} md={6}>
          <div className="glass-panel h-100 p-4 d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="m-0 fw-bold d-flex align-items-center"><FaBullhorn className="me-2 text-danger"/> Notices</h5>
              <Link to="/announcements" className="text-decoration-none small text-primary fw-medium px-2 py-1 bg-primary bg-opacity-10 rounded">View All</Link>
            </div>
            
            <div className="d-flex flex-column gap-3 flex-grow-1">
              {data.announcements.length === 0 ? <p className="text-muted small text-center my-auto">No recent announcements.</p> : 
                data.announcements.map((item) => (
                  <div key={item.id} className="p-3 border rounded bg-light bg-opacity-50">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                       <Badge bg="danger" className="text-white rounded-pill px-2">Notice</Badge>
                       <small className="text-muted" style={{fontSize: '0.75rem'}}>{new Date(item.createdAt).toLocaleDateString()}</small>
                    </div>
                    <p className="mb-0 small fw-medium text-truncate">{item.message}</p>
                  </div>
              ))}
            </div>
          </div>
        </Col>

        {/* Column 2: Upcoming Events */}
        <Col lg={4} md={6}>
          <div className="glass-panel h-100 p-4 d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="m-0 fw-bold d-flex align-items-center"><FaCalendarAlt className="me-2" style={{color: 'var(--secondary)'}}/> Events</h5>
              <Link to="/events" className="text-decoration-none small text-primary fw-medium px-2 py-1 bg-primary bg-opacity-10 rounded">View All</Link>
            </div>
            
            <div className="d-flex flex-column gap-3 flex-grow-1">
              {data.events.length === 0 ? <p className="text-muted small text-center my-auto">No upcoming events scheduled.</p> : 
                data.events.map((evt) => (
                  <div key={evt.id} className="p-3 border rounded bg-light bg-opacity-50 border-start border-4" style={{borderStartColor: 'var(--secondary) !important'}}>
                    <h6 className="fw-bold mb-1">{evt.title}</h6>
                    <div className="d-flex align-items-center text-muted gap-3 mt-2" style={{fontSize: '0.75rem'}}>
                      <span><FaClock className="me-1"/> {new Date(evt.eventDate).toLocaleDateString()}</span>
                      <span><FaMapMarkerAlt className="me-1"/> Main Campus</span>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </Col>

        {/* Column 3: Collaboration */}
        <Col lg={4} md={12}>
          <div className="glass-panel h-100 p-4 d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="m-0 fw-bold d-flex align-items-center"><FaUsers className="me-2 text-primary"/> Network</h5>
              <Link to="/collaboration" className="text-decoration-none small text-primary fw-medium px-2 py-1 bg-primary bg-opacity-10 rounded">View All</Link>
            </div>
            
            <div className="d-flex flex-column gap-3 flex-grow-1">
              {data.collaborations.length === 0 ? <p className="text-muted small text-center my-auto">No collaboration requests.</p> : 
                data.collaborations.map((collab) => (
                  <div key={collab.id} className="p-3 border rounded bg-light bg-opacity-50">
                    <h6 className="fw-bold small m-0 text-muted mb-1">{collab.user?.name || "Anonymous Student"}</h6>
                    <p className="mb-0 small fw-medium" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>"{collab.content}"</p>
                  </div>
              ))}
            </div>
          </div>
        </Col>

      </Row>
    </Container>
  );
};

export default Dashboard;
