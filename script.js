class Product {
  static totalProducts = 0;
  constructor(name, price, quantity) {
    this.name = name.trim();
    this.price = price;
    this.quantity = quantity;
    Product.totalProducts += 1;
  }
  getTotalValue() {
    return this.price * this.quantity;
  }
  toString() {
    return `Product: ${this.name}, Price: ${formatMoney(this.price)}, Quantity: ${this.quantity}`;
  }
  static applyDiscount(products, discount) {
    for (const p of products) {
      if (p instanceof Product) {
        p.price = round2(p.price * (1 - discount));
      }
    }
  }
}
class PerishableProduct extends Product {
  constructor(name, price, quantity, expirationDate) {
    super(name, price, quantity);
    this.expirationDate = expirationDate.trim();
  }
  toString() {
    return `Product: ${this.name}, Price: ${formatMoney(this.price)}, Quantity: ${this.quantity}, Expiration Date: ${this.expirationDate}`;
  }
}
class Store {
  constructor() {
    this.inventory = [];
  }
  addProduct(product) {
    this.inventory.push(product);
  }
  getInventoryValue() {
    return this.inventory.reduce((sum, p) => sum + p.getTotalValue(), 0);
  }
  findProductByName(name) {
    const target = name.trim().toLowerCase();
    return this.inventory.find(p => p.name.toLowerCase() === target) || null;
  }
}
function formatMoney(n) {
  return `$${Number(n).toFixed(2)}`;
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
