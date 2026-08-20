function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}
function getYesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

function getHabitIcon(name, category) {
  const text = name.toLowerCase();
  const map = {
    water: '💧', drink: '💧', hydrate: '💧',
    sleep: '😴', rest: '😴', nap: '😴',
    read: '📚', book: '📚', study: '📖', learn: '🧠', homework: '📝',
    run: '🏃‍♀️', walk: '🚶‍♀️', jog: '🏃‍♀️', cardio: '🏃‍♀️',
    gym: '🏋️‍♀️', exercise: '💪', workout: '💪', lift: '🏋️‍♀️',
    yoga: '🧘‍♀️', meditate: '🧘‍♀️', breathe: '🌬️', mindful: '🧘‍♀️',
    eat: '🥗', food: '🍽️', meal: '🥗', fruit: '🍎', vegetable: '🥦', cook: '🍳',
    write: '✍️', journal: '📔', diary: '📔',
    clean: '🧹', tidy: '🧺', dish: '🍽️', laundry: '🧺',
    skin: '🧴', face: '🧼', shower: '🚿', bath: '🛁', teeth: '🦷', brush: '🪥',
    money: '💰', save: '💰', budget: '💵',
    plant: '🪴', garden: '🌱',
    music: '🎵', guitar: '🎸', piano: '🎹', sing: '🎤',
    art: '🎨', draw: '🎨', paint: '🖌️',
    code: '💻', program: '💻', computer: '💻',
    pray: '🤲', quran: '📗', namaz: '🕌', dua: '🤲',
    sun: '☀️', nature: '🌳',
    call: '📞', family: '👨‍👩‍👧', friend: '🧑‍🤝‍🧑',
    wake: '⏰', early: '⏰',
    pet: '🐾', dog: '🐶', cat: '🐱',
    smile: '😊', gratitude: '🙏', thank: '🙏',
    phone: '📵', screen: '📵', social: '📵',
    vitamin: '💊', medicine: '💊'
  };
  for (const key in map) {
    if (text.includes(key)) return map[key];
  }
  const categoryIcons = {
    Health: ['❤️', '🍎', '💊', '🩺'],
    Study: ['📖', '🎓', '📝', '🧠'],
    Fitness: ['💪', '🏋️‍♀️', '🤸‍♀️', '🥇'],
    Other: ['🌸', '✨', '🎯', '🌈']
  };
  const options = categoryIcons[category] || categoryIcons.Other;
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return options[sum % options.length];
}

function loadHabits() {
  const saved = localStorage.getItem('habitify_habits');
  return saved ? JSON.parse(saved) : [];
}
function saveHabits() {
  localStorage.setItem('habitify_habits', JSON.stringify(habits));
}
function loadCoins() {
  return Number(localStorage.getItem('habitify_coins') || 0);
}
function saveCoins(amount) {
  localStorage.setItem('habitify_coins', amount);
}
function loadBadges() {
  const saved = localStorage.getItem('habitify_badges');
  return saved ? JSON.parse(saved) : [];
}
function saveBadges(list) {
  localStorage.setItem('habitify_badges', JSON.stringify(list));
}

const addHabitForm = document.getElementById('addHabitForm');
const habitList = document.getElementById('habitList');
const coinDisplay = document.getElementById('coinDisplay');
const badgesRow = document.getElementById('badgesRow');

let habits = loadHabits();
let coins = loadCoins();
let earnedBadges = loadBadges();

const badgeCatalog = [
  { id: 'first_habit', name: 'First Step', emoji: '🌱', desc: 'Added your first habit' },
  { id: 'streak_3', name: 'Getting Started', emoji: '🔥', desc: '3 day streak' },
  { id: 'streak_7', name: 'One Week Wonder', emoji: '⭐', desc: '7 day streak' },
  { id: 'streak_30', name: 'Habit Master', emoji: '👑', desc: '30 day streak' },
  { id: 'coins_100', name: 'Coin Collector', emoji: '💰', desc: 'Earned 100 coins' },
  { id: 'five_habits', name: 'Overachiever', emoji: '🚀', desc: '5 habits at once' }
];

function updateCoinDisplay() {
  if (coinDisplay) coinDisplay.textContent = '🪙 ' + coins;
}

function renderBadges() {
  if (!badgesRow) return;
  badgesRow.innerHTML = '';
  earnedBadges.forEach(id => {
    const b = badgeCatalog.find(x => x.id === id);
    if (!b) return;
    const chip = document.createElement('span');
    chip.className = 'bg-white border border-pink-200 rounded-full px-3 py-1 text-sm text-fuchsia-800 shadow-sm';
    chip.title = b.desc;
    chip.textContent = b.emoji + ' ' + b.name;
    badgesRow.appendChild(chip);
  });
}

