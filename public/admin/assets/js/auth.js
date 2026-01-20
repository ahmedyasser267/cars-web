/**
 * Authentication JavaScript
 */

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    // Hide error
    errorDiv.style.display = 'none';
    
    try {
        const data = await API.login(email, password);
        
        if (data.success && data.data) {
            // Store token
            setAuthToken(data.data.token);
            
            // Redirect based on role
            if (data.data.user.role === 'super_admin') {
                window.location.href = 'super-admin/dashboard.html';
            } else {
                window.location.href = 'dealer/dashboard.html';
            }
        }
    } catch (error) {
        errorDiv.textContent = error.message || 'حدث خطأ في تسجيل الدخول';
        errorDiv.style.display = 'block';
    }
});

// Check if already logged in
window.addEventListener('DOMContentLoaded', () => {
    const token = getAuthToken();
    if (token) {
        // Try to decode token to get role
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.role === 'super_admin') {
                window.location.href = 'super-admin/dashboard.html';
            } else {
                window.location.href = 'dealer/dashboard.html';
            }
        } catch (e) {
            // Invalid token, stay on login page
        }
    }
});
