export class Result {
    constructor() {
        this.productElement = document.querySelector('#product_box');
    }

    showProduct() {
        const productKey = 'product';
        const productString = localStorage.getItem(productKey);
    
        if (productString) {
            const product = JSON.parse(productString);
    
            // Log the product information
            console.log('Product data:', productString, product);
    
            // Set the page title to the product's name
            document.querySelector('title').innerText = product.name;
    
            // Create the HTML message to display the product
            let message = `<img class="product_img" src="../${product.image}" alt="${product.name}">`;
            message += `<div id=info><h3>${product.name}</h3>`;
    
            if (product.sale) {
                message += `<p class="sale">De ${product.sale}% por:</p>`;
            }
            
            message += `<p class="price">R$ ${product.price}</p>`;
            message += `<p class="desc">${product.description}</p>`;
            message += `<button id=buy>Comprar</button></div>`;
    
            // Update the product element with the message
            this.productElement.innerHTML = message;
        } else {
            console.error('No product found in localStorage.');
            this.productElement.innerHTML = '<p>Product not found.</p>';
        }
    }
}
