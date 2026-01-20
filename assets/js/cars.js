/**
 * Cars Listing Page JavaScript
 */

let currentPage = 1;
let currentFilters = {};
let allCars = [...CARS_DATA];

// Load cars
function loadCars(page = 1, filters = {}) {
    const container = document.getElementById('carsGrid');
    if (!container) return;
    
    container.innerHTML = '<div class="spinner"></div>';
    
    // Apply filters
    let filteredCars = [...allCars];
    
    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredCars = filteredCars.filter(car => 
            car.name.toLowerCase().includes(searchTerm) ||
            car.brand.toLowerCase().includes(searchTerm) ||
            car.model.toLowerCase().includes(searchTerm)
        );
    }
    
    if (filters.brand) {
        filteredCars = filteredCars.filter(car => car.brand === filters.brand);
    }
    
    if (filters.min_price) {
        filteredCars = filteredCars.filter(car => car.price >= parseFloat(filters.min_price));
    }
    
    if (filters.max_price) {
        filteredCars = filteredCars.filter(car => car.price <= parseFloat(filters.max_price));
    }
    
    if (filters.year) {
        filteredCars = filteredCars.filter(car => car.year === parseInt(filters.year));
    }
    
    // Sort
    if (filters.sort === 'price_low') {
        filteredCars.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price_high') {
        filteredCars.sort((a, b) => b.price - a.price);
    } else {
        filteredCars.sort((a, b) => b.year - a.year); // newest first
    }
    
    // Pagination
    const limit = 12;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedCars = filteredCars.slice(start, end);
    const totalPages = Math.ceil(filteredCars.length / limit);
    
        if (paginatedCars.length > 0) {
            container.innerHTML = paginatedCars.map(car => createCarCard(car)).join('');
            
            // Add scroll animation with Intersection Observer
            setTimeout(() => {
                const cards = container.querySelectorAll('.car-card');
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
            }, 100);
        
        updatePagination({ page, pages: totalPages, total: filteredCars.length });
    } else {
        container.innerHTML = '<p class="text-center">لا توجد سيارات متاحة</p>';
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

function updatePagination(pagination) {
    const container = document.getElementById('pagination');
    if (!container || pagination.pages <= 1) {
        container.innerHTML = '';
        return;
    }
    
    let html = '<div class="pagination">';
    
    // Previous button
    if (pagination.page > 1) {
        html += `<button class="page-btn" onclick="goToPage(${pagination.page - 1})">السابق</button>`;
    }
    
    // Page numbers
    for (let i = 1; i <= pagination.pages; i++) {
        if (i === pagination.page) {
            html += `<span class="page-number active">${i}</span>`;
        } else if (i === 1 || i === pagination.pages || (i >= pagination.page - 2 && i <= pagination.page + 2)) {
            html += `<button class="page-number" onclick="goToPage(${i})">${i}</button>`;
        } else if (i === pagination.page - 3 || i === pagination.page + 3) {
            html += `<span class="page-dots">...</span>`;
        }
    }
    
    // Next button
    if (pagination.page < pagination.pages) {
        html += `<button class="page-btn" onclick="goToPage(${pagination.page + 1})">التالي</button>`;
    }
    
    html += '</div>';
    container.innerHTML = html;
}

function goToPage(page) {
    currentPage = page;
    loadCars(page, currentFilters);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Filter handlers
function applyFilters() {
    const filters = {};
    
    // Search
    const search = document.getElementById('searchInput').value.trim();
    if (search) {
        // Note: Backend search would need to be implemented
        filters.search = search;
    }
    
    // Brand
    const brand = document.getElementById('brandFilter').value;
    if (brand) {
        filters.brand = brand;
    }
    
    // Price
    const price = document.getElementById('priceFilter').value;
    if (price) {
        const [min, max] = price.split('-');
        if (min) filters.min_price = min;
        if (max) filters.max_price = max;
    }
    
    // Year
    const year = document.getElementById('yearFilter').value;
    if (year) {
        filters.year = year;
    }
    
    currentFilters = filters;
    currentPage = 1;
    loadCars(1, filters);
}

// Load brands and years for filters
function loadFilterOptions() {
    const brands = [...new Set(allCars.map(car => car.brand))].sort();
    const years = [...new Set(allCars.map(car => car.year))].sort((a, b) => b - a);
    
    // Populate brand filter
    const brandFilter = document.getElementById('brandFilter');
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandFilter.appendChild(option);
    });
    
    // Populate year filter
    const yearFilter = document.getElementById('yearFilter');
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCars();
    loadFilterOptions();
    
    // Filter event listeners
    document.getElementById('searchInput').addEventListener('input', debounce(applyFilters, 500));
    document.getElementById('brandFilter').addEventListener('change', applyFilters);
    document.getElementById('priceFilter').addEventListener('change', applyFilters);
    document.getElementById('yearFilter').addEventListener('change', applyFilters);
    document.getElementById('sortFilter').addEventListener('change', applyFilters);
});

// Add pagination styles
const style = document.createElement('style');
style.textContent = `
    .pagination-container {
        margin-top: var(--spacing-2xl);
        text-align: center;
    }
    
    .pagination {
        display: inline-flex;
        gap: var(--spacing-sm);
        align-items: center;
    }
    
    .page-btn, .page-number {
        padding: var(--spacing-sm) var(--spacing-md);
        border: 2px solid var(--color-silver);
        background: var(--color-white);
        color: var(--color-secondary);
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: var(--transition-fast);
        font-weight: 600;
    }
    
    .page-btn:hover, .page-number:hover {
        border-color: var(--color-primary);
        color: var(--color-primary);
    }
    
    .page-number.active {
        background: var(--color-primary);
        color: var(--color-white);
        border-color: var(--color-primary);
    }
    
    .page-dots {
        padding: var(--spacing-sm);
    }
    
    .filters-bar {
        background: var(--color-white);
        padding: var(--spacing-lg) 0;
        box-shadow: var(--shadow-sm);
        position: sticky;
        top: 80px;
        z-index: var(--z-sticky);
    }
    
    .filters-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: var(--spacing-md);
    }
    
    @media (max-width: 768px) {
        .filters-container {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);
