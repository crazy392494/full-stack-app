import { User, Role, Issue, IssueStatus, LocationType, Product, Order, OrderStatus } from './types';

export const MOCK_USERS: User[] = [
    { id: 'user-1', name: 'John Doe', email: 'john.doe@example.com', role: Role.USER },
    { id: 'user-2', name: 'Jane Smith', email: 'jane.smith@example.com', role: Role.USER },
];

export const MOCK_EMPLOYEES: User[] = [
    { id: 'emp-1', name: 'Mike Johnson', email: 'mike.j@fixit.com', role: Role.EMPLOYEE },
];

export const ISSUE_CATEGORIES = {
    "Electrical": ["Power Outage", "Flickering Lights", "Exposed Wires", "Faulty Outlet"],
    "Plumbing": ["Leaking Pipe", "Clogged Drain", "No Water", "Sewer Backup"],
    "Waste Management": ["Overflowing Bin", "Illegal Dumping", "Missed Collection"],
    "Structural": ["Pothole", "Cracked Sidewalk", "Damaged Fence", "Broken Signage"],
    "IT/Connectivity": ["No Wi-Fi", "Slow Internet", "Network Down", "Faulty Equipment"],
    "General Maintenance": ["Graffiti", "Overgrown Landscaping", "Broken Bench", "Other"],
};


export const MOCK_ISSUES: Issue[] = [
    {
        id: 'issue-1',
        title: 'Broken Streetlight on Main St',
        description: 'The streetlight outside 123 Main St has been flickering for days and is now completely out.',
        location: '123 Main St, Anytown',
        locationType: LocationType.URBAN,
        status: IssueStatus.PENDING,
        reportedById: 'user-1',
        category: 'Electrical',
        subcategory: 'Flickering Lights',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
        id: 'issue-2',
        title: 'Garbage pileup near the park',
        description: 'An overflowing bin at the entrance of Central Park has not been cleared for over a week.',
        location: 'Central Park Entrance, Anytown',
        locationType: LocationType.URBAN,
        status: IssueStatus.IN_PROGRESS,
        reportedById: 'user-2',
        category: 'Waste Management',
        subcategory: 'Overflowing Bin',
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        notes: "Scheduled for pickup tomorrow morning. Team has been notified.",
    },
    {
        id: 'issue-3',
        title: 'No Wi-Fi in the library',
        description: 'The public Wi-Fi at the downtown library has been down since this morning.',
        location: 'Downtown Library, Anytown',
        locationType: LocationType.RURAL,
        status: IssueStatus.RESOLVED,
        reportedById: 'user-1',
        category: 'IT/Connectivity',
        subcategory: 'No Wi-Fi',
        createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
        notes: "Router was reset and firmware updated. Connection is now stable.",
    },
];

export const MOCK_PRODUCTS: Product[] = [
    {
        id: 'prod-1',
        name: 'LED Bulb (10W)',
        description: 'Energy-efficient and long-lasting LED bulb, suitable for streetlights and outdoor use.',
        category: 'Electrical',
        price: 199,
        stock: 50,
    },
    {
        id: 'prod-2',
        name: 'High-Speed Wi-Fi Router',
        description: 'Dual-band Wi-Fi router for fast and reliable internet connectivity in public spaces.',
        category: 'IT/Connectivity',
        price: 1499,
        stock: 25,
    },
    {
        id: 'prod-3',
        name: 'Heavy-Duty Garbage Bags (50 pack)',
        description: 'Large, durable garbage bags for waste management and cleanups.',
        category: 'Waste Management',
        price: 399,
        stock: 100,
    },
     {
        id: 'prod-4',
        name: 'Pothole Repair Kit',
        description: 'All-in-one kit for quick and easy pothole repairs on asphalt surfaces.',
        category: 'Structural',
        price: 899,
        stock: 30,
    },
    {
        id: 'prod-5',
        name: 'PVC Pipe (10 ft)',
        description: 'Durable PVC pipe for various plumbing repairs and installations.',
        category: 'Plumbing',
        price: 250,
        stock: 80,
    },
    {
        id: 'prod-6',
        name: 'Electrical Wire (Copper, 5m)',
        description: 'High-conductivity copper wire for electrical installations and repairs.',
        category: 'Electrical',
        price: 450,
        stock: 150,
    },
    {
        id: 'prod-7',
        name: 'Ethernet Cable (10m)',
        description: 'Cat 6 Ethernet cable for stable, high-speed network connections.',
        category: 'IT/Connectivity',
        price: 350,
        stock: 75,
    },
];

export const DELIVERY_COSTS = {
    [LocationType.URBAN]: 50,
    [LocationType.RURAL]: 30,
};

export const MOCK_ORDERS: Order[] = [
    {
        id: 'order-1',
        userId: 'user-1',
        items: [
            { ...MOCK_PRODUCTS[2], quantity: 1 },
            { ...MOCK_PRODUCTS[3], quantity: 1 },
        ],
        subtotal: 1298,
        deliveryCost: 50,
        total: 1348,
        createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
        status: OrderStatus.DELIVERED,
    },
    {
        id: 'order-2',
        userId: 'user-1',
        items: [{ ...MOCK_PRODUCTS[1], quantity: 1 }],
        subtotal: 1499,
        deliveryCost: 30,
        total: 1529,
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        status: OrderStatus.SHIPPED,
    }
];