var weatherData;
var apiKey = "dfb8a695a0821dc381b96b2a5e7a03a6";
var apiAddress = "https://api.openweathermap.org/data/2.5/forecast?";
var long;
var lat;
var cityQuery = "https://api.openweathermap.org/data/2.5/weather?q=";
var tempCity;
var cityData;
var savedSearches = JSON.parse(localStorage.getItem("cityHistory")) || [];
var cityName;
var temp1;
var wind1;
var humidity1;



function getWeather() {
    $.ajax({
        type: "GET",
        async: false,
        url: `${apiAddress}lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`,
        cache: false,
        success: function (data) {
            weatherData = data;
            console.log("weatherData", weatherData);

            $("#five-day").empty()
            for (let i = 0; i < data.list.length; i++) {
                const item = data.list[i]
                let time = item.dt_txt.split(" ")
                if (time[1] === "12:00:00") {
                    const card = $(`
                <div class="col weatherBlock">
                            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt=""> 
                            <p class="leftStyling">Temperature:${item.main.temp} °F</p>
                            <p class="leftStyling">Wind:${item.wind.speed} MPH</p>
                            <p class="leftStyling">Humidity:${item.main.humidity} %</p>
                        </div>
                `);
                    $("#five-day").append(card)
                }
            }
        }
    });
}

function getCity() {
    tempCity = $("#citySearch").val();
    console.log("tempCity", tempCity);
    $.ajax({
        type: "GET",
        async: false,
        url: `${cityQuery}${tempCity}&appid=${apiKey}&units=imperial`,
        cache: false,
        success: function (data) {
            cityData = data;
            console.log("city", cityData);
            long = data.coord.lon;
            lat = data.coord.lat;
            $("#displayedTemp").text(data.main.temp);
            $("#displayedWind").text(data.wind.speed);
            $("#displayedHumidity").text(data.main.humidity)
        }
    });
}

function getForecast() {
    getCity();
    getWeather();


    if (!savedSearches.includes(tempCity)) {
        savedSearches.push(tempCity);
    }

    localStorage.setItem("cityHistory", JSON.stringify(savedSearches));

    var temp = $(`<button onclick=getWeather() class="btn btn-secondary btn-block">${tempCity}</button>`);
    $("#savedSearches").append(temp);
}

function renderHistory() {
    for (let i = 0; i < savedSearches.length; i++) {
        var temp = $(`<button onclick=getWeather() class="btn btn-secondary btn-block">${savedSearches[i]}</button>`);
        $("#savedSearches").append(temp);

    }

}
renderHistory();
