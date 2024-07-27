export class Result {
    constructor() {
        this.path = window.location.pathname;
        this.list = this.path.endsWith('produto.html') ? 'foundProducts' : 'featuredProducts';
        this.div_name = this.path.endsWith('produto.html') ? 'product_grid' : 'featured_grid';
        this.class_name = this.path.endsWith('produto.html') ? 'product_box' : 'featured_box';
        this.productGrid = document.getElementById(this.div_name);
    }

    showProducts() {
        const productsString = localStorage.getItem(`${this.list}`);

        if (productsString) {
            this.productGrid.innerHTML = '';
            const products = JSON.parse(productsString);
            
            if (products.length > 0) {
                products.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.classList.add(this.class_name);
                    
                    let message = `<img class="product_img" src="${product.image}"><div><h3>${product.name}</h3>`;
                    if (product.sale) {
                        message += `<p class="sale">De ${product.sale}% por:</p>`;
                    }
                    message += `<p class="price">R$ ${product.price}</p></div>`;
                    productElement.innerHTML = message;
                    
                    this.productGrid.appendChild(productElement);
                });
            } else {
                this.productGrid.innerHTML = '<p>Nenhum produto encontrado.</p>';
            }
        } else {
            this.productGrid.innerHTML = '<p>Nenhum produto encontrado.</p>';
            window.alert('Nenhum produto encontrado.');
        }
    }
}
