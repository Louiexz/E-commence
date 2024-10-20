var clothesProducts = [];
var eletronicsProducts = [];
var furnitureProducts = [];
var shoesProducts = [];
var miscillaneousProducts = [];

if (product && product.category.name == 'Eletronics') {
    eletronicsProducts.push(product);
} else if (product && product.category.name == 'Clothes') {
    clothesProducts.push(product);
} else if (product && product.category.name == 'Furniture') {
    furnitureProducts.push(product);
} else if (product && product.category.name == 'Shoes') {
    shoesProducts.push(product);
} else if (product && product.category.name == 'Miscillaneous') {
    miscillaneousProducts.push(product);
} 