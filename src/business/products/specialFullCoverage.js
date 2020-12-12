const { validationPrice } = require('./validationPrice');

function getValues(price, sellIn) {
  return {
    price: getPriceSpecialFullCoverage(price, sellIn),
    sellIn: getSellInSpecialFullCoverage(sellIn)
  }
}

function getPriceSpecialFullCoverage(price, sellIn) {
  if (sellIn <= 0) {
    return 0;
  }
  if (sellIn <= 5) {
    return validationPrice(price + 3);
  }
  if (sellIn <= 10) {
    return validationPrice(price + 2);
  }
  return validationPrice(price + 1);
}

function getSellInSpecialFullCoverage(sellIn) {
  return sellIn - 1;
}

module.exports = { getValues }