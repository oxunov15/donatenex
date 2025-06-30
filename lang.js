// public/js/lang.js

const LanguageManager = {
  translations: {
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
    // ... boshqa tillar (kz, kg, tj)
  },

  init: function() {
    this.currentLang = localStorage.getItem('selectedLang') || 'uz';
    this.setupEventListeners();
    this.updateAllContent();
  },

  setupEventListeners: function() {
    document.querySelectorAll('.lang-dropdown li').forEach(item => {
      item.addEventListener('click', () => {
        this.currentLang = item.dataset.lang;
        localStorage.setItem('selectedLang', this.currentLang);
        this.updateAllContent();
        this.updateLangButton();
        document.querySelector('.lang-dropdown').classList.remove('show');
      });
    });
  },

  updateAllContent: function() {
    const data = this.translations[this.currentLang];
    
    // Sahifa kontentini yangilash
    document.querySelectorAll('[data-translate]').forEach(element => {
      const section = element.dataset.translate;
      Object.keys(data[section]).forEach(key => {
        const target = element.querySelector(`[data-key="${key}"]`);
        if (target) target.textContent = data[section][key];
      });
    });

    // Alohida elementlar
    if (data.login) {
      const loginBtn = document.querySelector('.login-btn');
      if (loginBtn) loginBtn.textContent = data.login;
    }
  },

  updateLangButton: function() {
    const selectedItem = document.querySelector(`.lang-dropdown li[data-lang="${this.currentLang}"]`);
    if (selectedItem) {
      document.getElementById('lang-btn').innerHTML = `
        <span class="flag">${selectedItem.querySelector('.flag').textContent}</span>
        <span class="lang-code">${this.currentLang.toUpperCase()}</span>
      `;
    }
  }
};

// DOM tayyor bo'lganda ishga tushirish
document.addEventListener('DOMContentLoaded', () => LanguageManager.init());
