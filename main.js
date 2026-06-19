// Dark mode js
const darkToggle = document.getElementById('darkToggle');
const body = document.body;

function applyDarkMode(on) {
  body.classList.toggle('dark-mode', on);
  if (darkToggle) darkToggle.textContent = on ? '☀️' : '🌙';
  localStorage.setItem('kaleTheme', on ? 'dark' : 'light');
}

// Load saved preference
const savedTheme = localStorage.getItem('kaleTheme');
if (savedTheme === 'dark') applyDarkMode(true);

if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    applyDarkMode(!body.classList.contains('dark-mode'));
  });
}