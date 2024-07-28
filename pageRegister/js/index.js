import { LoginController } from '../../js/components/login.js';

// Instanciando objetos
const login = new LoginController();

// Eventos
document.getElementById('toggle_login').addEventListener('click', () => {
  login.toggle_login();
});

document.getElementById('user_login').addEventListener('click', () => {
  login.check_login();
});

/*
import { RegisterController } from 'pages/register.js';

const RegisterController = require('pages/RegisterController');

document.getElementById('register-button').addEventListener('click', () => {
  register.create_user();
});*/