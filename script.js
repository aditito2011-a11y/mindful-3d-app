// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Add scroll reveal to elements
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.about-card, .feature-item, .resource-card, .advocacy-text, .contact-content');
    revealElements.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-sphere');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Interactive 3D Elements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to 3D elements
    const cubes = document.querySelectorAll('.cube');
    cubes.forEach(cube => {
        cube.addEventListener('mouseenter', () => {
            cube.style.animationPlayState = 'paused';
            cube.style.transform = 'rotateX(45deg) rotateY(45deg) scale(1.1)';
        });
        
        cube.addEventListener('mouseleave', () => {
            cube.style.animationPlayState = 'running';
            cube.style.transform = '';
        });
    });

    // Interactive sphere features
    const sphereFeatures = document.querySelectorAll('.sphere-feature');
    sphereFeatures.forEach(sphere => {
        sphere.addEventListener('mouseenter', () => {
            sphere.style.transform = 'scale(1.2)';
            sphere.style.boxShadow = '0 0 50px rgba(102, 126, 234, 0.8)';
        });
        
        sphere.addEventListener('mouseleave', () => {
            sphere.style.transform = '';
            sphere.style.boxShadow = '0 0 30px rgba(102, 126, 234, 0.5)';
        });
    });

    // Interactive pyramids
    const pyramids = document.querySelectorAll('.pyramid');
    pyramids.forEach(pyramid => {
        pyramid.addEventListener('mouseenter', () => {
            pyramid.style.animationPlayState = 'paused';
            pyramid.style.transform = 'rotateY(45deg) scale(1.1)';
            pyramid.style.filter = 'brightness(1.2)';
        });
        
        pyramid.addEventListener('mouseleave', () => {
            pyramid.style.animationPlayState = 'running';
            pyramid.style.transform = '';
            pyramid.style.filter = '';
        });
    });

    // Interactive cylinders
    const cylinders = document.querySelectorAll('.cylinder');
    cylinders.forEach(cylinder => {
        cylinder.addEventListener('mouseenter', () => {
            cylinder.style.animationPlayState = 'paused';
            cylinder.style.transform = 'rotateY(45deg) scale(1.1)';
        });
        
        cylinder.addEventListener('mouseleave', () => {
            cylinder.style.animationPlayState = 'running';
            cylinder.style.transform = '';
        });
    });
});

// Form Submission Handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Button Click Animations
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-advocacy, .btn-submit');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mental Health Resources Interaction
document.addEventListener('DOMContentLoaded', () => {
    const emergencyCard = document.querySelector('.resource-card.emergency');
    if (emergencyCard) {
        emergencyCard.addEventListener('click', () => {
            showNotification('If you\'re in immediate danger, please call 911 or go to your nearest emergency room.', 'error');
        });
    }
});

// Floating Elements Animation Control
document.addEventListener('DOMContentLoaded', () => {
    const floatingElements = document.querySelectorAll('.element');
    
    floatingElements.forEach((element, index) => {
        element.addEventListener('mouseenter', () => {
            element.style.animationPlayState = 'paused';
            element.style.transform = 'scale(1.2) rotate(0deg)';
            element.style.filter = 'brightness(1.3)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.animationPlayState = 'running';
            element.style.transform = '';
            element.style.filter = '';
        });
    });
});

// Scroll Progress Indicator
document.addEventListener('DOMContentLoaded', () => {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
});

// Accessibility Enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('.cube, .pyramid, .sphere-feature, .cylinder');
    
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        element.setAttribute('aria-label', 'Interactive 3D element');
        
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
    
    // Add focus indicators
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .cube:focus,
        .pyramid:focus,
        .sphere-feature:focus,
        .cylinder:focus {
            outline: 3px solid #667eea;
            outline-offset: 5px;
        }
    `;
    document.head.appendChild(focusStyle);
});

// Performance Optimization
document.addEventListener('DOMContentLoaded', () => {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        const style = document.createElement('style');
        style.textContent = `
            * {
                animation-duration: 0.5s !important;
                transition-duration: 0.2s !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        const animatedElements = document.querySelectorAll('.cube, .pyramid, .cylinder, .floating-sphere, .element');
        
        if (document.hidden) {
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        } else {
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'running';
            });
        }
    });
});

// Mental Health Quote Generator
const mentalHealthQuotes = [
    "You are stronger than you think.",
    "It's okay to not be okay.",
    "Your mental health is a priority.",
    "Healing is not linear.",
    "You matter more than you know.",
    "Take it one day at a time.",
    "You are not alone in this journey.",
    "Self-care is not selfish.",
    "Progress, not perfection.",
    "You have survived 100% of your worst days."
];

function showRandomQuote() {
    const randomQuote = mentalHealthQuotes[Math.floor(Math.random() * mentalHealthQuotes.length)];
    showNotification(`💙 ${randomQuote}`, 'info');
}

// Show a motivational quote every 30 seconds (optional)
// setInterval(showRandomQuote, 30000);

console.log('Mindful Mental Health App loaded successfully! 🧠💚');
console.log('Remember: Your mental health matters. You are not alone. 💙');