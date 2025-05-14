document.addEventListener('DOMContentLoaded', function() {
    // Language Switching
    const arBtn = document.getElementById('ar-btn');
    const enBtn = document.getElementById('en-btn');
    const body = document.body;

    // Elements with translatable content
    const translatableElements = document.querySelectorAll('[data-ar][data-en]');

    // Load translations
    let translations = {
        ar: {},
        en: {}
    };

    // Function to load translations
    async function loadTranslations() {
        try {
            const arResponse = await fetch('translations/ar.json');
            const enResponse = await fetch('translations/en.json');

            translations.ar = await arResponse.json();
            translations.en = await enResponse.json();

            console.log('Translations loaded successfully');
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to data attributes if translations fail to load
        }
    }

    // Load translations when page loads
    loadTranslations();

    // Switch to Arabic
    arBtn.addEventListener('click', function() {
        body.classList.remove('en');
        body.setAttribute('dir', 'rtl');
        body.setAttribute('lang', 'ar');

        arBtn.classList.add('active');
        enBtn.classList.remove('active');

        // Update all translatable elements to Arabic
        translatableElements.forEach(element => {
            element.textContent = element.getAttribute('data-ar');
        });

        // Save language preference
        localStorage.setItem('language', 'ar');
    });

    // Switch to English
    enBtn.addEventListener('click', function() {
        body.classList.add('en');
        body.setAttribute('dir', 'ltr');
        body.setAttribute('lang', 'en');

        enBtn.classList.add('active');
        arBtn.classList.remove('active');

        // Update all translatable elements to English
        translatableElements.forEach(element => {
            element.textContent = element.getAttribute('data-en');
        });

        // Save language preference
        localStorage.setItem('language', 'en');
    });

    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'en') {
        enBtn.click();
    } else {
        // Default to Arabic
        arBtn.click();
    }

    // Screenshot Slider
    const screenshots = document.querySelectorAll('.screenshot');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentIndex = 0;

    // Hide all screenshots except the first one
    screenshots.forEach((screenshot, index) => {
        if (index !== 0) {
            screenshot.style.display = 'none';
        }
    });

    // Function to show a specific screenshot
    function showScreenshot(index) {
        // Hide all screenshots
        screenshots.forEach(screenshot => {
            screenshot.style.display = 'none';
        });

        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show the selected screenshot
        screenshots[index].style.display = 'block';

        // Add active class to the corresponding dot
        dots[index].classList.add('active');

        // Update current index
        currentIndex = index;
    }

    // Event listeners for dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showScreenshot(index);
        });
    });

    // Event listener for previous button
    prevBtn.addEventListener('click', function() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = screenshots.length - 1;
        }
        showScreenshot(newIndex);
    });

    // Event listener for next button
    nextBtn.addEventListener('click', function() {
        let newIndex = currentIndex + 1;
        if (newIndex >= screenshots.length) {
            newIndex = 0;
        }
        showScreenshot(newIndex);
    });

    // Auto-rotate screenshots every 5 seconds
    setInterval(function() {
        let newIndex = currentIndex + 1;
        if (newIndex >= screenshots.length) {
            newIndex = 0;
        }
        showScreenshot(newIndex);
    }, 5000);

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
});
