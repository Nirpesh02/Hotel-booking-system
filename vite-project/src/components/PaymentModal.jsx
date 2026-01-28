import React, { useState } from 'react';
import { X, CreditCard, Lock, CheckCircle } from 'lucide-react';
import { formatPrice } from '../utils/helpers';

export const PaymentModal = ({
  isOpen,
  onClose,
  amount,
  hotelName,
  onPaymentSuccess
}) => {
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  if (!isOpen) return null;

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!cardNumber || !cardName || !expiry || !cvv) {
      alert('Please fill in all payment details');
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setProcessing(false);
    setSuccess(true);

    setTimeout(() => {
      onPaymentSuccess();
      onClose();
      setSuccess(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 bg-black/50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative transform transition-transform duration-300 scale-100 md:scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          disabled={processing}
        >
          <X className="h-6 w-6" />
        </button>

        {success ? (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>
            <p className="text-gray-600">Your booking for <strong>{hotelName}</strong> is confirmed.</p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <Lock className="h-5 w-5 text-green-600 mx-auto mb-1" />
              <h2 className="text-xl font-semibold mb-1">Secure Payment</h2>
              <p className="text-sm text-gray-600">{hotelName}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Amount</span>
                <span className="text-2xl font-bold text-primary">{formatPrice(amount)}</span>
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(
                        e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim()
                      )
                    }
                    maxLength={19}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    maxLength={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    maxLength={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-lg hover:from-primary/90 hover:to-accent/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold"
              >
                {processing ? 'Processing...' : `Pay ${formatPrice(amount)}`}
              </button>

              <p className="text-xs text-center text-gray-500 mt-2">
                This is a simulated payment gateway. No actual charges will be made.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
