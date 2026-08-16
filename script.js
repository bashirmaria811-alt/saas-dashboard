// "Get Started" button pe click karne se alert dikhana
const btn = document.querySelector('.btn');

btn.addEventListener('click', function() {
  alert('Welcome! Thanks for getting started with MyApp.');
}); 
// Navbar links pe hover/click se color change
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // link ko actually navigate hone se roke (kyunki abhi pages nahi bane)
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});
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