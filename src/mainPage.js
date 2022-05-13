import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Event from './event';
import AddClass from './addClass';

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

         
          <AddClass/>
          
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