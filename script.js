//set document ready function
// $(document).ready(function () {

//on document load, check local storage for existance of a city
//if found, make ajax call for that city
//on success, call function for new city

//setting a city in local storage for start of weather dashboard so a weather data loads the first time
// localStorage.setItem("lastCity", "Kansas City");

var lastCity = localStorage.getItem("lastCity");
var city = lastCity;

var api_key = "8dff016de80855507b8d119c673b5b76";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api_key;

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {

  //date is given in milliseconds from Jan 1970, converted to current date. 
  var formattedDate = prettyDate(response.dt);

  //weather conditions icon code converted to an icon png. displayed as icon
  var iconcode = response.weather[0].icon;
  var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  $('#wicon').attr('src', iconurl);

  //display current city and date.
  $("#today").html(lastCity + " " + " " + formattedDate);

  //temp is given in Kelvin. converted to Fahrenheit to one decimal. 
  var tempK = response.main.temp;
  var tempF = (tempK - 273.15) * 1.80 + 32;
  var far = tempF.toFixed(1);
  $('#temp').html("Temperature: " + far + "&deg;" + "F");

  //humidity display with % symbol
  var hum = response.main.humidity
  $("#humid").html("Humidity: " + hum + "&#37;");

  //Wind Speed
  var ws = response.wind.speed;
  $("#wind").html("Wind Speed: " + ws + " " + "MPH");

  //calling separate function to get uvData
  getUV(response.coord.lat, response.coord.lon);

})

function prettyDate(resultDate) {
  var d = new Date(0);
  d.setUTCSeconds(resultDate);
  var dateStr = d.toString();
  var formattedDate = dateStr.slice(4, 15);
  return formattedDate;
}


function getUV(lat, lon) {

  var api_key = "8dff016de80855507b8d119c673b5b76";
  var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + api_key +
    "&lat=" + lat + "&lon=" + lon;

  $.ajax({
    url: queryURL,
    method: "GET"

  }).then(function (responseUv) {

    var uvData = responseUv.value;
    console.log(responseUv.value);
    $("#uv-box").append(uvData +  ("<div>"));
    changeUVcolor(uvData);

  });



};

function changeUVcolor(uvData) {
  var element = document.getElementById("uv-box");
  if (uvData < 3) {
    element.classList.add("normal");

  } else if ((uvData >= 3) && (uvData <= 7)) {
    element.classList.add("warning");

  } else {
    element.classList.add("danger");
  }

  //    $("submit-city").click(event); {
  //     event.preventDefault();
  //get value from city choice, var for city,
  var cityChoice = $("#lastCity").val().trim();

  //                                                  //set click function for ajax call for that city
  //                                                  //on click, clear the input box
  //               // document.getElementById("lastCity").clear;

  // $("#lastCity").get().reset();
  //                                                     //test value of input box to see if input undefined
  // if (lastCity == undefined) {
  //     alert("Please add city name.");

  //if undefined, alert(please add city name)
  //could add further validation to this, but for the scope of this project we'll keep it at this

}




//on succes      //on click add city to history box. prepend the list
//create var to hold the response data
//  


// 

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




// displayCity();


//current city searched, ends up being lastCity in local storage,
//and pulled from storage displayed as current city as page loads.
// document.getElementById("current-city").append(lastCity);
function updateCityData() {
  var cityFive = document.getElementById("inputCity").value;
  if (cityFive == undefined) {
    alert("Please add city name.");
    // }  else  {
    //   document.getElementsByClassName(list-group).prepend(inputCity);
  }


  var api_key = "8dff016de80855507b8d119c673b5b76";
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityFive + "&appid=" + api_key;

  $.ajax({
    url: queryURL,
    method: "GET"

  }).then(function (responseFive) {
    console.log(responseFive);


  });

}

// });

