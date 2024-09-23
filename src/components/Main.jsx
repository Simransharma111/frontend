import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { Carousel, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Main.css";

const Main = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const navigate = useNavigate(); // Initialize navigate

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleFocus = () => {
    setPaused(true);
  };

  const handleBlur = () => {
    setPaused(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/roomlist?near=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={paused ? null : 3000}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/assets/slide2.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <div className="search-bar-container">
            <Form className="justify-content-center" onSubmit={handleSearch}>
              <Form.Control
                type="text"
                placeholder="Search"
                className="mr-sm-2 search-input"
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="outline-light">Search</Button>
            </Form>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/assets/slide3.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <div className="search-bar-container">
            <Form className="justify-content-center" onSubmit={handleSearch}>
              <Form.Control
                type="text"
                placeholder="Search"
                className="mr-sm-2 search-input"
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="outline-light">Search</Button>
            </Form>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/assets/slide2.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <div className="search-bar-container">
            <Form className="justify-content-center" onSubmit={handleSearch}>
              <Form.Control
                type="text"
                placeholder="Search"
                className="mr-sm-2 search-input"
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="btn" type="submit" variant="outline-light">Search</Button>
            </Form>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Main;
