import { LoginController } from './components/Login.js';
import { SearchEngine } from './components/search.js';

const login = new LoginController();
const search = new SearchEngine();

// Permite visualizar a area de login
document.getElementById('toggle_login').addEventListener('click', () => {
  login.toggle_login();
});
// Verifica as credenciais da area de login
document.getElementById('user_login').addEventListener('click', () => {
  login.check_login();
});
// Pesquisar produtos
document.getElementById('search').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    search.searchProduct();
  }
});
// Verifica se está na página produtos
if (window.location.pathname.includes('produtos.html')) {
  search.resultProducts();
}
/*
import { RegisterController } from './pages/register.js';

const RegisterController = require('./pages/RegisterController');

document.getElementById('register-button').addEventListener('click', () => {
  register.create_user();
});*/