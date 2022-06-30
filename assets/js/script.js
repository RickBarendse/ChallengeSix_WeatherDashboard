// set global variables
var cityFormEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city");
var cityCardEl = document.querySelector("#city-buttons")
var currentSearchCityEl = document.querySelector("#currentSearch")
//var currentCityEl = document.querySelector("#selected-city")
var currentDateEl = document.querySelector("#currentDate")
var currentWeatherEl = document.querySelector("#current-weather-container")
var currentSearchTempEl = document.querySelector('#currentTemp')
var currentSearchWindEl = document.querySelector('#currentWind')
var currentSearchHumidityEl = document.querySelector('#currentHumidity')
var currentSearchUvIndexEl = document.querySelector('#currentUvIndex')
var dayOneSearchEl = document.querySelector("#dayOne")
var dayOneSearchForecastEl = document.querySelector("#dayOneForecast")
var dayOneSearchTempEl = document.querySelector("#dayOneTemp")
var dayOneSearchWindEl = document.querySelector("#dayOneWind")
var dayOneSearchHumidityEl = document.querySelector("#dayOneHumidity")
var dayTwoSearchEl = document.querySelector("#dayTwo")
var dayTwoSearchForecastEl = document.querySelector("#dayTwoForecast")
var dayTwoSearchTempEl = document.querySelector("#dayTwoTemp")
var dayTwoSearchWindEl = document.querySelector("#dayTwoWind")
var dayTwoSearchHumidityEl = document.querySelector("#dayTwoHumidity")
var dayThreeSearchEl = document.querySelector("#dayThree")
var dayThreeSearchForecastEl = document.querySelector("#dayThreeForecast")
var dayThreeSearchTempEl = document.querySelector("#dayThreeTemp")
var dayThreeSearchWindEl = document.querySelector("#dayThreeWind")
var dayThreeSearchHumidityEl = document.querySelector("#dayThreeHumidity")
var dayFourSearchEl = document.querySelector("#dayFour")
var dayFourSearchForecastEl = document.querySelector("#dayFourForecast")
var dayFourSearchTempEl = document.querySelector("#dayFourTemp")
var dayFourSearchWindEl = document.querySelector("#dayFourWind")
var dayFourSearchHumidityEl = document.querySelector("#dayFourHumidity")
var dayFiveSearchEl = document.querySelector("#dayFive")
var dayFiveSearchForecastEl = document.querySelector("#dayFiveForecast")
var dayFiveSearchTempEl = document.querySelector("#dayFiveTemp")
var dayFiveSearchWindEl = document.querySelector("#dayFiveWind")
var dayFiveSearchHumidityEl = document.querySelector("#dayFiveHumidity")
var apiKey = "ddcbe1b461d070064d430ea95f952674"

var cityArray = [];

var loadCities = function() {
    var citiesSaved = localStorage.getItem("cityArray")
    if(!citiesSaved) {
        return false;
    }

    citiesSaved = JSON.parse(citiesSaved);

    for (var i=0; i < citiesSaved.length; i++) {
        displaySearchedCities(citiesSaved[i])
        cityArray.push(citiesSaved[i])
    }
}

// function to save past city searches to local storage
var saveCities = function() {
    localStorage.setItem("cities", JSON.stringify(cityArray));
}

var displaySearchedCities = function(city) {
    var cityButton= document.createElement("div");
    cityButton.setAttribute("class", "card");
    var cityButtonName = document.createElement("div");
    cityButtonName.setAttribute("class", "card-body search-city");
    cityButtonName.textContent = city;

    cityButton.appendChild(cityButtonName)

    cityButton.addEventListener("click", function () {
        getWeather(city)
    });

    cityCardEl.appendChild(cityButton)
}

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
}



