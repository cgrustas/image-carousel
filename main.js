/**
 * Activates an image carousel.
 *  - Activates arrows on each side to advance the slide forward or backward.
 *  - Automatically advances to the next slide every 5 seconds.
 *  - Activates navigation circles at the bottom that indicate which slide you are on.
 *  - Each navigation circle advances to that particular slide when clicked.
 */
const imageCarousel = (function () {
  let slides;
  let activeSlideIndex;
  let navDots;
  let autoAdvanceTimer;

  /**
   * Activates the image carousel
   */
  function init() {
    console.log("index.html has successfully linked to main.js!");

    slides = document.querySelectorAll(".slide");
    activeSlideIndex = 0;
    navDots = document.querySelectorAll(".nav-dot");
    activateArrowButtons();
    activateNavDots();
    updateScreen();
    restartAutoAdvance();
  }

  /**
   * Activate 'previous-slide' and 'next-slide' arrow buttons to cycle through slides when clicked.
   * EFFECT: Resets the auto advance timer
   */
  function activateArrowButtons() {
    const prevSlideBtn = document.querySelector(".previous-slide");
    const nextSlideBtn = document.querySelector(".next-slide");

    prevSlideBtn.addEventListener("click", () => {
      restartAutoAdvance();
      previousSlide();
    });
    nextSlideBtn.addEventListener("click", () => {
      restartAutoAdvance();
      nextSlide();
    });
  }

  /**
   * Advance to the next slide in the image carousel.
   */
  function previousSlide() {
    activeSlideIndex = activeSlideIndex - 1;
    if (activeSlideIndex < 0) activeSlideIndex = slides.length - 1;
    updateScreen();
  }

  /**
   * Advance to the previous slide in the image carousel.
   */
  function nextSlide() {
    activeSlideIndex = activeSlideIndex + 1;
    if (activeSlideIndex >= slides.length) activeSlideIndex = 0;
    updateScreen();
  }

  /**
   * Activates nav-dots to jump to their corresponding slide when clicked.
   * EFFECT: Resets the auto advance timer
   */
  function activateNavDots() {
    navDots.forEach((navDot, index) => {
      navDot.addEventListener("click", () => {
        restartAutoAdvance();
        jumpToSlide(index);
      });
    });
  }

  /**
   * Advances the image carousel to the given index's corresponding slide
   * @param {number} index - the index of the corresponding slide
   */
  function jumpToSlide(index) {
    activeSlideIndex = index;
    updateScreen();
  }

  /**
   * Updates the display of the image carousel.
   * Resets the existing delay period
   */
  function updateScreen() {
    updateActiveSlide();
    updateActiveNav();
  }

  /**
   * Adds the 'active' class to the current slide.
   * Removes the 'active' class from all other slides.
   */
  function updateActiveSlide() {
    slides.forEach((slide, index) => {
      if (index !== activeSlideIndex) slide.classList.remove("active");
      else slide.classList.add("active");
    });
  }

  /**
   * Adds the 'active' class to the current slide's corresponding nav-dot button.
   * Removes the 'active' class from all other nav-dots.
   */
  function updateActiveNav() {
    navDots.forEach((navDot, index) => {
      if (index !== activeSlideIndex) navDot.classList.remove("active");
      else navDot.classList.add("active");
    });
  }

  /**
   * Advances to the next slide in the image carousel every 5 seconds.
   * If a user manually advances the image carousel, the timer resets.
   */
  function restartAutoAdvance() {
    clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = setTimeout(nextSlide, 5000);
  }

  return { init: init };
})();

imageCarousel.init();
