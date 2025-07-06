document.addEventListener('DOMContentLoaded', function() {
    // Language selector functionality
    const languageToggle = document.getElementById('language-toggle');
    const languageDropdown = document.getElementById('language-dropdown');
    const languageOptions = document.querySelectorAll('.language-dropdown li');
    
    // Current language (default is Uzbek)
    let currentLanguage = 'uz';
    
    // Toggle language dropdown
    languageToggle.addEventListener('click', function() {
        languageDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!languageToggle.contains(e.target) {
            languageDropdown.classList.remove('active');
        }
    });
    
    // Handle language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            if (selectedLang !== currentLanguage) {
                currentLanguage = selectedLang;
                updateContent();
            }
            languageDropdown.classList.remove('active');
        });
    });
    
    // Update content based on selected language
    function updateContent() {
        const translations = window.translations[currentLanguage];
        
        document.getElementById('hero-title').textContent = translations.heroTitle;
        document.getElementById('hero-subtext').textContent = translations.heroSubtext;
        document.getElementById('donate-button-text').textContent = translations.donateButton;
        
        // Update HTML lang attribute
        document.documentElement.lang = currentLanguage;
    }
    
    // Initialize content
    updateContent();
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.hero h1, .hero p, .cta-button').forEach(el => {
        observer.observe(el);
    });
});
