export class SearchEngine {
    constructor() {
        this.searchInput = document.getElementById('search');
    }

    searchProduct() {
        fetch("./json/products.json")
            .then(response => response.json())
            .then(data => {
                if (data && data.Electronics && data.Electronics.length > 0) {
                    let products = data.Electronics[0].Cellphones; // Array de marcas de celulares
                    let foundProducts = []; // Array para armazenar os produtos encontrados
    
                    // Percorre todas as marcas de celulares
                    products.forEach(brand => {
                        // Percorre todos os modelos da marca
                        brand.models.forEach(model => {
                            // Verifica se o nome do modelo contém o valor de pesquisa
                            if (model.name.toLowerCase().includes(this.searchInput.value.toLowerCase())) {
                                foundProducts.push(model); // Adiciona o modelo encontrado ao array de produtos encontrados
                            }
                        });
                    });
    
                    // Verifica se algum produto foi encontrado
                    if (foundProducts.length > 0) {
                        // Converter a lista de produtos encontrados em uma string JSON para passar como parâmetro na URL
                        let productsString = JSON.stringify(foundProducts);
    
                        // Navegar para a outra página passando a lista de produtos encontrados como um parâmetro
                        window.location.href = '../../produtos.html?products=' + encodeURIComponent(productsString);
    
                    } else {
                        window.alert('Sem produtos desse modelo!');
                    }
                } else {
                    window.alert('Sem produtos!');
                }
            })
            .catch(error => {
                console.error('Ocorreu um erro ao carregar o JSON:', error);
            });
    }
    
    // Função para exibir os produtos encontrados na página de produtos
    resultProducts() {
        let productsString = decodeURIComponent(window.location.search.split('=')[1]);

        // Converter a string de produtos de volta para uma lista de objetos JavaScript
        let products = JSON.parse(productsString);
        
        const productGrid = document.getElementById('product_grid');
        productGrid.innerHTML = '';
        
        if (products.length > 0) {
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product_box');
                
                let message = `<h2>${product.name}</h2><p>$ ${product.price}</p><p>${product.description}</p>`;
                productElement.innerHTML = message;
                
                productGrid.appendChild(productElement);
            });
        } else {
            productGrid.innerHTML = '<p>Nenhum produto encontrado.</p>';
        }
    }

    showProduct(products) {
        const productBox = document.getElementById('product_box');
        if (products.length > 0) {
            productBox.innerHTML = `<h1>${products[0].name}</h1><p>${products[0].description}</p><p>${products[0].price}</p>`;
        } else {
            productBox.innerHTML = '<p>Nenhum produto encontrado.</p>';
        }
    }
}
