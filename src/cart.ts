import type {CartItem, FoodItem} from './types'

export function calculateItemTotal(
    cartItem: CartItem
): number {
    return cartItem.price * cartItem.quantity;
}

export function calculateSubTotal(
    cartItems: CartItem[]
): number {
    return cartItems.reduce((total, cartItem) => {
        return total + calculateItemTotal(cartItem);
    }, 0);
}

export function addToCart(
    cart: CartItem[],
    foodItem: FoodItem,
    quantity: number,
    specialInstruction?: string
): CartItem[] {
    if (!foodItem.isAvailable || quantity <= 0) {
        return cart;
    }

    const existingItem = cart.find(
        item => item.id === foodItem.id
    );

    if (existingItem) {
        return cart.map(item => {
            if (item.id === foodItem.id) {
                return {
                    ...item,
                    quantity: item.quantity + quantity,
                    ...(specialInstruction ? { specialInstruction } : {})
                };
            }

            return item;
        });
    }

    const newCartItem: CartItem = {
        ...foodItem,
        quantity,
        ...(specialInstruction ? { specialInstruction } : {})
    };

    return [
        ...cart,
        newCartItem
    ];
}

export function removeFromCart(
    cart: CartItem[],
    foodId: number
): CartItem[] {
    return cart.filter(
        item => item.id !== foodId
    );
}

export function updateQuantity(
    cart: CartItem[],
    foodId: number,
    quantity: number
): CartItem[] {
    if (quantity <= 0) {
        return removeFromCart(cart, foodId);
    }

    return cart.map(item => {
        if (item.id === foodId) {
            return {
                ...item,
                quantity
            };
        }

        return item;
    });
}