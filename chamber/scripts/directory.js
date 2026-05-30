// Cache container reference
const container = document.getElementById("members-container");

let membersData = [];

// ===============================
// Fetch Members JSON (with caching)
// ===============================
async function getMembers() {
  try {
    const cacheKey = "members-cache-v1";
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      membersData = JSON.parse(cached);
      displayGridView();
    }

    const response = await fetch("data/members.json", { cache: "no-store" });

    if (response.ok) {
      const freshData = await response.json();
      membersData = freshData;
      localStorage.setItem(cacheKey, JSON.stringify(freshData));

      displayGridView();
    }

  } catch (error) {
    console.error("Error loading members:", error);
  }
}

// ===============================
// Membership Labels
// ===============================
function mapMembership(level) {
  switch (level) {
    case 1: return "Member";
    case 2: return "Silver";
    case 3: return "Gold";
    default: return "Member";
  }
}

// ===============================
// Create GRID Card
// ===============================
function createMemberCard(member) {
  const card = document.createElement("article");
  card.classList.add("member-card");

  const img = document.createElement("img");
  img.src = member.image;
  img.alt = `${member.name} logo`;

  img.loading = "lazy";
  img.decoding = "async";
  img.fetchPriority = "low";

  img.width = 300;
  img.height = 200;
  img.style.aspectRatio = "3 / 2";
  img.style.objectFit = "cover";
  img.style.background = "#e2e8f0";

  const name = document.createElement("h3");
  name.textContent = member.name;

  const address = document.createElement("p");
  address.textContent = member.address;

  const phone = document.createElement("p");
  phone.textContent = member.phone;

  const website = document.createElement("p");
  const link = document.createElement("a");
  link.href = member.website;
  link.textContent = "Visit Website";
  link.target = "_blank";
  link.rel = "noopener";
  website.appendChild(link);

  const membership = document.createElement("p");
  membership.textContent = `Membership: ${mapMembership(member.membershipLevel)}`;

  card.append(img, name, address, phone, website, membership);
  return card;
}

// ===============================
// Create LIST Row
// ===============================
function createMemberRow(member) {
  const row = document.createElement("section");
  row.classList.add("member-row");

  row.innerHTML = `
    <p><strong>${member.name}</strong></p>
    <p>${member.address}</p>
    <p>${member.phone}</p>
    <p><a href="${member.website}" target="_blank" rel="noopener">Website</a></p>
    <p>${mapMembership(member.membershipLevel)}</p>
  `;

  return row;
}

// ===============================
// Display GRID View
// ===============================
function displayGridView() {
  if (!container) return;

  const fragment = document.createDocumentFragment();

  membersData.forEach((member) => {
    fragment.appendChild(createMemberCard(member));
  });

  container.innerHTML = "";
  container.classList.remove("list-view");
  container.classList.add("grid-view");

  const gridBtn = document.getElementById("grid-view");
  const listBtn = document.getElementById("list-view");

  if (gridBtn && listBtn) {
    gridBtn.classList.add("active-view");
    listBtn.classList.remove("active-view");
  }

  container.appendChild(fragment);
}

// ===============================
// Display LIST View
// ===============================
function displayListView() {
  if (!container) return;

  const fragment = document.createDocumentFragment();

  membersData.forEach((member) => {
    fragment.appendChild(createMemberRow(member));
  });

  container.innerHTML = "";
  container.classList.remove("grid-view");
  container.classList.add("list-view");

  const gridBtn = document.getElementById("grid-view");
  const listBtn = document.getElementById("list-view");

  if (gridBtn && listBtn) {
    listBtn.classList.add("active-view");
    gridBtn.classList.remove("active-view");
  }

  container.appendChild(fragment);
}

// ===============================
// Event Listeners
// ===============================
const gridButton = document.getElementById("grid-view");
const listButton = document.getElementById("list-view");

if (container && gridButton && listButton) {
  gridButton.addEventListener("click", displayGridView);
  listButton.addEventListener("click", displayListView);

  // ===============================
  // Load Members on Page Load
  // ===============================
  getMembers();
}
