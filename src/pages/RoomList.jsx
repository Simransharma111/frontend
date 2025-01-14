import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Card, Carousel, Col, Row, Container, Form, Button } from 'react-bootstrap';
import Modal from 'react-modal';
import '../styles/RoomList.css';

Modal.setAppElement('#root');

const RoomList = () => {
  const location = useLocation();
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalStyle, setModalStyle] = useState({});
  const [filters, setFilters] = useState({
    near: '',
    minRent: '',
    maxRent: ''
  });

  // Extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const selectedRoomType = queryParams.get('type') || '';
  const nearQuery = queryParams.get('near') || '';

  // Fetch rooms from API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        let url = 'https://backendofroomrent.onrender.com/api/rent-card';
        if (selectedRoomType) {
          url += `?type=${selectedRoomType}`;
        }
        const res = await axios.get(url);
        setRooms(res.data);
        applyFilters(res.data); // Apply filters once rooms are fetched
      } catch (err) {
        console.error('Error fetching rooms:', err);
      }
    };

    fetchRooms();
  }, [selectedRoomType]);

  // Define applyFilters function
  const applyFilters = (data) => {
    const { near, minRent, maxRent } = filters;

    const filtered = data.filter(room => {
      const nearMatch = room.near.toLowerCase().includes(near.toLowerCase());
      
      // Handle rent range filtering for both single and double room ranges
      const rentMatch = (
        (minRent === '' || (room.singleRoomRange && parseInt(room.singleRoomRange) >= parseInt(minRent)) || 
                          (room.doubleRoomRange && parseInt(room.doubleRoomRange) >= parseInt(minRent))) &&
        (maxRent === '' || (room.singleRoomRange && parseInt(room.singleRoomRange) <= parseInt(maxRent)) || 
                          (room.doubleRoomRange && parseInt(room.doubleRoomRange) <= parseInt(maxRent)))
      );

      const typeMatch = selectedRoomType ? room.typeOfRooms.includes(selectedRoomType) : true;

      return nearMatch && rentMatch && typeMatch && room.currentlyAvailable;
    });

    setFilteredRooms(filtered);
  };

  // Apply filters when rooms or filter criteria change
  useEffect(() => {
    applyFilters(rooms);
  }, [rooms, filters]);

  // Update filters based on query parameters
  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      near: nearQuery
    }));
  }, [nearQuery]);
  const handleShowDetails = (room, event) => {
    const cardRect = event.currentTarget.getBoundingClientRect();
    const modalWidth = 500;
    const modalHeight = 600;

    let top = cardRect.top + window.scrollY;
    let left = cardRect.left + window.scrollX;

    top -= modalHeight / 2;
    const rightPadding = 20;
    if (left + modalWidth + rightPadding > window.innerWidth) {
      left = window.innerWidth - modalWidth - rightPadding;
    }
    if (left < 20) {
      left = 20;
    }
    if (top < 20) {
      top = 20;
    }

    setSelectedRoom(room);
    setModalStyle({
      top: `${top}px`,
      left: `${left}px`,
      transform: 'translate(0, 0)',
      position: 'absolute',
      width: `${modalWidth}px`,
      height: `${modalHeight}px`,
      zIndex: 1000,
      margin: '10px',
    });
  };

  const handleCloseModal = () => {
    setSelectedRoom(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  useEffect(() => {
    applyFilters(rooms);
  }, [filters, selectedRoomType]);

  return (
    <Container>
      <Row className="mb-4">
        <Col md={12}>
          <Form>
            <Form.Group controlId="filterNear">
              <Form.Label>Near</Form.Label>
              <Form.Control
                type="text"
                name="near"
                value={filters.near}
                onChange={handleFilterChange}
                placeholder="Enter area..."
              />
            </Form.Group>
            <Form.Group controlId="filterMinRent">
              <Form.Label>Min Rent</Form.Label>
              <Form.Control
                type="number"
                name="minRent"
                value={filters.minRent}
                onChange={handleFilterChange}
                placeholder="Enter minimum rent..."
              />
            </Form.Group>
            <Form.Group controlId="filterMaxRent">
              <Form.Label>Max Rent</Form.Label>
              <Form.Control
                type="number"
                name="maxRent"
                value={filters.maxRent}
                onChange={handleFilterChange}
                placeholder="Enter maximum rent..."
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={() => applyFilters(rooms)}
              className='filterbutton'
            >
              Apply Filters
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        {filteredRooms.length === 0 ? (
         <p className="no-data-message">
         🛑 No rooms found! 🛑<br />
         We couldn’t find any rooms that match your search. You might want to explore other categories or check back later. 🌟
       </p>
        ) : (
          filteredRooms.map((room, index) => (
            <Col key={index} sm={12} md={6} lg={4} xl={3}>
              <Card className="mb-4 room-card">
                {room.images && room.images.length > 0 ? (
                  <Carousel>
                    {room.images.map((image, imgIndex) => (
                      <Carousel.Item key={imgIndex}>
                        <img
                          src={`https://backendofroomrent.onrender.com/uploads/${image}`}
                          alt={`Room ${imgIndex + 1}`}
                          className="d-block w-100"
                          onClick={(e) => handleShowDetails(room, e)}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : (
                  <div className="no-image-placeholder">No images available</div>
                )}
                <Card.Body>
                  <Card.Title>{room.name}</Card.Title>
                  <Card.Text>
                    <strong>Type of Room:</strong> {room.typeOfRooms.join(', ')}<br />
                    {room.singleRoomRange && <><strong>Single Room Range:</strong> {room.singleRoomRange}<br /></>}
                    {room.doubleRoomRange && <><strong>Double Room Range:</strong> {room.doubleRoomRange}<br /></>}
                  </Card.Text>
                  {room.currentlyAvailable ? (
                    <Button
                      variant="success"
                      className="blinking-button available"
                      onClick={(e) => handleShowDetails(room, e)}
                    >
                      Currently Available
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      className="not-available"
                      disabled
                    >
                      Not Available
                    </Button>
                  )}
                  <Button variant="primary" onClick={(e) => handleShowDetails(room, e)} className='fulldetail'>
                    Full Detail
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {selectedRoom && (
        <Modal
          isOpen={!!selectedRoom}
          onRequestClose={handleCloseModal}
          contentLabel="Room Details"
          className="ReactModal__Content"
          overlayClassName="ReactModal__Overlay"
          style={{
            content: modalStyle,
          }}
        >
          <button className="modal-close" onClick={handleCloseModal} style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            fontSize: '20px',
            color: '#fff',
            cursor: 'pointer'
          }}>✖</button>
          <h2>{selectedRoom.name}</h2>
          {selectedRoom.images && selectedRoom.images.length > 0 && (
            <Carousel>
              {selectedRoom.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    src={`https://backendofroomrent.onrender.com/uploads/${image}`}
                    alt={`Room Image ${index + 1}`}
                    className="d-block w-100"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
          <p><strong>Mobile No:</strong> {selectedRoom.mobileNumber}</p>
          <p><strong>Type of Room:</strong> {selectedRoom.typeOfRooms.join(', ')}</p>
          <p><strong>Single Room Range:</strong> {selectedRoom.singleRoomRange}</p>
          <p><strong>Double Room Range:</strong> {selectedRoom.doubleRoomRange}</p>
          <p><strong>Facilities:</strong> {selectedRoom.facilities.join(', ')}</p>
          <p><strong>Near:</strong> {selectedRoom.near}</p>
          <p><strong>Distance From Road:</strong> {selectedRoom.distanceFromRoad}</p>
          <p><strong>Available For:</strong> {selectedRoom.availableFor}</p>
          <p><strong>Description:</strong> {selectedRoom.description}</p>
        </Modal>
      )}
    </Container>
  );
};

export default RoomList;
