import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class OptimizeClass extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
         dayRanking: {monday: 1, tuesday: 2, wednesday: 3,
            thursday: 4, friday: 5, saturday: 6, sunday: 7},
         classCount: 5
        };

    }

    findDayCountMultiplier(dayCount){
        let mid = 3;
        let punish = 0.25;
        let reward = 0.5;

        if(dayCount === mid){
            return 1.0
        }
        else if(dayCount > mid){
            let v = dayCount - mid;
            v = 1.0 - (v * punish);
            if(v === 0.0) v = 0.1;

            return v;
        }
        else{
            let v = mid - dayCount;
            v = v * reward;
            v = 1.0 + v;
            return v;
        }
    }


    findDayValue(event, dayRanking){

        let val = 0;
        let dayCount = 0;
       
        for (const [key, value] of Object.entries(event.days)) {
            if(value === true){
                dayCount += 1
                val += 8 - dayRanking[key];
            }   
        }

        val -= dayCount * 5;
        
        return val;
    }

    assignDayValues(eventList, dayRanking){

        for(let i = 0; i < eventList.length; i++){
            let v = this.findDayValue(eventList[i], dayRanking);
            eventList[i].dayValue = v;
        }
    }

    render() {


        const cList = this.props.classList;
        console.log(cList);
        this.assignDayValues(cList, this.state.dayRanking)

        cList.sort(function(a, b) {
            return b.dayValue - a.dayValue;
          });
        console.log(cList);


        return (<Container>

        
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
        
         </Container>);
    }
}

export default OptimizeClass;