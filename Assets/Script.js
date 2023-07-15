var weatherData;
var apiKey = "dfb8a695a0821dc381b96b2a5e7a03a6";
var apiAddress = "https://api.openweathermap.org/data/2.5/forecast?";
var long;
var lat;
var cityQuery = "https://api.openweathermap.org/data/2.5/weather?q=";
var tempCity;
var cityData;
var savedSearches = [];
var cityName;
var temp1;
var wind1;
var humidity1;





// Grabs the weather data of typed in city
function getWeather(){
    $.ajax({
        type: "GET",
        async: false,
        url: `${apiAddress}lat=${lat}&lon=${long}&appid=${apiKey}`,
        cache: false,
        success: function(data){
            weatherData = data;
            console.log("weatherData", weatherData);
            $("#displayedCity").text(data.city.name);
            $("#displayedTemp").text(temp1 + "°F") ;
            $("#displayedWind").text(wind1 + "MPH");
            $("#displayedHumidity").text(humidity1 + "%");
        }
    });
}
// Grabs the latitude and longitude coordinates
function getCity(){
    tempCity = $("#citySearch").val();
    console.log("tempCity", tempCity);
    $.ajax({
        type: "GET",
        async: false,
        url: `${cityQuery}${tempCity}&appid=${apiKey}`,
        cache: false,
        success: function(data){
            cityData = data;
            console.log("city", cityData);
        long = data.coord.lon;
        lat = data.coord.lat;
        temp1 = data.main.temp;
        wind1 = data.wind.speed;
        humidity1 = data.main.humidity;

            console.log("wind", wind1);
            console.log("humidity", humidity1);

       

        }
    });
}
//Displays the Forecast on the page
function getForecast(){
    getCity();
    getWeather();
    savedSearches.push(tempCity);
    var temp = $(`<button onclick=getWeather() class="btn btn-secondary btn-block">${tempCity}</button>`);
    $("#savedSearches").append(tempCity);
    console.log("savedSearches", savedSearches);
    localStorage.setItem("stringsTest", JSON.stringify(savedSearches));
    console.log("local Storage", localStorage); 
    // Populate attributes on page with stored data
}


// function findSavedSearch() {
//     $("#citySearch").val() = 

// }