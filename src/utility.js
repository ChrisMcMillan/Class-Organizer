// This file contains data structures and functions that are used in many parts of the program

// Used to create enums related to the week
export const DAY_ENUM = {monday: 1, tuesday: 2, wednesday: 3,
    thursday: 4, friday: 5, saturday: 6, sunday: 7}



// Coverts a time value to a string that can be shown to the user
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

// Capitalizes the first letter in a string
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}