import { foodItems } from "./data";

import {
    addToCart,
    removeFromCart,
    updateQuantity
} from "./cart";

import {
    createGuest,
    createMember
} from "./customer";

import {
    generateBill
} from "./billing";

import {
    processPayment
} from "./payment";

import {
    updateOrderStatus
} from "./order";

import type {
    CartItem,
    CustomerType,
    PaymentType,
    OrderStatus
} from "./types";

let cart: CartItem[] = [];

// Safely access items with indexed checks
const pizza = foodItems[0];
const burger = foodItems[1];

if (pizza) {
    cart = addToCart(
        cart,
        pizza,
        2
    );
}

if (burger) {
    cart = addToCart(
        cart,
        burger,
        1
    );
}

console.log("\n===== INITIAL CART =====");

cart.forEach(item => {
    console.log(
        `${item.name} x ${item.quantity} = ₹${
            item.price * item.quantity
        }`
    );
});

// -------------------------
// UPDATE QUANTITY
// -------------------------

cart = updateQuantity(
    cart,
    1,
    3
);

console.log("\n===== UPDATED CART (Quantity updated to 3) =====");

cart.forEach(item => {
    console.log(
        `${item.name} x ${item.quantity} = ₹${
            item.price * item.quantity
        }`
    );
});

// -------------------------
// CUSTOMER
// -------------------------

const customer: CustomerType =
    createMember(
        1,
        "Ammar",
        "Chhapi",
        "gold",
        9876543210
    );

// -------------------------
// PAYMENT
// -------------------------

const payment: PaymentType = {
    method: "cash",
    receivedAmount: 2000
};

// -------------------------
// BILL
// -------------------------

const bill = generateBill(
    1001,
    customer,
    cart,
    payment
);

// -------------------------
// ORDER STATUS
// -------------------------

let orderStatus: OrderStatus = "pending";

console.log("\n===== BILL =====");

if (bill.status === "success") {

    console.log("Order ID:", bill.orderId);
    console.log("Customer:", bill.customer.name);
    console.log("Subtotal:", `₹${bill.subtotal.toFixed(2)}`);
    console.log("Discount:", `₹${bill.discount.toFixed(2)}`);
    console.log("GST:", `₹${bill.tax.toFixed(2)}`);
    console.log(
        "Final Amount:",
        `₹${bill.finalAmount.toFixed(2)}`
    );

    // Process payment
    const paymentResult =
        processPayment(
            bill.payment,
            bill.finalAmount
        );

    console.log(
        paymentResult.message
    );

    if (paymentResult.success) {
        orderStatus = updateOrderStatus(
            orderStatus,
            "confirmed"
        );
    } else {
        orderStatus = updateOrderStatus(
            orderStatus,
            "cancelled"
        );
    }

} else {

    console.log(
        "Error:",
        bill.message
    );
    orderStatus = updateOrderStatus(
        orderStatus,
        "cancelled"
    );
}

console.log(
    "\nOrder Status:",
    orderStatus
);