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
// ПАРАЛЛАКС ФОНА ДЛЯ БЛОКОВ
// ============================================
(function() {
    // Находим блоки с параллакс-фоном
    const parallaxBlocks = document.querySelectorAll('#about, #program');
    
    // Настройки параллакса
    const PARALLAX_SPEED = 0.5; // Скорость движения фона (0.1 - медленно, 0.5 - быстрее)
    
    function updateParallax() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        parallaxBlocks.forEach(block => {
            const rect = block.getBoundingClientRect();
            const blockTop = rect.top + scrollY; // Позиция блока в документе
            const blockHeight = block.offsetHeight;
            
            // Проверяем, виден ли блок на экране
            if (rect.bottom < 0 || rect.top > windowHeight) return;
            
            // Вычисляем смещение фона
            // Фон движется медленнее контента
            const offset = (scrollY - blockTop + windowHeight) * PARALLAX_SPEED;
            
            block.style.backgroundPosition = `center ${offset}px`;
        });
    }
    
    // Запускаем при скролле с throttle для производительности
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
    
    // Первый вызов
    updateParallax();
})();
