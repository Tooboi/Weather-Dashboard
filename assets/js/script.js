// AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly
//
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var today = dayjs().format("MMMM D, YYYY h:mm A");
console.log(today);
var repoList = document.querySelector("ul");
var searchButton = document.getElementById("searchBtn");
var lat = 44;
var long = 50;


function getApi(event) {
  event.preventDefault();
  var city = document.getElementById("floatingInput").value;
  document.getElementById("floatingInput").value = "";
  window.localStorage.setItem("city", JSON.stringify(city));
  console.log(city);
//   var requestCityUrl =
//     "api.openweathermap.org/geo/1.0/direct?q=" +
//     city +
//     "&limit=1&appid=bc8b625028ac837ee20e61a315479c7e";
  var requestUrl ="https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=bc8b625028ac837ee20e61a315479c7e";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    //   for (let i = 0; i < 5.length; i++) {
    //     const element = 5[i];
        
    //   }
        console.log(data);
    });
    }
//   console.log(requestCityUrl);
//   console.log(requestUrl);
searchButton.addEventListener("click", getApi);