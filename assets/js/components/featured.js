/**
 * Classe para recuperar e mostrar produtos em destaque
 */
export class FeaturedControl {
    getProducts() {
        fetch("./assets/js/text/featured.json")
            .then(response => response.json())
            .then(data => {
                if (data && data.Featured && Array.isArray(data.Featured) && data.Featured.length > 0) {
                    const featuredCategories = data.Featured[0];
                    let foundProducts = []; // Array to store the found products
                
                    // Iterate through each category of products
                    for (const categoryKey in featuredCategories) {
                        if (featuredCategories.hasOwnProperty(categoryKey)) {
                            const category = featuredCategories[categoryKey];
                            // Iterate through each brand in the category
                            category.forEach(brand => {
                                // Iterate through each model of the brand
                                brand.models.forEach(model => {
                                    foundProducts.push(model); // Add the model to the found products array
                                });
                            });
                        }
                    }
                    if (foundProducts.length > 0) {
                        // Salvar os produtos encontrados no localStorage
                        localStorage.setItem('foundProducts', JSON.stringify(foundProducts));
                    } else {
                        window.alert('Sem produtos!');
                    }
                } else {
                    console.error('Error: Invalid data structure or missing data.Featured.');
                }     
                // Verifica se algum produto foi encontrado
                })
                .catch(error => {
                    console.error('Ocorreu um erro ao carregar o JSON:', error);
                });
    }
}