// function to get the weather for city in search input
var getWeather = function(city) {
    var apiUrl = ("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey);

    fetch(apiUrl)
    .then(function(response) {
        response.json().then(function(data){
            var lat = (data.coord.lat)
            var lon = (data.coord.lon)
            //console.log(data)
            console.log(data, city)
            console.log(data, lat)
            console.log(data, lon)

            // var getCurrentWeather = function() {
            //     getCurrentWeather(lat, lon);
            var apiCurrentUrl = ("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid="  + apiKey);
            
            return fetch(apiCurrentUrl)
            .then(function(response) {
                response.json().then(function(info) {
                    console.log(info, info.current.uvi)    
                    displayFiveDayWeather(info);
                })

                var prevSearch = cityArray.includes(city)
                if (!prevSearch) {
                    cityArray.push(city)
                    saveCities()
                    displaySearchedCities(city)
                }
            }),
        displayCurrentWeather(data, city);
        });
    });
};

var displayCurrentWeather = function(city){
     //clear old content
    currentSearchCityEl.textContent="";
    currentDateEl.textContent="";
    currentWeatherEl.textContent="";
    currentSearchTempEl.textContent="";
    currentSearchHumidityEl.textContent="";
    currentSearchWindEl.textContent="";
    citySearchEl=city;


     // create date elements for weather attributes
    var currentCityEl = document.createElement("span");
        currentCityEl.setAttribute("id", "searchCity");
        currentCityEl.textContent = city.name;
    var today = document.createElement("span");
        today.setAttribute("id", "today");
        today.textContent=moment(city.dt.value).format("ddd MMM D, YYYY");
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

var displayFiveDayWeather = function(info) {
    currentSearchUvIndexEl.textContent="";
    dayOneSearchEl.textContent="";
    dayTwoSearchEl.textContent="";
    dayThreeSearchEl.textContent="";
    dayFourSearchEl.textContent="";
    dayFiveSearchEl.textContent="";
    dayOneSearchForecastEl.textContent="";
    dayTwoSearchForecastEl.textContent="";
    dayThreeSearchForecastEl.textContent="";
    dayFourSearchForecastEl.textContent="";
    dayFiveSearchForecastEl.textContent="";
    dayOneSearchTempEl.textContent="";
    dayTwoSearchTempEl.textContent="";
    dayThreeSearchTempEl.textContent="";
    dayFourSearchTempEl.textContent="";
    dayFiveSearchTempEl.textContent="";
    dayOneSearchWindEl.textContent="";
    dayTwoSearchWindEl.textContent="";
    dayThreeSearchWindEl.textContent="";
    dayFourSearchWindEl.textContent="";
    dayFiveSearchWindEl.textContent="";
    dayOneSearchHumidityEl.textContent="";
    dayTwoSearchHumidityEl.textContent="";
    dayThreeSearchHumidityEl.textContent="";
    dayFourSearchHumidityEl.textContent="";
    dayFiveSearchHumidityEl.textContent="";

    for (let i = 0; i != info.daily.length; i+=8)

    console.log(info.daily)
    var currentUvIndexEl = document.createElement("span");
        currentUvIndexEl.textContent = info.current.uvi; 

        currentSearchUvIndexEl.appendChild(currentUvIndexEl);

    var dayOneEl = document.createElement("span");
        dayOneEl.textContent = moment().add(1, 'days').format("ddd MMM D");//info.daily[1].dt;
    var dayOneForecastEl = document.createElement("span");
        dayOneForecastEl.textContent = info.daily[1].weather[0].icon;
    var dayOneTempEl = document.createElement("span");
        dayOneTempEl.textContent = info.daily[1].temp.day + " F";
    var dayOneWindEl = document.createElement("span");
        dayOneWindEl.textContent = info.daily[1].wind_speed + " MPH";
    var dayOneHumidityEl = document.createElement("span");
        dayOneHumidityEl.textContent = info.daily[1].humidity + " %";

    var dayTwoEl = document.createElement("span");
        dayTwoEl.textContent = moment().add(2, 'days').format("ddd MMM D");//info.daily[2].dt;
    var dayTwoForecastEl = document.createElement("span");
        dayTwoForecastEl.textContent = info.daily[2].weather[0].icon;
    var dayTwoTempEl = document.createElement("span");
        dayTwoTempEl.textContent = info.daily[2].temp.day + " F";
    var dayTwoWindEl = document.createElement("span");
        dayTwoWindEl.textContent = info.daily[2].wind_speed + " MPH";
    var dayTwoHumidityEl = document.createElement("span");
        dayTwoHumidityEl.textContent = info.daily[2].humidity + " %";

    var dayThreeEl = document.createElement("span");
        dayThreeEl.textContent = moment().add(3, 'days').format("ddd MMM D");//info.daily[3].dt;
    var dayThreeForecastEl = document.createElement("span");
        dayThreeForecastEl.textContent = info.daily[3].weather[0].icon;    
    var dayThreeTempEl = document.createElement("span");
        dayThreeTempEl.textContent = info.daily[3].temp.day + " F";
    var dayThreeWindEl = document.createElement("span");
        dayThreeWindEl.textContent = info.daily[3].wind_speed + " MPH";
    var dayThreeHumidityEl = document.createElement("span");
        dayThreeHumidityEl.textContent = info.daily[3].humidity + " %";

    var dayFourEl = document.createElement("span");
        dayFourEl.textContent = moment().add(4, 'days').format("ddd MMM D");//info.daily[4].dt;
    var dayFourForecastEl = document.createElement("span");
        dayFourForecastEl.textContent = info.daily[4].weather[0].icon;
    var dayFourTempEl = document.createElement("span");
        dayFourTempEl.textContent = info.daily[4].temp.day + " F";
    var dayFourWindEl = document.createElement("span");
        dayFourWindEl.textContent = info.daily[4].wind_speed + " MPH";
    var dayFourHumidityEl = document.createElement("span");
        dayFourHumidityEl.textContent = info.daily[4].humidity + " %";
    
    var dayFiveEl = document.createElement("span");
        dayFiveEl.textContent = moment().add(5, 'days').format("ddd MMM D");//info.daily[5].dt;
    var dayFiveForecastEl = document.createElement("span");
        dayFiveForecastEl.textContent = info.daily[5].weather[0].icon;
    var dayFiveTempEl = document.createElement("span");
        dayFiveTempEl.textContent = info.daily[5].temp.day + " F";
    var dayFiveWindEl = document.createElement("span");
        dayFiveWindEl.textContent = info.daily[5].wind_speed + " MPH";
    var dayFiveHumidityEl = document.createElement("span");
        dayFiveHumidityEl.textContent = info.daily[5].humidity + " %";

    dayOneSearchEl.appendChild(dayOneEl);
    dayOneSearchForecastEl.appendChild(dayOneForecastEl);
    dayOneSearchTempEl.appendChild(dayOneTempEl);
    dayOneSearchWindEl.appendChild(dayOneWindEl);
    dayOneSearchHumidityEl.appendChild(dayOneHumidityEl);

    dayTwoSearchEl.appendChild(dayTwoEl);
    dayTwoSearchForecastEl.appendChild(dayTwoForecastEl);
    dayTwoSearchTempEl.appendChild(dayTwoTempEl);
    dayTwoSearchWindEl.appendChild(dayTwoWindEl);
    dayTwoSearchHumidityEl.appendChild(dayTwoHumidityEl);

    dayThreeSearchEl.appendChild(dayThreeEl);
    dayThreeSearchForecastEl.appendChild(dayThreeForecastEl);
    dayThreeSearchTempEl.appendChild(dayThreeTempEl);
    dayThreeSearchWindEl.appendChild(dayThreeWindEl);
    dayThreeSearchHumidityEl.appendChild(dayThreeHumidityEl);

    dayFourSearchEl.appendChild(dayFourEl);
    dayFourSearchForecastEl.appendChild(dayFourForecastEl);
    dayFourSearchTempEl.appendChild(dayFourTempEl);
    dayFourSearchWindEl.appendChild(dayFourWindEl);
    dayFourSearchHumidityEl.appendChild(dayFourHumidityEl);

    dayFiveSearchEl.appendChild(dayFiveEl);
    dayFiveSearchForecastEl.appendChild(dayFiveForecastEl);
    dayFiveSearchTempEl.appendChild(dayFiveTempEl);
    dayFiveSearchWindEl.appendChild(dayFiveWindEl);
    dayFiveSearchHumidityEl.appendChild(dayFiveHumidityEl);
};

cityFormEl.addEventListener("submit", formSubmitHandler);