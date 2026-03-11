'use strict';

// ===== DONNÉES =====

const MILESTONES = [
  { days: 1,    label: '24h',    icon: '🌅' },
  { days: 3,    label: '3 jours', icon: '🌿' },
  { days: 7,    label: '1 semaine', icon: '⭐' },
  { days: 14,   label: '2 semaines', icon: '🌟' },
  { days: 21,   label: '3 semaines', icon: '💪' },
  { days: 30,   label: '1 mois',  icon: '🥇' },
  { days: 60,   label: '2 mois',  icon: '🏆' },
  { days: 90,   label: '3 mois',  icon: '🦋' },
  { days: 180,  label: '6 mois',  icon: '🌈' },
  { days: 365,  label: '1 an',   icon: '🎉' },
  { days: 730,  label: '2 ans',  icon: '👑' },
  { days: 1825, label: '5 ans',  icon: '🌠' },
];

const HEALTH_BENEFITS = [
  { hours: 1,    icon: '❤️',  title: 'Fréquence cardiaque normalisée',    sub: 'Dès la première heure' },
  { hours: 24,   icon: '💧',  title: 'Hydratation améliorée',             sub: 'Après 24 heures' },
  { hours: 72,   icon: '😴',  title: 'Meilleur sommeil',                  sub: 'Après 3 jours' },
  { hours: 168,  icon: '🧠',  title: 'Clarté mentale retrouvée',          sub: 'Après 1 semaine' },
  { hours: 336,  icon: '🍽️',  title: 'Appétit rééquilibré',               sub: 'Après 2 semaines' },
  { hours: 720,  icon: '🩸',  title: 'Tension artérielle réduite',        sub: 'Après 1 mois' },
  { hours: 2160, icon: '🫁',  title: 'Foie en régénération avancée',      sub: 'Après 3 mois' },
  { hours: 8760, icon: '✨',  title: 'Risque de maladie fortement réduit', sub: 'Après 1 an' },
];

const QUOTES = [
  "Un jour à la fois. C'est tout ce qu'il faut.",
  "La sobriété n'enlève pas la vie — elle la rend enfin possible.",
  "Chaque matin sobre est un cadeau que vous vous offrez.",
  "La force n'est pas l'absence de difficulté, c'est d'avancer malgré elle.",
  "Vous n'êtes pas seul(e). Des millions de personnes font ce même voyage.",
  "Le courage, c'est de continuer même quand c'est difficile.",
  "Votre cerveau se répare. Votre cœur guérit. Continuez.",
  "Ce que vous avez accompli aujourd'hui compte. Vraiment.",
  "La liberté que vous cherchez est de l'autre côté de cette envie.",
  "Ne regardez pas combien il reste — regardez combien vous avez déjà parcouru.",
  "Chaque heure sobre est une victoire sur hier.",
  "Vous méritez une vie claire, lumineuse, pleinement vécue.",
  "Rechuter n'est pas échouer. Abandonner, c'est ne jamais réessayer.",
  "Votre présence dans ce monde compte. Prenez soin de vous.",
  "La sobriété est un acte d'amour envers soi-même.",
];

// ===== ÉTAT =====

const state = {
  startDate: null,
  userName: '',
  quoteIndex: 0,
  timerInterval: null,
};

// ===== STOCKAGE =====

function saveData() {
  localStorage.setItem('sobriety_start', state.startDate ? state.startDate.toISOString() : '');
  localStorage.setItem('sobriety_name', state.userName);
  localStorage.setItem('sobriety_quote', String(state.quoteIndex));
}

function loadData() {
  const iso = localStorage.getItem('sobriety_start');
  const name = localStorage.getItem('sobriety_name');
  const qi = localStorage.getItem('sobriety_quote');

  state.startDate = iso ? new Date(iso) : null;
  state.userName = name || '';
  state.quoteIndex = qi ? parseInt(qi, 10) : 0;
}

// ===== UTILITAIRES =====

function pad(n) {
  return String(Math.floor(n)).padStart(2, '0');
}

function diffFromNow(date) {
  const now = new Date();
  const ms = now - date;
  if (ms < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, totalHours: 0, totalSeconds: 0 };

  const totalSeconds = Math.floor(ms / 1000);
  const days    = Math.floor(ms / 86400000);
  const hours   = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const totalHours = ms / 3600000;

  return { days, hours, minutes, seconds, totalHours, totalSeconds };
}

