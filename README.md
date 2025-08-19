# Inventory Management System (JavaScript Classes)

A browser-based inventory app showcasing ES6 classes, inheritance, method overrides, and static properties/methods. Includes a `Store` that aggregates products and provides valuation and lookup utilities.

## Live Page
GitHub Pages: https://<your-username>.github.io/<your-repo>/

## Demo Steps
1. Open the live page.
2. Click **Run Demo** to load 5 products (including 2 perishable items).
3. Click **Apply 15% Discount** to reduce all prices by 15%.
4. Click **Recalculate Inventory Value** to view the updated total.
5. Click **Run Edge Cases** to see invalid-product validation and a not-found lookup.

## Features
- `Product` with `name`, `price`, `quantity`, `getTotalValue`, `toString`
- `PerishableProduct` adds `expirationDate` and overrides `toString`
- `Product.totalProducts` static property
- `Product.applyDiscount(products, discount)` static method
- `Store` with `addProduct`, `getInventoryValue`, `findProductByName`
- Accessible, mobile-friendly UI with clear output

## Repository Structure
- `index.html` – UI and styles
- `script.js` – Class definitions and demo logic
- `README.md` – Project overview and instructions

## Run Locally
- Clone the repo
- Open `index.html` in a browser
- Use the buttons to interact with the demo
