// DOM Elements
const slider = document.querySelector(".slider");
const navbar = document.getElementById("navbar");

// Handle navbar scroll effect
function initNavbarScroll() {
  if (!navbar) return;
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const menu = document.querySelector(".nav__menu");
  const openBtn = document.getElementById("open-menu-btn");
  const closeBtn = document.getElementById("close-menu-btn");
  
  if (!menu || !openBtn || !closeBtn) return;
  
  openBtn.addEventListener("click", () => {
    menu.classList.add("active");
    closeBtn.style.display = "inline-block";
    openBtn.style.display = "none";
  });
  
  closeBtn.addEventListener("click", () => {
    menu.classList.remove("active");
    closeBtn.style.display = "none";
    openBtn.style.display = "inline-block";
  });
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
      
      // Close mobile menu after clicking a link
      const menu = document.querySelector(".nav__menu");
      if (menu && menu.classList.contains("active")) {
        document.getElementById("close-menu-btn").click();
      }
    });
  });
}

function initDraggableWidget() {
  const widget = document.querySelector('.music-widget');
  if (!widget) return;

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  widget.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - widget.getBoundingClientRect().left;
    offsetY = e.clientY - widget.getBoundingClientRect().top;
    widget.style.transition = 'none';
    widget.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    // Keep widget within viewport bounds
    newX = Math.max(0, Math.min(newX, window.innerWidth - widget.offsetWidth));
    newY = Math.max(0, Math.min(newY, window.innerHeight - widget.offsetHeight));

    widget.style.left = newX + 'px';
    widget.style.top = newY + 'px';
    widget.style.right = 'auto';
    widget.style.bottom = 'auto';
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    widget.style.cursor = 'grab';
  });

  // Touch support for mobile
  widget.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    isDragging = true;
    offsetX = touch.clientX - widget.getBoundingClientRect().left;
    offsetY = touch.clientY - widget.getBoundingClientRect().top;
    widget.style.transition = 'none';
  });

  document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const touch = e.touches[0];
    let newX = touch.clientX - offsetX;
    let newY = touch.clientY - offsetY;

    newX = Math.max(0, Math.min(newX, window.innerWidth - widget.offsetWidth));
    newY = Math.max(0, Math.min(newY, window.innerHeight - widget.offsetHeight));

    widget.style.left = newX + 'px';
    widget.style.top = newY + 'px';
    widget.style.right = 'auto';
    widget.style.bottom = 'auto';
  }, { passive: false });

  document.addEventListener('touchend', () => {
    isDragging = false;
  });
}

// Initialize all scripts when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initNavbarScroll();
  initMobileMenu();
  initSmoothScroll();
  initDraggableWidget();
});
