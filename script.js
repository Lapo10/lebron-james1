// Aggiungi le stelle animate al background
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const numStars = 100;
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Riproduci suono di transizione
function playTransition() {
    const sound = document.getElementById('transitionSound');
    sound.currentTime = 0;
    sound.play().catch(e => console.log('Audio play failed:', e));
}

// Riproduci suono di applausi
function playCheering() {
    const sound = document.getElementById('cheeringSound');
    sound.currentTime = 0;
    sound.play().catch(e => console.log('Audio play failed:', e));
}

// Anima i numeri delle statistiche quando vengono visualizzati
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000;
                const now = Date.now();
                
                const animate = () => {
                    const elapsed = Date.now() - now;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function (ease-out)
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(target * eased);
                    
                    entry.target.textContent = current.toLocaleString();
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        entry.target.textContent = target.toLocaleString();
                        entry.target.classList.add('animated');
                    }
                };
                
                animate();
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(num => observer.observe(num));
}

// Effetto scroll smooth e animazioni
function setupScrollAnimations() {
    const elements = document.querySelectorAll('[class*="item"], [class*="card"]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'slideInUp 0.8s ease forwards';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

// Scroll smooth per i link di navigazione
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            playTransition();
        }
    });
});

// Effetto parallax per il hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    
    // Subtle parallax effect
    if (scrolled < window.innerHeight) {
        hero.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
    }
});

// Aggiungi interattività alle card delle statistiche
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        playCheering();
        card.style.animation = 'pulse 0.6s ease';
    });
});

// Aggiungi effetto glow al mouse per le immagini della galleria
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.8)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.boxShadow = 'none';
    });
});

// Aggiungi animazione ai titoli
function animateTitles() {
    const titles = document.querySelectorAll('.section-title');
    titles.forEach((title, index) => {
        title.style.animation = `bounceIn 0.8s ease ${index * 0.1}s`;
    });
}

// Effetto typing per il hero title
function typewriterEffect() {
    const titleElement = document.querySelector('.hero-title');
    const originalText = titleElement.textContent;
    titleElement.textContent = '';
    
    let index = 0;
    const typeInterval = setInterval(() => {
        if (index < originalText.length) {
            titleElement.textContent += originalText[index];
            index++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
}

// Inizializza tutto al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    animateStats();
    setupScrollAnimations();
    animateTitles();
    typewriterEffect();
    
    // Aggiungi effetto di click sugli elementi interattivi
    document.querySelectorAll('button, a').forEach(element => {
        element.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.background = 'rgba(255, 215, 0, 0.6)';
            ripple.style.borderRadius = '50%';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            const rect = e.target.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left - 10) + 'px';
            ripple.style.top = (e.clientY - rect.top - 10) + 'px';
            
            e.target.style.position = 'relative';
            e.target.style.overflow = 'hidden';
            e.target.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Aggiungi keyframes per l'effetto ripple dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Aggiungi effetto di visibility al scroll
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('[class*="item"]');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (inViewport) {
            el.style.opacity = '1';
        }
    });
});

// Nascondi la musica di background per default (per privacy)
window.addEventListener('load', () => {
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.volume = 0.3; // 30% volume
});
