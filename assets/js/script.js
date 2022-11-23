var today = dayjs().format("MMMM D, YYYY h:mm A");
var historyEl = document.getElementById('searchHistory');
var body = document.querySelector("body");
var searchButton = document.getElementById("searchBtn");
if (localStorage.getItem('city') == null) {
  localStorage.setItem('city', '[]');
};
function getCity(event) {
  var city = document.getElementById("floatingInput").value;
  getApi(event, city)
}
function setRunCity(event) {
  var city = this.textContent
  getApi(event, city)
}
function getApi(event, city) {
  event.preventDefault();
//get old info and add new
var oldCities = JSON.parse(localStorage.getItem('city'));
oldCities.unshift(city);
oldCities.length = 5;
//save old and new together
localStorage.setItem('city', JSON.stringify(oldCities));
document.getElementById('searchHistory').textContent = ""
//make buttons
for (let i = 0; i < oldCities.length; i++) {
  //if not included in array add button
  if (!oldCities.includes(JSON.stringify(oldCities[i]))) {
    var btn = document.createElement('button');
    var previous = document.createTextNode(oldCities[i]);
    btn.classList.add('btn', 'custom-btn', 'btn-sm', 'my-2');
    btn.setAttribute('id', ('searchBtn') + [i]);
    btn.appendChild(previous);
    historyEl.appendChild(btn)
  }
  document.getElementById('searchBtn' + [i]).addEventListener('click', setRunCity)
}
//clear text field
document.getElementById("floatingInput").value = "";
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
            document.getElementById('day' + (i+1) +"icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            document.getElementById('day0humid').innerHTML = 'Humidity: ' + Number(data.list[0].main.humidity) + " %";
            document.getElementById('day0temp').innerHTML = 'Temperature: ' + Number(data.list[0].main.temp).toFixed(0) + "°F";
            document.getElementById('day0wind').innerHTML = 'Wind: ' + Number(data.list[0].wind.speed).toFixed(0) + " mph";
            var mainDay = dayjs((Number(data.list[0].dt)) * 1000).format("MMM D, YYYY h:mm A") 
            document.getElementById('day0day').innerHTML = mainDay;
            var mainIcon = data.list[0].weather[0].icon;
            document.getElementById('day0icon').src = "https://openweathermap.org/img/wn/" + mainIcon + "@2x.png";
            document.getElementById('mainCity').innerHTML = (data.city.name)+ ', ' +(data.city.country);
        }
    });
    }
searchButton.addEventListener("click", getCity);
