//on document load, check local storage for existance of a city
//if found, make ajax call for that city
//on success, call function for new city

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

  //calling separate function to get uvData api call needs lat and lon coordinates for city
  getUV(response.coord.lat, response.coord.lon);
  getForecast();
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
}

function getForecast() {
  //api call for the five day forecast.
  var api_key = "8dff016de80855507b8d119c673b5b76";
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + api_key;

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

function updateCityData() {
  clearDashboard();

  if (document.getElementById("inputCity").value != undefined) {
    if (document.getElementById("inputCity").value != "") {

      lastCity = document.getElementById("inputCity").value;
      city = lastCity;
      makeChanges(city);
    }
  }
}

function historyClick(id) {
  clearDashboard();
  $("#uv").empty();
  city = document.getElementById(id).innerHTML;
  // call with history city
  makeChanges(city);
}

var k = 1;
function makeChanges(city) {
  queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api_key;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    lastCity = city;
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

    getForecast();
    localStorage.setItem("lastCity", lastCity);

    // add current city  to the history
    var histDiv = document.getElementById("histList");
    var button = document.createElement('BUTTON');
    var text = document.createTextNode(lastCity);
    button.appendChild(text);
    button.setAttribute("id", lastCity + k);
    histDiv.appendChild(button);
    button.addEventListener("click", function () {

      historyClick(this.id);

    });
    k++;
  }).catch(function (xhr, ajaxOptions, thrownError) {
    $("#current-date").text("Please enter a valid city name.")
    // normally this would go to an error message element that is display in redish

  })

}
//function to clear the five day display data so next city chosen can display. 
function clearDashboard() {
  var i;
  var j = 1;

  for (i = 0; i < 5; i++) {
    var dispId = "day" + j;
    var parentNode = document.getElementById(dispId);
    parentNode.querySelectorAll('*').forEach(n => n.remove());
    j++;
  }

  document.getElementById("uv-box").innerHTML = "";
}

//on success      //on click add city to history box. prepend the list
//create var to hold the response data
//current city searched, ends up being lastCity in local storage,
//and pulled from storage displayed as current city as page loads.
// document.getElementById("current-city").append(lastCity);
