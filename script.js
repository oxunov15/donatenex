document.addEventListener('DOMContentLoaded', () => {
  // Language Selection System
  const langBtn = document.getElementById('lang-btn');
  const langDropdown = document.querySelector('.lang-dropdown');
  const langItems = document.querySelectorAll('.lang-dropdown li');
  
  // Set initial language from localStorage or default
  const currentLang = localStorage.getItem('selectedLang') || 'uz';
  updateLanguageDisplay(currentLang);

  // Language dropdown toggle
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('show');
  });

  // Language selection
  langItems.forEach(item => {
    item.addEventListener('click', () => {
      const selectedLang = item.dataset.lang;
      localStorage.setItem('selectedLang', selectedLang);
      updateLanguageDisplay(selectedLang);
      langDropdown.classList.remove('show');
      // Add your actual language change logic here
      console.log(`Language changed to: ${selectedLang}`);
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    langDropdown.classList.remove('show');
  });

  function updateLanguageDisplay(lang) {
    const selectedItem = Array.from(langItems).find(item => item.dataset.lang === lang);
    if (selectedItem) {
      langBtn.innerHTML = selectedItem.innerHTML;
    }
  }

  // Custom Cursor System (desktop only)
  if (matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    const hoverElements = document.querySelectorAll(
      'button, a, [role="button"], .lang-dropdown li, input, textarea, select'
    );

    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        el.style.cursor = 'none';
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
      });
    });
  }

  // Button Interaction System
  const buttons = document.querySelectorAll('button:not(.lang-btn)');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      if (button.classList.contains('login-btn')) {
        button.style.boxShadow = '0 0 15px var(--neon-violet)';
      } else {
        button.style.boxShadow = '0 0 15px var(--neon-blue)';
      }
    });

    button.addEventListener('mouseleave', () => {
      button.style.boxShadow = 'none';
    });

    button.addEventListener('mousedown', () => {
      button.style.transform = 'scale(0.95)';
    });

    button.addEventListener('mouseup', () => {
      button.style.transform = '';
    });
  });

  // Form interaction enhancement
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.style.boxShadow = '0 0 10px var(--neon-blue)';
    });
    input.addEventListener('blur', () => {
      input.style.boxShadow = 'none';
    });
  });
});
