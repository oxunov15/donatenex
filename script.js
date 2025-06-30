// Custom Cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Cursor Hover Effects
const hoverElements = document.querySelectorAll('button, a, .lang-dropdown li');

hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
  });
});

// Language Dropdown
const langBtn = document.getElementById('lang-btn');
const langDropdown = document.querySelector('.lang-dropdown');

langBtn.addEventListener('click', () => {
  langDropdown.style.display = langDropdown.style.display === 'block' ? 'none' : 'block';
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.language-selector')) {
    langDropdown.style.display = 'none';
  }
});

// Glow Animation for Buttons
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.boxShadow = `0 0 15px ${button.classList.contains('login-btn') ? '#A020F0' : '#00F5FF'}`;
  });
  button.addEventListener('mouseleave', () => {
    button.style.boxShadow = 'none';
  });
});
