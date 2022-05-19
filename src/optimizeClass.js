import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Event from './event';

import { DAY_ENUM } from './utility';

class OptimizeClass extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
         dayRanking: DAY_ENUM,
         classCount: 5
        };


        this.state.optSchMatrix = {};

        for (const [key, value] of Object.entries(DAY_ENUM)) {
             
            this.state.optSchMatrix[key] = []; 
        }


        console.log(DAY_ENUM );

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

        const m = this.state.optSchMatrix;

        for(let i = 0; i < cList.length; i++){
            for (const [key, value] of Object.entries(cList[i].days)) {
                if(value === true){
                    m[key].push(cList[i]);
                }   
            }

            classAllocationCount++;
        }

        console.log(m);
        console.log(classAllocationCount);
        return m;
    }

    // Try making into 7 cards instead trying to use grid system to avoid unreadable data when screen gets small.
    showOptSch(m){

        if(m == null) return;

        let userClasses = [];
        let row = [];
        let i = 0;

        for (const [key, value] of Object.entries(DAY_ENUM)) {

            
            row.push(<Col key={i} ><h4>{key}</h4></Col>);
            i++
        }

        userClasses.push(<Row key={0}> {row} </Row>);
        

        for(let i = 0; i < 7; i++){
            row = [];
            let j = 0;

            for (const [key, value] of Object.entries(DAY_ENUM)) {

                // console.log(key, m[key]);
                if(i + 1 > m[key].length){
                    row.push(<Col key={j}> <h4> empty </h4></Col>);
                }
                else{
                    let c = m[key][i];
                 
                    row.push(<Col key={j}> 
                        {c.name}
                        </Col>);
                }

                j++;
            }
            
            userClasses.push(<Row key={i + 1}> {row} </Row>);
        }

        return userClasses;
    }

    render() {


        const cList = this.props.classList;
        console.log(cList);
        this.assignDayValues(cList, this.state.dayRanking)

        cList.sort(function(a, b) {
            return b.dayValue - a.dayValue;
          });
        console.log(cList);

        let m = this.addClassesToOptSch(cList);


        return (<Container>

        
            <h3 className='my-5'>Your Optimize Schedule</h3> 

            {this.showOptSch(m)}
           {/*  <Row>
                <Col><h4>Monday</h4></Col>
                <Col><h4>Tuesday</h4></Col>
                <Col><h4>Wednesday</h4></Col>
                <Col><h4>Thursday</h4></Col>
                <Col><h4>Friday</h4></Col>
                <Col><h4>Saturday</h4></Col>
                <Col><h4>Sunday</h4></Col>
            </Row>

            <Row>
                <Col><h4>1</h4></Col>
                <Col><h4>2</h4></Col>
                <Col><h4>3</h4></Col>
                <Col><h4>4</h4></Col>
                <Col><h4>5</h4></Col>
                <Col><h4>6</h4></Col>
                <Col><h4>7</h4></Col>
            </Row> */}
        
         </Container>);
    }
}

export default OptimizeClass;