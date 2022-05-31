import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { timeToString, capitalizeFirstLetter } from './utility';

// This renders class data as a info card
class Event extends React.Component {
    constructor(props) {
      super(props);
     
    }
  
    
    // Displays all the days the class is on.
    displayEventDays(days){
      let e = "";
      for (const [key, value] of Object.entries(days)) {
        // console.log(`${key}: ${value}`);
    
        if (value === true) e += capitalizeFirstLetter(key + ' ');
      }
      return e;
    }
    

    // Displays the times the classes takes place
    displayTimes(times){
      let t = "";
      let s = "";
      let e = "";
    
      s = timeToString(times.start);
    
      e = timeToString(times.end);
    
      t = s + " - " + e;
    
      return t;
    }
  
    render(){

      let removeButton = null;

      // Controls if the user can remove the class from the class list or not. 
      if(this.props.showRemoveButton === true) removeButton = <Button onClick={() => this.props.removeClass(this.props.index)} variant="danger">Remove</Button>;
      else removeButton = null;

      return(
        <Card style={{ width: '18rem' }}>
          <Card.Body>
  
            <Card.Title>{this.props.name}</Card.Title>
  
            <Card.Text>
              {this.displayEventDays(this.props.days)}
            </Card.Text>
  
            <Card.Text>
              {this.displayTimes(this.props.times)}
            </Card.Text>
  
            {removeButton}
          </Card.Body>
        </Card>
      )
    }
  }

  export default Event;