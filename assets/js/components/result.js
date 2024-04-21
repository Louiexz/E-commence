/*
 * Classe para exibir os produtos encontrados nos jsons
*/
export class Result {
    // Função para exibir os produtos encontrados nos json
    showProducts(div_name, class_name) {
        // Recuperar os produtos encontrados no localStorage
        const productsString = localStorage.getItem('foundProducts');

        if (productsString) {
            const productGrid = document.getElementById(div_name);
            productGrid.innerHTML = '';
            
            let products = JSON.parse(productsString);
            console.log(products)
            if (products.length > 0) {
                products.forEach(product => {
                    console.log(product)
                    const productElement = document.createElement('div');
                    productElement.classList.add(class_name);
                    
                    console.log(product.image)
                    let message = `<img class="product_img" src="${product.image}"><div><h3>${product.name}</h3>`
                    if (product.sale) {
                        message += `<p class="sale">De ${product.sale}% por:</p>`;
                    }
                    message += `<p class="price">R$ ${product.price}</p></div>`;
                    productElement.innerHTML = message;
                    
                    productGrid.appendChild(productElement);
                });
            } else {
                productGrid.innerHTML = '<p>Nenhum produto encontrado.</p>';
            }
        } else {
            productGrid.innerHTML = '<p>Nenhum produto encontrado.</p>';
            window.alert('Nenhum produto encontrado.');
        }
    }
}