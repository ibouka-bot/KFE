// === Navigation Smooth Scroll ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute('href'));
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });

      // Ferme le menu mobile après le clic (si applicable)
      if (document.body.classList.contains('menu-open')) {
        document.body.classList.remove('menu-open');
      }
    }
  });
});

// === Menu Burger (Responsive Menu) ===
const burgerMenu = document.querySelector('.burger-menu');
const navbar = document.querySelector('.navbar');

if (burgerMenu && navbar) {
  burgerMenu.addEventListener('click', () => {
    document.body.classList.toggle('menu-open'); // Ajoute/supprime une classe pour gérer le menu ouvert
  });
}

// === Highlight Menu Links on Scroll ===
const sections = document.querySelectorAll('section'); // Supposons que vos sections aient des ID correspondants
const navLinks = document.querySelectorAll('.navbar a');

function highlightMenuOnScroll() {
  let scrollPosition = window.scrollY;

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop - 100; // Décalage pour ajuster la hauteur du menu fixe
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Active le lien correspondant
      navLinks.forEach(link => link.classList.remove('active'));
      navLinks[index].classList.add('active');
    }
  });
}

window.addEventListener('scroll', highlightMenuOnScroll);

// === Masquer le menu mobile en cliquant à l'extérieur (optionnel) ===
document.addEventListener('click', (e) => {
  if (
    !navbar.contains(e.target) && // Clique en dehors du menu
    !burgerMenu.contains(e.target) && // Clique en dehors de l'icône du menu
    document.body.classList.contains('menu-open')
  ) {
    document.body.classList.remove('menu-open');
  }
});
