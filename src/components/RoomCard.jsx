import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaBed, FaUsers, FaHome, FaCrown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/RoomCard.css';

const RoomCard = () => {
  const navigate = useNavigate();

  const rooms = [
    { name: "Single Room", type: "single", icon: <FaBed size={50} />, description: "Perfect for individuals looking for a cozy and private space." },
    { name: "Double Room", type: "double", icon: <FaUsers size={50} />, description: "Ideal for sharing with friends or family" },
    { name: "PG", type: "pg", icon: <FaHome size={50} />, description: "Affordable living for students & working professionals." },
    { name: "Luxurious Room", type: "luxurious", icon: <FaCrown size={50} />, description: "Experience the epitome of luxury and comfort." }
  ];

  const handleCardClick = (type) => {
    navigate(`/roomlist?type=${type}`);
  };

  return (
    <div className="room-cards-container">
      <Row>
        {rooms.map((room, index) => (
          <Col md={3} key={index} className="mb-4">
            <Card className="text-center" onClick={() => handleCardClick(room.type)}>
              <Card.Body>
                <div className="icon-container mb-3">{room.icon}</div>
                <Card.Title>{room.name}</Card.Title>
                <Card.Text>{room.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RoomCard;
