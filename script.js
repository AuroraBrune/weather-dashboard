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
  console.log(response);
  //date is given in milliseconds from Jan 1970, converted to current date. 
  var formattedDate = prettyDate(response.dt);

  //weather conditions icon code converted to an icon png. displayed as icon
  var iconcode = response.weather[0].icon;
  var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  $('#wicon').attr('src', iconurl);

  //display current city and date.
  // var city = document.getElementById("inputCity").value;
  $("#today").html(lastCity + " " + " " + formattedDate);
  // console.log(city);
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
//function to convert date to current day, to be used in each instance of date.
function prettyDate(resultDate) {
  var d = new Date(0);
  d.setUTCSeconds(resultDate);
  var dateStr = d.toString();
  var formattedDate = dateStr.slice(4, 15);
  return formattedDate;
}
//Lat and Lon from previous ajax call to be used in call for uv index.
function getUV(lat, lon) {

  var api_key = "8dff016de80855507b8d119c673b5b76";
  var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + api_key +
    "&lat=" + lat + "&lon=" + lon;

  $.ajax({
    url: queryURL,
    method: "GET"

  }).then(function (responseUv) {
    //get uv data from response and display it.
    var uvData = responseUv.value;
    console.log(responseUv.value);
    $("#uv-box").append(uvData + ("<div>"));
    changeUVcolor(uvData);

  });

};
//set color of uv display box depending on conditions. Green for low uv, yellow for warning 
//and red for dangerous uv index.
function changeUVcolor(uvData) {
  var element = document.getElementById("uv-box");
  if (uvData < 3) {
    element.classList.add("normal");

  } else if ((uvData >= 3) && (uvData <= 7)) {
    element.classList.add("warning");

  } else {
    element.classList.add("danger");
  }

  //on click, clear the input box
  // document.getElementById("lastCity").clear;

  // $("#lastCity").get().reset();
  //test value of input box to see if input undefined
  // if (lastCity == undefined) {
  //     alert("Please add city name.");

  //if undefined, alert(please add city name)
  //could add further validation to this, but for the scope of this project we'll keep it at this

}

function updateCityData() {

  var cityFive = document.getElementById("inputCity").value;
  if (cityFive == undefined) {
    alert("Please add city name.");
  } else {
    //  document.getElementsByClassName(list-group).prepend(inputCity);
  }
  //api call for the five day forecast.
  var api_key = "8dff016de80855507b8d119c673b5b76";
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityFive + "&appid=" + api_key;
  console.log(cityFive);
  $.ajax({
    url: queryURL,
    method: "GET"

  }).then(function (responseFive) {
    var i;
    var j = 1;

    //for loop to get date, icon, temp, humidity from the 15:00 hours for each day.
    for (i = 0; i < responseFive.list.length; i++) {
      var timeStr = responseFive.list[i].dt_txt;
      var time = "";

      time = timeStr.slice(11, 13);

      if (time == 15) {
        var dispId = "day" + j;
        var divCont = document.getElementById(dispId);
        // now we have element for 5-day to populate

        //_____________________________________
        // dateF is ready for display
        var dateFive = responseFive.list[i].dt;
        var dateF = prettyDate(dateFive);

        var node = document.createElement("p");
        var textnode = document.createTextNode(dateF);
        node.appendChild(textnode);
        divCont.appendChild(node);


        //_____________________________________
        // icon is ready for display
        var iconF = responseFive.list[i].weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconF + ".png";

        var node = document.createElement("div");
        var img = document.createElement("img")
        img.src = iconurl;
        node.appendChild(img);
        divCont.appendChild(node);

        //_____________________________________
        // icon is ready for display

        var tempFiveK = responseFive.list[i].main.temp;
        var tempFiveF = (tempFiveK - 273.15) * 1.80 + 32;
        var farF = tempFiveF.toFixed(1);
        // temp is ready for display

        var node = document.createElement("p");
        var textnode = document.createTextNode(farF + "\u00B0" + "F");
        node.appendChild(textnode);
        divCont.appendChild(node);

        //_____________________________________

        var humidFive = responseFive.list[i].main.humidity;
        humidFive = responseFive.list[i].main.humidity;
        // humidity is ready for display

        var node = document.createElement("p");
        var textnode = document.createTextNode(humidFive + "%");
        node.appendChild(textnode);
        divCont.appendChild(node);

        j++;

      }
    }



  });
}



//on success      //on click add city to history box. prepend the list
//create var to hold the response data



//current city searched, ends up being lastCity in local storage,
//and pulled from storage displayed as current city as page loads.
// document.getElementById("current-city").append(lastCity);
