import type {
    CustomerType,
    CartItem,
    PaymentType,
    BillResult
} from "./types";

import {calculateSubTotal} from "./cart"

export function calculateDiscount(
    customer: CustomerType,
    subtotal: number
): number {
    let discountPercentage = 0;

    if(customer.type === "member"){
        discountPercentage = customer.discountPercentage;
    }

    if(subtotal > 2000){
        discountPercentage += 5;
    }

    return subtotal*discountPercentage/100;
}

export function calculateTax(
    amountAfterDiscount: number
): number {
    return amountAfterDiscount * 5 / 100;
}

export function calculateFinalAmount(
    subtotal: number,
    discount: number,
    tax: number
): number {
    return subtotal - discount + tax;
}

export function generateBill(
    orderId: number,
    customer: CustomerType,
    cartItems: CartItem[],
    payment: PaymentType
): BillResult {

    if (cartItems.length === 0) {
        return {
            status: "error",
            message: "Cannot generate bill for an empty cart."
        };
    }

    const subtotal = calculateSubTotal(cartItems)

    const discount = calculateDiscount(
        customer,
        subtotal
    );

    const amountAfterDiscount = subtotal - discount;

    const tax = calculateTax(amountAfterDiscount);

    const finalAmount = calculateFinalAmount(
        subtotal,
        discount,
        tax
    );

    return {
        status: "success",
        orderId,
        customer,
        cartItems,
        subtotal,
        discount,
        tax,
        finalAmount,
        payment
    };
}