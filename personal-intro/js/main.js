// 页面加载完成后的交互效果
document.addEventListener('DOMContentLoaded', function() {
    // 为所有标签添加点击动画效果
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // 为兴趣爱好卡片添加滚动动画
    const hobbyCards = document.querySelectorAll('.hobby-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    hobbyCards.forEach(card => {
        observer.observe(card);
    });

    // 头像点击效果
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.addEventListener('click', function() {
            this.style.transform = 'rotate(360deg) scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 600);
        });
    }

    // 多轮播图功能
    initCarousels();

    // 图片画廊点击放大效果
    initImageGallery();

    // 控制台输出欢迎信息
    console.log('%c欢迎来到我的个人介绍页面！', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%c希望你能通过这个页面了解我更多～', 'color: #764ba2; font-size: 14px;');
});

// 多轮播图初始化（每个模块一个轮播，互不干扰）
function initCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    if (!carousels.length) return;

    carousels.forEach(container => {
        const track = container.querySelector('.carousel-track');
        const slides = Array.from(container.querySelectorAll('.carousel-slide'));
        const dots = Array.from(container.querySelectorAll('.dot'));
        const prevBtn = container.querySelector('.carousel-btn.prev');
        const nextBtn = container.querySelector('.carousel-btn.next');

        if (!track || !slides.length) return;

        let currentSlide = 0;
        const totalSlides = slides.length;
        let autoPlayInterval;

        function updateCarousel() {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;

            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateCarousel();
        }

        function startAutoPlay() {
            stopAutoPlay();
            autoPlayInterval = setInterval(nextSlide, 4000);
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoPlay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoPlay();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                startAutoPlay();
            });
        });

        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', startAutoPlay);

        // 初始化
        updateCarousel();
        startAutoPlay();
    });
}

// 图片画廊初始化
function initImageGallery() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            // 创建全屏查看
            const overlay = document.createElement('div');
            overlay.className = 'image-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: pointer;
                animation: fadeIn 0.3s ease;
            `;

            const img = document.createElement('img');
            img.src = this.src;
            img.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 10px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            `;

            overlay.appendChild(img);
            document.body.appendChild(overlay);

            // 点击关闭
            overlay.addEventListener('click', function() {
                overlay.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 300);
            });
        });
    });
}

