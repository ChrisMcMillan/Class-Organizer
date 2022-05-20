import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Event from './event';
import AddClass from './addClass';
import OptimizeClass from './optimizeClass';

import { generateEvents } from './generateEventData';

class MainPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
       classList: [],
       displayOptClasses: true
      };

      this.addNewClass = this.addNewClass.bind(this);
    }

    componentDidMount(){
      const events = generateEvents(10);
      this.setState({classList: events});
    }

    addNewClass(classData){

      
      if(classData == null) return;

      const events = this.state.classList;
     
      if(events){
        
        events.push(classData)
        this.setState({classList: events});
      }
    }

    render() {
      
      let userClasses = [];
   
      const events = this.state.classList;
      // console.log(events);
  
      let eventIndex = 0;


      while(eventIndex <  events.length){

        let e = events[eventIndex];
        userClasses.push(
          <Col key={eventIndex}>
            <Event name={e.name} days={e.days} times={e.times}/>
        </Col>);

        eventIndex++;
      }

      let optClasses = null;
      if(this.state.displayOptClasses) optClasses  = <OptimizeClass classList={this.state.classList}/>;
      else optClasses = null;
          

      return (
        <Container>
          
          <h1 className='my-5'>Class Schedule Optimizer</h1>

          <h5 className='my-5'>The purpose of this site is to help you create an class schedule that minimizes the number of days you need to show up to school.</h5> 
          
          <h3>Most Desired Days</h3>

          <h5 className='my-5'>Rank the days you want to go to school with 1 being the most desirable and 7 being the least desirable.</h5>


          <h3>Number of Classes</h3>

          <h5 className='my-5'>Pick the number of classes you want to take this semester.</h5>

         
          <AddClass addClassEvent={this.addNewClass}/>
          
          <Container>
            <h3 className='my-5'>Your Classes</h3> 

            <Row xs="auto">{userClasses}</Row>
      
          </Container>

          
          <Container className='my-5'>
            
            <Button variant="secondary">Clear All</Button>{' '}
          </Container> 

          {optClasses}

        </Container>
      );
    }
  }

export default MainPage;