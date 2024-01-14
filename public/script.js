const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
    document.title = 'Signup Page';
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
    document.title = 'Login Page';
});