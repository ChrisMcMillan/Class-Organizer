import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Event from './event';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { DAY_ENUM, timeToString, capitalizeFirstLetter } from './utility';

class OptimizeClass extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
         dayRanking: DAY_ENUM,
         classCount: 5,
         optSchMatrix: null
        };

        this.optimizeSchedule = this.optimizeSchedule.bind(this);
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
                val += 50 - Math.pow(dayRanking[key], 2)
            }   
        }

        val -= Math.pow(dayCount, 5);
        
        return val;
    }

    assignDayValues(eventList, dayRanking){

        for(let i = 0; i < eventList.length; i++){
            let v = this.findDayValue(eventList[i], dayRanking);
            eventList[i].dayValue = v;
        }
    }

    addClassesToOptSch(cList){

        if(cList == null) return;

        let classAllocationCount = 0;

        const m = {};

        for (const [key, value] of Object.entries(DAY_ENUM)) {
             
            m[key] = []; 
        }

        for(let i = 0; i < cList.length; i++){
            for (const [key, value] of Object.entries(cList[i].days)) {
                if(value === true){
                    m[key].push(cList[i]);
                }   
            }

            classAllocationCount++;
        }

        this.setState({optSchMatrix: m});
    }

    // Try making into 7 cards instead trying to use grid system to avoid unreadable data when screen gets small.
    showOptSch(matrix){

        if(matrix == null) return;

        let userClasses = [];
        let i = 0;

        for (const [key, value] of Object.entries(DAY_ENUM)) {
            let title = <Card.Title>{capitalizeFirstLetter(key)}</Card.Title>;
            let curArray = matrix[key];
            let eventArray = [];

            for(let j = 0; j < curArray.length; j++){
                let c = curArray[j];
                let e = <Col key={j}>
                    <Event name={c.name} days={c.days} times={c.times}/>
                </Col>;

                eventArray.push(e);
            }


          let dayCard = <Container>
              {title}
              <Row>{eventArray}</Row>
            </Container>

            userClasses.push(<Col className='mb-5' key={i}>{dayCard}</Col>);
            i++
        }

        return <Row>{userClasses}</Row>;
    }

    optimizeSchedule(){
        const cList = this.props.classList;

        if(cList === null || cList.length === 0) return;
        
        // console.log(cList);
        this.assignDayValues(cList, this.state.dayRanking)

        cList.sort(function(a, b) {
            return b.dayValue - a.dayValue;
          });
        // console.log(cList);

        this.addClassesToOptSch(cList);
    }

    render() {


        


        return (<Container>

            <Button onClick={this.optimizeSchedule} variant="primary">Optimize</Button>{' '}

            <h3 className='my-5'>Your Optimize Schedule</h3> 

            {this.showOptSch(this.state.optSchMatrix)}
          
        
         </Container>);
    }
}

export default OptimizeClass;