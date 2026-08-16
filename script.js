// "Get Started" button pe click karne se alert dikhana
const btn = document.querySelector('.btn');

if (btn) {
  btn.addEventListener('click', function() {
    alert('Welcome! Thanks for getting started with MyApp.');
  });
}
// Navbar links pe hover/click se color change
const navLinks = document.querySelectorAll('nav a');

if (navLinks.length > 0) {
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Sirf tab preventDefault karo jab link "#" ho (dummy link)
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
      }
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
}
// Signup Form Validation
const signupForm = document.getElementById('signupForm');

if (signupForm) {
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault(); // form ko submit hone se rok kar pehle check karega

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('errorMsg');

    // Reset error message
    errorMsg.textContent = '';

    if (name === '' || email === '' || password === '') {
      errorMsg.textContent = 'Please fill in all fields.';
      return;
    }

    if (password.length < 6) {
      errorMsg.textContent = 'Password must be at least 6 characters.';
      return;
    }

    // Agar sab sahi hai
    errorMsg.style.color = 'green';
    errorMsg.textContent = 'Account created successfully!';
    signupForm.reset(); // form ko khali kar do
  });
}
// Dashboard - Fetch users from a public API
const userTableBody = document.getElementById('userTableBody');
const loadingMsg = document.getElementById('loadingMsg');

if (userTableBody) {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
      loadingMsg.style.display = 'none'; // loading message hata do

      users.forEach(user => {
        const row = document.createElement('tr');
        row.className = 'border-b hover:bg-gray-50';
        row.innerHTML = `
          <td class="px-6 py-3">${user.name}</td>
          <td class="px-6 py-3">${user.email}</td>
          <td class="px-6 py-3">${user.company.name}</td>
        `;
        userTableBody.appendChild(row);
      });
    })
    .catch(error => {
      loadingMsg.textContent = 'Failed to load users. Please try again.';
      console.error('Error fetching users:', error);
    });
}