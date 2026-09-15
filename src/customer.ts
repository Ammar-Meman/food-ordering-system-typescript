import type {
    Guest,
    Member,
    MembershipLevel
} from "./types"

export function createGuest(
    id: number,
    name: string,
    address: string,
    phone?: string | number
): Guest{
    return {
        id,
        name,
        address,
        phone,
        type: "guest",
    }
}

export function createMember(
    id: number,
    name: string,
    address: string,
    membershipLevel: MembershipLevel,
    phone?: string | number
): Member{
    let discountPercentage = 0;

    if(membershipLevel === "silver"){
        discountPercentage = 5;
    }else if(membershipLevel === "gold"){
        discountPercentage = 10;
    }else {
        discountPercentage = 15
    }

    return {
        id,
        name,
        address,
        phone,
        type: "member",
        membershipId: 1000 + id,
        discountPercentage,
        membershipLevel
    }
}