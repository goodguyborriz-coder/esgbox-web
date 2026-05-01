/**
 * ESGBOX - Power-Box Interaction Script
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SCROLL REVEAL - Plynulé "vboxování" sekcí při scrollu
    const revealSections = () => {
        const observerOptions = {
            threshold: 0.15, // Sekce se aktivuje, když je z 15 % vidět
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Jakmile se sekce jednou ukáže, přestaneme ji sledovat
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            // Nastavíme výchozí stav přímo v JS, aby web fungoval i bez nich
            section.style.opacity = "0";
            section.style.transform = "translateY(30px)";
            section.style.transition = "all 0.6s cubic-bezier(0.17, 0.67, 0.83, 0.67)";
            observer.observe(section);
        });
    };

    // Pomocná funkce pro zviditelnění (volaná observerem)
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
        section.is-visible { 
            opacity: 1 !important; 
            transform: translateY(0) !important; 
        }
    `, styleSheet.cssRules.length);


    // 2. MAGNETIC LOGO - Jemná reakce loga na kurzor
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mousemove', (e) => {
            const rect = logo.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            logo.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });

        logo.addEventListener('mouseleave', () => {
            logo.style.transform = `translate(0, 0)`;
        });
    }


    // 3. SMOOTH SCROLL - Hladké navigování mezi sekcemi
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset kvůli sticky menu
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 4. POWER-UP KONTAKT - Efekt při kliknutí na CTA
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = "scale(0.95)";
        });
        button.addEventListener('mouseup', () => {
            button.style.transform = "scale(1.05)";
            setTimeout(() => {
                button.style.transform = "translateY(-3px)";
            }, 150);
        });
    });

    // Spuštění animací
    revealSections();
});
