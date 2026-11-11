# Milaana Organic Milk Market

Build a professional, modern, mobile-friendly e-commerce website for my new milk-selling startup.

The website should allow customers to learn about our milk quality, explore available milk varieties and dairy products, check current availability, and order milk online.

Use a premium, fresh dairy-inspired design with a green-and-white colour palette, natural photography, clean typography, attractive product cards, and simple navigation.

Use the temporary brand name "Fresh Dairy" until I provide my actual business name.

1. Homepage

Create a professional navigation bar with logo, Home, Our Products, Milk Quality, About Us, Contact, Login, and Shopping Cart.

Design a beautiful hero section with fresh milk imagery and a "Shop Fresh Milk" button.

Display featured products, milk quality information, why customers should choose our brand, and contact information.

Include a section explaining our sourcing and quality-control process without making unverified claims.

Add clear calls to action for ordering milk.

2. Product catalogue

Create product cards with:

Product name and image.

Milk variety, such as cow milk or buffalo milk, where applicable.

Available pack sizes, such as 500 ml and 1 litre.

Price in Indian rupees (₹).

Fat and SNF information where verified.

Processing and storage information.

Current availability and stock status.

Quantity selector and Add to Cart button.

Allow the owner to add other dairy products later.

Use sample products for the initial design, clearly treating their prices, quality values, and availability as demonstration data until real information is entered.

3. Milk quality page

Create a dedicated page to explain:

Milk sourcing and collection.

Quality testing and hygiene procedures.

Fat and SNF definitions.

Pasteurization and storage, where applicable.

Nutritional information and product-specific details.

Relevant certifications and food safety information.

Never invent laboratory results, certification numbers, health benefits, or quality guarantees. Allow the administrator to enter verified information.

4. Shopping cart and checkout

Allow customers to add, remove, and change product quantities.

Calculate the subtotal, delivery charges, applicable taxes, and final total correctly.

Collect customer name, phone number, delivery address, and delivery instructions.

Allow customers to select an available delivery date or time slot.

Validate product stock and delivery availability before accepting orders.

Display a clear order summary before checkout.

Generate a unique order number and confirmation page.

Support cash on delivery and provide an option for UPI or online payments once properly integrated.

Do not show an order as paid unless the payment provider has verified the transaction.

5. Customer accounts

Provide secure registration and login.

Allow customers to view previous orders and current order status.

Allow customers to manage their addresses.

Provide order cancellation functionality according to the configured business policy.

6. Milk subscription system

Design the application so that recurring orders can be enabled later.
Support daily or weekly delivery preferences, selected quantity, start date, pause or resume requests, and subscription status.
Do not charge customers automatically until a recurring payment system has been properly configured.

7. Admin dashboard

Create a protected dashboard for the business owner to:

Add, edit, and deactivate products.

Upload product images.

Set prices and pack sizes.

Update daily stock and product availability.

Enter verified quality information.

View and manage incoming orders.

Update order statuses such as Pending, Confirmed, Packed, Out for Delivery, Delivered, and Cancelled.

Manage delivery slots and serviceable areas.

View customers, subscription requests, sales summaries, and order history.

Only authorized administrators should access this dashboard.

8. Database and security

Use Supabase for PostgreSQL database storage and authentication.

Create appropriate tables for products, customer profiles, addresses, orders, order items, inventory, delivery slots, and subscriptions if needed.

Implement secure database access policies, server-side validation, and reliable stock management. Customers must not be able to access other customers' private information or change product prices, order totals, payment statuses, or administrative data.

Save orders in the database rather than only in browser storage. Handle simultaneous orders safely to avoid overselling available stock.

9. Responsive design

Make all pages work properly on mobile phones, tablets, and desktop computers. Ensure buttons, product images, forms, navigation, and the checkout experience are easy to use.

10. Development process

First build the complete homepage, product catalogue, product details, and shopping cart using sample data.

Then help me connect Supabase, authentication, inventory management, checkout, order tracking, and the admin dashboard.

Explain each setup step in beginner-friendly language. Identify any required account credentials or integrations and guide me through configuring them securely.

Build a functional website, not just a static design. Clearly identify any features that still require configuration or testing before real customers can use them.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://milaana-organic-milk-market.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0d1f3c7e-a9e6-5a49-95de-b66ad59a9af1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
