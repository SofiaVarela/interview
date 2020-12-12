const { validationPrice } = require('./validationPrice');

function getValues(price, sellIn) {
  return {
    price: getPriceOthers(price, sellIn),
    sellIn: getSellInOthers(sellIn)
  }
}

function getPriceOthers(price, sellIn) {
  return validationPrice(sellIn > 0 ? price - 1 : price - 2);
}
function getSellInOthers(sellIn) {
  return sellIn - 1;
}

module.exports = { getValues }