const products = require('../../src/data/products');
const { filterByCategory } = require('../../src/catalog');

describe('filterByCategory', () => {
  test("'all' возвращает товары с ID [1, 2, 3, 4, 5, 6]", () => {
    expect(filterByCategory(products, 'all').map(product => product.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });
  test("undefined возвращает товары с ID [1, 2, 3, 4, 5, 6]", () => {
    expect(filterByCategory(products, undefined).map(product => product.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });
  test("пустая строка возвращает товары с ID [1, 2, 3, 4, 5, 6]", () => {
    expect(filterByCategory(products, '').map(product => product.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });
  test("'electronics' возвращает товары с ID [1, 2]", () => {
    expect(filterByCategory(products, 'electronics').map(product => product.id)).toEqual([1, 2]);
  });
  test("'books' возвращает товары с ID [3, 6]", () => {
   expect(filterByCategory(products, 'books').map(product => product.id)).toEqual([3, 6]);
  });
  test("'home' возвращает товары с ID [4, 5]", () => {
    expect(filterByCategory(products, 'home').map(product => product.id)).toEqual([4, 5]);
  });
  test("'clothes' возвращает пустой массив", () => {
    expect(filterByCategory(products, 'clothes')).toEqual([]);
  });
  test("'toys' возвращает пустой массив", () => {
    expect(filterByCategory(products, 'toys')).toEqual([]);
  });
  test("'sports' возвращает пустой массив", () => {
    expect(filterByCategory(products, 'sports')).toEqual([]);
  });
});
