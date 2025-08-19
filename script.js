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
function formatMoney(amount) {
  return `$${amount.toFixed(2)}`;
}
function round2(n) {
  return Math.round(n * 100) / 100;
}
