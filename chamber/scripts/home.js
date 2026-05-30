// -----------------------------
// Weather + Spotlights for Home
// -----------------------------

// OpenWeatherMap configuration
const apiKey = "32be7bb7a0f9626311e2b66aa614c801";
const city = "Salt Lake City";
const units = "imperial";

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
  city
)}&units=${units}&appid=${apiKey}`;

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
  city
)}&units=${units}&appid=${apiKey}`;

// Wind chill calculation (Fahrenheit)
function calculateWindChill(tempF, speedMph) {
  return (
    35.74 +
    0.6215 * tempF -
    35.75 * Math.pow(speedMph, 0.16) +
    0.4275 * tempF * Math.pow(speedMph, 0.16)
  ).toFixed(1);
}

// -----------------------------
// Weather: current + 3-day forecast
// -----------------------------
async function fetchWeather() {
  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl),
    ]);

    if (!currentRes.ok || !forecastRes.ok) {
      throw new Error("Weather API request failed");
    }

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    updateCurrentWeather(currentData);
    updateForecast(forecastData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    const tempSpan = document.querySelector("#temp");
    const condSpan = document.querySelector("#conditions");
    const windSpan = document.querySelector("#wind");
    const chillSpan = document.querySelector("#windchill");

    if (tempSpan) tempSpan.textContent = "N/A";
    if (condSpan) condSpan.textContent = "Unavailable";
    if (windSpan) windSpan.textContent = "N/A";
    if (chillSpan) chillSpan.textContent = "N/A";
  }
}

function updateCurrentWeather(data) {
  const tempSpan = document.querySelector("#temp");
  const windSpan = document.querySelector("#wind");
  const chillSpan = document.querySelector("#windchill");
  const condSpan = document.querySelector("#conditions");
  const iconImg = document.querySelector("#weather-icon");

  const temperature = data.main?.temp;
  const windSpeed = data.wind?.speed;
  const description = data.weather?.[0]?.description || "N/A";
  const iconCode = data.weather?.[0]?.icon;

  if (tempSpan && typeof temperature === "number") {
    tempSpan.textContent = `${Math.round(temperature)}°F`;
  }

  if (windSpan && typeof windSpeed === "number") {
    windSpan.textContent = `${Math.round(windSpeed)} mph`;
  }

  if (condSpan) {
    condSpan.textContent = description
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  if (
    chillSpan &&
    typeof temperature === "number" &&
    typeof windSpeed === "number"
  ) {
    if (temperature <= 50 && windSpeed > 3) {
      const chill = calculateWindChill(temperature, windSpeed);
      chillSpan.textContent = `${chill}°F`;
    } else {
      chillSpan.textContent = "N/A";
    }
  }

  if (iconImg && iconCode) {
    iconImg.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconImg.alt = `${description} weather icon`;
  }
}

function updateForecast(forecastData) {
  const forecastList = document.querySelector("#forecast-list");
  if (!forecastList) return;

  forecastList.innerHTML = "";

  // Pick 3 days at around midday
  const daily = forecastData.list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .slice(0, 3);

  daily.forEach((item) => {
    const li = document.createElement("li");

    const date = new Date(item.dt_txt);
    const options = { weekday: "short", month: "short", day: "numeric" };
    const label = date.toLocaleDateString("en-US", options);

    const temp = Math.round(item.main.temp);
    const desc = item.weather?.[0]?.description || "";

    li.textContent = `${label}: ${temp}°F – ${desc}`;
    forecastList.appendChild(li);
  });
}

// -----------------------------
// Member Spotlights
// -----------------------------
async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error("Failed to load members.json");
    }

    const members = await response.json();

    // Filter gold (3) and silver (2)
    const eligible = members.filter(
      (member) =>
        member.membershipLevel === 3 || member.membershipLevel === 2
    );

    if (eligible.length === 0) return;

    // Shuffle and pick 2 or 3 members
    const shuffled = [...eligible].sort(() => Math.random() - 0.5);
    const count = Math.min(3, Math.max(2, shuffled.length));
    const selected = shuffled.slice(0, count);

    const container = document.querySelector("#spotlight-container");
    if (!container) return;

    container.innerHTML = "";

    selected.forEach((member) => {
      const card = document.createElement("article");
      card.classList.add("content-card");

      card.innerHTML = `
        <h3>${member.name}</h3>
        <img src="${member.image}" alt="${member.name} logo" loading="lazy">
        <p><strong>Membership:</strong> ${
          member.membershipLevel === 3 ? "Gold" : "Silver"
        }</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><a href="${member.website}" class="inline-link" target="_blank" rel="noopener">Visit Website</a></p>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading spotlights:", error);
  }
}

// -----------------------------
// Initialize on load
// -----------------------------
fetchWeather();
loadSpotlights();
