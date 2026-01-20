/**
 * Main JavaScript for Dealership Website
 */

// Load dealer info
function loadDealerInfo() {
    const dealer = DEALER_INFO;
    
    // Update dealer name
    const dealerNameElements = document.querySelectorAll('.dealer-name');
    dealerNameElements.forEach(el => el.textContent = dealer.name);
    
    // Update page title
    document.title = `${dealer.name} - سيارات مستعملة`;
    
    // Update contact info
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.href = `tel:+2${dealer.phone}`;
        const p = link.querySelector('p');
        if (p) p.textContent = dealer.phone;
    });
    
    const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me"]');
    whatsappLinks.forEach(link => {
        const phone = dealer.whatsapp || dealer.phone;
        link.href = `https://wa.me/2${phone}`;
        const p = link.querySelector('p');
        if (p) p.textContent = phone;
    });
    
    // Update logo
    if (dealer.logo) {
        const logoImages = document.querySelectorAll('.logo');
        logoImages.forEach(img => {
            img.src = dealer.logo;
        });
    }
    
    // Video error handling
    const heroVideo = document.getElementById('heroVideo');
    const heroFallback = document.querySelector('.hero-fallback');
    
    if (heroVideo) {
        heroVideo.addEventListener('error', () => {
            console.log('Video failed to load, showing fallback image');
            if (heroFallback) {
                heroFallback.style.display = 'block';
            }
        });
        
        // Ensure video plays
        heroVideo.play().catch(error => {
            console.log('Video autoplay prevented:', error);
            if (heroFallback) {
                heroFallback.style.display = 'block';
            }
        });
    }
    
    // Update about image
    if (dealer.aboutImage) {
        const aboutImg = document.querySelector('.about-image');
        if (aboutImg) {
            aboutImg.src = dealer.aboutImage;
        }
    }
    
    // Update about section
    if (dealer.about) {
        const aboutText = document.querySelector('.about-text');
        if (aboutText) {
            aboutText.textContent = dealer.about;
        }
    }
    
    // Update address
    if (dealer.address) {
        const addressElements = document.querySelectorAll('.contact-card p');
        addressElements.forEach(el => {
            if (el.textContent.includes('القاهرة')) {
                el.textContent = dealer.address;
            }
        });
    }
}

// Load featured cars
function loadFeaturedCars() {
    const container = document.getElementById('featuredCars');
    if (!container) return;
    
    // Show all cars (15 cars = 3-4 rows)
    const allCars = CARS_DATA;
    
    if (allCars.length > 0) {
        container.innerHTML = allCars.map(car => createCarCard(car)).join('');
        
        // Add scroll animation on load
        setTimeout(() => {
            const cards = container.querySelectorAll('.car-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px) scale(0.9)';
                card.setAttribute('data-aos', 'fade-up');
                card.setAttribute('data-aos-delay', (index % 4) * 100);
                
                setTimeout(() => {
                    card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, (index % 4) * 100);
            });
        }, 100);
        
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        cards.forEach(card => {
            observer.observe(card);
        });
    } else {
        container.innerHTML = '<p class="text-center">لا توجد سيارات متاحة حالياً</p>';
    }
}

function createCarCard(car) {
    const imageUrl = getPrimaryImage(car);
    const price = formatPrice(car.price);
    const year = car.year;
    const mileage = car.mileage ? formatNumber(car.mileage) + ' كم' : 'غير محدد';
    const condition = car.condition === 'new' ? 'جديدة' : 'مستعملة';
    const transmission = car.transmission === 'automatic' ? 'أوتوماتيك' : 'يدوي';
    const fuel = car.fuel_type === 'petrol' ? 'بنزين' : car.fuel_type === 'diesel' ? 'ديزل' : car.fuel_type;
    const conditionClass = car.condition === 'new' ? 'condition-new' : 'condition-used';
    
    return `
        <div class="car-card" data-aos="fade-up">
            <div class="car-card__image">
                <img src="${imageUrl}" alt="${car.name}" loading="lazy">
                ${car.is_featured ? '<span class="car-card__badge">مميز</span>' : ''}
                <span class="car-card__condition ${conditionClass}">${condition}</span>
            </div>
            <div class="car-card__content">
                <h3 class="car-card__title">${car.name}</h3>
                <div class="car-card__info-grid">
                    <div class="car-info-item">
                        <i class="fas fa-calendar"></i>
                        <span>${year}</span>
                    </div>
                    <div class="car-info-item">
                        <i class="fas fa-road"></i>
                        <span>${mileage}</span>
                    </div>
                    <div class="car-info-item">
                        <i class="fas fa-cog"></i>
                        <span>${transmission}</span>
                    </div>
                    <div class="car-info-item">
                        <i class="fas fa-gas-pump"></i>
                        <span>${fuel}</span>
                    </div>
                </div>
                <div class="car-card__price">${price}</div>
                <div class="car-card__action">
                    <a href="car-details.html?id=${car.id}" class="btn btn-primary">عرض التفاصيل</a>
                </div>
            </div>
        </div>
    `;
}

function showMap() {
    // Placeholder for map functionality
    alert('خريطة الموقع قريباً');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadDealerInfo();
    loadFeaturedCars();
    
    
    // Mobile menu toggle with animation
    function toggleMobileMenu() {
        const collapse = document.querySelector('.navbar-collapse');
        const icon = document.getElementById('menuIcon');
        
        if (collapse) {
            collapse.classList.toggle('show');
            // Force display
            if (collapse.classList.contains('show')) {
                collapse.style.display = 'block';
                collapse.style.opacity = '1';
                collapse.style.visibility = 'visible';
                if (icon) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            } else {
                collapse.style.display = 'none';
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    }
    
    window.toggleMobileMenu = toggleMobileMenu;
    
    // Ensure nav items are visible on desktop
    if (window.innerWidth > 991) {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse) {
            navbarCollapse.style.display = 'flex';
            navbarCollapse.classList.add('show');
        }
    }
    
    // Scroll indicator
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollIndicator.style.width = scrolled + '%';
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Header scroll effect with class toggle
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth reveal animation for nav items
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
});
