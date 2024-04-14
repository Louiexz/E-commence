import { LoginController } from './components/Login.js';
import { SearchEngine } from './components/search.js';

const login = new LoginController();
const search = new SearchEngine();

// Login
document.getElementById('toggle_login').addEventListener('click', () => {
  login.toggle_login();
});
document.getElementById('user_login').addEventListener('click', () => {
  login.check_login();
});

// Pesquisar produtos
document.getElementById('search').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    search.searchProduct();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var produtosSection = document.getElementById('products');
  if (produtosSection) {
      console.log('Elemento com ID "produtos" encontrado.');
      search.resultProducts();
  } else {
      console.error('Elemento com ID "produtos" não encontrado.');
  }
});

/*
import { RegisterController } from './pages/register.js';

const RegisterController = require('./pages/RegisterController');

document.getElementById('register-button').addEventListener('click', () => {
  register.create_user();
});*/