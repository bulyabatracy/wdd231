const courses = [
    {
        subject: "WDD",
        number: 130,
        credits: 2,
        completed: true
    },

    {
        subject: "WDD",
        number: 131,
        credits: 2,
        completed: false
    },

    {
        subject: "CSE",
        number: 110,
        credits: 2,
        completed: true
    },

    {
        subject: "CSE",
        number: 111,
        credits: 2,
        completed: false
    },

    {
        subject: "WDD",
        number: 231,
        credits: 2,
        completed: false
    },

    {
        subject: "CSE",
        number: 210,
        credits: 2,
        completed: false
    }
];

const container = document.querySelector("#courses");

const credits = document.querySelector("#credits");

function displayCourses(courseList) {

    container.innerHTML = "";

    courseList.forEach(course => {

        let div = document.createElement("div");

        div.className = "course";

        if (course.completed) {

            div.classList.add("completed");

        }

        div.innerHTML = `${course.subject} ${course.number}`;

        container.appendChild(div);

    });

    credits.textContent =
        `The total credits for course listed above is ${courseList.reduce((sum, course) => sum + course.credits, 0)
        }`;

}

displayCourses(courses);

document.querySelector("#all").onclick = () => displayCourses(courses);

document.querySelector("#wdd").onclick = () => displayCourses(courses.filter(course => course.subject === "WDD"));

document.querySelector("#cse").onclick = () => displayCourses(courses.filter(course => course.subject === "CSE"));