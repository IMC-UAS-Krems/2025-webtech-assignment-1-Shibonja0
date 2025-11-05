const navLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button"); 
const menuCloseButton = document.querySelector("#menu-close-button");

// Mobile menu functionality
menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
});

menuCloseButton.addEventListener("click", () => menuOpenButton.click());

// Custom smooth scroll function
function smoothScroll(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smooth animation
        const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        
        window.scrollTo(0, startPosition + distance * ease(progress));
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// Add click event listeners to navigation links
navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (document.body.classList.contains("show-mobile-menu")) {
            menuOpenButton.click();
        }

        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        const headerOffset = 80; // Header height
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        // Scroll smoothly over 800ms
        smoothScroll(offsetPosition, 800);
    });
});