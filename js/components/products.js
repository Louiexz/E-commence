export class ProductsEngine {
    constructor() {
        this.searchInput = document.getElementById('search');
    }
    setLocalStorage(foundProducts, featuredProducts) {
        if (foundProducts.length > 0) {
            localStorage.setItem('foundProducts', JSON.stringify(foundProducts));
        } else if (featuredProducts.length > 0) {
            localStorage.setItem('featuredProducts', JSON.stringify(featuredProducts));
        } else {
            window.alert('Produto não encontrado!');
        }
    }
    getProducts(data) {
        var featuredProducts = [];
        var foundProducts = [];
        var products = [];

        data.forEach(product => {
            const regex = /"([^"]*)"/g;
            let match;

            for (const i in product.images) {
                // Usar exec para encontrar a primeira ocorrência
                match = regex.exec(product.images[i]);
                if (match) { product.images[i] = match[1]; }
            }

            if (featuredProducts.length < 3) {
                featuredProducts.push(product);
            } else if (this.searchInput.value !== "" && product.category.name.toLowerCase().includes(this.searchInput.value.toLowerCase())) {
                products.push(product);
            }
            if (this.searchInput.value != "" && product.title.toLowerCase().includes(this.searchInput.value.toLowerCase())) {
                foundProducts.push(product); // Adicionamos o modelo à lista foundProducts
            } else {
                localStorage.clear(foundProducts)
            }
            this.setLocalStorage(foundProducts, featuredProducts, products);
        });
    }

    getJson() {
        var localPath = window.location.pathname
        var path = "js/text/products.json"
        var page = 'pageSearchedProduct/searchedProduct.html'
        if (localPath.endsWith("searchedProduct.html") || localPath.endsWith("product.html")) {
            path = './../' + path
        }
        if (localPath.endsWith("searchedProduct.html")) {
            page = 'searchedProduct.html'
        } else if (localPath.endsWith("product.html")) {
            page = '../pageSearchedProduct/searchedProduct.html'
        }
        fetch('https://api.escuelajs.co/api/v1/products')
            .then(response => response.json())
            .then(data => {
                if (this.searchInput.value) {
                    window.location.href = page;
                }
                this.getProducts(data);
            })
            .catch(error => {
                console.error('Ocorreu um erro ao carregar o JSON:', error);
            });
    }
}
