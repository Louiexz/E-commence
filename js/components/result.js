export class Result {
    constructor() {
        this.path = window.location.pathname;
        this.list = this.path.endsWith('searchedProduct.html') ? 'foundProducts' : 'featuredProducts';
        this.div_name = this.path.endsWith('searchedProduct.html') ? 'product_grid' : 'featured_grid';
        this.class_name = 'featured_box';
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
                    if (window.location.pathname.endsWith("index.html") != true) {
                       product.image = '../../'+product.image
                    }
                    let message = `<img class="product_img" src="${product.image}"><div><h4>${product.name}</h4>`;
                    if (product.sale) {
                        message += `<p class="sale">${product.sale}%</p>`;
                    }
                    message += `<p class="price">R$ ${product.price}</p></div>`;
                    productElement.innerHTML = message;
                    
                    this.productGrid.appendChild(productElement);

                    var redirection = "pageProduct/product.html"
                    if (window.location.pathname.endsWith("index.html") != true) {
                        redirection = '../' + redirection
                    }
                    productElement.addEventListener('click', ()=> {
                        if (products.length > 0) {
                            localStorage.setItem('product', JSON.stringify(product))
                            window.location.href = redirection
                        } else {
                            window.alert('Produto não encontrado!');
                        }
                        
                    })
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
