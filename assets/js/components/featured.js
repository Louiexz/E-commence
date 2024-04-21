export class ProductsEngine {
    constructor() {
        this.searchInput = document.getElementById('search');
    }
    putInLocalStorage(foundProducts, featuredProducts) {
        if (foundProducts.length > 0) {
            localStorage.setItem('foundProducts', JSON.stringify(foundProducts));
        }
        else if (featuredProducts.lenght > 0) {
            localStorage.setItem('featuredProducts', JSON.stringify(featuredProducts));
        }
        else {
            window.alert('Sem produtos desse modelo!');
        }
    }
    getProducts(data_category, data) {
        let foundProducts = [];
        let featuredProducts = [];
        console.log(data, data_category)

        if (data && data_category && Array.isArray(data_category) && data_category.length > 0) {
            const categories = data_category[0];
            console.log(categories)

            for (const categoryKey in categories) {
                if (categories.hasOwnProperty(categoryKey)) {
                    const category = categories[categoryKey];

                    category.forEach(brand => {
                        brand.models.forEach(model => {
                            if (model.name.toLowerCase().includes(this.searchInput.value.toLowerCase())) {
                                foundProducts.push(model);
                            }
                            else if (model.sale && featuredProducts.lenght < 3) featuredProducts.push(model);
                        });
                    });
                }
                
            }
            setLocalStorage()
        } else {
            console.error('Erro: Estrutura de dados inválida ou data_category ausentes.');
        }
    }

    getJson() {
        fetch("./assets/js/text/products.json")
            .then(response => response.json())
            .then(data => {
                localStorage.clear()
                if (this.searchInput.value) window.location.href = 'produtos.html';
                const data_category = window.location.pathname.endsWith('produtos.html') ? data.Eletronics : data.Featured;
                this.getProducts(data_category, data);
            })
            .catch(error => {
                console.error('Ocorreu um erro ao carregar o JSON:', error);
            });
    }
}
