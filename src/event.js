import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { timeToString, capitalizeFirstLetter } from './utility';

// This renders class data as a info card
class Event extends React.Component {
    constructor(props) {
      super(props);
     
    }
  
    
    displayEventDays(days){
      let e = "";
      for (const [key, value] of Object.entries(days)) {
        // console.log(`${key}: ${value}`);
    
        if (value === true) e += capitalizeFirstLetter(key + ' ');
      }
      return e;
    }
    
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