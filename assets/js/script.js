// set global variables
var cityFormEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city");
var currentSearchCityEl = document.querySelector("#currentSearch")
//var currentCityEl = document.querySelector("#selected-city")
var currentDateEl = document.querySelector("#currentDate")
var currentWeatherEl = document.querySelector("#current-weather-container")
var currentSearchTempEl = document.querySelector('#currentTemp')
var currentSearchWindEl = document.querySelector('#currentWind')
var currentSearchHumidityEl = document.querySelector('#currentHumidity')
var currentSearchUvIndexEl = document.querySelector('currentUvIndex')
var apiKey = "ddcbe1b461d070064d430ea95f952674"


var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if(city) {
        getWeather(city);
        //get5Day(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city name.")
    }
    //saveSearch();
    //savedSearches(city);
    }

    // function to save past city searches to local storage
var saveSearch = function() {
    localStorage.setItem("cities", JSON.stringify(city));
}

// function to get the weather for city in search input
var getWeather = function(city) {
    var apiUrl = ("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey);

    fetch(apiUrl)
    .then(function(response) {
        response.json().then(function(data){
            console.log(data);
        displayWeather(data, city);
        });
    });
};

var displayWeather = function(city){
     //clear old content
    currentSearchCityEl.textContent="";
    currentDateEl.textContent="";
    currentWeatherEl.textContent="";
    citySearchEl=city;

     // create date elements for weather attributes
    var currentCityEl = document.createElement("span");
        currentCityEl.setAttribute("id", "searchCity");
        currentCityEl.textContent = city.name;
    var today = document.createElement("span");
        today.setAttribute("id", "today");
        today.textContent=moment(city.dt.value).format("MMM D, YYYY");
    var currentTempEl = document.createElement("span");
        currentTempEl.textContent = city.main.temp + " F";
    var currentWindEl = document.createElement("span");
        currentWindEl.textContent = city.wind.speed + " MPH";
    var currentHumidityEl = document.createElement("span");
        currentHumidityEl.textContent = city.main.humidity + " %";
        
        
        currentSearchCityEl.appendChild(currentCityEl);
        currentDateEl.appendChild(today);
        currentSearchTempEl.appendChild(currentTempEl);
        currentSearchWindEl.appendChild(currentWindEl);
        currentSearchHumidityEl.appendChild(currentHumidityEl);
};

cityFormEl.addEventListener("submit", formSubmitHandler);