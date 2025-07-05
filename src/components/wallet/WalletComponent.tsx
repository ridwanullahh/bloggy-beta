
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { useToast } from '../../hooks/use-toast';
import { useAuth } from '../../contexts/AuthContext';
import { WalletService } from '../../services/walletService';
import { Wallet, WalletTransaction } from '../../types/wallet';
import { Wallet as WalletIcon, Plus, Minus, RefreshCw, CreditCard } from 'lucide-react';

export const WalletComponent: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [fundAmount, setFundAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadWalletData();
    }
  }, [user]);

  const loadWalletData = async () => {
    if (!user) return;
    
    try {
      const walletData = await WalletService.getOrCreateWallet(user.id!);
      setWallet(walletData);
      
      const transactionsData = await WalletService.getWalletTransactions(walletData.id);
      setTransactions(transactionsData);
    } catch (error) {
      console.error('Error loading wallet data:', error);
      toast({
        title: "Error",
        description: "Failed to load wallet data.",
        variant: "destructive",
      });
    }
  };

  const handleFundWallet = async () => {
    if (!user || !wallet || !fundAmount) return;
    
    const amount = parseFloat(fundAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const transaction = await WalletService.initializePaystackPayment(
        user.id!,
        amount,
        user.email
      );
      
      // In a real implementation, redirect to Paystack checkout
      window.open(transaction.authorizationUrl, '_blank');
      
      toast({
        title: "Payment Initialized",
        description: "Complete the payment to fund your wallet.",
      });
    } catch (error) {
      console.error('Error funding wallet:', error);
      toast({
        title: "Error",
        description: "Failed to initialize payment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Wallet Balance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <WalletIcon className="w-5 h-5 mr-2" />
            Wallet Balance
          </CardTitle>
          <CardDescription>
            Your current wallet balance and funding options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold text-green-600">
                {wallet ? formatCurrency(wallet.balance) : '₦0.00'}
              </div>
              <div className="text-sm text-gray-500">Available Balance</div>
            </div>
            <Button onClick={loadWalletData} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fundAmount">Fund Amount (₦)</Label>
              <Input
                id="fundAmount"
                type="number"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                placeholder="Enter amount"
                min="100"
                step="100"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleFundWallet}
                disabled={loading || !fundAmount}
                className="w-full"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                {loading ? 'Processing...' : 'Fund Wallet'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            Recent wallet transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No transactions yet
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.slice(0, 10).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'credit' ? (
                        <Plus className="w-4 h-4 text-green-600" />
                      ) : (
                        <Minus className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </div>
                    <Badge variant={
                      transaction.status === 'completed' ? 'default' : 
                      transaction.status === 'pending' ? 'secondary' : 'destructive'
                    }>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletComponent;
