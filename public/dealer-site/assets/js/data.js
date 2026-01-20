/**
 * Static Data - Cars and Dealer Info
 * صور سيارات حقيقية من Google Images
 */

const DEALER_INFO = {
    name: "Friends Motors",
    tagline: "وكيلك الموثوق في السيارات المستعملة",
    phone: "01012345678",
    whatsapp: "01012345678",
    address: "القاهرة، مصر",
    about: "نحن في Friends Motors نقدم لك أفضل السيارات المستعملة بجودة عالية وأسعار مناسبة. مع أكثر من 15 عاماً من الخبرة في مجال السيارات، نضمن لك رضا تام عن شرائك.",
    logo: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=200&h=200&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&h=1080&fit=crop&auto=format",
    aboutImage: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=800&h=600&fit=crop&auto=format"
};

const CARS_DATA = [
    {
        id: 1,
        name: "Toyota Corolla 2020",
        brand: "Toyota",
        model: "Corolla",
        year: 2020,
        price: 350000,
        mileage: 45000,
        condition: "used",
        transmission: "automatic",
        fuel_type: "petrol",
        color: "أبيض",
        description: "سيارة ممتازة، مالك واحد، سجل صيانة كامل، حالة ممتازة جداً. محرك قوي واقتصادي في استهلاك الوقود.",
        is_featured: true,
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfxmEEW8BFhlG71GLcOeoru1pJpxySGKjWxg&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxaMpTlg3PwHx-wddsxzPsC53dThwNkB6v3Q&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdSCkOX13rLZpYo2GSI6N7N-fvPTXed8Y43Q&s"
        ]
    },
    {
        id: 2,
        name: "Honda Civic 2019",
        brand: "Honda",
        model: "Civic",
        year: 2019,
        price: 420000,
        mileage: 38000,
        condition: "used",
        transmission: "automatic",
        fuel_type: "petrol",
        color: "أسود",
        description: "موديل رياضي، مسافة قليلة، محافظة عليها بشكل ممتاز. تصميم عصري وأداء قوي.",
        is_featured: true,
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRSgskpjtCifvBGpaW48dU4vZathDExh8Biw&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyWFAklODnJL4B4BmP3Bx0yXigKvDS2y90Fg&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfqUdxeC1SJW1dI1SEGV638i5GowT0kS17_g&s"
        ]
    },
    {
        id: 3,
        name: "Hyundai Elantra 2021",
        brand: "Hyundai",
        model: "Elantra",
        year: 2021,
        price: 380000,
        mileage: 25000,
        condition: "used",
        transmission: "automatic",
        fuel_type: "petrol",
        color: "فضي",
        description: "كالجديدة، ضمان باقي، حالة ممتازة. تقنيات حديثة وراحة عالية.",
        is_featured: false,
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy1ZJs63J6lol6-ZB6BkcRFsQB7QH9cky34w&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfxmEEW8BFhlG71GLcOeoru1pJpxySGKjWxg&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxaMpTlg3PwHx-wddsxzPsC53dThwNkB6v3Q&s"
        ]
    },
    {
        id: 4,
        name: "Nissan Altima 2020",
        brand: "Nissan",
        model: "Altima",
        year: 2020,
        price: 400000,
        mileage: 50000,
        condition: "used",
        transmission: "automatic",
        fuel_type: "petrol",
        color: "أبيض لؤلؤي",
        description: "سيارة فاخرة، مواصفات عالية، حالة جيدة جداً. راحة فائقة وتقنيات متقدمة.",
        is_featured: true,
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdSCkOX13rLZpYo2GSI6N7N-fvPTXed8Y43Q&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRSgskpjtCifvBGpaW48dU4vZathDExh8Biw&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyWFAklODnJL4B4BmP3Bx0yXigKvDS2y90Fg&s"
        ]
    },
    {
        id: 5,
        name: "Chevrolet Malibu 2019",
        brand: "Chevrolet",
        model: "Malibu",
        year: 2019,
        price: 360000,
        mileage: 60000,
        condition: "used",
        transmission: "automatic",
        fuel_type: "petrol",
        color: "أزرق",
        description: "سيارة عائلية مريحة، مساحة واسعة، موثوقة. مثالية للرحلات الطويلة.",
        is_featured: false,
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfqUdxeC1SJW1dI1SEGV638i5GowT0kS17_g&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy1ZJs63J6lol6-ZB6BkcRFsQB7QH9cky34w&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfxmEEW8BFhlG71GLcOeoru1pJpxySGKjWxg&s"
        ]
    },
    {
        id: 6,
        name: "Ford Focus 2021",
        brand: "Ford",
        model: "Focus",
        year: 2021,
        price: 320000,
        mileage: 30000,
        condition: "used",
        transmission: "automatic",
        fuel_type: "petrol",
        color: "أحمر",
        description: "سيارة حديثة، توفير في الوقود، مناسبة للشباب. أداء ممتاز وتصميم جذاب.",
        is_featured: false,
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxaMpTlg3PwHx-wddsxzPsC53dThwNkB6v3Q&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdSCkOX13rLZpYo2GSI6N7N-fvPTXed8Y43Q&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRSgskpjtCifvBGpaW48dU4vZathDExh8Biw&s"
        ]
    },
    {
        id: 7,
        name: "BMW 320i 2020",
        brand: "BMW",
        model: "320i",
        year: 2020,
        price: 850000,
        mileage: 35000,
        condition: "used",
        transmission: "automatic",
        fuel_type: "petrol",
        color: "أبيض",
        description: "سيارة فاخرة من BMW، أداء استثنائي، تقنيات متقدمة، حالة ممتازة جداً.",
        is_featured: true,
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyWFAklODnJL4B4BmP3Bx0yXigKvDS2y90Fg&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfqUdxeC1SJW1dI1SEGV638i5GowT0kS17_g&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy1ZJs63J6lol6-ZB6BkcRFsQB7QH9cky34w&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfxmEEW8BFhlG71GLcOeoru1pJpxySGKjWxg&s"
        ]
    },
    {
        id: 8,
        name: "Mercedes-Benz C200 2019",
        brand: "Mercedes-Benz",
        model: "C200",
        year: 2019,
        price: 920000,
        mileage: 40000,
        condition: "used",
        transmission: "automatic",
        fuel_type: "petrol",
        color: "أسود",
        description: "سيارة فاخرة من مرسيدس، راحة فائقة، تقنيات حديثة، حالة ممتازة.",
        is_featured: true,
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy1ZJs63J6lol6-ZB6BkcRFsQB7QH9cky34w&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfxmEEW8BFhlG71GLcOeoru1pJpxySGKjWxg&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxaMpTlg3PwHx-wddsxzPsC53dThwNkB6v3Q&s"
        ]
    },
    {
        id: 9,
        name: "Kia Optima 2020",
        brand: "Kia",
        model: "Optima",
        year: 2020,
        price: 370000,
        mileage: 55000,
        condition: "used",
        transmission: "automatic",
        fuel_type: "petrol",
        color: "فضي",
        description: "سيارة عائلية أنيقة، مواصفات جيدة، حالة ممتازة. مناسبة للاستخدام اليومي.",
        is_featured: false,
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdSCkOX13rLZpYo2GSI6N7N-fvPTXed8Y43Q&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRSgskpjtCifvBGpaW48dU4vZathDExh8Biw&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyWFAklODnJL4B4BmP3Bx0yXigKvDS2y90Fg&s"
        ]
    },
    {
        id: 10,
        name: "Mazda 6 2019",
        brand: "Mazda",
        model: "6",
        year: 2019,
        price: 410000,
        mileage: 42000,
        condition: "used",
        transmission: "automatic",
        fuel_type: "petrol",
        color: "أحمر",
        description: "سيارة رياضية أنيقة، تصميم عصري، أداء ممتاز. مناسبة للشباب.",
        is_featured: false,
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfqUdxeC1SJW1dI1SEGV638i5GowT0kS17_g&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy1ZJs63J6lol6-ZB6BkcRFsQB7QH9cky34w&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfxmEEW8BFhlG71GLcOeoru1pJpxySGKjWxg&s"
        ]
    },
    {
        id: 11,
        name: "Volkswagen Passat 2020",
        brand: "Volkswagen",
        model: "Passat",
        year: 2020,
        price: 440000,
        mileage: 48000,
        condition: "used",
        transmission: "automatic",
        fuel_type: "petrol",
        color: "أسود",
        description: "سيارة ألمانية فاخرة، جودة عالية، راحة فائقة. مثالية للعائلات.",
        is_featured: true,
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxaMpTlg3PwHx-wddsxzPsC53dThwNkB6v3Q&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdSCkOX13rLZpYo2GSI6N7N-fvPTXed8Y43Q&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRSgskpjtCifvBGpaW48dU4vZathDExh8Biw&s"
        ]
    },
    {
        id: 12,
        name: "Peugeot 301 2021",
        brand: "Peugeot",
        model: "301",
        year: 2021,
        price: 290000,
        mileage: 28000,
        condition: "used",
        transmission: "manual",
        fuel_type: "petrol",
        color: "أبيض",
        description: "سيارة اقتصادية، توفير في الوقود، مناسبة للشباب. حالة ممتازة.",
        is_featured: false,
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyWFAklODnJL4B4BmP3Bx0yXigKvDS2y90Fg&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfqUdxeC1SJW1dI1SEGV638i5GowT0kS17_g&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy1ZJs63J6lol6-ZB6BkcRFsQB7QH9cky34w&s"
        ]
    },
    {
        id: 13,
        name: "Renault Logan 2020",
        brand: "Renault",
        model: "Logan",
        year: 2020,
        price: 280000,
        mileage: 65000,
        condition: "used",
        transmission: "manual",
        fuel_type: "petrol",
        color: "فضي",
        description: "سيارة عملية واقتصادية، موثوقة، مناسبة للاستخدام اليومي. حالة جيدة.",
        is_featured: false,
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfxmEEW8BFhlG71GLcOeoru1pJpxySGKjWxg&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxaMpTlg3PwHx-wddsxzPsC53dThwNkB6v3Q&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdSCkOX13rLZpYo2GSI6N7N-fvPTXed8Y43Q&s"
        ]
    },
    {
        id: 14,
        name: "Skoda Octavia 2019",
        brand: "Skoda",
        model: "Octavia",
        year: 2019,
        price: 390000,
        mileage: 52000,
        condition: "used",
        transmission: "automatic",
        fuel_type: "petrol",
        color: "أبيض",
        description: "سيارة تشيكية فاخرة، جودة ألمانية، مساحة واسعة. حالة ممتازة.",
        is_featured: false,
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRSgskpjtCifvBGpaW48dU4vZathDExh8Biw&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyWFAklODnJL4B4BmP3Bx0yXigKvDS2y90Fg&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfqUdxeC1SJW1dI1SEGV638i5GowT0kS17_g&s"
        ]
    },
    {
        id: 15,
        name: "Audi A4 2020",
        brand: "Audi",
        model: "A4",
        year: 2020,
        price: 780000,
        mileage: 32000,
        condition: "used",
        transmission: "automatic",
        fuel_type: "petrol",
        color: "أسود",
        description: "سيارة فاخرة من أودي، تقنيات متقدمة، أداء استثنائي. حالة ممتازة جداً.",
        is_featured: true,
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy1ZJs63J6lol6-ZB6BkcRFsQB7QH9cky34w&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfxmEEW8BFhlG71GLcOeoru1pJpxySGKjWxg&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxaMpTlg3PwHx-wddsxzPsC53dThwNkB6v3Q&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdSCkOX13rLZpYo2GSI6N7N-fvPTXed8Y43Q&s"
        ]
    }
];

// Helper function to get car by ID
function getCarById(id) {
    return CARS_DATA.find(car => car.id === parseInt(id));
}

// Helper function to get primary image
function getPrimaryImage(car) {
    return car.images && car.images.length > 0 ? car.images[0] : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfxmEEW8BFhlG71GLcOeoru1pJpxySGKjWxg&s";
}
