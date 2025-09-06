document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', (event) => {
         
            event.stopPropagation();
            nav.classList.toggle('active');
            hamburger.classList.toggle('open');
        });
    }

   
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

 (function(){
    const btn = document.getElementById('scrollTopBtn');
    const showAfter = 200; // px - beddel haddii aad rabto

    // muujin/qarin marka la scroll gareeyo
    function checkScroll() {
        //. pageYOffset ereyga igu cusub 😒
      if (window.pageYOffset > showAfter) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    }

    // marka la riixo, u rid kor
    function scrollToTop(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    // event listeners
    window.addEventListener('scroll', checkScroll, { passive: true });
    btn.addEventListener('click', scrollToTop);
    
    checkScroll();
  })();