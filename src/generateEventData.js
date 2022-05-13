function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  function generateNumString(size){
  
    let s = "";
  
    for(let i = 0; i < size; i++){
        s += getRandomInt(9).toString();
    }
  
    return s;
  }
  
  function generateDays(activeDays){
  
      let days = {monday: false, tuesday: false, wednesday: false,
         thursday: false, friday: false, saturday: false, sunday: false};
  
      let a = [0, 1, 2, 3, 4, 5, 6];
      let picks = [];
  
      for(let i = 0; i < activeDays; i++){
        let rng = getRandomInt(a.length);
        picks.push(a[rng]);
        a.splice(rng, 1);
      }
  
  
      for(let i = 0; i < picks.length; i++){
        
        switch(picks[i]) {
          case 0: days.monday = true; break;
          case 1: days.tuesday = true; break;
          case 2: days.wednesday = true; break;
          case 3: days.thursday = true; break;
          case 4: days.friday = true; break;
          case 5: days.saturday = true; break;
          case 6: days.sunday = true; break;
          default: console.log("Error: Unknown pick number for generateDays()."); break;
        }
      }
  
      // console.log(picks);
      // console.log(days);
  
      return days;
  }
  
  function generateTimes(){
  
    let maxTime = 24;
    let times = {start: null, end: null};
    let s = getRandomInt(maxTime);
    if(s === 0) s += 1;
    let e = s + 2;
  
    if(e > maxTime){
      e = e - maxTime;
    }

    let sMin = 5 * getRandomInt(11);
    let eMin = 5 * getRandomInt(11);
  
    times.start = {hour: s, min: sMin};
    times.end = {hour: e, min: eMin};
  
    return times;
  }
  
export function generateEvents(count) {
    let events = [];
  
    for(let i = 0; i < count; i++){
        let nam = generateNumString(9);
        let d = generateDays(3);
        let t = generateTimes();
  
        let e = {name: nam, days: d, times: t};
        events.push(e);
    }
  
    return events;
  }