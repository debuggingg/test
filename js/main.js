// Handle navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Designer data (예시 데이터)
const designers = [
    {
        name: "지우쌤",
        position: "Senior Stylist",
        image: "img/IMG_3789.png",
        description: "10년 이상의 경력을 가진 시니어 스타일리스트. 트렌디한 컬러와 스타일링 전문가.",
        social: {
            facebook: "https://facebook.com/",
            instagram: "https://instagram.com/kimyounghee_stylist",
            twitter: "https://twitter.com/kimyounghee",
            website: "https://kimyounghee.com"
        }
    },
    {
        name: "Paul 쌤",
        position: "Color Specialist",
        image: "img/3X4 Web1.jpg",
        description: "컬러 전문가. 고객의 피부톤과 스타일에 맞는 최적의 컬러를 제안합니다.",
        social: {
            instagram: "https://instagram.com/jeandupont_color",
            website: "https://jeandupont.com"
        }
    },
    {
        name: "Marie Laurent",
        position: "Hair Artist",
        image: "img/designer3.jpg",
        description: "헤어 아티스트. 창의적인 디자인과 트렌디한 스타일링이 특기입니다."
    }
];

// Create designer cards
function createDesignerCards() {
    const designersContainer = document.querySelector('#designers .row');
    if (!designersContainer) return;

    designers.forEach(designer => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        
        // 소셜 미디어 링크 HTML 생성
        let socialLinks = '';
        if (designer.social) {
            socialLinks = '<div class="designer-social-links">';
            if (designer.social.facebook) {
                socialLinks += `<a href="${designer.social.facebook}" target="_blank" class="social-link" title="Facebook"><i class="fab fa-facebook-f"></i></a>`;
            }
            if (designer.social.instagram) {
                socialLinks += `<a href="${designer.social.instagram}" target="_blank" class="social-link" title="Instagram"><i class="fab fa-instagram"></i></a>`;
            }
            if (designer.social.twitter) {
                socialLinks += `<a href="${designer.social.twitter}" target="_blank" class="social-link" title="Twitter"><i class="fab fa-twitter"></i></a>`;
            }
            if (designer.social.website) {
                socialLinks += `<a href="${designer.social.website}" target="_blank" class="social-link" title="Website"><i class="fas fa-globe"></i></a>`;
            }
            socialLinks += '</div>';
        }
        
        card.innerHTML = `
            <div class="card designer-card">
                <img src="${designer.image}" class="card-img-top" alt="${designer.name}">
                <div class="card-body">
                    <h5 class="card-title">${designer.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${designer.position}</h6>
                    <p class="card-text">${designer.description}</p>
                    ${socialLinks}
                </div>
            </div>
        `;
        designersContainer.appendChild(card);
    });
}

// Initialize carousel
function initCarousel() {
    const carousel = document.querySelector('#heroCarousel');
    if (carousel) {
        new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true
        });
    }
}

// Initialize all components
document.addEventListener('DOMContentLoaded', function() {
    handleNavbarScroll();
    createDesignerCards();
    initCarousel();
    
    // Add scroll event listener for navbar
    window.addEventListener('scroll', handleNavbarScroll);

    // 지연 로딩을 위한 옵저버 설정
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                if (!iframe.src) {
                    iframe.src = iframe.dataset.src;
                }
            }
        });
    });

    // iframe 요소에 옵저버 적용
    const iframes = document.querySelectorAll('iframe[data-src]');
    iframes.forEach(iframe => observer.observe(iframe));
}); 