import React from 'react';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { timeToString, capitalizeFirstLetter } from './utility';

class AddClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          classData: {
            name: "",
            days: {monday: false, tuesday: false, wednesday: false,
              thursday: false, friday: false, saturday: false, sunday: false},
            times: {start: {hour: 1, min: 0}, end: {hour: 1, min: 0}},
          },
          startID: "Start",
          endID: "End",
          validated: false
        };

        this.handleDayCheckBoxChange = this.handleDayCheckBoxChange.bind(this);
        this.handleClassNameChange = this.handleClassNameChange.bind(this);
        this.handleClassHourChange = this.handleClassHourChange.bind(this);
        this.handleClassMinChange = this.handleClassMinChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
      }

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

      handleClassNameChange(event) {
       
        const cd = this.state.classData;
        cd.name = event.target.value;
        this.setState({ classData:  cd});
      }

      handleClassHourChange(event){
        // console.log(event.target.id);
        // console.log(event.target.value);

        const newTime = this.state.classData.times;

        if(event.target.id === "StartHourInput"){
          newTime.start.hour = event.target.value;
          this.setState({ times: newTime});
        }
        else if(event.target.id === "EndHourInput"){
          newTime.end.hour = event.target.value;
          this.setState({ times: newTime});
        }
        else{
          console.error("Invalid id pass into handleClassHourChange()");
          return null;
        }
      }

      handleClassMinChange(event){
        const newTime = this.state.classData.times;

        if(event.target.id === "StartMinInput"){
          newTime.start.min = event.target.value;
          this.setState({ times: newTime});
        }
        else if(event.target.id === "EndMinInput"){
          newTime.end.min = event.target.value;
          this.setState({ times: newTime});
        }
        else{
          console.error("Invalid id pass into handleClassMinChange()");
          return null;
        }
      }

      handleSubmitClick(event){
        // console.log("handleSubmitClick() being clicked");
       
        event.preventDefault();

        const form = event.currentTarget;
        
        if (form.checkValidity() === false) {
          // event.preventDefault();
          event.stopPropagation();
        }
        else{
          this.props.addClassEvent(this.state.classData);
        }
        
        this.setState({ validated: true});

      }


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

      createHourInput(id){
        
        let inputID = id + "HourInput";
        let tit = "Hour";
        let maxTime = 24;
        let dropDownSelection = [];

        for(let i = 1; i <= maxTime; i++){
            let item  = <option value={i} key={i}>{this.hourToString(i)}</option>;
            dropDownSelection.push(item);
        }
        
        let input = <Form.Select onChange={this.handleClassHourChange} aria-label="Default select example"  className='my-3' id={inputID} title={tit}>
            {dropDownSelection}
        </Form.Select>;

        return input;
      }

      createMinInput(id){
        
        let inputID = id + "MinInput";
        let tit = "Min";
        let maxTime = 55;
        let dropDownSelection = [];

        for(let i = 0; i <= maxTime; i += 5){
            let num = null;
            if(i < 10) num = "0" + i;
            else num = i;

            let item  = <option value={i} key={i}>{num}</option>;
            dropDownSelection.push(item);
        }
        
        let input = <Form.Select onChange={this.handleClassMinChange} aria-label="Default select example" className='my-3' id={inputID} title={tit}>
            {dropDownSelection}
        </Form.Select>;

        return input;
      }

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

        for (const [key, value] of Object.entries(this.state.classData.days)) {
            // console.log(`${key}: ${value}`);

            let conID = String(key) + "Input";
            let lab = capitalizeFirstLetter(String(key));
            let checkBox = <Col key={i}>
                <Form.Group className="mb-3" controlId={conID}>
                <Form.Check type="checkbox" label={lab} onChange={this.handleDayCheckBoxChange}/>
                </Form.Group>
            </Col>; 

            dayInputCols.push(checkBox);
            i += 1;
        }

        let dayInput = <Row> {dayInputCols} </Row>

        return(
            <Container>
            <h3 className='my-5'>Add Class</h3> 
            <Form validated={this.state.validated} noValidate onSubmit={this.handleSubmitClick}>
              <Form.Group className="mb-3" controlId="classNameInput">
                <Form.Label>Class Name</Form.Label>
                <Form.Control placeholder="Enter class name" onChange={this.handleClassNameChange} required />
                <Form.Control.Feedback type="invalid">
                  Please provide a class name.
                </Form.Control.Feedback>
              </Form.Group>

                {dayInput}
             

                <Row>
                  <Col>
                    {this.createTimeInput(this.state.startID)}
                  </Col>

                  <Col>
                    {this.createTimeInput(this.state.endID)}
                  </Col>
                </Row>      
                        
                

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        )
      }
}

export default AddClass;