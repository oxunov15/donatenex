// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', () => {
  // Add any additional interactive functionality here
  // For example: form validation, animations, etc.
  
  // Example: Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
