"use strict";

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      counter.classList.add("show");

      const target = +counter.dataset.target;
      const duration = 1500; // ms
      const startTime = performance.now();

      function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        counter.textContent = value;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
        }
      }

      requestAnimationFrame(update);
      obs.unobserve(counter); // run once
    });
  },
  { threshold: 0.3 },
);

counters.forEach((c) => observer.observe(c));

// Reveal sections
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Reveal Left Items Of Grid
const gridItemsLeft2 = document.querySelectorAll(".grid-item-left");

const revealLeftItem = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add("fade-in-left");
    observer.unobserve(entry.target);
  });
};

const itemLeftObserver = new IntersectionObserver(revealLeftItem, {
  root: null,
  threshold: 0.2,
});

gridItemsLeft2.forEach(function (item) {
  itemLeftObserver.observe(item);
  item.classList.remove("fade-in-left");
});

// Page loads
//     ↓
// Remove fade-in-left
//     ↓
// Element is hidden according to your CSS
//     ↓
// User scrolls
//     ↓
// 20% becomes visible
//     ↓
// Add fade-in-left
//     ↓
// Animation plays

// Reveal Right Items Of Grid
const gridItemsRight2 = document.querySelectorAll(".grid-item-right");

const revealItemRight = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add("fade-in-right");
    observer.unobserve(entry.target);
  });
};

const itemRightObserver = new IntersectionObserver(revealItemRight, {
  root: null,
  threshold: 0.2,
});

gridItemsRight2.forEach(function (item) {
  itemRightObserver.observe(item);
  item.classList.remove("fade-in-right");
});

// Page loads
//     ↓
// Remove fade-in-right
//     ↓
// Element is hidden according to your CSS
//     ↓
// User scrolls
//     ↓
// 20% becomes visible
//     ↓
// Add fade-in-right
//     ↓
// Animation plays

// Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".btn__slide--left");
  const btnRight = document.querySelector(".btn__slide--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlides = slides.length;

  // Go to a slide
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`),
    );
  };

  // Dots functionality
  // Create dots
  const createDots = function () {
    slides.forEach((_, i) =>
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide=${i}></button>)`,
      ),
    );
  };

  // Activate dots
  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  // Event delegation
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlides - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Previous Slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlides - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  // Left and Right Arrow Functionality
  document.addEventListener("keydown", function (e) {
    e.key === "ArrowLeft" && prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();
};

slider();

// Grid items fading in from the left
// const fadeInLeft = function () {
//   document.addEventListener("DOMContentLoaded", function () {
//     const gridItemsLeft = document.querySelectorAll(".grid-item-left");

//     gridItemsLeft.forEach((item, i) => {
//       setTimeout(function () {
//         item.classList.add("fade-in-left");
//       }, i * 400); // Staggered delay for a nicer effect
//     });
//   });
// };

// fadeInLeft();

// Grid items fading in from the right
// const fadeInRight = function () {
//   document.addEventListener("DOMContentLoaded", function () {
//     const gridItemsRight = document.querySelectorAll(".grid-item-right");

//     gridItemsRight.forEach((item, i) => {
//       setTimeout(function () {
//         item.classList.add("fade-in-right"); // Staggered delay for a nicer effect
//       }, i * 400);
//     });
//   });
// };

// fadeInRight();

const backToTop = document.getElementById("backToTop");
// Show button when scrolling down
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

// Smooth scroll to top when clicked
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Making The Mobile Navigation Work
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// Close mobile navigation
const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

// Implementing Sticky NavBar After We Scroll Past The Hero Section
const sectionHeroEl = document.querySelector("#section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    // An array of entries containing information about the element being observed
    const ent = entries[0];

    if (!ent.isIntersecting) {
      document.body.classList.add("sticky"); // when the hero section is out of view, add the sticky class to the body
    }

    // Remove the sticky class whenever the hero section is back in the viewport
    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },

  {
    root: null, // The browser's viewport
    threshold: 0, // when the hero section is totally out of the viewport
    rootMargin: "-90px", // exact height of the header when it has the sticky class
  },
);

obs.observe(sectionHeroEl); // observer should observe the hero section