function formatDateFR(date) {
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

// ===== AFFICHAGE =====

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function buildMilestones() {
  const grid = document.getElementById('milestones-grid');
  grid.innerHTML = '';
  const { days } = diffFromNow(state.startDate);
  let nextFound = false;

  MILESTONES.forEach(m => {
    const div = document.createElement('div');
    div.className = 'milestone';
    const achieved = days >= m.days;
    const isNext = !achieved && !nextFound;
    if (achieved) div.classList.add('achieved');
    if (isNext) { div.classList.add('next'); nextFound = true; }

    div.innerHTML = `
      <span class="milestone-icon">${m.icon}</span>
      <span class="milestone-label">${m.label}</span>
    `;
    grid.appendChild(div);
  });
}

function buildHealthBenefits() {
  const grid = document.getElementById('health-grid');
  grid.innerHTML = '';
  const { totalHours } = diffFromNow(state.startDate);

  HEALTH_BENEFITS.forEach(b => {
    const div = document.createElement('div');
    div.className = 'health-item' + (totalHours >= b.hours ? ' active' : '');
    div.innerHTML = `
      <span class="health-icon">${b.icon}</span>
      <div class="health-content">
        <div class="health-title">${b.title}</div>
        <div class="health-sub">${b.sub}</div>
      </div>
      <span class="health-check">✅</span>
    `;
    grid.appendChild(div);
  });
}

function updateGreeting() {
  const hour = new Date().getHours();
  let greeting;
  if (hour < 6)       greeting = 'Bonne nuit';
  else if (hour < 12) greeting = 'Bonjour';
  else if (hour < 18) greeting = 'Bon après-midi';
  else                greeting = 'Bonsoir';

  const name = state.userName ? `, ${state.userName}` : ' !';
  document.getElementById('greeting').textContent = greeting + (state.userName ? name + ' !' : name);
}

function updateCounter() {
  const d = diffFromNow(state.startDate);

  document.getElementById('days-count').textContent    = d.days;
  document.getElementById('hours-count').textContent   = pad(d.hours);
  document.getElementById('minutes-count').textContent = pad(d.minutes);
  document.getElementById('seconds-count').textContent = pad(d.seconds);

  // Anneau de progression (cycle sur 365 jours)
  const progress = Math.min((d.days % 365) / 365 * 100, 100);
  document.querySelector('.counter-ring').style.setProperty('--progress', progress + '%');

  // Mise à jour légère des paliers (seulement si nécessaire)
  if (d.hours === 0 && d.minutes === 0 && d.seconds === 0) {
    buildMilestones();
    buildHealthBenefits();
  }
}

function displayQuote() {
  const q = QUOTES[state.quoteIndex % QUOTES.length];
  document.getElementById('quote-text').textContent = `"${q}"`;
}

function nextQuote() {
  state.quoteIndex = (state.quoteIndex + 1) % QUOTES.length;
  saveData();
  displayQuote();

  const card = document.getElementById('quote-card');
  card.style.opacity = '0';
  card.style.transition = 'opacity 0.3s';
  setTimeout(() => {
    card.style.opacity = '1';
  }, 50);
}

// ===== INITIALISATION ÉCRAN PRINCIPAL =====

function initMain() {
  updateGreeting();
  document.getElementById('start-date-display').textContent = formatDateFR(state.startDate);

  buildMilestones();
  buildHealthBenefits();
  displayQuote();
  updateCounter();

  clearInterval(state.timerInterval);
  state.timerInterval = setInterval(updateCounter, 1000);
}

// ===== ÉCRAN SETUP =====

function initSetup() {
  // Pré-remplir avec date/heure actuelles
  const now = new Date();
  now.setSeconds(0, 0);
  const local = new Date(now - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
  document.getElementById('start-date').value = local;
  document.getElementById('user-name').value = state.userName || '';
}

function handleStart() {
  const dateVal = document.getElementById('start-date').value;
  const nameVal = document.getElementById('user-name').value.trim();

  if (!dateVal) {
    alert('Veuillez indiquer votre date de début de sobriété.');
    return;
  }

  const d = new Date(dateVal);
  if (isNaN(d.getTime())) {
    alert('Date invalide.');
    return;
  }

  if (d > new Date()) {
    alert('La date ne peut pas être dans le futur.');
    return;
  }

  state.startDate = d;
  state.userName  = nameVal;
  state.quoteIndex = Math.floor(Math.random() * QUOTES.length);
  saveData();

  showScreen('main-screen');
  initMain();
}

// ===== MENUS & MODALS =====

function openMenu() {
  document.getElementById('menu-overlay').classList.remove('hidden');
}

function closeMenu() {
  document.getElementById('menu-overlay').classList.add('hidden');
}

function openConfirmReset() {
  closeMenu();
  document.getElementById('confirm-overlay').classList.remove('hidden');
}

function closeConfirmReset() {
  document.getElementById('confirm-overlay').classList.add('hidden');
}

function doReset() {
  clearInterval(state.timerInterval);
  state.startDate = null;
  state.userName = '';
  state.quoteIndex = 0;
  localStorage.clear();
  closeConfirmReset();
  showScreen('setup-screen');
  initSetup();
}

function doChangeDate() {
  closeMenu();
  clearInterval(state.timerInterval);
  showScreen('setup-screen');
  initSetup();
}

// ===== BOOT =====

function boot() {
  loadData();

  if (state.startDate && !isNaN(state.startDate.getTime())) {
    showScreen('main-screen');
    initMain();
  } else {
    showScreen('setup-screen');
    initSetup();
  }

  // Événements setup
  document.getElementById('start-btn').addEventListener('click', handleStart);

  // Événements main
  document.getElementById('menu-btn').addEventListener('click', openMenu);
  document.getElementById('new-quote-btn').addEventListener('click', nextQuote);

  // Menu
  document.getElementById('close-menu-btn').addEventListener('click', closeMenu);
  document.getElementById('change-date-btn').addEventListener('click', doChangeDate);
  document.getElementById('reset-btn').addEventListener('click', openConfirmReset);

  // Confirm reset
  document.getElementById('confirm-reset-btn').addEventListener('click', doReset);
  document.getElementById('cancel-reset-btn').addEventListener('click', closeConfirmReset);

  // Fermer overlay en cliquant à l'extérieur
  document.getElementById('menu-overlay').addEventListener('click', function(e) {
    if (e.target === this) closeMenu();
  });
  document.getElementById('confirm-overlay').addEventListener('click', function(e) {
    if (e.target === this) closeConfirmReset();
  });
}

document.addEventListener('DOMContentLoaded', boot);
