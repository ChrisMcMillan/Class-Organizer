import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import {capitalizeFirstLetter, DAY_ENUM } from './utility';


// Creates the input for creating class to add to the class list
class AddClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          classData: {
            name: "",
            days: {},
            times: {start: {hour: 9, min: 5}, end: {hour: 11, min: 10}},
          },
          startID: "Start",
          endID: "End",
          validated: false,
          startHourInputID: "StartHourInput",
          endHourInputID: "EndHourInput",
          startMinInputID: "StartMinInput",
          endMinInputID: "EndMinInput",
          dayInputError: null,
          timeInputError: null
        };

        for (const [key, value] of Object.entries(DAY_ENUM)){

          this.state.classData.days[key] = false;
      }

        this.handleDayCheckBoxChange = this.handleDayCheckBoxChange.bind(this);
        this.handleClassNameChange = this.handleClassNameChange.bind(this);
        this.handleClassHourChange = this.handleClassHourChange.bind(this);
        this.handleClassMinChange = this.handleClassMinChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.validateTimeInput = this.validateTimeInput.bind(this);
        
      }


      // Makes sure the input times are valid by making sure the
      // times are not the same.
      validateTimeInput(){

        const startTime = this.state.classData.times.start;
        const endTime = this.state.classData.times.end;
        let output = {valid: true, errorMessage: ""};

        console.log("startTime", startTime);
        console.log("endTime", endTime);

        if(startTime.hour === endTime.hour && startTime.min === endTime.min){
          output.valid = false;
          output.errorMessage = "The start time and end time can not be the same.";
          return output;
        }

        return output;
      }

      /* Make sure there is at least one day check box checked. A class with no
      days is invalid. */
      atLeastOneDayCheckBox(){

        for (const [key, value] of Object.entries(DAY_ENUM)){

            if(this.state.classData.days[key] === true) return true;
  
        }

        return false;
      }

      // Updates day data for the class that is going to be added
      handleDayCheckBoxChange(event) {
       
        // console.log(event.target.checked);
        // console.log(event.target.id);

        let ret = event.target.id.replace('Input','');
        // console.log(ret);
        const newDays = this.state.classData.days;
        // console.log(newDays);
        newDays[ret] = event.target.checked;
        // console.log(newDays);
        this.setState({ days: newDays });
      }

      // Updates the class name
      handleClassNameChange(event) {
       
        const cd = this.state.classData;
        cd.name = event.target.value;
        this.setState({ classData:  cd});
      }

      // Updates the hour data 
      handleClassHourChange(event){
        // console.log(event.target.id);
        // console.log(event.target.value);

        const newTime = this.state.classData.times;

        // Checks if the user is updating the start or end time
        if(event.target.id === this.state.startHourInputID){
          newTime.start.hour = event.target.value;
          this.setState({ times: newTime});
        }
        else if(event.target.id === this.state.endHourInputID){
          newTime.end.hour = event.target.value;
          this.setState({ times: newTime});
        }
        else{
          console.error("Invalid id pass into handleClassHourChange()");
          return null;
        }
      }

      // Updates the min date
      handleClassMinChange(event){
        const newTime = this.state.classData.times;

        // Checks if the user is updating the start or end time
        if(event.target.id === this.state.startMinInputID){
          newTime.start.min = event.target.value;
          this.setState({ times: newTime});
        }
        else if(event.target.id === this.state.endMinInputID){
          newTime.end.min = event.target.value;
          this.setState({ times: newTime});
        }
        else{
          console.error("Invalid id pass into handleClassMinChange()");
          return null;
        }
      }

      // Preforms checks for make sure the class data is valid.
      // If it is not valid then an error message is display to the user.
      // If it is valid then the new class data is added to the list.
      handleSubmitClick(event){
        // console.log("handleSubmitClick() being clicked");
       
        event.preventDefault();

        const form = event.currentTarget;

        let validTime = this.validateTimeInput();

        if(validTime.valid == false){
          console.error("Error: Invalid time input");

          this.setState({
            timeInputError:    <p className="text-danger">
            {validTime.errorMessage}
          </p>
           });

          return;
        }
        else{
          this.setState({
            timeInputError: null
           });
        }


        if(this.atLeastOneDayCheckBox() == false){
          // console.error("Error: At least one day must be checked");

          this.setState({
            dayInputError:    <p className="text-danger">
            Please pick at least one day.
          </p>
           });

          return;
        }
        else{
          this.setState({
            dayInputError: null
           });
        }
        
        if (form.checkValidity() === false) {
          // event.preventDefault();
          event.stopPropagation();
        }
        else{
          this.props.addClassEvent(this.state.classData);
        }
        
        this.setState({ validated: true});

      }


      // Covert an hour in military time to a display time 
      hourToString(hour){

        if(hour < 1 || hour > 24){
          console.error("Invalid hour passed into hourToString()");
          return null;
        }

        let hourString = "";
        let mid = 12;

        if(hour > mid) hourString = hour - mid;
        else hourString = hour;

        if(hour <= mid) hourString += " AM";
        else hourString += " PM";

        return hourString;
      }

      // Create the hour select dropdown
      createHourInput(id){
        
        let inputID = id + "HourInput";
        let tit = "Hour";
        let maxTime = 24;
        let dropDownSelection = [];
        let startValue = null;

        if(inputID === this.state.startHourInputID) startValue = this.state.classData.times.start.hour;
        else if (inputID === this.state.endHourInputID) startValue = this.state.classData.times.end.hour;
        else{
          console.error("Unknown ID passed into createHourInput() ", inputID);
          return;
        }

        for(let i = 1; i <= maxTime; i++){
            let item  = <option value={i} key={i}>{this.hourToString(i)}</option>;
            dropDownSelection.push(item);
        }
        
        let input = <Form.Select value={startValue} onChange={this.handleClassHourChange} aria-label="Default select example"  className='my-3' id={inputID} title={tit}>
            {dropDownSelection}
        </Form.Select>;

        return input;
      }

      // Creates the min select dropdown 
      createMinInput(id){
        
        let inputID = id + "MinInput";
        let tit = "Min";
        let maxTime = 55;
        let dropDownSelection = [];
        let startValue = null;

        if(inputID === this.state.startMinInputID) startValue = this.state.classData.times.start.min;
        else if (inputID === this.state.endMinInputID) startValue = this.state.classData.times.end.min;
        else{
          console.error("Unknown ID passed into createMinInput() ", inputID);
          return;
        }

        for(let i = 0; i <= maxTime; i += 5){
            let num = null;
            if(i < 10) num = "0" + i;
            else num = i;

            let item  = <option value={i} key={i}>{num}</option>;
            dropDownSelection.push(item);
        }
        
        let input = <Form.Select value={startValue} onChange={this.handleClassMinChange} aria-label="Default select example" className='my-3' id={inputID} title={tit}>
            {dropDownSelection}
        </Form.Select>;

        return input;
      }


      // Create the hour and min select drop downs for the start and end times
      createTimeInput(id){


        let a = <div className='my-3'>
          <Form.Label>{id} Time</Form.Label>
          <Row>
            <Col>{this.createHourInput(id)}</Col>
            <Col>{this.createMinInput(id)}</Col>
          </Row>
                    
        </div>;

        return a;
      }

      render(){

        
        let dayInputCols = [];
        let i = 0;

        // Creates the day selection 
        for (const [key, value] of Object.entries(this.state.classData.days)) {
            // console.log(`${key}: ${value}`);

            let conID = String(key) + "Input";
            let lab = capitalizeFirstLetter(String(key));
            let checkBox = <Col key={i}>
                <Form.Group className="mb-3" controlId={conID}>
                <Form.Check feedbackType="invalid" feedback="You must select at least one day."
                 checked={this.state.classData.days[key]} type="checkbox" label={lab} onChange={this.handleDayCheckBoxChange}/>
                </Form.Group>
            </Col>; 

            dayInputCols.push(checkBox);
            i += 1;
        }

        let dayInput = <Row> {dayInputCols} </Row>

        return(
            // Creates the form for adding a class. 
            <Container>
            <h3 className='my-5'>Add Class</h3> 
            <Form validated={this.state.validated} noValidate onSubmit={this.handleSubmitClick}>
              <Form.Group className="mb-3" controlId="classNameInput">
                <Form.Label>Class Name</Form.Label>
                <Form.Control maxLength={50} placeholder="Enter class name" onChange={this.handleClassNameChange} required />
                <Form.Control.Feedback type="invalid">
                  Please provide a class name.
                </Form.Control.Feedback>
              </Form.Group>

                {dayInput}
                {this.state.dayInputError}
             

                <Row>
                  <Col>
                    {this.createTimeInput(this.state.startID)}
                  </Col>

                  <Col>
                    {this.createTimeInput(this.state.endID)}
                  </Col>
                </Row>      
                        
                {this.state.timeInputError}

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>

            <Button onClick={this.props.generateExampleClasses} variant="warning" className='my-3'>
                Generate Example Classes
              </Button>

          </Container>
        )
      }
}

export default AddClass;