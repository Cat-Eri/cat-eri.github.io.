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