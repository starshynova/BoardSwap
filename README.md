# BoardSwap

You can try this app by visiting [BoardSwap](https://c50-group-b-c5689f722e00.herokuapp.com/)

## Overview

**BoardSwap** is a web application for buying and selling board games. Users can create accounts, list their games for sale, browse items posted by others, and place orders. The project is built using **React**, **Node.js**, **MongoDB**, **MUI**.
Each user has a personal profile, can manage their listed products, add games to their shopping cart, and complete purchases.

## Usage

1. **User Authentication**
    The user registers with the name,  email and password. Upon login, the user receives a JWT token that is stored in localStorage.
2. **Main Features**
    - Create and edit listings for selling products
    - View product cards with photo, description, price, and condition (new/like new/used)
    - Add products to the shopping cart
    - Place and view orders.
    - See a final page with order details.
    - Secure storage of user and product data.

## Database Structure

1. **items**

```
_id: { type: ObjectId, required: true },
title: { type: String, required: true },
price: { type: Number, required: true, min: 0 },
type: { type: String, required: true, enum: ["Puzzle", "Board Game"] },
condition: {
  type: String,
  required: true,
  enum: ["New", "Like New", "Used"],
},
photo_name: { type: String, required: false, default: "" },
photo: {
  type: String,
  required: false,
  default:
    "https://res.cloudinary.com/dogm5xki5/image/upload/v1742978122/qfsn7oqaob87rxurw5xq.jpg",
},
description: { type: String, required: false, maxLength: 300 },
created_date: { type: Date, default: Date.now },
seller_id: {
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref: "users",
},
status: { type: String, required: true, enum: ["Available", "Sold"] }
```

2. **users**

```
_id: { type: ObjectId, required: true },
name: { type: String, minLength: 2, required: true },
email: { type: String, required: true, unique: true },
password: { type: String, required: true, minlength: 8 },
post_code: { type: String, minLength: 6, maxLength: 6, required: false },
city: { type: String, minLength: 2, maxLength: 15, required: false },
created_date: { type: Date, default: Date.now },
items: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "items",
  },
],
orders: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
]
```

3. **orders**

```
{
_id: { type: ObjectId, required: true },
user_id: {
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref: "users",
},
items: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "items",
    required: true,
  },
],
total_price: {
  type: Number,
  required: true,
},
address: {
  type: String,
  required: true,
},
city: {
  type: String,
  required: true,
},
email: {
  type: String,
  required: true,
},
firstName: {
  type: String,
  required: true,
},
lastName: {
  type: String,
  required: true,
},
postcode: {
  type: String,
  required: true,
},
}
```

  


