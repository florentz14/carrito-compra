// src/data/users.js

const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
  PREMIUM: 'premium'
};

const UserStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
};

const ThemeMode = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

const PrivacySetting = {
  PUBLIC: 'public',
  PRIVATE: 'private'
};

// Helper function to generate dates with timestamps
const createDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(12, 0, 0, 0); // Set to noon for consistency
  return date;
};

// Helper to create address objects with all required fields
const createAddress = (
  id,
  type, // 'billing', 'shipping', 'both'
  street,
  city,
  state,
  postalCode,
  country,
  isDefault,
  phone,
  recipientName,
  instructions
) => ({
  id,
  type,
  street,
  city,
  state,
  postalCode,
  country,
  isDefault,
  phone,
  recipientName,
  instructions,
  createdAt: createDate(30),
  updatedAt: createDate(1)
});

export const sampleUsers = [
  // Admin user
  {
    id: '1',
    email: 'admin@example.com',
    password: '$2a$10$XFDJ9q2Xv5z9v5v5v5v5vO9v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5', // hashed 'admin123'
    role: UserRole.ADMIN,
    firstName: 'Admin',
    lastName: 'User',
    status: UserStatus.ACTIVE,
    phone: '+1234567890',
    addresses: [
      createAddress(
        'addr_1',
        'billing',
        '123 Admin St',
        'Tech City',
        'CA',
        '94105',
        'USA',
        true,
        '+1234567890',
        'Admin User',
        'Leave at front desk'
      )
    ],
    preferences: {
      language: 'en',
      currency: 'USD',
      timezone: 'America/Los_Angeles',
      notifications: {
        email: true,
        sms: true,
        push: true,
        marketing: false
      },
      emailNotifications: {
        orderUpdates: true,
        promotions: false,
        newsletter: false,
        accountActivity: true
      },
      theme: ThemeMode.DARK,
      privacy: {
        profileVisibility: PrivacySetting.PRIVATE,
        dataSharing: false
      },
      darkMode: true
    },
    emailVerified: true,
    phoneVerified: true,
    lastLogin: new Date(),
    twoFactorEnabled: true,
    createdAt: createDate(365),
    updatedAt: new Date()
  },
  
  // Regular user
  {
    id: '2',
    email: 'jane.doe@example.com',
    password: '$2a$10$XFDJ9q2Xv5z9v5v5v5v5vO9v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5', // hashed 'user1234'
    role: UserRole.USER,
    firstName: 'Jane',
    lastName: 'Doe',
    status: UserStatus.ACTIVE,
    phone: '+1987654321',
    addresses: [
      createAddress(
        'addr_2',
        'shipping',
        '456 User Ave',
        'Metropolis',
        'NY',
        '10001',
        'USA',
        true,
        '+1987654321',
        'Jane Doe'
      ),
      createAddress(
        'addr_3',
        'billing',
        '789 Billing Rd',
        'Metropolis',
        'NY',
        '10001',
        'USA',
        false,
        '+1987654321',
        'Jane Doe',
        'Billing department'
      )
    ],
    preferences: {
      language: 'en',
      currency: 'USD',
      timezone: 'America/New_York',
      notifications: {
        email: true,
        sms: false,
        push: true,
        marketing: true
      },
      emailNotifications: {
        orderUpdates: true,
        promotions: true,
        newsletter: true,
        accountActivity: true
      },
      theme: ThemeMode.LIGHT,
      privacy: {
        profileVisibility: PrivacySetting.PUBLIC,
        dataSharing: true
      },
      darkMode: false
    },
    emailVerified: true,
    phoneVerified: true,
    lastLogin: createDate(2),
    twoFactorEnabled: false,
    createdAt: createDate(120),
    updatedAt: createDate(2)
  },
  
  // Inactive user
  {
    id: '3',
    email: 'inactive.user@example.com',
    password: '$2a$10$XFDJ9q2Xv5z9v5v5v5v5vO9v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5', // hashed 'inactive123'
    role: UserRole.USER,
    firstName: 'Inactive',
    lastName: 'User',
    status: UserStatus.INACTIVE,
    phone: '+1555123456',
    addresses: [],
    preferences: {
      language: 'es',
      currency: 'USD',
      timezone: 'America/Mexico_City',
      notifications: {
        email: false,
        sms: false,
        push: false,
        marketing: false
      },
      emailNotifications: {
        orderUpdates: false,
        promotions: false,
        newsletter: false,
        accountActivity: false
      },
      theme: ThemeMode.SYSTEM,
      privacy: {
        profileVisibility: PrivacySetting.PRIVATE,
        dataSharing: false
      },
      darkMode: true
    },
    emailVerified: false,
    phoneVerified: false,
    lastLogin: createDate(120),
    twoFactorEnabled: false,
    createdAt: createDate(200),
    updatedAt: createDate(150)
  },
  
  // Premium user with subscription
  {
    id: '4',
    email: 'premium.user@example.com',
    password: '$2a$10$XFDJ9q2Xv5z9v5v5v5v5vO9v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5', // hashed 'premium123'
    role: UserRole.PREMIUM,
    firstName: 'Premium',
    lastName: 'Member',
    status: UserStatus.ACTIVE,
    phone: '+441234567890',
    addresses: [
      createAddress(
        'addr_4',
        'both',
        '321 Premium Ln',
        'London',
        '',
        'SW1A 1AA',
        'UK',
        true,
        '+441234567890',
        'Premium Member',
        'Ring bell twice'
      )
    ],
    preferences: {
      language: 'en',
      currency: 'GBP',
      timezone: 'Europe/London',
      notifications: {
        email: true,
        sms: true,
        push: true,
        marketing: true
      },
      emailNotifications: {
        orderUpdates: true,
        promotions: true,
        newsletter: true,
        accountActivity: true
      },
      theme: ThemeMode.SYSTEM,
      privacy: {
        profileVisibility: PrivacySetting.PUBLIC,
        dataSharing: true
      },
      darkMode: 'system'
    },
    emailVerified: true,
    phoneVerified: true,
    lastLogin: createDate(1),
    twoFactorEnabled: true,
    subscription: {
      plan: 'premium',
      status: UserStatus.ACTIVE,
      startDate: createDate(30),
      endDate: createDate(-330), // 1 year from start
      paymentMethod: 'credit_card',
      autoRenew: true,
      lastBillingDate: createDate(30),
      nextBillingDate: createDate(-300)
    },
    createdAt: createDate(400),
    updatedAt: createDate(1)
  }
];
