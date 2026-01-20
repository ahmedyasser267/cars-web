/**
 * Admin Core JavaScript
 */

// Check authentication
function checkAuth() {
    const token = getAuthToken();
    if (!token) {
        window.location.href = '../login.html';
        return false;
    }
    return true;
}

// Logout
async function logout() {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        try {
            await API.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            removeAuthToken();
            window.location.href = '../login.html';
        }
    }
}

// Make logout globally available
window.logout = logout;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    if (!checkAuth()) return;
    
    // Decode token to get user info
    try {
        const token = getAuthToken();
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        // Update user email if element exists
        const userEmailEl = document.getElementById('userEmail');
        if (userEmailEl) {
            userEmailEl.textContent = payload.email || '';
        }
    } catch (error) {
        console.error('Error decoding token:', error);
    }
});
