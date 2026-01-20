/**
 * Image Gallery JavaScript
 */

function initGallery() {
    const thumbs = document.querySelectorAll('.gallery__thumb');
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                changeMainImage(img.src, this);
            }
        });
    });
}

// Make it globally available
window.initGallery = initGallery;
window.changeMainImage = function(imageUrl, thumbElement) {
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
};
