import { LoginController } from './components/login.js';
import { ProductsEngine } from './components/products.js';
import { Result } from './components/result.js';

// Instanciando objetos
const login = new LoginController();
const product = new ProductsEngine();
const result = new Result();

// Eventos
document.getElementById('toggle_login').addEventListener('click', () => {
  login.toggle_login();
});

// Caminho do arquivo
const path = window.location.pathname;
// Se estiver na página inicial, carrega e mostra os produtos

// Verifica se não está na página registro

if (!path.endsWith("registro.html")) {
  if (path.endsWith("index.html")) {
    product.getJson();
  }
  // Adiciona o evento "Enter" apenas se não estiver na página de registro
  document.getElementById('search').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      product.getJson();
    }
  });
  result.showProducts();
}

/*
import { RegisterController } from 'pages/register.js';

const RegisterController = require('pages/RegisterController');

document.getElementById('register-button').addEventListener('click', () => {
  register.create_user();
});*/