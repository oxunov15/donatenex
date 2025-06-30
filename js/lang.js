// Complete Language Management System
const LanguageManager = {
  translations: {
    uz: {
      hero: {
        title: "Barcha sng davlatlardan donat qabul qil.",
        subtitle: "Rossiya, Qozog'iston, Qirg'iziston, O'zbekiston va Tojikistondan xayriyalarni bir joyda boshqar: oson, tez va xavfsiz.",
        cta: "Boshlash"
      },
      about: {
        title: "Biz haqimizda",
        text: "DonateNex - bu CIS davlatlaridan xayriyalarni qabul qilish va boshqarish uchun ilg'or platforma"
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
      about: {
        title: "О нас",
        text: "DonateNex - это передовая платформа для приема и управления пожертвованиями из стран СНГ"
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
      about: {
        title: "Біз туралы",
        text: "DonateNex - БДО елдерінен қайырымдылықтарды қабылдау және басқару үшін алдыңғы платформа"
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
      about: {
        title: "Биз жөнүндө",
        text: "DonateNex - БДӨ өлкөлөрүнөн кайрымдуулуктарды кабыл алуу жана башкаруу үчүн алдыңкы платформа"
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
      about: {
        title: "Дар бораи мо",
        text: "DonateNex - платформаи пешқадами барои қабули ҳадяҳо аз кишварҳои ИДМ"
      },
      login: "Профил",
      footer: "© 2023 DonateNex. Ҳамаи ҳуқуқҳо ҳифз шудаанд."
    }
  },

  init() {
    this.currentLang = localStorage.getItem('selectedLang') || 'uz';
    this.setupEventListeners();
    this.updateAllContent();
    this.updateLangButton();
  },

  setupEventListeners() {
    // Language selection
    document.querySelectorAll('.lang-dropdown li').forEach(item => {
      item.addEventListener('click', () => {
        this.currentLang = item.dataset.lang;
        localStorage.setItem('selectedLang', this.currentLang);
        this.updateAllContent();
        this.updateLangButton();
        document.querySelector('.lang-dropdown').classList.remove('show');
      });
    });

    // Dropdown toggle
    document.getElementById('lang-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelector('.lang-dropdown').classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      document.querySelector('.lang-dropdown').classList.remove('show');
    });
  },

  updateAllContent() {
    const data = this.translations[this.currentLang];
    
    // Update all translatable sections
    document.querySelectorAll('[data-translate]').forEach(section => {
      const sectionName = section.dataset.translate;
      if (data[sectionName]) {
        Object.keys(data[sectionName]).forEach(key => {
          const element = section.querySelector(`[data-key="${key}"]`);
          if (element) element.textContent = data[sectionName][key];
        });
      }
    });
  },

  updateLangButton() {
    const selectedItem = document.querySelector(`.lang-dropdown li[data-lang="${this.currentLang}"]`);
    if (selectedItem) {
      document.getElementById('lang-btn').innerHTML = `
        <span class="flag">${selectedItem.querySelector('.flag').textContent}</span>
        <span class="lang-code">${this.currentLang.toUpperCase()}</span>
      `;
    }
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => LanguageManager.init());