function unlockBadge(id) {
  if (!earnedBadges.includes(id)) {
    earnedBadges.push(id);
    saveBadges(earnedBadges);
    renderBadges();
    const b = badgeCatalog.find(x => x.id === id);
    if (b) showCelebration('New Badge Unlocked!', b.emoji + ' ' + b.name, b.desc);
  }
}

function showCelebration(title, bigEmoji, subtitle) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;z-index:9999;';
  const box = document.createElement('div');
  box.style.cssText = 'background:white;padding:32px 40px;border-radius:24px;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,0.25);max-width:320px;';
  box.innerHTML =
    '<div style="font-size:56px;margin-bottom:10px;">' + bigEmoji + '</div>' +
    '<h3 style="color:#9d174d;font-weight:bold;font-size:20px;margin-bottom:6px;">' + title + '</h3>' +
    '<p style="color:#a21caf;margin-bottom:18px;">' + subtitle + '</p>' +
    '<button style="background:#ec4899;color:white;padding:10px 24px;border-radius:999px;border:none;font-weight:600;cursor:pointer;">Awesome! ✨</button>';
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  overlay.addEventListener('click', () => overlay.remove());
  box.querySelector('button').addEventListener('click', (e) => { e.stopPropagation(); overlay.remove(); });
}

if (addHabitForm) {
  addHabitForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('habitName').value.trim();
    const category = document.getElementById('habitCategory').value;
    if (name === '') return;

    habits.push({ id: Date.now(), name, category, streak: 0, lastCompletedDate: null });
    saveHabits();
    renderHabits();
    addHabitForm.reset();

    if (habits.length === 1) unlockBadge('first_habit');
    if (habits.length === 5) unlockBadge('five_habits');
  });
}

const milestones = [3, 7, 15, 30, 50, 100];

function renderHabits() {
  if (!habitList) return;
  habitList.innerHTML = '';
  const today = getTodayStr();
  const yesterday = getYesterdayStr();

  habits.forEach(habit => {
    const doneToday = habit.lastCompletedDate === today;
    const icon = getHabitIcon(habit.name, habit.category);

    const card = document.createElement('div');
    card.className = 'pop-in flex justify-between items-center bg-white p-4 rounded-2xl shadow-md border border-pink-100';
    card.innerHTML =
      '<div class="flex items-center gap-4">' +
      '<div class="text-3xl bg-pink-50 w-12 h-12 flex items-center justify-center rounded-full">' + icon + '</div>' +
      '<div><p class="font-semibold text-fuchsia-900">' + habit.name + '</p>' +
      '<p class="text-sm text-purple-500">' + habit.category + ' · 🔥 ' + habit.streak + ' day streak' +
      (!doneToday && habit.streak > 0 ? ' <span class="text-red-500">⏳ complete today!</span>' : '') + '</p></div></div>' +
      '<div class="flex items-center gap-2">' +
      '<button data-id="' + habit.id + '" class="toggle-btn px-4 py-2 rounded-full ' + (doneToday ? 'bg-pink-500 text-white' : 'bg-purple-100 text-purple-700') + '">' +
      (doneToday ? 'Done Today ✓' : 'Mark Done') + '</button>' +
      '<button data-id="' + habit.id + '" class="delete-btn w-9 h-9 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600">✕</button>' +
      '</div>';
    habitList.appendChild(card);
  });

  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const id = Number(this.getAttribute('data-id'));
      const habit = habits.find(h => h.id === id);
      const today = getTodayStr();
      const yesterday = getYesterdayStr();

      if (habit.lastCompletedDate === today) {
        habit.streak = Math.max(0, habit.streak - 1);
        habit.lastCompletedDate = null;
      } else {
        habit.streak = (habit.lastCompletedDate === yesterday) ? habit.streak + 1 : 1;
        habit.lastCompletedDate = today;

        const baseCoins = Math.floor(Math.random() * 6) + 5;
        const isBonus = Math.random() < 0.2;
        const earned = isBonus ? baseCoins * 3 : baseCoins;
        coins += earned;
        saveCoins(coins);
        updateCoinDisplay();

        if (isBonus) {
          const surprises = [
            () => showCelebration('Surprise Bonus!', '🎁', 'You earned +' + earned + ' coins! 🪙'),
            () => showCelebration('Lucky You!', '🍀', 'A little luck came your way today ✨'),
            () => showCelebration('Sparkle Moment', '💖', 'You are doing amazing, keep glowing!'),
            () => showCelebration('Mystery Gift', '🎀', 'Here is a little surprise just for you!')
          ];
          surprises[Math.floor(Math.random() * surprises.length)]();
        }
        if (milestones.includes(habit.streak)) {
          showCelebration(habit.streak + ' Day Streak!', '🎉', 'You are on fire with "' + habit.name + '" 🔥');
        }
        if (habit.streak === 3) unlockBadge('streak_3');
        if (habit.streak === 7) unlockBadge('streak_7');
        if (habit.streak === 30) unlockBadge('streak_30');
        if (coins >= 100) unlockBadge('coins_100');
      }

      saveHabits();
      renderHabits();
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const id = Number(this.getAttribute('data-id'));
      if (confirm('Delete this habit?')) {
        habits = habits.filter(h => h.id !== id);
        saveHabits();
        renderHabits();
      }
    });
  });

  const progressLabel = document.getElementById('progressLabel');
  const progressBar = document.getElementById('progressBar');
  if (progressLabel && progressBar) {
    const doneCount = habits.filter(h => h.lastCompletedDate === today).length;
    const total = habits.length;
    const percent = total === 0 ? 0 : Math.round((doneCount / total) * 100);
    progressLabel.textContent = doneCount + ' of ' + total + ' habits done today';
    progressBar.style.width = percent + '%';
  }
}

