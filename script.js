// Base Product class with name, price, and quantity, plus useful methods and a static discount helper
class Product {
  static totalProducts = 0; // counts all products created
  constructor(name, price, quantity) {
    // basic validations to keep data clean
    if (typeof name !== "string" || !name.trim()) throw new Error("Product name must be a non-empty string.");
    if (typeof price !== "number" || price < 0) throw new Error("Product price must be a non-negative number.");
    if (!Number.isFinite(quantity) || quantity < 0) throw new Error("Product quantity must be a non-negative number.");
    this.name = name.trim();
    this.price = price;
    this.quantity = quantity;
    Product.totalProducts += 1;
  }
  // returns numeric total value of this product in inventory
  getTotalValue() {
    return this.price * this.quantity;
  }
  // print-friendly description
  toString() {
    return `Product: ${this.name}, Price: ${formatMoney(this.price)}, Quantity: ${this.quantity}`;
  }
  // reduce price for each Product in the array by the given discount (0.15 = 15%)
  static applyDiscount(products, discount) {
    if (!Array.isArray(products)) return;
    if (typeof discount !== "number" || discount <= 0 || discount >= 1) return;
    for (const p of products) {
      if (p instanceof Product) {
        p.price = round2(p.price * (1 - discount));
      }
    }
  }
}

// Subclass for perishable goods; adds expirationDate and overrides toString
class PerishableProduct extends Product {
  constructor(name, price, quantity, expirationDate) {
    super(name, price, quantity);
    if (typeof expirationDate !== "string" || !expirationDate.trim()) {
      throw new Error("Expiration date must be a non-empty string.");
    }
    this.expirationDate = expirationDate.trim();
  }
  toString() {
    return `Product: ${this.name}, Price: ${formatMoney(this.price)}, Quantity: ${this.quantity}, Expiration Date: ${this.expirationDate}`;
  }
}

// Store class aggregates Products, provides total valuation and lookup by name
class Store {
  constructor() {
    this.inventory = [];
  }
  // add only valid Product instances
  addProduct(product) {
    if (!(product instanceof Product)) return;
    this.inventory.push(product);
  }
  // sum of all product values
  getInventoryValue() {
    return this.inventory.reduce((sum, p) => sum + p.getTotalValue(), 0);
  }
  // case-insensitive exact name match
  findProductByName(name) {
    if (typeof name !== "string") return null;
    const target = name.trim().toLowerCase();
    return this.inventory.find(p => p.name.toLowerCase() === target) || null;
  }
}

// formatting helpers
function formatMoney(amount) {
  return `$${amount.toFixed(2)}`;
}
function round2(n) {
  return Math.round(n * 100) / 100;
}

// UI glue and demo
const store = new Store();
const outputEl = document.getElementById("output");
const btnRun = document.getElementById("runDemo");
const btnDiscount = document.getElementById("applyDiscountBtn");
const btnRecalc = document.getElementById("recalculateBtn");

let initialized = false;

// append to the <pre> and console
function log(msg) {
  console.log(msg);
  outputEl.textContent += `\n${msg}`;
}

// seed 5 products (incl. 2 perishable), print inventory and value
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

// apply 15% discount and print new prices
btnDiscount.addEventListener("click", () => {
  if (!initialized) return log("Run demo first!");
  Product.applyDiscount(store.inventory, 0.15);
  log("Applied 15% discount to all products.");
  log(store.inventory.map(p=>p.toString()).join("\n"));
});

// recompute total value
btnRecalc.addEventListener("click", () => {
  if (!initialized) return log("Run demo first!");
  log(`Recalculated inventory value: ${formatMoney(store.getInventoryValue())}`);
});
