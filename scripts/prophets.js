const url = "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";
const cards = document.querySelector("#cards");

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();

  displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
  prophets.forEach((prophet, index) => {
    // Create elements
    const card = document.createElement("section");
    const fullName = document.createElement("h2");
    const portrait = document.createElement("img");
    const birth = document.createElement("p");
    const place = document.createElement("p");

    // Fill content
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    birth.textContent = `Date of Birth: ${prophet.birthdate}`;
    place.textContent = `Place of Birth: ${prophet.birthplace}`;

    // Image attributes
    portrait.setAttribute("src", prophet.imageurl);
    portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "340");
    portrait.setAttribute("height", "440");

    // Only FIRST image gets high priority (LCP fix)
    if (index === 0) {
      portrait.setAttribute("fetchpriority", "high");
    }

    // Build card
    card.appendChild(fullName);
    card.appendChild(birth);
    card.appendChild(place);
    card.appendChild(portrait);

    cards.appendChild(card);
  });
};

getProphetData();
