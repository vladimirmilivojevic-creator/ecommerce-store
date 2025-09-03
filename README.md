# E-commerce Store (React + Node.js + MySQL)

A modern full-stack e-commerce application with React (frontend), Node.js/Express (backend), and MySQL (database).  
Includes authentication, product catalog, cart with persistence, checkout, profile management, and order history.

## Features
- User authentication (register, login, logout)
- Product listing with images
- Shopping cart persisted per user (saved in DB)
- Checkout with order creation
- Profile page (update phone/address, change password)
- Orders page (order history)
- Toast notifications and loading states
- Responsive UI

## Tech Stack
- Frontend: React, Axios, React Router, React-Toastify
- Backend: Node.js, Express, bcrypt, mysql2, dotenv, cors
- Database: MySQL (XAMPP/phpMyAdmin or MySQL CLI)

## Project Structure (copyable)
ecommerce-store/
  backend/
    server.js
    package.json
    .env            (NOT committed)
  frontend/
    src/
      components/
        Navbar.js
        Checkout.js
      pages/
        Shop.js
        Orders.js
        Profile.js
        Auth.js
      App.js
      App.css
    package.json
  ecommerce.sql      (DB schema + demo data)
  README.md
  .gitignore
  LICENSE

## Prerequisites
- Node.js (LTS) and npm
- MySQL (e.g., XAMPP with phpMyAdmin)
- Git

## Quick Start (Step-by-step)

1) Clone repository
```bash
git clone https://github.com/USERNAME/ecommerce-store.git
cd ecommerce-store
