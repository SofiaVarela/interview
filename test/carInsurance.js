const expect = require('chai').expect;
const { CarInsurance } = require('../src/business/carInsurance');
const { Product } = require('../src/business/product');
const { validationPrice } = require('../src/business/products/validationPrice');

const { FULL_COVERAGE, MEGA_COVERAGE, SPECIAL_FULL_COVERAGE, SUPER_SALE, OTHERS } = require('../config/carInsurances');

describe("CarInsurance Test", function () {

  describe('When the product is Mega Coverage', () => {
    it('should keep the same price', () => {
      const coTest = new CarInsurance([new Product(MEGA_COVERAGE, 0, 80)]);
      const products = coTest.updatePrice();
      expect(products[0].price).equal(80);
    });
    it('should not degrade the sellIn', () => {
      const coTest = new CarInsurance([new Product(MEGA_COVERAGE, -1, 80)]);
      const products = coTest.updatePrice();
      expect(products[0].sellIn).equal(-1);
    });
  });

  describe('When the product is Full Coverage', () => {
    it('should degrade the sellIn', () => {
      const coTest = new CarInsurance([new Product(FULL_COVERAGE, 23, 40)]);
      const products = coTest.updatePrice();
      expect(products[0].sellIn).equal(22);
    });
    it('should increase the price if a day passes', () => {
      const coTest = new CarInsurance([new Product(FULL_COVERAGE, 23, 10)]);
      const products = coTest.updatePrice();
      expect(products[0].price).equal(11);
    });
    it('should the price be less than or equal to 50', () => {
      const coTest = new CarInsurance([new Product(FULL_COVERAGE, 30, 50)]);
      const products = coTest.updatePrice();
      expect(products[0].price).equal(50);
    });
    it('should increase the price by 2 when the sellIn is negative', () => {
      const coTest = new CarInsurance([new Product(FULL_COVERAGE, -2, 10)]);
      const products = coTest.updatePrice();
      expect(products[0].price).equal(12);
    });
    it('should increase the price by 2 when the sellIn is 0', () => {
      const coTest = new CarInsurance([new Product(FULL_COVERAGE, 0, 10)]);
      const products = coTest.updatePrice();
      expect(products[0].price).equal(12);
    });
  });

  describe('When the product is Special Full Coverage', () => {
    it('should degrade the sellIn', () => {
      const coTest = new CarInsurance([new Product(SPECIAL_FULL_COVERAGE, 23, 40)]);
      const products = coTest.updatePrice();
      expect(products[0].sellIn).equal(22);
    });
    it('should the price be less than or equal to 50', () => {
      const coTest = new CarInsurance([new Product(SPECIAL_FULL_COVERAGE, 23, 50)]);
      const products = coTest.updatePrice();
      expect(products[0].price).equal(50);
    });
    it('should increase the price if a day passes', () => {
      const coTest = new CarInsurance([new Product(SPECIAL_FULL_COVERAGE, 11, 10)]);
      const products = coTest.updatePrice();
      expect(products[0].price).equal(11);
    });
    it('should be 0 if there are 0 days left', () => {
      const coTest = new CarInsurance([new Product(SPECIAL_FULL_COVERAGE, 0, 10)]);
      const products = coTest.updatePrice();
      expect(products[0].price).equal(0);
    });
    it('should be 0 if the sellIn is negative', () => {
      const coTest = new CarInsurance([new Product(SPECIAL_FULL_COVERAGE, -1, 30)]);
      const products = coTest.updatePrice();
      expect(products[0].price).equal(0);
    });
    it('should increase the price by 3 if there are 5 days or less left', () => {
      const coTest = new CarInsurance([new Product(SPECIAL_FULL_COVERAGE, 5, 10)]);
      const products = coTest.updatePrice();
      expect(products[0].price).equal(13);
    });
    it('should increase the price by 3 if there are 4 days left', () => {
      const coTest = new CarInsurance([new Product(SPECIAL_FULL_COVERAGE, 4, 10)]);
      const products = coTest.updatePrice();
      expect(products[0].price).equal(13);
    });
    it('should increase the price by 2 if there are 10 days or less left', () => {
      const coTest = new CarInsurance([new Product(SPECIAL_FULL_COVERAGE, 10, 10)]);
      const products = coTest.updatePrice();
      expect(products[0].price).equal(12);
    });
    it('should increase the price by 2 if there are 10 days or less left', () => {
      const coTest = new CarInsurance([new Product(SPECIAL_FULL_COVERAGE, 10, 40)]);
      const products = coTest.updatePrice();
      expect(products[0].price).equal(42);
    });
    it('should increase the price by 2 if there are 9 days', () => {
      const coTest = new CarInsurance([new Product(SPECIAL_FULL_COVERAGE, 9, 10)]);
      const products = coTest.updatePrice();
      expect(products[0].price).equal(12);
    });
  });

  describe('When the product is Super Sale', () => {
    it('should degrade the sellIn', () => {
      const coTest = new CarInsurance([new Product(SUPER_SALE, 23, 40)]);
      const products = coTest.updatePrice();
      expect(products[0].sellIn).equal(22);
    });
    it('should decrease the price by 2 if a day goes by', () => {
      const coTest = new CarInsurance([new Product(SUPER_SALE, 23, 40)]);
      const products = coTest.updatePrice();
      expect(products[0].price).equal(38);
    });
    it('should the price be 0 or higher', () => {
      const coTest = new CarInsurance([new Product(SUPER_SALE, -4, 0)]);
      const products = coTest.updatePrice();
      expect(products[0].price).equal(0);
    });
  });

  describe('When the product is Others', () => {
    it('should lower the price by 2 only if the sellIn is 0 or less', () => {
      const coTest = new CarInsurance([new Product(OTHERS, 0, 36)]);
      const products = coTest.updatePrice();
      expect(products[0].sellIn).equal(-1);
      expect(products[0].price).equal(34);
    });
    it('should lower the price by 2 only if the sellIn is -1', () => {
      const coTest = new CarInsurance([new Product(OTHERS, -1, 36)]);
      const products = coTest.updatePrice();
      expect(products[0].sellIn).equal(-2);
      expect(products[0].price).equal(34);
    });
    it('should degrade the sellIn', () => {
      const coTest = new CarInsurance([new Product(OTHERS, 23, 40)]);
      const products = coTest.updatePrice();
      expect(products[0].sellIn).equal(22);
    });
    it('should decrease the price by 1 if a day goes by', () => {
      const coTest = new CarInsurance([new Product(OTHERS, 23, 40)]);
      const products = coTest.updatePrice();
      expect(products[0].price).equal(39);
    });
    it('should the price be 0 or higher', () => {
      const coTest = new CarInsurance([new Product(OTHERS, -4, 0)]);
      const products = coTest.updatePrice();
      expect(products[0].price).equal(0);
    });
  });

  describe('When there are products', () => {
    it('should update 0 products', () => {
      const coTest = new CarInsurance();
      const products = coTest.updatePrice();
      expect(products.length).equal(0);
    });
  });

  describe('When the product price is validated', () => {
    it('should return 0 if the price is negative', () => {
      const price = validationPrice(-5);
      expect(price).equal(0);
    });
    it('should return 0 if the price is 0', () => {
      const price = validationPrice(0);
      expect(price).equal(0);
    });
    it('should return the price if the price is between 0 and 50', () => {
      const price = validationPrice(30);
      expect(price).equal(30);
    });
    it('should return 50 if the price is 50', () => {
      const price = validationPrice(50);
      expect(price).equal(50);
    });
    it('should return 50 if the price is greater than 50', () => {
      const price = validationPrice(51);
      expect(price).equal(50);
    });
  });
});