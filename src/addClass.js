import React from 'react';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class AddClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          days: {monday: false, tuesday: false, wednesday: false,
            thursday: false, friday: false, saturday: false, sunday: false},
          times: {start: {hour: 1, min: 0}, end: {hour: 1, min: 0}}
        };

        this.handleDayCheckBoxChange = this.handleDayCheckBoxChange.bind(this);
        this.handleClassNameChange = this.handleClassNameChange.bind(this);
      }

      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      
      handleDayCheckBoxChange(event) {
       
        // console.log(event.target.checked);
        // console.log(event.target.id);

        let ret = event.target.id.replace('Input','');
        // console.log(ret);
        const newDays = this.state.days;
        // console.log(newDays);
        newDays[ret] = event.target.checked;
        // console.log(newDays);
        this.setState({ days: newDays });
      }

      handleClassNameChange(event) {
       
       
        this.setState({ name:  event.target.value});
      }

      render(){

        
        let dayInputCols = [];
        let i = 0;

        for (const [key, value] of Object.entries(this.state.days)) {
            // console.log(`${key}: ${value}`);

            let conID = String(key) + "Input";
            let lab = this.capitalizeFirstLetter(String(key));
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
            <Form>
              <Form.Group className="mb-3" controlId="classNameInput">
                <Form.Label>Class Name</Form.Label>
                <Form.Control placeholder="Enter class name" onChange={this.handleClassNameChange}/>
              </Form.Group>

                {dayInput}
             

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
        )
      }
}

export default AddClass;