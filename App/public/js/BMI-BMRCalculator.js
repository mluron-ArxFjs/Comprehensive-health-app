//let btn = document.getElementById('btn');
var finalbmi;
function calculateBMI() {
    
    let weight = document.getElementById('weight-input').value;
    let height = document.getElementById('height-input').value;
    let finalbmi = (weight / (height * height) * 703);
    document.getElementById('bmi-output').value = finalbmi;
    return;
};

var bmr;
function calculateBMR() {

    //the getelements will get the user's inputs from html
    var gender = document.getElementById('gender').value;
    var age = parseInt(document.getElementById('age').value);
    var height = parseInt(document.getElementById('height').value);
    var weight = parseInt(document.getElementById('weight').value);

    //formula for bmr/calorie calculations: 
    //For men - BMR = 66 + (6.23 x weight in pounds ) + (12.7 x height in inches) – (6.8 x age)
    // 2nd one will be for women - Women: BMR = 655 + (4.35 x weight in pounds) + (4.7 x height in inches) – (4.7 x age)

    if (gender === 'male') {
        bmr = 66.47 + (6.24 * weight) + (12.7 * height) - (6.755 * age);
    } else if (gender === 'female') {
        bmr = 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
    }
    //render to the page
    document.getElementById('bmr-output').innerHTML = '<p> Your BMR is: ' + bmr.toFixed() + ' calories/days';
    return;
}
