// Course List
const courses = [
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false
    },
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: false
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: false
    }
];

// HTML Elements
const courseContainer = document.getElementById("courses");
const credits = document.getElementById("credits");

const allBtn = document.getElementById("all");
const wddBtn = document.getElementById("wdd");
const cseBtn = document.getElementById("cse");

// Display Courses
function displayCourses(courseList) {

    courseContainer.innerHTML = "";

    courseList.forEach(course => {

        const card = document.createElement("div");

        card.classList.add("course");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>${course.credits} Credits</p>
        `;

        courseContainer.appendChild(card);
    });

    displayCredits(courseList);
}

// Display Credits
function displayCredits(courseList) {

    const totalCredits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );

    credits.textContent =
        `Total Credits: ${totalCredits}`;
}

// Active Button
function setActiveButton(button) {

    document.querySelectorAll(".buttons button").forEach(btn =>
        btn.classList.remove("active")
    );

    button.classList.add("active");
}

// Button Events
allBtn.addEventListener("click", () => {

    setActiveButton(allBtn);

    displayCourses(courses);

});

wddBtn.addEventListener("click", () => {

    setActiveButton(wddBtn);

    const wddCourses = courses.filter(course => course.subject === "WDD");

    displayCourses(wddCourses);

});

cseBtn.addEventListener("click", () => {

    setActiveButton(cseBtn);

    const cseCourses = courses.filter(course => course.subject === "CSE");

    displayCourses(cseCourses);

});

// Default Page Load
setActiveButton(allBtn);
displayCourses(courses);

