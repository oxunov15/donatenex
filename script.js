document.addEventListener('DOMContentLoaded', () => {
  // ==================== Language System ====================
  const langBtn = document.getElementById('lang-btn');
  const langDropdown = document.querySelector('.lang-dropdown');
  const langItems = document.querySelectorAll('.lang-dropdown li');
  const translatableElements = document.querySelectorAll('[data-translate]');
  const loginBtn = document.querySelector('.login-btn');

  // Language translations
  const translations = {
    uz: {
      hero: {
        title: "Barcha sng davlatlardan donat qabul qil.",
        subtitle: "Rossiya, Qozog'iston, Qirg'iziston, O'zbekiston va Tojikistondan xayriyalarni bir joyda boshqar: oson, tez va xavfsiz.",
        cta: "Boshlash"
      },
      login: "Profil",
      footer: "© 2023 DonateNex. Barcha huquqlar himoyalangan."
    },
    ru: {
      hero: {
        title: "Принимайте донаты со всех стран СНГ",
        subtitle: "Управляйте пожертвованиями из России, Казахстана, Кыргызстана, Узбекистана и Таджикистана в одном месте: просто, быстро и безопасно.",
        cta: "Начать"
      },
      login: "Профиль",
      footer: "© 2023 DonateNex. Все права защищены."
    },
    kz: {
      hero: {
        title: "Барлық ТМД елдерінен донацияларды қабылдаңыз",
        subtitle: "Ресей, Қазақстан, Қырғызстан, Өзбекстан және Тәжікстаннан қайырымдылықтарды бір жерден басқарыңыз: оңай, жылдам және қауіпсіз.",
        cta: "Бастау"
      },
      login: "Профиль",
      footer: "© 2023 DonateNex. Барлық құқықтар қорғалған."
    },
    kg: {
      hero: {
        title: "Бардык СНГ өлкөлөрүнөн донацияларды кабыл алыңыз",
        subtitle: "Россия, Казакстан, Кыргызстан, Өзбекстан жана Тажикстандан кайрымдуулуктарды бир жерден башкарыңыз: оңой, тез жана коопсуз.",
        cta: "Баштоо"
      },
      login: "Профиль",
      footer: "© 2023 DonateNex. Бардык укуктар корголгон."
    },
    tj: {
      hero: {
        title: "Аз ҳамаи давлатҳои ИДМ ҳадя қабул кунед",
        subtitle: "Аз Русия, Қазоқистон, Қирғизистон, Ӯзбекистон ва Тоҷикистон ҳадяҳоро дар як ҷо идора кунед: осон, зуд ва бехатар.",
        cta: "Оғоз"
      },
      login: "Профил",
      footer: "© 2023 DonateNex. Ҳамаи ҳуқуқҳо ҳифз шудаанд."
    }
  };

  // Set initial language
  let currentLang = localStorage.getItem('selectedLang') || 'uz';
  updateLanguage(currentLang);
  updateLangButton();

  // Language selection
  langItems.forEach(item => {
    item.addEventListener('click', () => {
      currentLang = item.dataset.lang;
      localStorage.setItem('selectedLang', currentLang);
      updateLanguage(currentLang);
      updateLangButton();
      langDropdown.classList.remove('show');
    });
  });

  // Update page content
  function updateLanguage(lang) {
    const data = translations[lang];
    
    translatableElements.forEach(element => {
      const section = element.dataset.translate;
      if (data[section]) {
        Object.keys(data[section]).forEach(key => {
          const target = element.querySelector(`[data-key="${key}"]`);
          if (target) {
            target.textContent = data[section][key];
            // Trigger animation reset
            if (section === 'hero') {
              setTimeout(() => {
                target.style.animation = 'none';
                void target.offsetWidth;
                target.style.animation = '';
              }, 10);
            }
          }
        });
      }
    });

    // Update login button
    if (data.login && loginBtn) {
      loginBtn.textContent = data.login;
    }
  }

  // Update language button display
  function updateLangButton() {
    const selectedItem = Array.from(langItems).find(item => item.dataset.lang === currentLang);
    if (selectedItem) {
      langBtn.innerHTML = selectedItem.innerHTML;
    }
  }

  // ==================== UI Interactions ====================
  // Language dropdown toggle
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('show');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.language-selector')) {
      langDropdown.classList.remove('show');
    }
  });

  // ==================== Custom Cursor ====================
  if (matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    // Cursor movement
    document.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    // Cursor hover effects
    const hoverElements = document.querySelectorAll(
      'button, a, [role="button"], .lang-dropdown li, input, textarea, select, .cta-button'
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

  // ==================== Button Effects ====================
  const buttons = document.querySelectorAll('button:not(#lang-btn)');
  
  buttons.forEach(button => {
    // Hover effects
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

    // Click effects
    button.addEventListener('mousedown', () => {
      button.style.transform = 'scale(0.95)';
    });

    button.addEventListener('mouseup', () => {
      button.style.transform = '';
    });

    button.addEventListener('click', () => {
      button.style.transform = '';
    });
  });

  // ==================== Form Enhancements ====================
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.style.boxShadow = '0 0 10px var(--neon-blue)';
      input.style.borderColor = 'var(--neon-blue)';
    });

    input.addEventListener('blur', () => {
      input.style.boxShadow = 'none';
      input.style.borderColor = '';
    });
  });

  // ==================== Animations ====================
  function resetHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-content h1, .hero-content p, .hero-content .cta-button');
    heroElements.forEach(el => {
      el.style.animation = 'none';
      void el.offsetWidth; // Trigger reflow
      el.style.animation = '';
    });
  }
});
