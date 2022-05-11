import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Event from './event';
import { generateEvents } from './generateEventData';

class MainPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
       
      };
    }

    render() {

      let row = 4;
      let col = 3;  
      let steps = [];
   
      let events = generateEvents(10);
      console.log(events);
      let eventIndex = 0;

      for(let i = 1; i <= row; i++){  

        let subarray = [];
        for(let j = 1; j <= col; j++){

          // This should be rendered in the event component
          subarray.push(
              <Col key={j}>
                <Event name={events[eventIndex].name} days={events[eventIndex].days} times={events[eventIndex].times}/>
            </Col>
          );

          eventIndex++;
          if(eventIndex === events.length) break;
        }
      
        let r = <Row key={i}>{ subarray }</Row>
        steps.push(r);

        if(eventIndex === events.length) break;
    }
      

      return (
        <Container>
          
          <h1 className='my-5'>Class Schedule Optimizer</h1>

          <h5 className='my-5'>The purpose of this site is to help you create an class schedule that minimizes the number of days you need to show up to school.</h5> 
          
          <h3>Most Desired Days</h3>

          <h5 className='my-5'>Rank the days you want to go to school with 1 being the most desirable and 7 being the least desirable.</h5>

          <Container>
            <h3 className='my-5'>Add Class</h3> 
            <Form>
              <Form.Group className="mb-3" controlId="classNameInput">
                <Form.Label>Class Name</Form.Label>
                <Form.Control placeholder="Enter class name" />
              </Form.Group>

              <Row>

                <Col>
                  <Form.Group className="mb-3" controlId="mondayInput">
                    <Form.Check type="checkbox" label="Monday" />
                  </Form.Group>
                </Col> 

                <Col>
                  <Form.Group className="mb-3" controlId="tuesdayInput">
                    <Form.Check type="checkbox" label="Tuesday" />
                  </Form.Group>
                </Col> 

                <Col>
                  <Form.Group className="mb-3" controlId="wednesdayInput">
                    <Form.Check type="checkbox" label="Wednesday" />
                  </Form.Group>
                </Col> 

                <Col>
                  <Form.Group className="mb-3" controlId="thursdayInput">
                    <Form.Check type="checkbox" label="Thursday" />
                  </Form.Group>
                </Col> 

                <Col>
                  <Form.Group className="mb-3" controlId="fridayInput">
                    <Form.Check type="checkbox" label="Friday" />
                  </Form.Group>
                </Col> 

                <Col>
                  <Form.Group className="mb-3" controlId="saturdayInput">
                    <Form.Check type="checkbox" label="Saturday" />
                  </Form.Group>
                </Col> 


                <Col>
                  <Form.Group className="mb-3" controlId="sundayInput">
                    <Form.Check type="checkbox" label="Sunday" />
                  </Form.Group>
                </Col> 


              </Row>

              <DropdownButton className='my-3' id="startTimeInput" title="Start Time">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>

              <DropdownButton className='my-3' id="endTimeInput" title="End Time">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>


              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Container>

          
          <Container>
            <h3 className='my-5'>Your Classes</h3> 

              { steps }
      
          </Container>

          
          <Container className='my-5'>
            <Button variant="primary">Optimize</Button>{' '}
            <Button variant="secondary">Clear All</Button>{' '}
          </Container> 

          <h3 className='my-5'>Your Optimize Schedule</h3> 

          <Row>
            <Col><h4>Monday</h4></Col>
            <Col><h4>Tuesday</h4></Col>
            <Col><h4>Wednesday</h4></Col>
            <Col><h4>Thursday</h4></Col>
            <Col><h4>Friday</h4></Col>
            <Col><h4>Saturday</h4></Col>
            <Col><h4>Sunday</h4></Col>
          </Row>

        </Container>
      );
    }
  }

export default MainPage;