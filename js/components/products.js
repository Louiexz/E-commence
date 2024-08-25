export class ProductsEngine {
    constructor() {
        this.searchInput = document.getElementById('search');
    }
    setLocalStorage(foundProducts, featuredProducts, categories) {
        if (foundProducts.length > 0) {
            localStorage.setItem('foundProducts', JSON.stringify(foundProducts));
        } else if (featuredProducts.length > 0) {
            localStorage.setItem('featuredProducts', JSON.stringify(featuredProducts));
        } else if (categories.length > 0) {
            localStorage.setItem('categoriesProducts', JSON.stringify(categories));
        } else {
            window.alert('Produto não encontrado!');
        }
    }
    getProducts(data) {
        var featuredProducts = [];
        var foundProducts = [];
        var categories = [];

        data.forEach(product => {
            console.log(product.image);
            if (this.searchInput.value != "" && product.title.toLowerCase().includes(this.searchInput.value.toLowerCase())) {
                foundProducts.push(product); // Adicionamos o modelo à lista foundProducts}
            } else if (featuredProducts.length < 3) {
                featuredProducts.push(product);
            } else if (this.searchInput.value !== "" && product.category.toLowerCase().includes(this.searchInput.value.toLowerCase())) {
                categories.push(product);
            }
            this.setLocalStorage(foundProducts, featuredProducts, categories);
        });
    }
    async fetchAndCombineData(path, page) {
        try {
            // Fetch a primeira lista de produtos
            const response1 = await fetch('https://fakestoreapi.com/products');
            const datas = await response1.json();
            
            // Fetch a segunda lista de produtos
            const response2 = await fetch(path);
            const products = await response2.json();
            
            // Combina as listas de produtos
            const combinedProducts = datas.concat(products);
            
            // Use o resultado combinado conforme necessário
            this.getProducts(combinedProducts);

            // Verifica a condição e redireciona se necessário
            if (this.searchInput.value) {
                window.location.href = page;
                return; // Saia da função para evitar executar o resto do código
            }
    
        } catch (error) {
            console.error('Ocorreu um erro ao carregar o JSON:', error);
        }
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
        // Chama a função para executar as operações
        this.fetchAndCombineData(path, page);        
    }
}
