import React, { useContext, useState } from 'react';
import { AppContext } from './App';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function Options({ handleStartQuiz, isloading }) {
  const { options, setOptions, setIsStarted } = useContext(AppContext);
  const [showMessage, setShowMessage] = useState(false);
  0;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: name === 'numberOfQuestions' ? parseInt(value) : value,
    }));
  };
  const handleShowMessage = () => {
    const isSet = Object.values(options).every((value) => value !== '');
    if (!isSet) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
      handleStartQuiz();
    }
  };
  return (
    <Form className='option-window'>
      <Form.Group as={Row} className='justify-content-center mb-3'>
        <Col>
          <h1>Options</h1>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className='justify-content-center mb-3'>
        <Col>
          <Form.Select value={options.category} name='category' id='category' onChange={handleChange}>
            <option value=''>--- Any category ---</option>
        <option value='9'>General Knowledge</option>
        <option value='10'>Entertainment: Books</option>
        <option value='11'>Entertainment: Film </option>
        <option value='12'>Entertainment: Music</option>
        <option value='13'>Entertainment: Musical & Theatres</option>
        <option value='14'>Entertainment: Television</option>
        <option value='15'>Entertainment: Video Games</option>
        <option value='16'>Entertainment: Board Games</option>
        <option value='17'>Science & Nature</option>
        <option value='18'>Science: Computers</option>
        <option value='19'>Science: Mathematics</option>
        <option value='20'>Mythology</option>
        <option value='21'>Sports</option>
        <option value='22'>Geography</option>
        <option value='23'>History</option>
        <option value='24'>Politics</option>
        <option value='25'>Art</option>
        <option value='26'>Celebrities</option>
        <option value='27'>Animals</option>
        <option value='28'>Vehicles</option>
        <option value='29'>Entertainment</option>
        <option value='30'>Science: Gadgets</option>
        <option value='31'>Entertainment: Japanese Anime & Manga</option>
        <option value='32'>Entertainment: Cartoon & Animation</option>
            </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='justify-content-center mb-3'>
            <Col>
              <Form.Select name='difficulty' id='difficulty' onChange={handleChange} value={options.difficulty}>
                <option value=''>-- Any level --</option>
        <option value='easy'>Easy</option>
        <option value='medium'>Medium</option>
        <option value='hard'>Hard</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='justify-content-center mb-3'>
            <Form.Label column htmlFor='numberOfQuestions'>
              Number of questions:
            </Form.Label>
            <Col>
              <Form.Control
                type='number'
                id='numberOfQuestions'
                name='numberOfQuestions'
                min='1'
                max='10'
                value={options.numberOfQuestions}
                onChange={handleChange}
                placeholder='1'
                style={{ textAlign: 'center' }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='justify-content-center mb-3'>
            <Col className='d-flex justify-content-center'>
              {isloading ? (
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
              ) : (
                <Button className='button' type='button' onClick={handleShowMessage} variant='primary'>
                  Start Quiz
                </Button>
              )}
            </Col>
          </Form.Group>
          {showMessage && <p className='text-center'>Please select all</p>}
        </Form>
      );
    }
    

/*

import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function OptionsForm({ options, handleChange, handleShowMessage, isloading, showMessage }) {
  return (
    <Form className='option-window'>
      <Form.Group as={Row} className='justify-content-center mb-3'>
        <Col>
          <h1>Options</h1>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className='justify-content-center mb-3'>
        <Col>
          <Form.Select value={options.category} name='category' id='category' onChange={handleChange}>
            <option value=''>--- Any category ---</option>
        <option value='9'>General Knowledge</option>
        <option value='10'>Entertainment: Books</option>
        <option value='11'>Entertainment: Film </option>
        <option value='12'>Entertainment: Music</option>
        <option value='13'>Entertainment: Musical & Theatres</option>
        <option value='14'>Entertainment: Television</option>
        <option value='15'>Entertainment: Video Games</option>
        <option value='16'>Entertainment: Board Games</option>
        <option value='17'>Science & Nature</option>
        <option value='18'>Science: Computers</option>
        <option value='19'>Science: Mathematics</option>
        <option value='20'>Mythology</option>
        <option value='21'>Sports</option>
        <option value='22'>Geography</option>
        <option value='23'>History</option>
        <option value='24'>Politics</option>
        <option value='25'>Art</option>
        <option value='26'>Celebrities</option>
        <option value='27'>Animals</option>
        <option value='28'>Vehicles</option>
        <option value='29'>Entertainment</option>
        <option value='30'>Science: Gadgets</option>
        <option value='31'>Entertainment: Japanese Anime & Manga</option>
        <option value='32'>Entertainment: Cartoon & Animation</option>
            </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='justify-content-center mb-3'>
            <Col>
              <Form.Select name='difficulty' id='difficulty' onChange={handleChange} value={options.difficulty}>
                <option value=''>-- Any level --</option>
        <option value='easy'>Easy</option>
        <option value='medium'>Medium</option>
        <option value='hard'>Hard</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='justify-content-center mb-3'>
            <Form.Label column htmlFor='numberOfQuestions'>
              Number of questions:
            </Form.Label>
            <Col>
              <Form.Control
                type='number'
                id='numberOfQuestions'
                name='numberOfQuestions'
                min='1'
                max='10'
                value={options.numberOfQuestions}
                onChange={handleChange}
                placeholder='1'
                style={{ textAlign: 'center' }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='justify-content-center mb-3'>
            <Col className='d-flex justify-content-center'>
              {isloading ? (
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
              ) : (
                <Button className='button' type='button' onClick={handleShowMessage} variant='primary'>
                  Start Quiz
                </Button>
              )}
            </Col>
          </Form.Group>
          {showMessage && <p className='text-center'>Please select all</p>}
        </Form>
      );
    }
    




*/