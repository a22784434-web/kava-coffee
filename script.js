const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.textContent = isOpen ? '✕' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = '☰';
}));
const filters = document.querySelectorAll('.filter');
const products = document.querySelectorAll('.product');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
  button.classList.add('active');
  button.setAttribute('aria-pressed','true');
  const category = button.dataset.filter;
  products.forEach(product => { product.hidden = category !== 'all' && product.dataset.category !== category; });
}));
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  revealItems.forEach(item => observer.observe(item));
} else { revealItems.forEach(item => item.classList.add('visible')); }
document.getElementById('year').textContent = new Date().getFullYear();

// Theme switcher: saved between visits
const themeButton = document.querySelector('.theme-toggle');
const applyTheme = theme => {
  document.body.dataset.theme = theme;
  themeButton.textContent = theme === 'dark' ? '☀ Світла тема' : '☾ Темна тема';
  themeButton.setAttribute('aria-label', theme === 'dark' ? 'Увімкнути світлу тему' : 'Увімкнути темну тему');
  themeButton.setAttribute('aria-pressed', String(theme === 'light'));
};
let savedTheme = 'dark';
try { savedTheme = localStorage.getItem('kava-theme') || 'dark'; } catch(e) {}
applyTheme(savedTheme === 'light' ? 'light' : 'dark');
themeButton.addEventListener('click', () => {
  const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('kava-theme', next); } catch(e) {}
});
