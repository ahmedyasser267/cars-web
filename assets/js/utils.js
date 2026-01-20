/**
 * Utility Functions
 */

// Format number with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Format price in EGP
function formatPrice(price) {
  return formatNumber(Math.round(price)) + ' EGP';
}

// Show toast notification
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Add slideOut animation if not exists
if (!document.querySelector('style[data-toast]')) {
  const style = document.createElement('style');
  style.setAttribute('data-toast', 'true');
  style.textContent = `
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Get URL parameter
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Validate email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate phone (Egyptian format)
function validatePhone(phone) {
  const re = /^(01)[0-9]{9}$/;
  return re.test(phone.replace(/\s/g, ''));
}

// Format phone number
function formatPhone(phone) {
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
}

// Load image with error handling
function loadImage(src, alt = '') {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      img.src = '/shared/images/placeholder-car.jpg';
      resolve(img);
    };
    img.src = src;
    img.alt = alt;
  });
}

// Check if mobile device
function isMobile() {
  return window.innerWidth < 768;
}

// Smooth scroll to element
function scrollToElement(element, offset = 0) {
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

// Format date
function formatDate(date, format = 'YYYY-MM-DD') {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day);
}

// Calculate days remaining
function daysRemaining(endDate) {
  const today = new Date();
  const end = new Date(endDate);
  const diff = end - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    formatNumber,
    formatPrice,
    showToast,
    debounce,
    getUrlParameter,
    validateEmail,
    validatePhone,
    formatPhone,
    loadImage,
    isMobile,
    scrollToElement,
    formatDate,
    daysRemaining
  };
}
