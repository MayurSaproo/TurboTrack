

document.addEventListener('DOMContentLoaded', function() {
    
    initMobileMenu();
    initLoginModal();
    initSearch();
    initFavoriteButtons();
    initScrollEffects();
    initNewsletterForm();
    initSmoothScroll();
    initAnimations();
});


function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
}


function initLoginModal() {
    const modal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');
    
    
    if (modal) {
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeLoginModal();
            }
        });
        
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeLoginModal();
            }
        });
    }
    
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
}

function openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        
        setTimeout(() => {
            const emailInput = document.getElementById('email');
            if (emailInput) emailInput.focus();
        }, 100);
    }
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    
    const loginBtn = document.querySelector('.login-btn');
    const originalText = loginBtn.textContent;
    loginBtn.textContent = 'Logging in...';
    loginBtn.disabled = true;
    
    setTimeout(() => {
        loginBtn.textContent = originalText;
        loginBtn.disabled = false;
        
        
        if (remember) {
            localStorage.setItem('userEmail', email);
        }
        
        showNotification('Login successful! Welcome back.', 'success');
        closeLoginModal();
        
        
        updateUIForLoggedInUser(email);
    }, 1500);
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function updateUIForLoggedInUser(email) {
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        const userInitial = email.charAt(0).toUpperCase();
        authButtons.innerHTML = `
            <div class="user-profile">
                <span class="user-avatar">${userInitial}</span>
                <span class="user-name">${email.split('@')[0]}</span>
                <button class="btn-logout" onclick="handleLogout()">Logout</button>
            </div>
        `;
    }
}

function handleLogout() {
    localStorage.removeItem('userEmail');
    showNotification('You have been logged out', 'success');
    
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        authButtons.innerHTML = `
            <button class="btn-login" onclick="openLoginModal()">Login</button>
            <button class="btn-signup">Sign Up</button>
        `;
    }
}


function initSearch() {
    const searchBox = document.querySelector('.search-box');
    const searchInput = searchBox ? searchBox.querySelector('input') : null;
    const searchButton = searchBox ? searchBox.querySelector('button') : null;
    
    if (searchInput && searchButton) {
        
        searchButton.addEventListener('click', performSearch);
        
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        
        searchInput.addEventListener('input', function() {
            
        });
    }
}

function performSearch() {
    const searchBox = document.querySelector('.search-box');
    const query = searchBox ? searchBox.querySelector('input').value.trim() : '';
    
    if (!query) {
        showNotification('Please enter a search term', 'warning');
        return;
    }
    
    
    const reviewsSection = document.getElementById('reviews');
    if (reviewsSection) {
        reviewsSection.scrollIntoView({ behavior: 'smooth' });
        showNotification(`Showing results for "${query}"`, 'success');
    }
}


function initFavoriteButtons() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = '#e63946';
                showNotification('Added to favorites', 'success');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = '';
                showNotification('Removed from favorites', 'info');
            }
        });
    });
}


function initScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        
        if (header) {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(22, 33, 62, 0.98)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.background = 'linear-gradient(135deg, #16213e 0%, #0f3460 100%)';
                header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
            }
        }
        
        
        const scrollTopBtn = document.querySelector('.scroll-top');
        if (scrollTopBtn) {
            scrollTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
        }
    });
}


function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            
            if (!email || !isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            showNotification('Thank you for subscribing!', 'success');
            this.reset();
        });
    }
}


function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                
                document.querySelectorAll('.nav-menu a').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                if (this.closest('.nav-menu')) {
                    this.classList.add('active');
                }
            }
        });
    });
}


function createScrollTopButton() {
    const btn = document.createElement('button');
    btn.className = 'scroll-top';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #e63946, #c1121f);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(230, 57, 70, 0.4);
        transition: all 0.3s ease;
    `;
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px)';
        btn.style.boxShadow = '0 6px 20px rgba(230, 57, 70, 0.5)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = '0 4px 15px rgba(230, 57, 70, 0.4)';
    });
    
    document.body.appendChild(btn);
}

createScrollTopButton();


function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    
    const animatedElements = document.querySelectorAll('.review-card, .video-card, .news-card, .category-card');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}


function showNotification(message, type = 'info') {
    
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span class="notification-icon">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
        </span>
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationBg(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 3000;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease;
        max-width: 350px;
    `;
    
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        case 'info': return 'info-circle';
        default: return 'bell';
    }
}

function getNotificationBg(type) {
    switch(type) {
        case 'success': return '#2ecc71';
        case 'error': return '#e74c3c';
        case 'warning': return '#f39c12';
        case 'info': return '#3498db';
        default: return '#9b59b6';
    }
}


function animateRatings() {
    const ratings = document.querySelectorAll('.review-rating');
    
    ratings.forEach(rating => {
        const stars = rating.querySelectorAll('i:not(:last-child)');
        stars.forEach((star, index) => {
            setTimeout(() => {
                star.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    star.style.transform = 'scale(1)';
                }, 200);
            }, index * 100);
        });
    });
}


function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}


function initVideoCardEffects() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.video-overlay i');
            if (overlay) {
                overlay.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.video-overlay i');
            if (overlay) {
                overlay.style.transform = 'scale(1)';
            }
        });
    });
}


function initSocialLinkTracking() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('span').textContent;
            showNotification(`Opening ${platform}...`, 'info');
            
            
            
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                window.open(href, '_blank');
            }
        });
    });
}


initVideoCardEffects();
initSocialLinkTracking();


checkSavedSession();

function checkSavedSession() {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
        updateUIForLoggedInUser(savedEmail);
    }
}


function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
        const suffix = target.replace(/[0-9,]/g, '');
        
        let current = 0;
        const increment = numericValue / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current).toLocaleString() + suffix;
            }
        }, 30);
    });
}


const statsSection = document.querySelector('.sidebar-stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(statsSection);
}


console.log('AutoReview Hub loaded successfully!');
console.log('Version: 1.0.0');
console.log('Author: AutoReview Team');

