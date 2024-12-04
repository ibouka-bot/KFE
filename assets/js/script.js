// === Sticky Header au défilement ===
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});

// === Défilement fluide vers les sections avec mise en surbrillance du lien actif ===
document.querySelectorAll('.navbar ul li a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - header.offsetHeight, // Ajusté à la hauteur de l'en-tête
        behavior: 'smooth',
      });

      // Mise en surbrillance du lien actif
      document.querySelectorAll('.navbar ul li a').forEach(a => a.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

// === Menu burger pour petits écrans ===
const toggleButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.navbar ul');

toggleButton.addEventListener('click', () => {
  menu.classList.toggle('active');
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
  if (currentIndex < carouselTrack.children.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateCarousel();
}

setInterval(autoScroll, 9000); // Changer d'image toutes les 9 secondes

// === Confirmation après envoi du formulaire ===
const contactForm = document.querySelector('form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    alert('Merci pour votre message ! Nous vous répondrons bientôt.');
    contactForm.reset(); // Réinitialise le formulaire
  });
}

// === Animation au défilement ===
const scrollElements = document.querySelectorAll('.scroll-animation');

const elementInView = (el, dividend = 1.25) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
};

const displayScrollElement = (element) => {
  element.classList.add('visible');
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el)) {
      displayScrollElement(el);
    }
  });
};

window.addEventListener('scroll', handleScrollAnimation);

// === Masquer la loader une fois le chargement de la page terminé ===
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.display = 'none';
  }
});
