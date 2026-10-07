const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = nav.querySelectorAll('a');

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 120);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const setMenu = (open) => {
  nav.classList.toggle('open', open);
  menuButton.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
};

menuButton.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('contact-form');
const toast = document.querySelector('.toast');
let toastTimer;

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 5000);
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`Demande — ${data.get('subject')}`);
  const body = encodeURIComponent(`Bonjour,\n\n${data.get('message')}\n\nNom : ${data.get('name')}\nEmail : ${data.get('email')}`);
  showToast('Votre messagerie va s’ouvrir pour finaliser l’envoi.');
  window.location.href = `mailto:contact@marcheim-conseil.fr?subject=${subject}&body=${body}`;
});
