import type { PaymentType } from "./types";

type PaymentResult =
    | {
        success: true;
        message: string;
    }
    | {
        success: false;
        message: string;
    };

export function processPayment(
    payment: PaymentType,
    amount: number
): PaymentResult {
    switch (payment.method) {
        case "cash":
            if (payment.receivedAmount < amount) {
                return {
                    success: false,
                    message: `Insufficient cash received. Required: ₹${amount.toFixed(2)}, Received: ₹${payment.receivedAmount.toFixed(2)}`
                };
            }

            const change = (payment.receivedAmount - amount).toFixed(2);
            return {
                success: true,
                message: `Payment successful. Change: ₹${change}`
            };

        case "card":
            return {
                success: true,
                message: `Card payment of ₹${amount.toFixed(2)} successful. Card ending ${payment.last4digit}`
            };

        case "upi":
            return {
                success: true,
                message: `UPI payment of ₹${amount.toFixed(2)} successful. Transaction ID: ${payment.transactionId}`
            };

        default:
            return {
                success: false,
                message: "Invalid or unsupported payment method."
            };
    }
}