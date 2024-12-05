// === Variables globales ===
const header = document.querySelector('.header');
const toggleButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.navbar ul');
const carouselTrack = document.querySelector('.carousel-track');
const prevButton = document.querySelector('.carousel-btn.prev');
const nextButton = document.querySelector('.carousel-btn.next');
const contactForm = document.querySelector('form');
const scrollElements = document.querySelectorAll('.scroll-animation');
const loader = document.querySelector('.loader');

// === Sticky Header au défilement ===
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('sticky', 'scrolled');
    } else {
      header.classList.remove('sticky', 'scrolled');
    }
  });
}

// === Défilement fluide vers les sections avec mise en surbrillance du lien actif ===
if (menu) {
  document.querySelectorAll('.navbar ul li a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        // Défilement fluide
        window.scrollTo({
          top: targetSection.offsetTop - (header?.offsetHeight || 0),
          behavior: 'smooth',
        });

        // Mise en surbrillance du lien actif
        document.querySelectorAll('.navbar ul li a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');

        // Fermer le menu sur mobile après le clic
        if (menu.classList.contains('active')) {
          menu.classList.remove('active');
        }
      }
    });
  });
}

// === Menu burger pour petits écrans ===
if (toggleButton && menu) {
  toggleButton.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
}

// === Carousel Functionality ===
if (carouselTrack && prevButton && nextButton) {
  let currentIndex = 0;

  const updateCarousel = () => {
    const slideWidth = carouselTrack.children[0].getBoundingClientRect().width;
    carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  };

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

  // Auto Scroll Functionality
  setInterval(() => {
    currentIndex = currentIndex < carouselTrack.children.length - 1 ? currentIndex + 1 : 0;
    updateCarousel();
  }, 9000); // Change d'image toutes les 9 secondes
}

// === Confirmation après envoi du formulaire ===
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    alert('Merci pour votre message ! Nous vous répondrons bientôt.');
    contactForm.reset(); // Réinitialise le formulaire
  });
}

// === Animation au défilement ===
if (scrollElements.length) {
  const elementInView = (el, dividend = 1.25) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
  };

  const displayScrollElement = (element) => {
    element.classList.add('visible');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach(el => {
      if (elementInView(el)) {
        displayScrollElement(el);
      }
    });
  };

  window.addEventListener('scroll', () => {
    requestAnimationFrame(handleScrollAnimation);
  });
}

// === Masquer la loader une fois le chargement de la page terminé ===
if (loader) {
  window.addEventListener('load', () => {
    loader.style.display = 'none';
  });
}
