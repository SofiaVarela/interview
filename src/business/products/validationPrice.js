const maxPrice = 50;
const minPrice = 0;

function validationPrice(price) {
  return price <= minPrice ? minPrice : price >= maxPrice ? maxPrice : price;
}

module.exports = { validationPrice }