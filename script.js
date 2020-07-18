//set document ready function
$(document).ready(function () {

//on document load, check local storage for existance of a city
//if found, make ajax call for that city
//on success, call function for new city

//setting a city in local storage for start of weather dashboard so a weather data loads the first time
// localStorage.setItem("lastCity", "Kansas City");

var lastCity = localStorage.getItem("lastCity");


console.log(lastCity);
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q={Topeka}&appid=8dff016de80855507b8d119c673b5b76";
var api_key = "8dff016de80855507b8d119c673b5b76";
$.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=Topeka&appid=8dff016de80855507b8d119c673b5b76",
    method: "GET"
  }).then(function (response) {
     console.log(response);
     

//    $("submit-city").click(event); {
//     event.preventDefault();
                                                    //get value from city choice, var for city,
    // var cityChoice = $("#select-city").val().trim();

    //                                                  //set click function for ajax call for that city
    //                                                  //on click, clear the input box
    //               // document.getElementById("select-city").clear;

    // $(".select-city").get().reset();
    //                                                     //test value of input box to see if input undefined
    // if (select - city == undefined) {
    //     alert("Please add city name.");
    })
               //if undefined, alert(please add city name)
                //could add further validation to this, but for the scope of this project we'll keep it at this


                  //on succes      //on click add city to history box. prepend the list
                    //create var to hold the response data
       
                   //create var for temp and convert it to *F
                  //create vars to hold the city data, date, icon for conditions
                   //create vars  for city's humidity, wind speed, uv rating
                   //append date display
                  //append icon display
             //append temp display
           //append humidity display logic to trigger css

    //create icon for the uv rating
    //create vars for each day of five day forecast: date, icon for conditions, temp, humidity
    //append the data to each day of five day displays

    //append date display
    //append icon display
    //append temp display
    //append humidity display
// };
}); 
// displayCity();

//set last city searched to local storage
//when page loads, get last city searched from local storage and display on page


//to do

//append divs for display of city name in history list
//write function to display the weather info


