export const DAY_ENUM = {monday: 1, tuesday: 2, wednesday: 3,
    thursday: 4, friday: 5, saturday: 6, sunday: 7}


export function timeToString(time){
    let mid = 12;
    let s = "";
    let minS = "";

    if(time.min < 10) minS = "0" + time.min;
    else minS = time.min;
  
    if(time.hour > mid) s = time.hour - mid + ":" + minS + " PM";
    else if(time.hour === mid) s = time.hour + ":" + minS + " PM";
    // else if(time.hour === 0) s = "12" + ":" + minS + " AM";
    else s = time.hour + ":" + minS + " AM";
  
    return s;
}


export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}