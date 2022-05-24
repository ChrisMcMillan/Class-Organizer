import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Event from './event';
import AddClass from './addClass';
import OptimizeClass from './optimizeClass';

import { generateEvents } from './generateEventData';
import { DAY_ENUM, capitalizeFirstLetter} from './utility';

class MainPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
       classList: [],
       classNumber: 1
      };

      this.addNewClass = this.addNewClass.bind(this);
      this.generateExampleClasses = this.generateExampleClasses.bind(this);
      this.clearAll = this.clearAll.bind(this);
      this.createClassNumberInput = this.createClassNumberInput.bind(this);
      this.handleClassNumberChange = this.handleClassNumberChange.bind(this); 
    }

    addNewClass(classData){

      
      if(classData == null) return;

      const events = this.state.classList;
     
      if(events){
        
        events.push(classData)
        this.setState({classList: events});
      }
    }

    clearAll(){
      this.setState({classList: []});
    }

    generateExampleClasses(){
      
      const events = generateEvents(10);
      this.setState({classList: events});
      // console.log(this.state.classList);
    }

    handleClassNumberChange(event){

      this.setState({ classNumber: parseInt(event.target.value)});
    }

    createClassNumberInput(){
        
      let maxNumber = 10;
      let dropDownSelection = [];
      let inputID = "classNumberInput";

      for(let i = 1; i <= maxNumber; i++){
          let item  = <option value={i} key={i}>{i}</option>;
          dropDownSelection.push(item);
      }
      
      let input = <Form.Select onChange={this.handleClassNumberChange} aria-label="Default select example"  className='my-3' id={inputID}>
          {dropDownSelection}
      </Form.Select>;

      return input;
    }

    createDayPreferenceInput(id){

      let inputID = id + "PrefInput";
      let tit = id;
      let maxPref = 7;
      let dropDownSelection = [];

      for(let i = 1; i <= maxPref; i++){
          let item  = <option value={i} key={i}>{i}</option>;
          dropDownSelection.push(item);
      }
      
      let input = <Form.Label>{capitalizeFirstLetter(id)}
          <Form.Select aria-label="Default select example"  className='my-3' id={inputID} title={tit}>
            {dropDownSelection}
        </Form.Select>
      </Form.Label>

      return input;
    }

    createAllDayPrefInputs(){

      let allInputs = [];
      let i = 0;
      for (const [key, value] of Object.entries(DAY_ENUM)){
          let item = <Col key={i}> {this.createDayPreferenceInput(key)} </Col>;
          allInputs.push(item);
          i++;
      }

      return <Row>{allInputs}</Row>;
    }

    render() {
    
      let userClasses = [];
   
      let events = this.state.classList;
      console.log(events);
  
      let eventIndex = 0;


      while(eventIndex <  events.length){

        let e = events[eventIndex];
        
        userClasses.push(
          <Col key={eventIndex}>
            <Event name={e.name} days={e.days} times={e.times}/>
        </Col>);

        eventIndex++;
      }

      let optClasses = <OptimizeClass classList={this.state.classList} classCount={this.state.classNumber}/>;
          

      return (
        <Container>
          
          <h1 className='my-5'>Class Schedule Optimizer</h1>

          <h5 className='my-5'>The purpose of this site is to help you create an class schedule that minimizes the number of days you need to show up to school.</h5> 
          
          <h3>Most Desired Days</h3>

          <h5 className='my-5'>Rank the days you want to go to school with 1 being the most desirable and 7 being the least desirable.</h5>

          {this.createAllDayPrefInputs()}

          <h3>Number of Classes</h3>

          <h5 className='my-5'>Pick the number of classes you want to take this semester.</h5>

          {this.createClassNumberInput()}

         
          <AddClass addClassEvent={this.addNewClass} generateExampleClasses={this.generateExampleClasses}/>

          
          <Container>
            <h3 className='my-5'>Your Classes</h3> 

            <Row xs="auto">{userClasses}</Row>
      
          </Container>

          
          <Container className='my-5'>
            
            <Button onClick={this.clearAll} variant="danger">Clear All</Button>{' '}
          </Container> 

          {optClasses}

        </Container>
      );
    }
  }

export default MainPage;