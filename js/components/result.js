export class Result {
    constructor() {
        this.path = window.location.pathname;
        this.list = this.path.endsWith('searchedProduct.html') ? 'foundProducts' : 'featuredProducts';
        this.divName = this.path.endsWith('searchedProduct.html') ? 'product_grid' : 'featured_grid';
        this.className = 'featured_box';
        this.productGrid = document.getElementById(this.divName);
    }
    displayProducts(products) {
        this.productGrid.innerHTML = '';

        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add(this.className);

            let imagePath = this.path.endsWith('searchedProduct.html') ||
                this.path.endsWith('product.html')
                ? `../${product.image}` : product.image;
            if (product.image.startsWith('https')) {
                imagePath = product.image;
            }

            let message = `
                <img class="product_img" src="${imagePath}">
                <div>
                    <h4>${product.title}</h4>
                    ${product.sale ? `<p class="sale">${product.sale}%</p>` : ''}
                    <p class="price">R$ ${product.price}</p>
                </div>
            `;

            productElement.innerHTML = message;

            // Determine the redirection path
            const redirectionPath = this.path.endsWith('searchedProduct.html') || this.path.endsWith('product.html')
                ? '../pageProduct/product.html'
                : 'pageProduct/product.html';

            // Add click event listener
            productElement.addEventListener('click', () => {
                localStorage.setItem('product', JSON.stringify(product));
                window.location.href = redirectionPath;
            });

            this.productGrid.appendChild(productElement);
        });
    }
    showProducts() {
        const productsString = localStorage.getItem(this.list);

        if (productsString) {
            try {
                const products = JSON.parse(productsString);
                if (products.length > 0) {
                    this.displayProducts(products);
                } else {
                    this.productGrid.innerHTML = '<p>Nenhum produto encontrado.</p>';
                }
            } catch (error) {
                console.error('Erro ao processar os produtos:', error);
                this.productGrid.innerHTML = '<p>Erro ao processar produtos.</p>';
            }
        } else {
            this.productGrid.innerHTML = '<p>Nenhum produto encontrado.</p>';

            // Recarregue a página após 1 segundo, se ainda não tiver sido recarregada
            if (!window.location.pathname.endsWith('ct.html')) {
                setTimeout(() => {
                window.location.reload();
                }, 1000);
            }
        }
    }
}
