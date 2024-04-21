import { LoginController } from './components/Login.js';
import { SearchEngine } from './components/search.js';
import { FeaturedControl } from './components/featured.js';
import { Result } from './components/result.js';

const login = new LoginController();
const search = new SearchEngine();
const featured = new FeaturedControl();
const result = new Result();

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
    localStorage.clear();
    search.searchProducts();
  }
});
// Verifica se está na página inicial e chama a função para produtos em destaque
if (window.location.pathname.includes('index.html')) {
  featured.getProducts();
};
// Verifica se está na página produtos/index e mostra-os
if (window.location.pathname.includes('produtos.html') || window.location.pathname.includes('index.html')) {
  var div_name = window.location.pathname.includes('produtos.html') ? 'product_grid' : 'featured_grid';
  var class_name = window.location.pathname.includes('produtos.html') ? 'product_box' : 'featured_box';
  result.showProducts(div_name, class_name);
};

/*
import { RegisterController } from './pages/register.js';

const RegisterController = require('./pages/RegisterController');

document.getElementById('register-button').addEventListener('click', () => {
  register.create_user();
});*/