document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });
  
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenu) {
      mobileMenu.addEventListener('click', function() {
          mobileMenu.classList.toggle('active');
          navMenu.classList.toggle('active');
      });
  }
  
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          mobileMenu.classList.remove('active');
          navMenu.classList.remove('active');
      });
  });
  
  const animateElements = document.querySelectorAll('.service-card, .about-text, .about-image, .testimonial-content, .stat');
  
  const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);
  
  animateElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(element);
  });
  
  const testimonialSlider = document.getElementById('testimonial-slider');
  const slides = testimonialSlider ? testimonialSlider.querySelectorAll('.testimonial-slide') : [];
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  
  let currentSlide = 0;
  
  function showSlide(index) {
      if (!testimonialSlider) return;
      slides.forEach(slide => {
          slide.style.display = 'none';
      });
      dots.forEach(dot => {
          dot.classList.remove('active');
      });
      slides[index].style.display = 'block';
      dots[index].classList.add('active');
      slides[index].style.animation = 'fadeIn 0.5s ease-out';
  }
  if (slides.length > 0) {
      showSlide(currentSlide);
      if (prevBtn) {
          prevBtn.addEventListener('click', () => {
              currentSlide = (currentSlide - 1 + slides.length) % slides.length;
              showSlide(currentSlide);
          });
      }
      
      if (nextBtn) {
          nextBtn.addEventListener('click', () => {
              currentSlide = (currentSlide + 1) % slides.length;
              showSlide(currentSlide);
          });
      }
      dots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
              currentSlide = index;
              showSlide(currentSlide);
          });
      });
      setInterval(() => {
          currentSlide = (currentSlide + 1) % slides.length;
          showSlide(currentSlide);
      }, 5000);
  }
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
      const formInputs = contactForm.querySelectorAll('input, textarea');
      
      formInputs.forEach(input => {
          input.addEventListener('focus', function() {
              this.parentElement.classList.add('focused');
          });
          input.addEventListener('blur', function() {
              this.parentElement.classList.remove('focused');
              if (this.value.trim() !== '') {
                  this.classList.add('filled');
              } else {
                  this.classList.remove('filled');
              }
          });
      });
      
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const message = document.getElementById('message').value;
          let isValid = true;
          
          formInputs.forEach(input => {
              input.classList.remove('error');
              const errorMsg = input.parentElement.querySelector('.error-message');
              if (errorMsg) {
                  errorMsg.remove();
              }
          });
          if (!name) {
              showError(document.getElementById('name'), 'Please enter your name');
              isValid = false;
          }
          if (!email) {
              showError(document.getElementById('email'), 'Please enter your email');
              isValid = false;
          } else {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(email)) {
                  showError(document.getElementById('email'), 'Please enter a valid email address');
                  isValid = false;
              }
          }
          if (!message) {
              showError(document.getElementById('message'), 'Please enter your message');
              isValid = false;
          }
          
          if (isValid) {
              const successMessage = document.createElement('div');
              successMessage.className = 'success-message';
              successMessage.innerHTML = `
                  <div class="success-icon">
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                  </div>
                  <p>Thank you for your message! We will get back to you soon.</p>
              `;
              contactForm.style.opacity = '0';
              setTimeout(() => {
                  contactForm.parentElement.appendChild(successMessage);
                  contactForm.style.display = 'none';
                  successMessage.style.animation = 'fadeIn 0.5s ease-out forwards';
              }, 300);
          }
      });
      
      function showError(input, message) {
          input.classList.add('error');
          const errorMessage = document.createElement('div');
          errorMessage.className = 'error-message';
          errorMessage.textContent = message;
          input.parentElement.appendChild(errorMessage);
      }
  }
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              const headerHeight = document.querySelector('header').offsetHeight;
              const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
              window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });
  const sections = document.querySelectorAll('section');
  
  function setActiveNav() {
      const scrollPosition = window.scrollY + 100; 
      
      sections.forEach(section => {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id');
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              document.querySelectorAll('.nav-menu a').forEach(link => {
                  link.classList.remove('active');
                  if (link.getAttribute('href') === `#${sectionId}`) {
                      link.classList.add('active');
                  }
              });
          }
      });
  }
  
  window.addEventListener('scroll', setActiveNav);
  setActiveNav();
  const style = document.createElement('style');
  style.textContent = `
      .form-group.focused label {
          color: var(--primary-color);
      }
      
      .error {
          border-color: #e53e3e !important;
          box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1) !important;
      }
      
      .error-message {
          color: #e53e3e;
          font-size: 0.875rem;
          margin-top: 0.5rem;
      }
      
      .success-message {
          background-color: #f0fdf4;
          border: 1px solid #86efac;
          border-radius: var(--border-radius);
          padding: 2rem;
          text-align: center;
          margin-top: 1rem;
          opacity: 0;
      }
      
      .success-icon {
          color: #16a34a;
          margin-bottom: 1rem;
          display: flex;
          justify-content: center;
      }
      
      .success-message p {
          color: #166534;
          font-size: 1.1rem;
          margin-bottom: 0;
      }
  `;
  document.head.appendChild(style);
});