renderHabits();
updateCoinDisplay();
renderBadges();

// Quote API
const quoteText = document.getElementById('quoteText');
if (quoteText) {
  fetch('https://dummyjson.com/quotes/random')
    .then(res => res.json())
    .then(data => { quoteText.textContent = `"${data.quote}" — ${data.author}`; })
    .catch(() => { quoteText.textContent = '"Small daily habits shape who you become." 🌷'; });
}

// Weather
const weatherText = document.getElementById('weatherText');
if (weatherText) {
  fetch('https://api.open-meteo.com/v1/forecast?latitude=34.15&longitude=73.21&current_weather=true')
    .then(res => res.json())
    .then(data => { weatherText.textContent = `🌤️ Abbottabad: ${data.current_weather.temperature}°C right now`; })
    .catch(() => { weatherText.textContent = '🌤️ Weather unavailable right now'; });
}

// Login
const habitLoginForm = document.getElementById('habitLoginForm');
if (habitLoginForm) {
  habitLoginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('habitLoginEmail').value;
    const msg = document.getElementById('habitLoginMsg');
    localStorage.setItem('habitify_user', email);
    msg.style.color = '#db2777';
    msg.textContent = `Welcome, ${email}! 🌸 Redirecting...`;
    setTimeout(function () {
      if (typeof showPage === 'function') { showPage('dashboard'); }
      else { window.location.href = 'habit-dashboard.html'; }
    }, 1200);
  });
}

// Sign Up
const habitSignupForm = document.getElementById('habitSignupForm');
if (habitSignupForm) {
  habitSignupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const msg = document.getElementById('signupMsg');
    localStorage.setItem('habitify_user', email);
    localStorage.setItem('habitify_username', name);
    msg.style.color = '#db2777';
    msg.textContent = `Welcome to Habitify, ${name}! 🌸 Redirecting...`;
    setTimeout(function () {
      if (typeof showPage === 'function') { showPage('dashboard'); }
      else { window.location.href = 'habit-dashboard.html'; }
    }, 1200);
  });
}

const welcomeUserEl = document.getElementById('welcomeUser');
if (welcomeUserEl) {
  const user = localStorage.getItem('habitify_user');
  welcomeUserEl.textContent = user ? `Welcome back, ${user} 🌷` : '';
}

// Daily Spin Wheel Game
const spinBtn = document.getElementById('spinBtn');
const spinWheel = document.getElementById('spinWheel');
const spinMsg = document.getElementById('spinMsg');
function canSpinToday() {
  return localStorage.getItem('habitify_last_spin') !== getTodayStr();
}
function updateSpinButton() {
  if (!spinBtn) return;
  if (!canSpinToday()) {
    spinBtn.disabled = true;
    spinBtn.textContent = 'Come Back Tomorrow 🌙';
    spinBtn.classList.add('opacity-50', 'cursor-not-allowed');
    if (spinMsg) spinMsg.textContent = 'You already spun today — come back tomorrow!';
  }
}
if (spinBtn) {
  updateSpinButton();
  spinBtn.addEventListener('click', function () {
    if (!canSpinToday()) return;
    spinWheel.style.transform = 'rotate(1080deg)';
    setTimeout(() => {
      const prizes = [5, 10, 15, 20, 30, 50];
      const won = prizes[Math.floor(Math.random() * prizes.length)];
      coins += won;
      saveCoins(coins);
      updateCoinDisplay();
      localStorage.setItem('habitify_last_spin', getTodayStr());
      updateSpinButton();
      showCelebration('You Won!', '🎡', 'The wheel landed on +' + won + ' coins! 🪙');
    }, 700);
  });
}

