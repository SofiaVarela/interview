const { FULL_COVERAGE, MEGA_COVERAGE, SPECIAL_FULL_COVERAGE, SUPER_SALE } = require('../../config/carInsurances');
const megaCoverage = require('./products/megaCoverage');
const fullCoverage = require('./products/fullCoverage');
const specialFullCoverage = require('./products/specialFullCoverage');
const superSale = require('./products/superSale');
const others = require('./products/others');

class CarInsurance {
  constructor(products = []) {
    this.products = products;
  }

  updatePrice() {
    this.products.map((product, key) => {
      switch (product.name) {
        case FULL_COVERAGE:
          product.price = fullCoverage.getValues(product.price, product.sellIn).price;
          product.sellIn = fullCoverage.getValues(product.price, product.sellIn).sellIn;
          break;
        case MEGA_COVERAGE:
          product.price = megaCoverage.getValues(product.sellIn).price;
          product.sellIn = megaCoverage.getValues(product.sellIn).sellIn;
          break;
        case SPECIAL_FULL_COVERAGE:
          product.price = specialFullCoverage.getValues(product.price, product.sellIn).price;
          product.sellIn = specialFullCoverage.getValues(product.price, product.sellIn).sellIn;
          break;
        case SUPER_SALE:
          product.price = superSale.getValues(product.price, product.sellIn).price;
          product.sellIn = superSale.getValues(product.price, product.sellIn).sellIn;
          break;
        default:
          product.price = others.getValues(product.price, product.sellIn).price;
          product.sellIn = others.getValues(product.price, product.sellIn).sellIn;
          break;
      }

      this.products[key] = product;
    });
    return this.products;
  }
}

module.exports = { CarInsurance }