const courses = [
    // Completed Courses
    { code: "CS 104", name: "Foundations of Applied Programming", credits: 2, type: "CSE", completed: true },
    { code: "CSE 110", name: "Introduction to Programming", credits: 2, type: "CSE", completed: true },
    { code: "CSE 111", name: "Programming with Classes", credits: 2, type: "CSE", completed: true },
    { code: "CSE 210", name: "Programming with Classes", credits: 2, type: "CSE", completed: true },
    { code: "CSE 340", name: "Web Backend Development", credits: 3, type: "CSE", completed: true },
    { code: "WDD 130", name: "Web Fundamentals", credits: 2, type: "WDD", completed: true },
    { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, type: "WDD", completed: true },
  
    // Currently Taking
    { code: "CSE 212", name: "Data Structures", credits: 2, type: "CSE", completed: false },
    { code: "CSE 341", name: "Web Services", credits: 3, type: "CSE", completed: false },
    { code: "WDD 231", name: "Web Frontend Development I", credits: 3, type: "WDD", completed: false },
  
    // Not Yet Taken
    { code: "CSE 213", name: "Web Engineering I", credits: 2, type: "CSE", completed: false }
  ];
  
  const courseList = document.getElementById("course-list");
  const filterButtons = document.querySelectorAll(".course-filters button");
  const totalCreditsSpan = document.getElementById("total-credits");
  
  function renderCourses(filter = "all") {
    let filteredCourses = courses;
  
    if (filter === "wdd") {
      filteredCourses = courses.filter(course => course.type === "WDD");
    } else if (filter === "cse") {
      filteredCourses = courses.filter(course => course.type === "CSE");
    }
  
    courseList.innerHTML = "";
  
    filteredCourses.forEach(course => {
      const card = document.createElement("article");
      card.classList.add("course-card");
      if (course.completed) {
        card.classList.add("completed");
      }
  
      card.innerHTML = `
        <h3>${course.code} – ${course.name}</h3>
        <p class="course-meta">
          Credits: ${course.credits} • ${course.type}
          ${course.completed ? " • Completed" : ""}
        </p>
      `;
  
      courseList.appendChild(card);
    });
  
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsSpan.textContent = totalCredits;
  }
  
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      renderCourses(button.dataset.filter);
    });
  });
  
  renderCourses();
  