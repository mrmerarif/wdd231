// ===============================
// This is my Home Page Weather Script
// ===============================

// ----- Static Weather Data -----
const temperature = 82; // °F
const windSpeed = 10;   // mph
const conditions = "Partly Cloudy";
const iconPath = "images/weather.svg"; // your actual icon file

// ----- Wind Chill Function -----
function calculateWindChill(tempF, speedMph) {
  return (
    35.74 +
    0.6215 * tempF -
    35.75 * Math.pow(speedMph, 0.16) +
    0.4275 * tempF * Math.pow(speedMph, 0.16)
  ).toFixed(1);
}

// ----- DOM Elements -----
const tempSpan = document.querySelector("#temp");
const windSpan = document.querySelector("#wind");
const chillSpan = document.querySelector("#windchill");
const condSpan = document.querySelector("#conditions");
const iconImg = document.querySelector("#weather-icon");

// ----- Display Static Values -----
if (tempSpan) tempSpan.textContent = `${temperature}°F`;
if (windSpan) windSpan.textContent = `${windSpeed} mph`;
if (condSpan) condSpan.textContent = conditions;

// ----- Wind Chill Conditions -----
let windChillValue = "N/A";
if (temperature <= 50 && windSpeed > 3) {
  windChillValue = calculateWindChill(temperature, windSpeed) + "°F";
}
if (chillSpan) chillSpan.textContent = windChillValue;

// ----- Weather Icon -----
if (iconImg) {
  iconImg.src = iconPath;
  iconImg.alt = `${conditions} weather icon`;
}
