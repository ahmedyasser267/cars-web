/**
 * Dashboard JavaScript
 */

async function loadDashboard() {
    try {
        // Load dealer profile (includes stats)
        const profileData = await API.getDealerProfile();
        
        if (profileData.success && profileData.data) {
            const dealer = profileData.data;
            
            // Update stats
            if (dealer.stats) {
                document.getElementById('totalCars').textContent = dealer.stats.total_cars || 0;
                document.getElementById('activeCars').textContent = dealer.stats.active_cars || 0;
                document.getElementById('totalViews').textContent = formatNumber(dealer.stats.total_views || 0);
            }
            
            // Update subscription banner
            updateSubscriptionBanner(dealer);
            
            // Calculate days remaining
            if (dealer.subscription_end) {
                const days = daysRemaining(dealer.subscription_end);
                document.getElementById('daysLeft').textContent = days > 0 ? days : 0;
            }
        }
        
        // Load recent cars
        const carsData = await API.getCars({ limit: 5 });
        
        if (carsData.success && carsData.data) {
            const container = document.getElementById('recentCars');
            if (carsData.data.length > 0) {
                container.innerHTML = carsData.data.map(car => createCarRow(car)).join('');
            } else {
                container.innerHTML = '<tr><td colspan="5" class="text-center">لا توجد سيارات</td></tr>';
            }
        }
    } catch (error) {
        console.error('Error loading dashboard:', error);
        showToast('حدث خطأ في تحميل البيانات', 'error');
    }
}

function updateSubscriptionBanner(dealer) {
    const banner = document.getElementById('subscriptionBanner');
    if (!banner) return;
    
    const days = daysRemaining(dealer.subscription_end);
    const planName = dealer.subscription_plan === 'pro' ? 'Pro' : 'Starter';
    const carsLimit = dealer.cars_limit;
    const carsCount = dealer.stats?.total_cars || 0;
    
    let status = 'success';
    let statusText = 'نشط';
    
    if (dealer.subscription_status !== 'active') {
        status = 'danger';
        statusText = dealer.subscription_status === 'suspended' ? 'موقوف' : 'منتهي';
    } else if (days < 7) {
        status = 'warning';
        statusText = 'ينتهي قريباً';
    }
    
    banner.className = `subscription-banner ${status}`;
    banner.innerHTML = `
        <div>
            <div style="font-size: 18px; font-weight: 600; margin-bottom: var(--spacing-sm);">
                ${status === 'success' ? '✅' : status === 'warning' ? '⚠️' : '❌'} ${statusText} - ${days} يوم متبقي
            </div>
            <div style="font-size: 14px; opacity: 0.9;">
                خطتك: ${planName} (${carsCount}/${carsLimit} سيارة)
            </div>
        </div>
        <div>
            <a href="subscription.html" class="btn" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3);">
                تجديد الاشتراك
            </a>
        </div>
    `;
}

function createCarRow(car) {
    const imageUrl = car.primary_image 
        ? `/backend/uploads/${car.primary_image}` 
        : '../../../shared/images/placeholder-car.jpg';
    
    const statusBadge = car.is_active 
        ? '<span class="badge badge-success">نشط</span>'
        : '<span class="badge badge-secondary">مخفي</span>';
    
    return `
        <tr>
            <td>
                <img src="${imageUrl}" alt="${car.name}" style="width: 60px; height: 40px; object-fit: cover; border-radius: var(--radius-sm);">
            </td>
            <td>${car.name}</td>
            <td>${formatPrice(car.price)}</td>
            <td>${statusBadge}</td>
            <td>
                <a href="edit-car.html?id=${car.id}" class="btn btn-sm" style="margin-left: var(--spacing-sm);">
                    <i class="fas fa-edit"></i>
                </a>
                <a href="cars.html" class="btn btn-sm">
                    <i class="fas fa-eye"></i>
                </a>
            </td>
        </tr>
    `;
}

// Initialize
document.addEventListener('DOMContentLoaded', loadDashboard);
