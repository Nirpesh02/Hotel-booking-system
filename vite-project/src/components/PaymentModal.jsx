import React, { useState } from "react";
import { X, CreditCard, Lock, CheckCircle } from "lucide-react";
import { formatPrice } from "../utils/helpers";

export const PaymentModal = ({
  isOpen,
  onClose,
  amount,
  hotelName,
  onPaymentSuccess,
}) => {
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  if (!isOpen) return null;

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!cardNumber || !cardName || !expiry || !cvv) {
      alert("Please fill all payment details!");
      return;
    }

    setProcessing(true);

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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-xl animate-fadeIn">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          disabled={processing}
        >
          <X className="h-6 w-6" />
        </button>

        {success ? (
          <div className="text-center py-10">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold">Payment Successful 🎉</h2>
            <p className="text-gray-600 mt-2">
              Your booking is confirmed!
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center items-center gap-2 text-green-600 text-sm">
                <Lock className="h-4 w-4" />
                Secure Payment Gateway
              </div>

              <h2 className="text-2xl font-bold mt-2">
                Complete Booking
              </h2>
              <p className="text-gray-500 text-sm">{hotelName}</p>
            </div>

            {/* Amount */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl p-4 mb-6 flex justify-between">
              <span>Total Amount</span>
              <span className="text-xl font-bold">
                {formatPrice(amount)}
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handlePayment} className="space-y-4">

              {/* Card Number */}
              <div>
                <label className="text-sm font-medium">
                  Card Number
                </label>
                <div className="relative mt-1">
                  <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    maxLength={19}
                    onChange={(e) =>
                      setCardNumber(
                        e.target.value
                          .replace(/\s/g, "")
                          .replace(/(\d{4})/g, "$1 ")
                          .trim()
                      )
                    }
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              {/* Card Name */}
              <div>
                <label className="text-sm font-medium">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Expiry + CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">
                    Expiry
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    maxLength={5}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    CVV
                  </label>
                  <input
                    type="password"
                    placeholder="123"
                    value={cvv}
                    maxLength={3}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              {/* Pay Button */}
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-bold hover:opacity-90 transition"
              >
                {processing ? "Processing..." : `Pay ${formatPrice(amount)}`}
              </button>

              <p className="text-xs text-gray-400 text-center">
                * This is a demo payment system only.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
