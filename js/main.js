document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Mobile navigation toggle
  const navbarToggle = document.getElementById("navbarToggle")
  const navbarMenu = document.getElementById("navbarMenu")

  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener("click", () => {
      navbarMenu.classList.toggle("active")
      navbarToggle.classList.toggle("active")
    })
  }

  // Animate elements when they come into view
  const animateElements = document.querySelectorAll(".animate-on-scroll")

  function checkIfInView() {
    animateElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("visible")
      }
    })
  }

  // Add visible class to elements in view on page load
  checkIfInView()

  // Add visible class to elements when they come into view on scroll
  window.addEventListener("scroll", checkIfInView)

  // Add animate-on-scroll class to elements that should animate
  document.querySelectorAll(".feature-card, .testimonial-card, .badge").forEach((element) => {
    element.classList.add("animate-on-scroll")
  })
})

