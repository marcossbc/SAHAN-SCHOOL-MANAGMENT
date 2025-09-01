document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', (event) => {
            // Stop the click from propagating to the document
            event.stopPropagation();
            nav.classList.toggle('active');
            hamburger.classList.toggle('open');
        });
    }

    // Close the menu if the user clicks outside of it
    document.addEventListener('click', (e) => {
        if (nav && hamburger) {
            if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
                nav.classList.remove('active');
                hamburger.classList.remove('open');
            }
        }
    });
});

function filterCourses(category) {
    let courses = document.querySelectorAll(".course-container .course");
    let buttons = document.querySelectorAll(".tabs button");

    buttons.forEach(btn => btn.classList.remove("active"));
    
    // Find the button that was clicked and add the active class
    const clickedButton = event.currentTarget;
    clickedButton.classList.add("active");

    courses.forEach(course => {
      if (category === "all" || course.classList.contains(category)) {
        course.style.display = "block";
      } else {
        course.style.display = "none";
      }
    });
}