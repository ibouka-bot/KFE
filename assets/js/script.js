// === Navigation Smooth Scroll ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute('href'));
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// === Carousel Functionality ===
const carouselTrack = document.querySelector('.carousel-track');
const prevButton = document.querySelector('.carousel-btn.prev');
const nextButton = document.querySelector('.carousel-btn.next');

let currentIndex = 0;

// Fonction pour mettre à jour la position du carrousel
function updateCarousel() {
  const slideWidth = carouselTrack.children[0].getBoundingClientRect().width;
  carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Navigation avec les boutons Précédent/Suivant
prevButton?.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

nextButton?.addEventListener('click', () => {
  if (currentIndex < carouselTrack.children.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

// === Auto Scroll Functionality ===
function autoScroll() {
  currentIndex = (currentIndex + 1) % carouselTrack.children.length; // Retour au début après la dernière image
  updateCarousel();
}

const autoScrollInterval = setInterval(autoScroll, 5000); // Défilement toutes les 5 secondes

// === Form Submit Confirmation ===
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    alert('Merci pour votre message ! Nous vous répondrons bientôt.');
    contactForm.reset(); // Réinitialise le formulaire
  });
}

// === Header Sticky Effect ===
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});

// === Scroll Animation ===
// Optimisation avec debounce pour réduire le nombre d'appels
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function () {
    const context = this, args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const scrollElements = document.querySelectorAll('.scroll-animation');

// Vérifie si un élément est visible dans la fenêtre
const elementInView = (el, dividend = 1.25) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
};

// Ajoute la classe pour afficher l'élément
const displayScrollElement = (element) => {
  element.classList.add('visible');
};

// Gère l'animation lors du défilement
const handleScrollAnimation = () => {
  scrollElements.forEach(el => {
    if (elementInView(el)) {
      displayScrollElement(el);
    }
  });
};

window.addEventListener('scroll', debounce(handleScrollAnimation));

// === Loader: Masquer après le chargement complet de la page ===
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500); // Disparition en douceur
  }
});
