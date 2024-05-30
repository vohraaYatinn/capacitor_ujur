import React from 'react';
import Razorpay from 'razorpay';

const RazorpayComponent = () => {
  const handlePayment = async () => {
    const options = {
      key: 'YOUR_KEY_ID',
      amount: '5000', // Amount in paise
      currency: 'INR',
      name: 'Acme Corp',
      description: 'Test Transaction',
      image: 'https://example.com/logo.png',
      order_id: 'ORDER_ID', // This can be generated from your server
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '9999999999'
      },
      notes: {
        address: 'Razorpay Corporate Office'
      },
      theme: {
        color: '#F37254'
      }
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <button onClick={handlePayment}>Pay Now</button>
  );
};

export default RazorpayComponent;
