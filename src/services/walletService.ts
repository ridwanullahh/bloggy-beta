
import sdk from '../lib/sdk-instance';
import { Wallet, WalletTransaction, PaystackTransaction } from '../types/wallet';

export class WalletService {
  static async getOrCreateWallet(userId: string): Promise<Wallet> {
    const wallets = await sdk.get<Wallet>('wallets');
    let wallet = wallets.find(w => w.userId === userId);
    
    if (!wallet) {
      wallet = await sdk.insert<Wallet>('wallets', {
        userId,
        balance: 0,
        currency: 'NGN',
        status: 'active'
      });
    }
    
    return wallet;
  }

  static async getWalletBalance(userId: string): Promise<number> {
    const wallet = await this.getOrCreateWallet(userId);
    return wallet.balance;
  }

  static async creditWallet(
    walletId: string, 
    amount: number, 
    reference: string, 
    description: string,
    metadata?: Record<string, any>
  ): Promise<WalletTransaction> {
    const wallets = await sdk.get<Wallet>('wallets');
    const wallet = wallets.find(w => w.id === walletId);
    
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    // Create transaction record
    const transaction = await sdk.insert<WalletTransaction>('walletTransactions', {
      walletId,
      type: 'credit',
      amount,
      currency: wallet.currency,
      reference,
      description,
      status: 'completed',
      metadata
    });

    // Update wallet balance
    await sdk.update<Wallet>('wallets', walletId, {
      balance: wallet.balance + amount,
      updatedAt: new Date().toISOString()
    });

    return transaction;
  }

  static async debitWallet(
    walletId: string, 
    amount: number, 
    reference: string, 
    description: string,
    metadata?: Record<string, any>
  ): Promise<WalletTransaction> {
    const wallets = await sdk.get<Wallet>('wallets');
    const wallet = wallets.find(w => w.id === walletId);
    
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    if (wallet.balance < amount) {
      throw new Error('Insufficient wallet balance');
    }

    // Create transaction record
    const transaction = await sdk.insert<WalletTransaction>('walletTransactions', {
      walletId,
      type: 'debit',
      amount,
      currency: wallet.currency,
      reference,
      description,
      status: 'completed',
      metadata
    });

    // Update wallet balance
    await sdk.update<Wallet>('wallets', walletId, {
      balance: wallet.balance - amount,
      updatedAt: new Date().toISOString()
    });

    return transaction;
  }

  static async getWalletTransactions(walletId: string): Promise<WalletTransaction[]> {
    const transactions = await sdk.get<WalletTransaction>('walletTransactions');
    return transactions
      .filter(t => t.walletId === walletId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  static async initializePaystackPayment(
    userId: string, 
    amount: number, 
    email: string
  ): Promise<PaystackTransaction> {
    const wallet = await this.getOrCreateWallet(userId);
    const reference = `wallet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // This would normally call Paystack API to initialize payment
    // For now, we'll create a pending transaction record
    const transaction = await sdk.insert<PaystackTransaction>('paystackTransactions', {
      userId,
      walletId: wallet.id,
      reference,
      amount,
      currency: 'NGN',
      status: 'pending',
      paystackReference: reference,
      authorizationUrl: `https://checkout.paystack.com/${reference}` // This would be the actual Paystack URL
    });

    return transaction;
  }

  static async handlePaystackCallback(reference: string, status: 'success' | 'failed'): Promise<void> {
    const transactions = await sdk.get<PaystackTransaction>('paystackTransactions');
    const transaction = transactions.find(t => t.reference === reference);
    
    if (!transaction) {
      throw new Error('Transaction not found');
    }

    await sdk.update<PaystackTransaction>('paystackTransactions', transaction.id, {
      status
    });

    if (status === 'success') {
      await this.creditWallet(
        transaction.walletId,
        transaction.amount,
        reference,
        'Wallet funding via Paystack',
        { paystackReference: transaction.paystackReference }
      );
    }
  }
}
