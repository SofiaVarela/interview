
const price = 80;

function getValues(sellIn) {
  return {
    price: getPriceMegaCoverage(),
    sellIn: getSellInMegaCoverage(sellIn)
  }
}

function getPriceMegaCoverage() {
  return price;
}

function getSellInMegaCoverage(sellIn) {
  return sellIn;
}

module.exports = { getValues }
