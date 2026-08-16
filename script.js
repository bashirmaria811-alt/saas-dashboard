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