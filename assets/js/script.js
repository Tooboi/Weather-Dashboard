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
var historyEl = document.getElementById('searchHistory');
var body = document.querySelector("body");
var searchButton = document.getElementById("searchBtn");
if (localStorage.getItem('city') == null) {
  localStorage.setItem('city', '[]');
};

function getApi(event) {
  event.preventDefault();

//get city name
var city = document.getElementById("floatingInput").value;
//get old info and add new
var oldCities = JSON.parse(localStorage.getItem('city'));
oldCities.unshift(city);
//save old and new together
localStorage.setItem('city', JSON.stringify(oldCities));
console.log("oldCities ", oldCities);
document.getElementById('searchHistory').textContent = ""
//make buttons
for (let i = 0; i < oldCities.length; i++) {
  //if not included in array add button
  if (!oldCities.includes(JSON.stringify(oldCities[i]))) {
    var btn = document.createElement('button');
    var previous = document.createTextNode(oldCities[i]);
    btn.classList.add('btn', 'custom-btn', 'btn-sm', 'my-2');
    btn.appendChild(previous);
    historyEl.appendChild(btn)
  }
}
//clear text field
document.getElementById("floatingInput").value = "";
console.log(city);

  var requestUrl ="https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=bc8b625028ac837ee20e61a315479c7e&units=imperial";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

        for (let i = 0; i < 5; i++) {
            document.getElementById('day' + (i+1) +"humid").innerHTML = 'Humidity: ' + Number(data.list[i * 8].main.humidity) + " %";
            document.getElementById('day' + (i+1) +"temp").innerHTML = 'Temperature: ' + Number(data.list[i * 8].main.temp).toFixed(0) + "°F";
            document.getElementById('day' + (i+1) +"wind").innerHTML = 'Wind: ' + Number(data.list[i * 8].wind.speed).toFixed(0) + " mph";
            var day = dayjs((Number(data.list[i * 8].dt)) * 1000).format("ddd, MMM D");
            document.getElementById('day' + (i+1) +"day").innerHTML = day;
            var icon = data.list[i * 8].weather[0].icon;
            document.getElementById('day' + (i+1) +"icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            document.getElementById('day0humid').innerHTML = 'Humidity: ' + Number(data.list[0].main.humidity) + " %";
            document.getElementById('day0temp').innerHTML = 'Temperature: ' + Number(data.list[0].main.temp).toFixed(0) + "°F";
            document.getElementById('day0wind').innerHTML = 'Wind: ' + Number(data.list[0].wind.speed).toFixed(0) + " mph";
            var mainDay = dayjs((Number(data.list[0].dt)) * 1000).format("MMM D, YYYY h:mm A") 
            document.getElementById('day0day').innerHTML = mainDay;
            var mainIcon = data.list[0].weather[0].icon;
            document.getElementById('day0icon').src = "http://openweathermap.org/img/wn/" + mainIcon + "@2x.png";
            document.getElementById('mainCity').innerHTML = (data.city.name)+ ', ' +(data.city.country);
        }
        console.log(data);
    });
    }

searchButton.addEventListener("click", getApi);