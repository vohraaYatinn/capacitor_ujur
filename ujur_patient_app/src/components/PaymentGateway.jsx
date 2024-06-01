import React, {useState, useEffect} from 'react';
import { Checkout } from 'capacitor-razorpay';
import axios from 'axios';

const PaymentComponent = ({orderDetails, payButtonRef, setData}) => {
  const [alert, setAlert] = React.useState({ showAlert: false, message: '' });
  const [error, setError] = useState(null);

  const payWithRazorpay = async () => {
    const options = {
      key: 'rzp_test_mVj5vQrJLrX9Mm',
      amount: orderDetails?.amount,
      description: 'Great offers',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      order_id: orderDetails?.id, 
      currency: 'INR',
      name: 'Prileo Technologies Private Limited!',
      theme: {
        color: '#3399cc'
      }
    };
    
    try {
      let data = await Checkout.open(options);
      const dataToSend = JSON.stringify(data)
      if(dataToSend?.error){

      }
      else{
        setData(dataToSend)

      }
    } catch (error) {
      let errorObj = JSON.parse(error['code']);
      alert(`Error: ${errorObj.description}`);
      alert(`Code: ${errorObj.code}`);
      alert(`Reason: ${errorObj.reason}`);
      alert(`Step: ${errorObj.step}`);
      alert(`Source: ${errorObj.source}`);
      alert(`Order ID: ${errorObj.metadata.order_id}`);
      alert(`Payment ID: ${errorObj.metadata.payment_id}`);
    }
  };

  const presentAlert = (response) => {
    console.log("message" + response);
    setAlert({ showAlert: true, message: response });
  };

  return (
    <div style={{display:"none"}}>
      <button onClick={payWithRazorpay} ref={payButtonRef}>Pay with Razorpay</button>
    </div>
  );
};

export default PaymentComponent;
