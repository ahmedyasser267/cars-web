/**
 * Car Details Page JavaScript
 */

const carId = getUrlParameter('id');

// Load car details
function loadCarDetails() {
    const container = document.getElementById('carDetails');
    if (!container || !carId) {
        container.innerHTML = '<p class="text-center text-danger">معرف السيارة غير موجود</p>';
        return;
    }
    
    const car = getCarById(carId);
    
    if (car) {
        container.innerHTML = createCarDetailsHTML(car);
        
        // Initialize gallery
        if (window.initGallery) {
            initGallery();
        }
        
        // Update mobile CTA buttons
        updateMobileCTA(car);
        
        // Load similar cars
        loadSimilarCars(car);
    } else {
        container.innerHTML = '<p class="text-center text-danger">السيارة غير موجودة</p>';
    }
}

function createCarDetailsHTML(car) {
    const images = car.images || [];
    const mainImageUrl = getPrimaryImage(car);
    
    const price = formatPrice(car.price);
    const transmission = car.transmission === 'automatic' ? 'أوتوماتيك' : 'يدوي';
    const fuel = car.fuel_type === 'petrol' ? 'بنزين' : car.fuel_type === 'diesel' ? 'ديزل' : car.fuel_type;
    const condition = car.condition === 'new' ? 'جديد' : 'مستعمل';
    
    // Create thumbnails HTML
    let thumbsHTML = '';
    if (images.length > 0) {
        thumbsHTML = images.map((img, index) => {
            const thumbUrl = typeof img === 'string' ? img : (img.url || img.path || img);
            return `
                <div class="gallery__thumb ${index === 0 ? 'active' : ''}" onclick="changeMainImage('${thumbUrl}', this)">
                    <img src="${thumbUrl}" alt="Thumbnail ${index + 1}">
                </div>
            `;
        }).join('');
    } else {
        // Use main image as thumbnail if no images array
        thumbsHTML = `
            <div class="gallery__thumb active" onclick="changeMainImage('${mainImageUrl}', this)">
                <img src="${mainImageUrl}" alt="Thumbnail">
            </div>
        `;
    }
    
    return `
        <div class="car-details-container">
            <div class="gallery">
                <div class="gallery__main">
                    <img id="mainImage" src="${mainImageUrl}" alt="${car.name}">
                </div>
                <div class="gallery__thumbs">
                    ${thumbsHTML || '<p>لا توجد صور</p>'}
                </div>
            </div>
            
            <div class="car-info">
                <h1 class="car-info__title">${car.name}</h1>
                <p class="car-info__model">موديل ${car.year}</p>
                <div class="car-info__price">${price}</div>
                
                <div class="car-info__specs">
                    <div class="car-info__spec">
                        <i class="fas fa-cog"></i>
                        <span>${transmission}</span>
                    </div>
                    <div class="car-info__spec">
                        <i class="fas fa-gas-pump"></i>
                        <span>${fuel}</span>
                    </div>
                    <div class="car-info__spec">
                        <i class="fas fa-palette"></i>
                        <span>${car.color || 'غير محدد'}</span>
                    </div>
                    <div class="car-info__spec">
                        <i class="fas fa-road"></i>
                        <span>${car.mileage ? formatNumber(car.mileage) + ' كم' : 'غير محدد'}</span>
                    </div>
                    <div class="car-info__spec">
                        <i class="fas fa-calendar"></i>
                        <span>${car.year}</span>
                    </div>
                    <div class="car-info__spec">
                        <i class="fas fa-tag"></i>
                        <span>${condition}</span>
                    </div>
                </div>
                
                ${car.description ? `
                    <div class="car-info__description">
                        <h3>الوصف</h3>
                        <p>${car.description}</p>
                    </div>
                ` : ''}
                
                <div class="car-info__actions">
                    <a href="https://wa.me/201012345678" class="btn btn-whatsapp" id="whatsappLink">
                        <i class="fab fa-whatsapp"></i> واتساب البائع
                    </a>
                    <a href="tel:+201012345678" class="btn btn-primary" id="callLink">
                        <i class="fas fa-phone"></i> اتصل الآن
                    </a>
                </div>
            </div>
        </div>
        
        <div class="specs-table">
            <h3>المواصفات التفصيلية</h3>
            <table>
                <tr>
                    <td>الماركة</td>
                    <td>${car.brand}</td>
                </tr>
                <tr>
                    <td>الموديل</td>
                    <td>${car.model}</td>
                </tr>
                <tr>
                    <td>السنة</td>
                    <td>${car.year}</td>
                </tr>
                <tr>
                    <td>الحالة</td>
                    <td>${condition}</td>
                </tr>
                <tr>
                    <td>المسافة المقطوعة</td>
                    <td>${car.mileage ? formatNumber(car.mileage) + ' كم' : 'غير محدد'}</td>
                </tr>
                <tr>
                    <td>ناقل الحركة</td>
                    <td>${transmission}</td>
                </tr>
                <tr>
                    <td>نوع الوقود</td>
                    <td>${fuel}</td>
                </tr>
                <tr>
                    <td>اللون</td>
                    <td>${car.color || 'غير محدد'}</td>
                </tr>
                <tr>
                    <td>عدد الأبواب</td>
                    <td>${car.doors || 4}</td>
                </tr>
                <tr>
                    <td>عدد المقاعد</td>
                    <td>${car.seats || 5}</td>
                </tr>
                ${car.engine ? `
                <tr>
                    <td>المحرك</td>
                    <td>${car.engine}</td>
                </tr>
                ` : ''}
                ${car.mileage ? `
                <tr>
                    <td>المسافة المقطوعة</td>
                    <td>${formatNumber(car.mileage)} كم</td>
                </tr>
                ` : ''}
            </table>
        </div>
    `;
}

function changeMainImage(imageUrl, thumbElement) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = imageUrl;
    }
    
    // Update active thumbnail
    document.querySelectorAll('.gallery__thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    if (thumbElement) {
        thumbElement.classList.add('active');
    }
}

function updateMobileCTA(car) {
    // This will be updated with actual dealer contact info
    const whatsappBtn = document.getElementById('whatsappBtn');
    const callBtn = document.getElementById('callBtn');
    
    if (whatsappBtn) {
        whatsappBtn.href = `https://wa.me/201012345678?text=أريد الاستفسار عن ${car.name}`;
    }
    if (callBtn) {
        callBtn.href = 'tel:+201012345678';
    }
}

function loadSimilarCars(car) {
    const container = document.getElementById('similarCars');
    if (!container) return;
    
    // Filter similar cars by brand
    const similar = CARS_DATA
        .filter(c => c.brand === car.brand && c.id != car.id)
        .slice(0, 3);
    
    if (similar.length > 0) {
        container.innerHTML = similar.map(c => createCarCard(c)).join('');
        
        // Add animation
        setTimeout(() => {
            const cards = container.querySelectorAll('.car-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.6s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 100);
    } else {
        container.innerHTML = '<p class="text-center">لا توجد سيارات مشابهة</p>';
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCarDetails();
});
