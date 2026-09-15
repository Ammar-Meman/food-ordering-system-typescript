import type { OrderStatus } from "./types";

export function updateOrderStatus(
    currentStatus: OrderStatus,
    newStatus: OrderStatus
): OrderStatus {
    return newStatus;
}