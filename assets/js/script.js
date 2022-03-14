// set global variables
var cityFormEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city");
var citySearchEl = document.querySelector("#selected-city")
var currentWeatherEl = document.querySelector("#current-weather-container")
var apiKey = "ddcbe1b461d070064d430ea95f952674"


var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if(city) {
        getWeather(city);
        get5Day(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city name.")
    }
    saveSearch();
    savedSearches(city);
    }

    // function to save past city searches to local storage
var saveSearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

// function to get the weather for city in search input
var getWeather = function(city) {
    var apiUrl = ("api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + apiKey);

    fetch(apiUrl)
    .then(function(response) {
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

var displayWeather = function(weather, inputCity){
    //clear old content
    currentWeatherEl.textContent="";
    citySearchEl.textContent=searchCity;

    // create date element
    var currentDate = document.createElement("span")
    currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ")";
    citySearchEl.appendChild(weather);
}

cityFormEl.addEventListener("submit", formSubmitHandler);