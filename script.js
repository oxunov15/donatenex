/**
 * DonateNex - Barcha SNG davlatlaridan donatlar platformasi
 * Mukammal JavaScript yechimi
 * @version 1.0.0
 */

document.addEventListener('DOMContentLoaded', () => {
  // =====================
  // MODUL FUNKSIYALARI
  // =====================
  
  /**
   * Til o'zgartirish tizimi
   */
  const setupLanguageSystem = () => {
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.querySelector('.lang-dropdown');
    const langItems = document.querySelectorAll('.lang-dropdown li');
    const translatableElements = document.querySelectorAll('[data-translate]');
    const loginBtn = document.querySelector('.profile-btn');

    // Til tarjimalari
    const translations = {
      uz: {
        hero: {
          title: "Barcha SNG davlatlardan donat qabul qil.",
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

    // Joriy til
    let currentLang = localStorage.getItem('selectedLang') || 'uz';

    // Sahifa kontentini yangilash
    const updateContent = () => {
      const langData = translations[currentLang];
      
      translatableElements.forEach(element => {
        const section = element.dataset.translate;
        if (langData[section]) {
          Object.keys(langData[section]).forEach(key => {
            const target = element.querySelector(`[data-key="${key}"]`);
            if (target) {
              target.textContent = langData[section][key];
              // Animatsiyalarni qayta ishga tushirish
              if (section === 'hero') {
                target.style.animation = 'none';
                void target.offsetWidth;
                target.style.animation = '';
              }
            }
          });
        }
      });

      // Profil tugmasini yangilash
      if (loginBtn && langData.login) {
        loginBtn.querySelector('.btn-text').textContent = langData.login;
      }
    };

    // Til tugmasini yangilash
    const updateLangButton = () => {
      const selectedItem = Array.from(langItems).find(item => item.dataset.lang === currentLang);
      if (selectedItem && langBtn) {
        langBtn.innerHTML = `
          ${selectedItem.querySelector('.flag').outerHTML}
          <span class="lang-code">${currentLang.toUpperCase()}</span>
        `;
      }
    };

    // Tilni o'zgartirish
    const changeLanguage = (lang) => {
      currentLang = lang;
      localStorage.setItem('selectedLang', lang);
      updateContent();
      updateLangButton();
      closeDropdown();
    };

    // Dropdownni yopish
    const closeDropdown = () => {
      langDropdown.classList.remove('show');
      langBtn.setAttribute('aria-expanded', 'false');
    };

    // Event listenerlar
    langItems.forEach(item => {
      item.addEventListener('click', () => changeLanguage(item.dataset.lang));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          changeLanguage(item.dataset.lang);
        }
      });
    });

    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = langBtn.getAttribute('aria-expanded') === 'true';
      langBtn.setAttribute('aria-expanded', String(!isExpanded));
      langDropdown.classList.toggle('show');
    });

    // Tashqariga bosganda yopish
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.language-selector')) {
        closeDropdown();
      }
    });

    // Boshlang'ich sozlash
    updateContent();
    updateLangButton();
  };

  /**
   * Profil tugmasi ishlashi
   */
  const setupProfileButton = () => {
    const profileBtn = document.querySelector('.profile-btn');
    
    if (profileBtn) {
      profileBtn.addEventListener('click', () => {
        // Bu yerda profil sahifasiga yo'naltirish yoki modal oynani ochish
        console.log('Profil sahifasiga o\'tish');
        // window.location.href = '/profile';
      });
      
      // Klaviatura bilan ishlash
      profileBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          profileBtn.click();
        }
      });
    }
  };

  /**
   * CTA tugmasi effektlari
   */
  const setupCTAButton = () => {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
      ctaButton.addEventListener('click', () => {
        // Bu yerda boshlash logikasi
        console.log('Platformaga kirish');
        // window.location.href = '/dashboard';
      });
      
      // Hover effekti
      ctaButton.addEventListener('mouseenter', () => {
        ctaButton.style.transform = 'translateY(-3px)';
      });
      
      ctaButton.addEventListener('mouseleave', () => {
        ctaButton.style.transform = '';
      });
    }
  };

  /**
   * Accessibilitiy yaxshilashlari
   */
  const improveAccessibility = () => {
    // Barcha interaktiv elementlar uchun
    const interactiveElements = document.querySelectorAll(
      'button, a, [role="button"], [tabindex="0"]'
    );
    
    interactiveElements.forEach(el => {
      // Klaviatura navigatsiyasi
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          el.click();
        }
      });
      
      // Focus holatida stil
      el.addEventListener('focus', () => {
        el.style.outline = '2px solid var(--neon-blue)';
        el.style.outlineOffset = '3px';
      });
      
      el.addEventListener('blur', () => {
        el.style.outline = 'none';
      });
    });
  };

  /**
   * Sayt animatsiyalari
   */
  const setupAnimations = () => {
    // Scroll animatsiyalari
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(el => {
        const elementPosition = el.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          el.classList.add('animated');
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Boshlang'ich holatni tekshirish
  };

  // =====================
  // INITIALIZATION
  // =====================
  
  try {
    setupLanguageSystem();
    setupProfileButton();
    setupCTAButton();
    improveAccessibility();
    setupAnimations();
    
    // Console log
    console.log('%cDonateNex platformasi muvaffaqiyatli yuklandi', 
      'color: #00F5FF; font-size: 14px; font-weight: bold;');
  } catch (error) {
    console.error('Xatolik yuz berdi:', error);
    
    // Foydalanuvchiga xabar
    const errorMessage = document.createElement('div');
    errorMessage.style.position = 'fixed';
    errorMessage.style.bottom = '20px';
    errorMessage.style.right = '20px';
    errorMessage.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
    errorMessage.style.color = 'white';
    errorMessage.style.padding = '10px 20px';
    errorMessage.style.borderRadius = '5px';
    errorMessage.style.zIndex = '9999';
    errorMessage.textContent = 'Xatolik yuz berdi. Iltimos, sahifani yangilang.';
    document.body.appendChild(errorMessage);
    
    setTimeout(() => {
      errorMessage.remove();
    }, 5000);
  }
});
