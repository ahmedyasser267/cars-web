/**
 * Car Form JavaScript
 */

// Populate year dropdown
for (let year = 2025; year >= 1990; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    document.getElementById('year').appendChild(option);
}

// Image upload handling
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const previews = document.getElementById('previews');
let uploadedFiles = [];

uploadArea.addEventListener('click', () => fileInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    if (uploadedFiles.length >= 8) {
        showToast('الحد الأقصى 8 صور', 'warning');
        return;
    }
    
    Array.from(files).slice(0, 8 - uploadedFiles.length).forEach(file => {
        if (!file.type.startsWith('image/')) {
            showToast('الملف يجب أن يكون صورة', 'error');
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            showToast('حجم الصورة يجب أن يكون أقل من 5MB', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedFiles.push(file);
            const preview = document.createElement('div');
            preview.className = 'image-preview';
            preview.innerHTML = `
                <img src="${e.target.result}">
                <button type="button" class="btn-remove" onclick="removeImage(${uploadedFiles.length - 1})">
                    <i class="fas fa-times"></i>
                </button>
                ${uploadedFiles.length === 1 ? '<label style="position: absolute; bottom: 5px; left: 5px; background: var(--color-gold); padding: 4px 8px; border-radius: 4px; font-size: 12px;">رئيسية</label>' : ''}
            `;
            previews.appendChild(preview);
        };
        reader.readAsDataURL(file);
    });
}

function removeImage(index) {
    uploadedFiles.splice(index, 1);
    const previews = document.getElementById('previews');
    previews.innerHTML = '';
    uploadedFiles.forEach((file, i) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.createElement('div');
            preview.className = 'image-preview';
            preview.innerHTML = `
                <img src="${e.target.result}">
                <button type="button" class="btn-remove" onclick="removeImage(${i})">
                    <i class="fas fa-times"></i>
                </button>
                ${i === 0 ? '<label style="position: absolute; bottom: 5px; left: 5px; background: var(--color-gold); padding: 4px 8px; border-radius: 4px; font-size: 12px;">رئيسية</label>' : ''}
            `;
            previews.appendChild(preview);
        };
        reader.readAsDataURL(file);
    });
}

window.removeImage = removeImage;

// Form submission
document.getElementById('carForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: `${document.getElementById('brand').value} ${document.getElementById('model').value} ${document.getElementById('year').value}`,
        brand: document.getElementById('brand').value,
        model: document.getElementById('model').value,
        year: parseInt(document.getElementById('year').value),
        price: parseFloat(document.getElementById('price').value),
        mileage: document.getElementById('mileage').value ? parseInt(document.getElementById('mileage').value) : null,
        condition: document.querySelector('input[name="condition"]:checked').value,
        transmission: document.querySelector('input[name="transmission"]:checked').value,
        fuel_type: document.getElementById('fuel_type').value,
        color: document.getElementById('color').value || null,
        description: document.getElementById('description').value || null,
        is_active: document.getElementById('is_active').checked ? 1 : 0
    };
    
    try {
        const result = await API.createCar(formData);
        
        if (result.success && result.data.car_id) {
            // Upload images if any
            if (uploadedFiles.length > 0) {
                const formDataImages = new FormData();
                uploadedFiles.forEach((file, index) => {
                    formDataImages.append(`images[${index}]`, file);
                });
                
                try {
                    await API.uploadCarImages(result.data.car_id, uploadedFiles);
                } catch (error) {
                    console.error('Error uploading images:', error);
                }
            }
            
            showToast('تم إضافة السيارة بنجاح', 'success');
            setTimeout(() => {
                window.location.href = 'cars.html';
            }, 1500);
        }
    } catch (error) {
        showToast(error.message || 'حدث خطأ في إضافة السيارة', 'error');
    }
});
