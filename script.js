class Product {
  constructor(name, price, quantity) {
    this.name = String(name).trim();
    this.price = Number(price);
    this.quantity = Number(quantity);
  }
  getTotalValue() {
    return this.price * this.quantity;
  }
  toString() {
    return `Product: ${this.name}, Price: ${formatMoney(this.price)}, Quantity: ${this.quantity}`;
  }
}

function formatMoney(n) {
  return `$${Number(n).toFixed(2)}`;
}

// Quick smoke test (shows in the page and console)
const out = document.getElementById("output");
const demo = new Product("Apple", 2.5, 4);
const lines = [
  demo.toString(),
  `Total value: ${formatMoney(demo.getTotalValue())}`
];
console.log(lines.join("\n"));
if (out) out.textContent = lines.join("\n");
