export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Address {
  id: string;
  label: string;
  line1: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface Profile extends AuthUser {
  phone?: string;
  addresses: Address[];
}

export interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault?: boolean;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  number: string;
  status: "processing" | "shipped" | "delivered" | "canceled";
  total: number;
  placedAt: string;
  items: OrderItem[];
}

export interface Settings {
  language: string;
  currency: string;
  theme: "default" | "metal";
  marketing: boolean;
}

interface StoredUser extends AuthUser {
  password: string;
}

const USERS_KEY = "mock-auth-users";

const makeId = () => `user-${Math.random().toString(36).slice(2, 10)}`;

const loadUsers = (): StoredUser[] => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
};

const saveUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const delay = (ms: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const sampleAddresses: Address[] = [
  {
    id: "addr-1",
    label: "Home",
    line1: "1313 Mockingbird Lane",
    city: "Ravenwood",
    country: "US",
    postalCode: "90210",
  },
  {
    id: "addr-2",
    label: "Studio",
    line1: "666 Crypt Ave",
    city: "Nightfall",
    country: "US",
    postalCode: "10101",
  },
];

const samplePaymentMethods: PaymentMethod[] = [
  {
    id: "pm-1",
    brand: "VISA",
    last4: "4242",
    expMonth: 12,
    expYear: 2027,
    isDefault: true,
  },
  { id: "pm-2", brand: "MC", last4: "4444", expMonth: 8, expYear: 2026 },
];

const sampleOrders: Order[] = [
  {
    id: "ord-1",
    number: "TSH-2024-0001",
    status: "delivered",
    total: 129.99,
    placedAt: "2024-11-12T10:00:00Z",
    items: [
      { name: "Classic Blue Tee", quantity: 1, price: 29.99 },
      { name: "Minimalist Monochrome", quantity: 2, price: 50 },
    ],
  },
  {
    id: "ord-2",
    number: "TSH-2024-0002",
    status: "processing",
    total: 64.99,
    placedAt: "2024-12-02T14:30:00Z",
    items: [{ name: "Luxury Limited Edition", quantity: 1, price: 64.99 }],
  },
];

const defaultSettings: Settings = {
  language: "en",
  currency: "USD",
  theme: "default",
  marketing: true,
};

export const register = async (
  email: string,
  password: string,
  name: string
): Promise<{ user: AuthUser; accessToken: string; refreshToken: string }> => {
  await delay();
  const users = loadUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("Email already registered");
  }

  const newUser: StoredUser = {
    id: makeId(),
    email,
    name,
    password,
  };

  users.push(newUser);
  saveUsers(users);

  return {
    user: { id: newUser.id, email: newUser.email, name: newUser.name },
    accessToken: `access-${newUser.id}`,
    refreshToken: `refresh-${newUser.id}`,
  };
};

export const login = async (
  email: string,
  password: string
): Promise<{ user: AuthUser; accessToken: string; refreshToken: string }> => {
  await delay();
  const users = loadUsers();
  const user = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) {
    throw new Error("Invalid credentials");
  }

  return {
    user: { id: user.id, email: user.email, name: user.name },
    accessToken: `access-${user.id}`,
    refreshToken: `refresh-${user.id}`,
  };
};

export const getProfile = async (userId: string): Promise<Profile> => {
  await delay();
  const users = loadUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) {
    throw new Error("User not found");
  }
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    addresses: sampleAddresses,
    phone: "+1 555 0100",
  };
};

export const getOrders = async (userId: string): Promise<Order[]> => {
  await delay();
  if (!userId) throw new Error("Unauthorized");
  return sampleOrders;
};

export const getPaymentMethods = async (
  userId: string
): Promise<PaymentMethod[]> => {
  await delay();
  if (!userId) throw new Error("Unauthorized");
  return samplePaymentMethods;
};

export const getSettings = async (userId: string): Promise<Settings> => {
  await delay();
  if (!userId) throw new Error("Unauthorized");
  return defaultSettings;
};

export const updateProfile = async (
  profile: Partial<Profile>
): Promise<Profile> => {
  await delay();
  const users = loadUsers();
  const existing = users.find((u) => u.id === profile.id);
  if (existing) {
    if (profile.name) existing.name = profile.name;
    if (profile.email) existing.email = profile.email;
    saveUsers(users);
  }
  return {
    id: existing?.id || profile.id || "",
    email: profile.email || existing?.email || "",
    name: profile.name || existing?.name || "",
    addresses: sampleAddresses,
    phone: profile.phone || "+1 555 0100",
  };
};

export const updateSettings = async (settings: Settings): Promise<Settings> => {
  await delay();
  return settings;
};

export const logout = async () => {
  await delay(100);
  return true;
};
