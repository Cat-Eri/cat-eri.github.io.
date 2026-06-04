// ============================================
// FAQ — АККОРДЕОН
// ============================================
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');
        
        // Закрываем все
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        
        // Открываем текущий (если не был открыт)
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ============================================
// ПЛАВНАЯ ПРОКРУТКА ПО ЯКОРЯМ
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'auto',
                block: 'start'
            });
            
            // Закрываем мобильное меню при клике
            navLinks.classList.remove('active');
            burger.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
});

// ============================================
// МОБИЛЬНОЕ МЕНЮ (БУРГЕР)
// ============================================
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    const isActive = burger.classList.toggle('active');
    navLinks.classList.toggle('active');
    burger.setAttribute('aria-expanded', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
});

// Закрытие меню по клику вне его
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// Закрытие меню по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// ============================================
// ЭФФЕКТ HEADER ПРИ СКРОЛЛЕ
// ============================================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, { passive: true });

// ============================================
// ПАРАЛЛАКС ФОНА
// ============================================
(function() {
    const parallaxBlocks = document.querySelectorAll('#about, #program');
    const PARALLAX_SPEED = 0.25; // 0.1 - медленно, 0.5 - быстро
    
    function updateParallax() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        parallaxBlocks.forEach(block => {
            const bg = block.querySelector('.parallax-bg');
            if (!bg) return;
            
            const rect = block.getBoundingClientRect();
            const blockTop = rect.top + scrollY;
            const blockHeight = block.offsetHeight;
            
            // Пропускаем вычисления, если блок вне экрана
            if (rect.bottom < 0 || rect.top > windowHeight) return;
            
            // Вычисляем смещение
            // Диапазон движения фона: от -20% до +20% высоты блока
            const maxOffset = blockHeight * 0.20; // 20% — запас для покрытия краёв
            const progress = (scrollY - blockTop + windowHeight) / (windowHeight + blockHeight);
            const offset = (progress - 0.5) * maxOffset * 2 * PARALLAX_SPEED;
            
            // Ограничиваем смещение, чтобы не было белых краёв
            const clampedOffset = Math.max(-maxOffset, Math.min(maxOffset, offset));
            
            bg.style.transform = `translate3d(0, ${clampedOffset}px, 0)`;
        });
    }
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    updateParallax();
})();
