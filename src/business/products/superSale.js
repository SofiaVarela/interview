const { validationPrice } = require('./validationPrice');

function getValues(price, sellIn) {
  return {
    price: getPriceSuperSale(price, sellIn),
    sellIn: getSellInSuperSale(sellIn)
  }
}

function getPriceSuperSale(price) {
  return validationPrice(price - 2);
}
function getSellInSuperSale(sellIn) {
  return sellIn - 1;
}

module.exports = { getValues }