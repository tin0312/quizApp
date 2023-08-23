import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function StartPage({ handleClick }) {
  return (
    <>
      <Container fluid className='d-flex flex-column min-vh-100'>
        <Row className='flex-grow-1 align-items-center justify-content-center'>
          <Col className='text-center col-12'>
            <h1 className='display-4 start-container--name'>Quizzical</h1>
            <p className='lead start-container--info'>Test your knowledge</p>

            <Button variant="primary" className='button' onClick={handleClick}>
              Click me
            </Button>
          </Col>
        </Row>
        <Row className='text-center'>
          <Col className='col-12'>
            <h2 className='developer'>Developed by Hoang Nhat Truong</h2>
          </Col>
        </Row>
      </Container>
    </>
  );
}
