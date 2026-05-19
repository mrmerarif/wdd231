

// Cache container reference
const container = document.getElementById("members-container");


let membersData = [];

// ===============================
// Fetch Members JSON
// ===============================
async function getMembers() {
  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error("Failed to load member data.");
    }

    membersData = await response.json();
    displayGridView(); 

  } catch (error) {
    console.error("Error loading members:", error);
  }
}

// ===============================
// Membership Labels
// ===============================
function mapMembership(level) {
  switch (level) {
    case 1:
      return "Member";
    case 2:
      return "Silver";
    case 3:
      return "Gold";
    default:
      return "Member";
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

  
  img.width = 200;
  img.height = 140;

 
  img.sizes = "(max-width: 768px) 160px, 200px";

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
  container.innerHTML = "";
  container.classList.remove("list-view");
  container.classList.add("grid-view");

  const fragment = document.createDocumentFragment();

  membersData.forEach((member) => {
    fragment.appendChild(createMemberCard(member));
  });

  container.appendChild(fragment);
}

// ===============================
// Display LIST View
// ===============================
function displayListView() {
  container.innerHTML = "";
  container.classList.remove("grid-view");
  container.classList.add("list-view");

  const fragment = document.createDocumentFragment();

  membersData.forEach((member) => {
    fragment.appendChild(createMemberRow(member));
  });

  container.appendChild(fragment);
}

// ===============================
// Event Listeners
// ===============================
document.getElementById("grid-view").addEventListener("click", displayGridView);
document.getElementById("list-view").addEventListener("click", displayListView);

// ===============================
// Load Members on Page Load
// ===============================
getMembers();
