"use strict";
const api = {
  key: "404ffe47b73bcd3090ed195c1210fdb7",
  base: "https://api.openweathermap.org/data/2.5/",
};

const place = document.querySelector(".location");
const date = document.querySelector(".date");
const temperature = document.querySelector(".temp");
const weatherEl = document.querySelector(".weather");
const hi_low = document.querySelector(".hi-low");
const searchBox = document.querySelector(".search-box");
const main = document.querySelector(".main");
const img_path = "images/";
searchBox.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchBox.value);
  }
}

function getResults(value) {
  fetch(`${api.base}weather?q=${value}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  place.textContent = `${weather.name},${weather.sys.country}`;

  if (weather.sys.country == undefined) {
    place.textContent = `${weather.name}`;
  }
  hi_low.textContent = `${Math.round(weather.main.temp_min)}°c/${Math.round(
    weather.main.temp_max
  )}°c`;
  temperature.textContent = Math.round(weather.main.temp) + "°c";
  let now = new Date();
  let date = document.querySelector(".date");
  let w = `${weather.weather[0].main}`.toLowerCase();

  weatherEl.textContent = `${weather.weather[0].main}`;
  main.style = `background-image: url(${img_path}${w}.jpg)`;

  if ( weatherEl.textContent=='Clouds') {
    temperature.style.color = "white";
    place.style.color = "white";
    date.style.color = "white";

  }
  let temp = weather.main.temp;
  if (temp <= 0) {
    main.style = `background-image: url(images/winter.jpg)`;
    place.style.color = "black";
    date.style.color = "black";
    temperature.style.color='black';
  }
  date.textContent = dateBuilder(now);

  searchBox.value = "";
}

function dateBuilder(d) {
  let months = [
    "January",
    "Februaury",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
