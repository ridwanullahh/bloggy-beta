
export interface Wallet {
  id: string;
  uid: string;
  userId: string;
  balance: number;
  currency: string;
  status: 'active' | 'suspended' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface WalletTransaction {
  id: string;
  uid: string;
  walletId: string;
  type: 'credit' | 'debit';
  amount: number;
  currency: string;
  reference: string;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface PaystackTransaction {
  id: string;
  uid: string;
  userId: string;
  walletId: string;
  reference: string;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
  paystackReference: string;
  authorizationUrl?: string;
  createdAt: string;
}
