export class Result {
    constructor() {
        this.productElement = document.querySelector('#product_box');
    }

    showProduct() {
        const productString = localStorage.getItem('product');
    
        if (productString) {
            const product = JSON.parse(productString);

            // Set the page title to the product's name
            document.querySelector('title').innerText = product.title;

            let imagePath = product.image;
            if (!product.image.startsWith('https')) {
                imagePath = `../${product.image}`;
            }
    
            // Create the HTML message to display the product
            let message = `<img class="product_img" src="${imagePath}" alt="${product.title}">`;
            message += `<div id=info><h3>${product.title}</h3>`;
    
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
