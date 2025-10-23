export enum Role {
    USER = 'user',
    EMPLOYEE = 'employee',
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    profileImageUrl?: string;
}

export enum IssueStatus {
    PENDING = 'Pending',
    IN_PROGRESS = 'In Progress',
    RESOLVED = 'Resolved',
}

export enum LocationType {
    URBAN = 'Urban',
    RURAL = 'Rural',
}

export interface Issue {
    id: string;
    title: string;
    description: string;
    location: string;
    locationType: LocationType;
    imageUrl?: string;
    repairedImageUrl?: string;
    status: IssueStatus;
    reportedById: string;
    category: string;
    subcategory?: string;
    createdAt: string;
    notes?: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    imageUrl?: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export enum OrderStatus {
    PROCESSING = 'Processing',
    SHIPPED = 'Shipped',
    DELIVERED = 'Delivered',
}

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    subtotal: number;
    deliveryCost: number;
    total: number;
    createdAt: string;
    status: OrderStatus;
}