export class SearchEngine {
    constructor() {
        this.searchInput = document.getElementById('search');
    }

    searchProducts() {
        fetch("./assets/js/text/eletronics.json")
            .then(response => response.json())
            .then(data => {
                console.log(data, data.Eletronics, Array.isArray(data.Eletronics))
                if (data && data.Eletronics && Array.isArray(data.Eletronics) && data.Eletronics.length > 0) {
                    const searchedCategories = data.Eletronics[0];
                    let foundProducts = []; // Array to store the found products
                
                    // Iterate through each category of products
                    for (const categoryKey in searchedCategories) {
                        if (searchedCategories.hasOwnProperty(categoryKey)) {
                            const category = searchedCategories[categoryKey];
                            // Iterate through each brand in the category
                            category.forEach(brand => {
                                // Iterate through each model of the brand
                                brand.models.forEach(model => {
                                    if (model.name.toLowerCase().includes(this.searchInput.value.toLowerCase())) {
                                        foundProducts.push(model); // Adiciona o modelo encontrado ao array de produtos encontrados
                                }
                                });
                            });
                        }
                    }
                    if (foundProducts.length > 0) {
                        // Salvar os produtos encontrados no localStorage
                        localStorage.setItem('foundProducts', JSON.stringify(foundProducts));
    
                        // Navegar para a outra página de produtos
                        window.location.href = 'produtos.html';
    
                    } else {
                        window.alert('Sem produtos desse modelo!');
                    }
                } else {
                    console.error('Error: Invalid data structure or missing data.Eletronics.');
                }
            })
            .catch(error => {
                console.error('Ocorreu um erro ao carregar o JSON:', error);
            });
    }
}