// Mini Games
function gameAlreadyPlayed(key) { return localStorage.getItem(key) === getTodayStr(); }
function markGamePlayed(key) { localStorage.setItem(key, getTodayStr()); }
function awardCoins(amount) { coins += amount; saveCoins(coins); updateCoinDisplay(); }

const memoryGrid = document.getElementById('memoryGrid');
const memoryMsg = document.getElementById('memoryMsg');
if (memoryGrid) {
  if (gameAlreadyPlayed('habitify_memory_played')) {
    memoryMsg.textContent = 'Come back tomorrow for a new game! 🌙';
  } else {
    const emojis = ['🌸', '🌸', '🍀', '🍀', '⭐', '⭐'];
    const shuffled = emojis.sort(() => Math.random() - 0.5);
    let flipped = [], matched = [], locked = false;
    shuffled.forEach((emoji, i) => {
      const card = document.createElement('div');
      card.className = 'w-full aspect-square bg-purple-200 rounded-lg flex items-center justify-center text-xl cursor-pointer select-none';
      card.textContent = '❓';
      card.addEventListener('click', function () {
        if (locked || card.classList.contains('flipped') || matched.includes(i)) return;
        card.textContent = emoji;
        card.classList.add('flipped');
        flipped.push({ i, emoji, el: card });
        if (flipped.length === 2) {
          locked = true;
          setTimeout(() => {
            if (flipped[0].emoji === flipped[1].emoji) {
              matched.push(flipped[0].i, flipped[1].i);
              if (matched.length === shuffled.length) {
                awardCoins(20);
                memoryMsg.textContent = 'You matched everything! +20 coins 🎉';
                markGamePlayed('habitify_memory_played');
              }
            } else {
              flipped.forEach(f => { f.el.textContent = '❓'; f.el.classList.remove('flipped'); });
            }
            flipped = [];
            locked = false;
          }, 600);
        }
      });
      memoryGrid.appendChild(card);
    });
  }
}

const scratchOverlay = document.getElementById('scratchOverlay');
const scratchPrize = document.getElementById('scratchPrize');
const scratchMsg = document.getElementById('scratchMsg');
if (scratchOverlay) {
  if (gameAlreadyPlayed('habitify_scratch_played')) {
    scratchOverlay.style.display = 'none';
    scratchMsg.textContent = 'Come back tomorrow! 🌙';
  } else {
    scratchOverlay.style.transition = 'opacity 0.3s';
    scratchOverlay.addEventListener('click', function () {
      const prize = [8, 12, 18, 25][Math.floor(Math.random() * 4)];
      scratchPrize.textContent = '+' + prize + ' 🪙';
      scratchOverlay.style.opacity = '0';
      setTimeout(() => { scratchOverlay.style.display = 'none'; }, 300);
      awardCoins(prize);
      scratchMsg.textContent = 'You won +' + prize + ' coins! 🎉';
      markGamePlayed('habitify_scratch_played');
    });
  }
}

const guessBtn = document.getElementById('guessBtn');
const guessInput = document.getElementById('guessInput');
const guessMsg = document.getElementById('guessMsg');
if (guessBtn) {
  if (gameAlreadyPlayed('habitify_guess_played')) {
    guessBtn.disabled = true;
    guessInput.disabled = true;
    guessMsg.textContent = 'Come back tomorrow! 🌙';
  } else {
    const secretNumber = Math.floor(Math.random() * 10) + 1;
    let attempts = 0;
    guessBtn.addEventListener('click', function () {
      const guess = Number(guessInput.value);
      if (!guess || guess < 1 || guess > 10) { guessMsg.textContent = 'Enter a number between 1-10'; return; }
      attempts++;
      if (guess === secretNumber) {
        awardCoins(30);
        guessMsg.textContent = 'Correct! +30 coins 🎉';
        guessBtn.disabled = true; guessInput.disabled = true;
        markGamePlayed('habitify_guess_played');
      } else if (attempts >= 3) {
        awardCoins(5);
        guessMsg.textContent = 'Out of tries! The number was ' + secretNumber + '. +5 coins for trying';
        guessBtn.disabled = true; guessInput.disabled = true;
        markGamePlayed('habitify_guess_played');
      } else {
        guessMsg.textContent = (guess < secretNumber ? 'Higher! ⬆️' : 'Lower! ⬇️') + ' (' + (3 - attempts) + ' tries left)';
      }
    });
  }
}