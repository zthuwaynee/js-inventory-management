# Inventory Management System (JavaScript Classes)

A small inventory app demonstrating ES6 classes, inheritance, method overrides, and static properties/methods. Includes a Store class for aggregation and a simple UI that runs fully in the browser.

## Features
- Product base class with name, price, quantity, toString, and getTotalValue
- PerishableProduct subclass with expirationDate and toString override
- Static property `Product.totalProducts` and static method `Product.applyDiscount`
- Store class with addProduct, getInventoryValue, and findProductByName
- Simple demo UI with three buttons

## Live Page
Deployed via GitHub Pages:
- https://<your-username>.github.io/<your-repo>/

## How to Run Locally
1. Clone this repository
2. Open `index.html` in your browser
3. Click **Run Demo**, then **Apply 15% Discount**, then **Recalculate Inventory Value**

## Files
- `index.html` – UI and styles
- `script.js` – Classes and demo logic

## Demo Steps
1. Run Demo: seeds 5 products (2 perishable), prints inventory and total value
2. Apply 15% Discount: reduces prices for all products
3. Recalculate Inventory Value: prints the new total
