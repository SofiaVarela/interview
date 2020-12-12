const { validationPrice } = require('./validationPrice');

function getValues(price, sellIn) {
  return {
    price: getPriceFullCoverage(price, sellIn),
    sellIn: getSellInFullCoverage(sellIn)
  }
}

function getPriceFullCoverage(price, sellIn) {
  return validationPrice(sellIn > 0 ? price + 1 : price + 2);
}

function getSellInFullCoverage(sellIn) {
  return sellIn - 1;
}

module.exports = { getValues }