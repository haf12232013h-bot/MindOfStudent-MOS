const body = document.body;
const themeToggle = document.getElementById('themeToggle');

// Theme Management
const applyTheme = (isLight) => {
  body.classList.toggle('light', isLight);
  themeToggle.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('mos-theme', isLight ? 'light' : 'dark');
};

const savedTheme = localStorage.getItem('mos-theme');
applyTheme(savedTheme === 'light');

themeToggle.addEventListener('click', () => {
  const isLight = !body.classList.contains('light');
  applyTheme(isLight);
});

// Modal Management
document.querySelectorAll('[data-open]').forEach((button) => {
  button.addEventListener('click', () => {
    const modal = document.getElementById(button.dataset.open);
    if (modal) modal.classList.add('open');
  });
});

document.querySelectorAll('[data-close]').forEach((button) => {
  button.addEventListener('click', () => {
    const modal = document.getElementById(button.dataset.close);
    if (modal) modal.classList.remove('open');
  });
});

window.addEventListener('click', (event) => {
  document.querySelectorAll('.modal').forEach((modal) => {
    if (event.target === modal) modal.classList.remove('open');
  });
});

// Scroll to Section
document.querySelectorAll('[data-scroll]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.querySelector(button.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Demo Panel Switching
document.querySelectorAll('.demo-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.demo-btn').forEach((b) => b.classList.remove('active'));
    document.querySelectorAll('.demo-panel').forEach((panel) => panel.classList.remove('active'));

    btn.classList.add('active');
    const target = document.getElementById(btn.dataset.panel);
    if (target) target.classList.add('active');
  });
});

// Form Submissions
document.getElementById('schoolForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const name = formData.get('name') || 'Principal';
  alert(`Demo request submitted by ${name}!\n\nMOS will follow up at mos.founder@outlook.com`);
  event.target.reset();
});

document.querySelectorAll('.modal-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Welcome to MOS! Your free trial starts now. 🎉\n\nCheck mos.founder@outlook.com for setup details.');
    form.closest('.modal').classList.remove('open');
    form.reset();
  });
});

// Quiz Interactive Demo
function selectAnswer(button) {
  button.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('correct'));
  button.classList.add('correct');
  const feedback = button.parentElement.nextElementSibling;
  if (feedback && feedback.classList.contains('feedback')) {
    feedback.style.display = 'block';
  }
}

// Smooth Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.feature, .price-card, .demo-panel').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Prevent modals from closing when clicking inside
document.querySelectorAll('.modal-card').forEach((card) => {
  card.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});

console.log('MOS Demo loaded successfully! 🌟');
