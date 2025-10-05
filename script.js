feather.replace();

document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Smooth Scrolling & Close mobile menu on link click
    const scrollLinks = document.querySelectorAll('.scroll-link');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - document.getElementById('header').offsetHeight,
                    behavior: 'smooth'
                });
                if(!mobileMenu.classList.contains('hidden')){
                     mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Active Nav Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: `-${document.getElementById('header').offsetHeight}px`,
        threshold: 0.5
    };
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const mobileLink = document.querySelector(`#mobile-menu a[href="${link.getAttribute('href')}"]`);
                    if (mobileLink) mobileLink.classList.remove('active');
                    
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                        if (mobileLink) mobileLink.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    // Animate progress bars on scroll
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress-bar-inner');

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    bar.style.width = bar.dataset.width;
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if(skillsSection) {
         skillObserver.observe(skillsSection);
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});
// This function ensures the script runs after the HTML is fully loaded.
document.addEventListener("DOMContentLoaded", function() {
    
    // --- Start of Typing Animation ---

    const typedTextSpan = document.querySelector(".text-animation span");
    const wordsToType = ["Frontend Developer", "UI/UX Designer", "Web Developer", "Python Scripter"];

    // Animation variables
    const typingDelay = 150; // Speed of typing
    const erasingDelay = 100; // Speed of deleting
    const newWordDelay = 2000; // Delay between words
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = wordsToType[wordIndex];

        if (isDeleting) {
            // If we are deleting
            typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // If we are typing
            typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Check if word is fully typed or deleted
        if (!isDeleting && charIndex === currentWord.length) {
            // Word fully typed, start deleting after a pause
            isDeleting = true;
            setTimeout(type, newWordDelay);
        } else if (isDeleting && charIndex === 0) {
            // Word fully deleted, move to the next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % wordsToType.length;
            setTimeout(type, typingDelay);
        } else {
            // Continue typing or deleting
            setTimeout(type, isDeleting ? erasingDelay : typingDelay);
        }
    }

    // Start the animation when the page loads
    type();

    // --- End of Typing Animation ---


    // If you have other scripts (like the reveal on scroll), make sure they are also inside this DOMContentLoaded listener.
    // Example:
    /*
    const observer = new IntersectionObserver(...)
    ...
    */

});