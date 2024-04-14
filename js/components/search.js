export class SearchEngine {
    constructor() {
        this.searchInput = document.getElementById('search');
    }

    searchProduct() {
        fetch("js/text/products.json")
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
                        // Salvar os produtos encontrados no localStorage
                        localStorage.setItem('foundProducts', JSON.stringify(foundProducts));
    
                        // Navegar para a outra página de produtos
                        window.location.href = '../../produtos.html';
    
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
        // Recuperar os produtos encontrados do localStorage
        let productsString = localStorage.getItem('foundProducts');

        if (productsString) {
            let products = JSON.parse(productsString);
            const productGrid = document.getElementById('product_grid');
            productGrid.innerHTML = '';
            
            if (products.length > 0) {
                products.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.classList.add('product_box');
                    
                    console.log(product.image)
                    let message = `<h2>${product.name}</h2><img src="${product.image}.jpg"><p>R$ ${product.price}</p><p>${product.description}</p>`;
                    productElement.innerHTML = message;
                    
                    productGrid.appendChild(productElement);
                });
            } else {
                productGrid.innerHTML = '<p>Nenhum produto encontrado.</p>';
            }
        } else {
            window.alert('Nenhum produto encontrado.');
        }
    }
}
