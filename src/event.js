import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class Event extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: this.props.name,
        days: this.props.days,
        times: this.props.times
      };
    }
  
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    displayEventDays(days){
      let e = "";
      for (const [key, value] of Object.entries(days)) {
        // console.log(`${key}: ${value}`);
    
        if (value === true) e += this.capitalizeFirstLetter(key + ' ');
      }
      return e;
    }
    
    displayTimes(times){
      let t = "";
      let s = "";
      let e = "";
    
      s = this.timeToString(times.start);
    
      e = this.timeToString(times.end);
    
      t = s + " - " + e;
    
      return t;
    }
    
    timeToString(time){
      let mid = 12;
      let s = "";
    
      if(time > mid) s = time - mid + " PM";
      else if(time === mid) s = time + " PM";
      else if(time === 0) s = "12 AM";
      else s = time + " AM";
    
      return s;
    }
  
    render(){
      return(
        <Card style={{ width: '18rem' }}>
          <Card.Body>
  
            <Card.Title>{this.state.name}</Card.Title>
  
            <Card.Text>
              {this.displayEventDays(this.state.days)}
            </Card.Text>
  
            <Card.Text>
              {this.displayTimes(this.state.times)}
            </Card.Text>
  
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      )
    }
  }

  export default Event;