document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM loaded, initializing Swiper...');
            
            const indexSwiper = new Swiper('.index-swiper', {
                loop: true,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },
                speed: 5000,
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                on: {
                    init: function() {
                        console.log('Swiper initialized successfully');
                    },
                    slideChange: function() {
                        console.log('Slide changed to:', this.activeIndex);
                    }
                }
            });

            // Debug - check if content exists
            setTimeout(() => {
                const slides = document.querySelectorAll('.swiper-slide');
                const activeSlide = document.querySelector('.swiper-slide-active');
                console.log('Total slides:', slides.length);
                console.log('Active slide:', activeSlide);
                
                slides.forEach((slide, index) => {
                    const heading = slide.querySelector('.slide-heading');
                    const paragraph = slide.querySelector('.slide-paragraph');
                    const button = slide.querySelector('.slide-btn');
                    console.log(`Slide ${index + 1}:`, {
                        heading: heading?.textContent,
                        paragraph: paragraph?.textContent?.substring(0, 50) + '...',
                        button: button?.textContent
                    });
                });
            }, 1000);
        });
        // categories swiper
        // Initialize Swiper
document.addEventListener('DOMContentLoaded', function() {
  new Swiper('.category-swiper', {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 1000,
    effect: 'slide',
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 4,
      }
    }
  });
});
// index stats section 
document.addEventListener('DOMContentLoaded', function () {
  const odometerEls = document.querySelectorAll('.odometer');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        odometerEls.forEach(el => {
          const target = parseInt(el.getAttribute('data-count'));

          // Reset the value to 0 each time it's triggered
          el.innerHTML = 0;

          const od = new Odometer({
            el: el,
            value: 0,
            format: '(,ddd)',
            theme: 'default'
          });

          // Trigger the animation
          od.update(target);
        });
      }
    });
  }, { threshold: 0.5 }); // 50% of section must be visible

  const statsSection = document.getElementById('printing-stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
});
let lastTriggered = 0;
const cooldown = 2000; // 2 seconds

const observer = new IntersectionObserver((entries) => {
  const now = Date.now();
  entries.forEach(entry => {
    if (entry.isIntersecting && now - lastTriggered > cooldown) {
      lastTriggered = now;

      odometerEls.forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        el.innerHTML = 0;
        const od = new Odometer({
          el: el,
          value: 0,
          format: '(,ddd)',
          theme: 'default'
        });
        od.update(target);
      });
    }
  });
}, { threshold: 0.5 });
// brands swiper initialization
// Initialize Swiper
// Optimized Swiper Initialization
document.addEventListener('DOMContentLoaded', function() {
  const brandsSwiper = new Swiper('.about-brands .brands-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    speed: 8000,
    freeMode: {
      enabled: true,
      momentum: false,
    },
    grabCursor: true,
    breakpoints: {
      576: {
        spaceBetween: 20
      },
      768: {
        spaceBetween: 25
      },
      992: {
        spaceBetween: 30
      }
    }
  });

  // Pause on hover
  const swiperContainer = document.querySelector('.about-brands .brands-swiper');
  if (swiperContainer) {
    swiperContainer.addEventListener('mouseenter', () => brandsSwiper.autoplay.stop());
    swiperContainer.addEventListener('mouseleave', () => brandsSwiper.autoplay.start());
  }
});
// contact page form validation
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize WOW.js
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }

    // Form submission handler
    const submitButton = document.querySelector('.submit-button');
    if (submitButton) {
        submitButton.addEventListener('click', function (e) {
            e.preventDefault();

            // Add loading state
            this.innerHTML = '<span>Processing Quote...</span>';
            this.disabled = true;

            // Simulate form processing
            setTimeout(() => {
                this.innerHTML = '<span>Quote Sent Successfully!</span>';
                this.style.background = 'linear-gradient(135deg, #28a745, #20c997)';

                setTimeout(() => {
                    this.innerHTML = '<span>Get Instant Quote</span>';
                    this.style.background = 'linear-gradient(135deg, var(--color-1), var(--color-2))';
                    this.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    // Add floating animation to contact items
    const contactItems = document.querySelectorAll('.contact-info-item');
    contactItems.forEach((item, index) => {
        setInterval(() => {
            item.style.transform = `translateY(${Math.sin(Date.now() * 0.001 + index) * 3}px)`;
        }, 50);
    });
});
// gallery filter
document.addEventListener('DOMContentLoaded', function() {
  // Select all filter buttons and gallery items
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  // Add click event listeners to each filter button
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Filter gallery items
      filterGalleryItems(filterValue);
    });
  });
  
  function filterGalleryItems(filter) {
    galleryItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      
      // If 'all' is selected or item matches the filter
      if (filter === 'all' || itemCategory === filter) {
        // Fade in matching items
        fadeInItem(item);
      } else {
        // Fade out non-matching items
        fadeOutItem(item);
      }
    });
  }
  
  function fadeOutItem(item) {
    // Add fade-out class and set display to none after animation
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    // After fade out completes, hide the element
    setTimeout(() => {
      item.style.display = 'none';
    }, 500);
  }
  
  function fadeInItem(item) {
    // First set display to block (but still hidden)
    item.style.display = 'block';
    
    // Small delay to allow display to update before starting fade in
    setTimeout(() => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      
      // Trigger reflow to ensure initial styles are applied before animation
      void item.offsetHeight;
      
      // Animate to visible
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
      item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }, 10);
  }
  
  // Initialize Wow.js for scroll animations
  new WOW().init();
});