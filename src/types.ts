export type FoodCategory = 
          "pizza"
        | "burger"
        | "drink" 
        | "dessert";

export interface FoodItem {
    id: number,
    name: string,
    category: FoodCategory,
    price: number,
    isAvailable: boolean
}

export interface Customer {
    id: number,
    name: string,
    phone?: string | number | undefined,
    address: string,
}

export interface Guest extends Customer{
    type: "guest"
}

export type MembershipLevel = 
      "silver"
    | "gold"
    | "platinum"

export interface Member extends Customer {
    type:"member",
    membershipId: number,
    discountPercentage: number,
    membershipLevel: MembershipLevel
}

export type CustomerType = Guest | Member

export interface OrderInformation {
    quantity: number;
    specialInstruction?: string;
}

export type CartItem = FoodItem & OrderInformation;

export type OrderStatus =
    "pending"
   | "confirmed"
   | "preparing"
   | "delivered"
   | "cancelled"

export interface CashPayment {
    method: "cash";
    receivedAmount: number
}

export interface CardPayment {
    method: "card";
    last4digit: string | number
}

export interface UpiPayment {
    method: "upi";
    transactionId: string | number
}

export type PaymentType = CashPayment | CardPayment | UpiPayment

export type BillResult =
    | {
        status: "success";
        orderId: number;
        customer: CustomerType;
        cartItems: CartItem[];
        subtotal: number;
        discount: number;
        tax: number;
        finalAmount: number;
        payment: PaymentType;
    }
    | {
        status: "error";
        message: string;
};
