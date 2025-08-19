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
function formatMoney(amount) {
  return `$${amount.toFixed(2)}`;
}
function round2(n) {
  return Math.round(n * 100) / 100;
}

const store = new Store();
const outputEl = document.getElementById("output");
const btnRun = document.getElementById("runDemo");
const btnDiscount = document.getElementById("applyDiscountBtn");
const btnRecalc = document.getElementById("recalculateBtn");

let initialized = false;

function log(msg) {
  console.log(msg);
  outputEl.textContent += `\n${msg}`;
}

btnRun.addEventListener("click", () => {
  store.inventory = [];
  const apple = new Product("Apple", 2.5, 50);
  const banana = new Product("Banana", 1.2, 40);
  const bread = new PerishableProduct("Bread", 3.5, 20, "2025-02-15");
  const milk = new PerishableProduct("Milk", 1.5, 10, "2025-01-31");
  const cereal = new Product("Cereal", 4.8, 15);
  store.addProduct(apple);
  store.addProduct(banana);
  store.addProduct(bread);
  store.addProduct(milk);
  store.addProduct(cereal);
  initialized = true;
  log(`Initial Inventory:\n${store.inventory.map(p=>p.toString()).join("\n")}`);
  log(`Total inventory value: ${formatMoney(store.getInventoryValue())}`);
  log(`Find product 'Milk':\n${store.findProductByName("Milk")?.toString()}`);
});

btnDiscount.addEventListener("click", () => {
  if (!initialized) return log("Run demo first!");
  Product.applyDiscount(store.inventory, 0.15);
  log("Applied 15% discount to all products.");
  log(store.inventory.map(p=>p.toString()).join("\n"));
});

btnRecalc.addEventListener("click", () => {
  if (!initialized) return log("Run demo first!");
  log(`Recalculated inventory value: ${formatMoney(store.getInventoryValue())}`);
});
