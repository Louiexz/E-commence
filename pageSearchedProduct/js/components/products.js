export class ProductsEngine {
    constructor() {
        this.searchInput = document.getElementById('search');
    }
    setLocalStorage(foundProducts) {
        if (foundProducts.length > 0) {
            localStorage.setItem('foundProducts', JSON.stringify(foundProducts));
        } else {
            window.alert('Produto não encontrado!');
        }
    }
    getProducts(data) {
        const featuredProducts = [];
        let foundProducts = []; 

        if (data && data.Eletronics && Array.isArray(data.Eletronics) && data.Eletronics.length > 0) {
            const categories = data.Eletronics[0];

            for (const categoryKey in categories) {
                if (categories.hasOwnProperty(categoryKey)) {
                    const category = categories[categoryKey];

                    category.forEach(brand => {
                        brand.models.forEach(model => {
                            if (this.searchInput.value != "" && model.name.toLowerCase().includes(this.searchInput.value.toLowerCase())) {
                                foundProducts.push(model); // Adicionamos o modelo à lista foundProducts
                            }
                        });
                    });
                }
            }
            this.setLocalStorage(foundProducts);
        } else {
            console.error('Erro: Estrutura de dados inválida ou data.Eletronics ausentes.');
        }
    }

    getJson() {
        fetch("./js/text/products.json")
            .then(response => response.json())
            .then(data => {
                if (this.searchInput.value) {
                    window.location.href = '../produto.html';
                }
                this.getProducts(data);
            })
            .catch(error => {
                console.error('Ocorreu um erro ao carregar o JSON:', error);
            });
    }
}
