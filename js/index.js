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

// Verifica se não está na página registro
if (!path.endsWith("registro.html")) {
  product.getJson();
  // Adiciona o evento "Enter" apenas se não estiver na página de registro
  // Define the function that will handle the event
  // Attach event listener for 'keyup' event on the search input
  document.getElementById('search').addEventListener('keyup', function(event) {
    if (document.getElementById('search').value != "" &&
        event.key === 'Enter') {
          product.getJson();
        }
  });

  // Attach event listener for 'click' event on the allProducts element
  if (document.getElementById('allProducts')) {
    document.getElementById('allProducts').addEventListener('click', () => {
      document.getElementById('search').value = ' '; // Set a value to simulate input
      
      // Simulate an 'Enter' key event
      const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });

      // Dispatch the event to the #search element
      document.getElementById('search').dispatchEvent(enterEvent);
    });
  }
  document.addEventListener('DOMContentLoaded', ()=> {
    result.showProducts();
  });
}
