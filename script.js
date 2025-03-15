const apiKey = "b2bf58ded09d8abe8c1b75f4d6a8aaa4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.getElementById("searchBtn");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

    if (!response.ok) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    const data = await response.json();
    console.log(data); // Debugging: View response in console

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Update weather icon based on condition
    const weatherCondition = data.weather[0].main.toLowerCase();

    if (weatherCondition.includes("cloud")) {
        weatherIcon.src = "images/clouds.png";
    } else if (weatherCondition.includes("clear")) {
        weatherIcon.src = "images/clear.png";
    } else if (weatherCondition.includes("rain")) {
        weatherIcon.src = "images/rain.png";
    } else if (weatherCondition.includes("drizzle")) {
        weatherIcon.src = "images/drizzle.png";
    } else if (weatherCondition.includes("mist")) {
        weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

// Add event listener for search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
