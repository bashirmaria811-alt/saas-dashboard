// Dashboard ko protect karo - bina login ke access na ho
if (window.location.pathname.includes('habit-dashboard')) {
  const loggedInUser = localStorage.getItem('habitify_user');
  if (!loggedInUser) {
    window.location.href = 'habit-login.html';
  }
}
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
  if (text.includes('water') || text.includes('drink')) return '💧';
  if (text.includes('sleep') || text.includes('rest')) return '😴';
  if (text.includes('read') || text.includes('book') || text.includes('study')) return '📚';
  if (text.includes('run') || text.includes('walk') || text.includes('jog')) return '🏃‍♀️';
  if (text.includes('gym') || text.includes('exercise') || text.includes('workout')) return '🏋️‍♀️';
  if (text.includes('meditate') || text.includes('yoga')) return '🧘‍♀️';
  if (text.includes('eat') || text.includes('food') || text.includes('meal')) return '🥗';
  if (text.includes('write') || text.includes('journal')) return '✍️';
  if (text.includes('clean') || text.includes('tidy')) return '🧹';
  if (text.includes('skin') || text.includes('face')) return '🧴';
  if (category === 'Health') return '❤️';
  if (category === 'Study') return '📖';
  if (category === 'Fitness') return '💪';
  return '🌸';
}

function loadHabits() {
  const saved = localStorage.getItem('habitify_habits');
  return saved ? JSON.parse(saved) : [];
}

function saveHabits() {
  localStorage.setItem('habitify_habits', JSON.stringify(habits));
}

const addHabitForm = document.getElementById('addHabitForm');
const habitList = document.getElementById('habitList');

let habits = loadHabits();

if (addHabitForm) {
  addHabitForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('habitName').value.trim();
    const category = document.getElementById('habitCategory').value;
    if (name === '') return;

    const habit = {
      id: Date.now(),
      name: name,
      category: category,
      streak: 0,
      lastCompletedDate: null
    };

    habits.push(habit);
    saveHabits();
    renderHabits();
    addHabitForm.reset();
  });
}

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
    card.innerHTML = '<div class="flex items-center gap-4">' +
      '<div class="text-3xl bg-pink-50 w-12 h-12 flex items-center justify-center rounded-full">' + icon + '</div>' +
      '<div>' +
        '<p class="font-semibold text-fuchsia-900">' + habit.name + '</p>' +
        '<p class="text-sm text-purple-500">' + habit.category + ' · 🔥 ' + habit.streak + ' day streak</p>' +
      '</div>' +
    '</div>' +
    '<button data-id="' + habit.id + '" class="toggle-btn px-4 py-2 rounded-full ' + (doneToday ? 'bg-pink-500 text-white' : 'bg-purple-100 text-purple-700') + '">' +
      (doneToday ? 'Done Today ✓' : 'Mark Done') +
    '</button>';

    habitList.appendChild(card);
  });

  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = Number(this.getAttribute('data-id'));
      const habit = habits.find(h => h.id === id);
      const today = getTodayStr();
      const yesterday = getYesterdayStr();

      if (habit.lastCompletedDate === today) {
        habit.streak = Math.max(0, habit.streak - 1);
        habit.lastCompletedDate = null;
      } else if (habit.lastCompletedDate === yesterday) {
        habit.streak += 1;
        habit.lastCompletedDate = today;
      } else {
        habit.streak = 1;
        habit.lastCompletedDate = today;
      }

      saveHabits();
      renderHabits();
    });
  });
}

renderHabits();
// Login Feature
const habitLoginForm = document.getElementById('habitLoginForm');

if (habitLoginForm) {
  habitLoginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('habitLoginEmail').value;
    const msg = document.getElementById('habitLoginMsg');

    localStorage.setItem('habitify_user', email);

    msg.style.color = '#db2777';
    msg.textContent = `Welcome, ${email}! 🌸 Redirecting...`;

    setTimeout(function() {
      window.location.href = 'habit-dashboard.html';
    }, 1200);
  });
}

// Dashboard pe user ka naam dikhao
const welcomeUserEl = document.getElementById('welcomeUser');
if (welcomeUserEl) {
  const user = localStorage.getItem('habitify_user');
  welcomeUserEl.textContent = user ? `Welcome back, ${user} 🌷` : '';
}

// Motivational Quote API
const quoteText = document.getElementById('quoteText');

if (quoteText) {
  fetch('https://dummyjson.com/quotes/random')
    .then(res => res.json())
    .then(data => {
      quoteText.textContent = `"${data.quote}" — ${data.author}`;
    })
    .catch(err => {
      quoteText.textContent = '"Small daily habits shape who you become." 🌷';
    });
}

// Weather Widget (Karachi ke liye — chahen to city change kar sakti hain)
const weatherText = document.getElementById('weatherText');

if (weatherText) {
  fetch('https://api.open-meteo.com/v1/forecast?latitude=34.15&longitude=73.21&current_weather=true')
    .then(res => res.json())
    .then(data => {
      const temp = data.current_weather.temperature;
      weatherText.textContent = `🌤️ Abbottabad: ${temp}°C right now`;
    })
    .catch(err => {
      weatherText.textContent = '🌤️ Weather unavailable right now';
    });
}