// === Navigation Smooth Scroll ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  // Sélectionne le bouton du menu et le menu latéral
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

// Ajoute un événement "click" pour afficher ou masquer le menu
menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('active');
});


  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// === Carousel Functionality ===
const carouselTrack = document.querySelector('.carousel-track');
const prevButton = document.querySelector('.carousel-btn.prev');
const nextButton = document.querySelector('.carousel-btn.next');

let currentIndex = 0;

function updateCarousel() {
  const slideWidth = carouselTrack.children[0].getBoundingClientRect().width;
  carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

nextButton.addEventListener('click', () => {
  if (currentIndex < carouselTrack.children.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

// === Auto Scroll Functionality ===
function autoScroll() {
  if (currentIndex < carouselTrack.children.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateCarousel();
}

// Set interval for auto scroll
setInterval(autoScroll, 9000); // Change image every 3 seconds

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
const scrollElements = document.querySelectorAll('.scroll-animation');

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const displayScrollElement = (element) => {
  element.classList.add('visible');
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    }
  });
};

window.addEventListener('scroll', () => {
  handleScrollAnimation();
});

// Masquer la loader une fois le chargement de la page terminé
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
});
