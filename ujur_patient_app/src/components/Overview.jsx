import React, { useEffect, useRef, useState } from 'react'
import { updateNavbar, userData } from '../redux/reducers/functionalities.reducer'
import { useDispatch, useSelector } from 'react-redux';
import { Popup } from 'antd-mobile';
import BackNavbar from './BackNavbar';
import { Link, useParams } from 'react-router-dom';
import { couponApply, fetchBookingConfirmationPagePrice, fetchBookingConfirmationStatus, uploadCustomerLabReport, paymentOrder, confirmPayment } from '../urls/urls';
import useAxios from '../network/useAxios';
import Moment from 'moment';
import { useRouter } from '../hooks/use-router';
import { Modal } from 'antd';
import { Alert } from "antd";
import PaymentComponent from './PaymentGateway';

const OverviewBooking = () => {
   const dispatch = useDispatch();
   const [visible1, setVisible1] = useState(false)
   const { bookingId } = useParams();
   const [doctorFees, setDoctorFees] = useState(false)
   const [bookingPrice, setBookingPrice] = useState(false)
   const [paymentMode, setPaymentMode] = useState("Online")
   const [afterBookingData, setAfterBookingData] = useState(false)
   const user = useSelector(userData)
   let [cancle, setCancle] = useState(false);
   const [reducePrice, setReducesPrice] = useState(0)
   const [couponResponse, couponError, couponLoading, couponFetch] = useAxios();
   const [couponApplied, setCouponApplied] = useState(false)
   const [orderDetails, setOrderDetails] = useState(false)
   const payButtonRef = useRef()
   const [data, setData] = useState(null);

   //useAxios
  const [
   fetchFinalPriceResponse,
   fetchFinalPriceError,
   fetchFinalPriceLoading,
   fetchFinalPriceFetch,
 ] = useAxios();
  const [
   paymentOrderResponse,
   paymentOrderError,
   paymentOrderLoading,
   paymentOrderFetch,
 ] = useAxios();
 const [
   bookingConfirmationResponse,
   bookingConfirmationError,
   bookingConfirmationLoading,
   bookingConfirmationFetch,
 ] = useAxios();
 const [
   confirmPaymentResponse,
   confirmPaymentError,
   confirmPaymentLoading,
   confirmPaymentFetch,
 ] = useAxios();
 const [couponAdd, setCouponAdd] = useState("")
 const router = useRouter();
 const handleCoupons = () => {
   if(couponApplied){
      setCouponApplied(false)
      setCouponAdd("")
      setCancle(false)
      setReducesPrice(0)
      setBookingPrice(doctorFees + 15)
   }
   else{
      couponFetch(couponApply({
         "coupon":couponAdd
      }))
   }
 }
useEffect(()=>{
   setCouponApplied(false)
   setCouponAdd("")
   setCancle(false)
   setReducesPrice(0)
   if(paymentMode == "Online" ){
      setBookingPrice(doctorFees + 15)
   }
   else if(paymentMode == "Offline"){
      setBookingPrice(doctorFees + 15)
   }
},[paymentMode])

   //functions
   const getBookingAmount = () => {
      fetchFinalPriceFetch(fetchBookingConfirmationPagePrice({bookingId:bookingId}));
   };
   const confirmBooking = () => {
      if(paymentMode){
      bookingConfirmationFetch(fetchBookingConfirmationStatus({bookingId:bookingId, paymentMode:paymentMode, bookingAmount : bookingPrice + bookingPrice*0.18 }))
   }
   }
   const paymentOrderFunction = () => {
      paymentOrderFetch(paymentOrder({amount:(bookingPrice + bookingPrice*0.18).toFixed(2)}))
   
   }

   useEffect(()=>{
      getBookingAmount()
   },[])
   useEffect(()=>{
      if(data){
         confirmPaymentFetch(confirmPayment({data:data, bookingId:bookingId}));
      }
   },[data])
     //useState
  const [message, setMessage] = useState({
   message: "",
   isShow: false,
   type:"success"
 });
 useEffect(()=>{
   if(couponResponse?.result == "success"){
      setMessage({
         message: couponResponse?.message,
         isShow: true,
         type:couponResponse?.percentage ? "success" : "error"
       });
       if(couponResponse?.percentage){
         setPaymentMode("Online")

         setCouponApplied(couponResponse?.percentage)
         const discount = (couponResponse?.percentage / 100) * (doctorFees);
         setReducesPrice(discount)
         const reducedPrice = (doctorFees - discount) + 15;
         setBookingPrice(reducedPrice)
       }
       else{
         setCouponApplied(false)
       }
       
      setCancle(false)
   }
 },[couponResponse])
   useEffect(() => {
      if (fetchFinalPriceResponse?.result == "success") {
         setDoctorFees(parseInt(fetchFinalPriceResponse?.price))
         setBookingPrice(parseInt(fetchFinalPriceResponse?.price)+15)
      // router.push(`/overview-booking/${fetchBookingResponse?.booking_id}`);
      }
   }, [fetchFinalPriceResponse]);
   useEffect(() => {
      if (bookingConfirmationResponse?.result == "success" && bookingConfirmationResponse?.booking_confirm ) {
         setAfterBookingData(bookingConfirmationResponse?.data)
         setVisible1(true)
      // router.push(`/overview-booking/${fetchBookingResponse?.booking_id}`);
      }
   }, [bookingConfirmationResponse]);
   useEffect(() => {
      if (confirmPaymentResponse?.result == "success" && confirmPaymentResponse?.data ) {
         confirmBooking()
      }
   }, [confirmPaymentResponse]);
   useEffect(() => {
      if (paymentOrderResponse?.result == "success") {
         setOrderDetails(paymentOrderResponse?.data)
      }
   }, [paymentOrderResponse]);
   useEffect(() => {
      if (orderDetails) {
         payButtonRef.current.click()
      }
   }, [orderDetails]);

  return (
<>
   <Popup
              visible={visible1}
              onMaskClick={() => {
               console.log("aaa")
               router.push(`/home`)              }}
              onClose={() => {
               console.log("aaa")
               router.push(`/home`)
            }}
              bodyStyle={{  paddingBottom: '50px'}}
            >
         <div className="offcanvas-body text-center d-flex align-items-center justify-content-center p-4">
            <div>
               <i className="bi bi-hand-thumbs-up text-primary display-1"></i>
               <h5 className="py-3">Thank You<br/>Your Appointment Created</h5>
               <p className="text-muted fs-6">You Booked an appointment with Dr. {afterBookingData?.doctor?.full_name} on {Moment(afterBookingData?.date_appointment).format('DD MMMM YYYY')}</p>
            </div>
         </div>
         <div className="offcanvas-footer">
            <Link to="/view-appointments" className="btn btn-info btn-lg w-100 rounded-4">Go to appointments</Link>
         </div>
            </Popup>
<div className="overview d-flex flex-column vh-100">
        <BackNavbar name={"Confirm Booking"}/>



         <div className="vh-100 my-auto overflow-auto p-3">
         {message.isShow && (
            <Alert
              style={{ marginBottom: "1rem" }}
              message={message?.message}
              type={message?.type}
              showIcon
              closable
              onClose={() => {
                setMessage({
                  message: "",
                  isShow: false,
                  type:"success"
                });
              }}
            />
          )}
            <form>
               <div className="mb-3">
                  <label for="exampleFormControlName" className="form-label mb-1 label-custom-boot">Patient info:</label>
                  <div className="input-group border bg-white rounded-3 py-1" id="exampleFormControlName">
                     <span className="input-group-text bg-transparent rounded-0 border-0" id="name"><i className="bi bi-person-circle text-muted"></i></span>
                     <input type="text" className="form-control bg-transparent rounded-0 border-0 px-0"
                        placeholder="Type your name" aria-label="Type your name" aria-describedby="name"
                        value={user?.full_name} disabled/>
                  </div>
               </div>
               <div className="bg-white rounded-4 p-3 mb-3 border">
                  <h6 className="pb-1 mb-2 fs-6">Payment details</h6>
                  <div className="pb-3">
                     
                     <div className="d-flex align-items-center justify-content-between text-muted mb-1">
                        <div>Consultation Fee (Inc. GST)</div>
                        <div>Rs {(doctorFees + doctorFees * 0.18).toFixed(2)} </div>
                     </div>

                     <div className="d-flex align-items-center justify-content-between text-muted">
                        <div>Booking Fee (Inc. GST)</div>
                        <div>Rs {15 + 15*0.18} </div>
                     </div>
                     {couponApplied &&
                     <div className="d-flex align-items-center justify-content-between text-muted">
                        <div>Discount Applied</div>
                        <div style={{color:"red"}}>- Rs {reducePrice.toFixed(2)}</div>
                     </div>}
                  </div>
                  <h6 className="d-flex align-items-center justify-content-between border-top pt-3 mb-0">
                     <div className="fw-normal">Total Payable</div>
                     <div className="fw-bold">Rs {(bookingPrice + bookingPrice*0.18).toFixed(2)}</div>
                  </h6>
               </div>

               <a onClick={()=>{
                  setCancle(true)
               }} className="link-dark">
                  <div className="bg-white border rounded-4 d-flex align-items-center justify-content-between p-3 mb-3">
                     {couponApplied != false?<p className="m-0">Promocode applied <span className='bold' style={{fontWeight:"800"}}>{couponAdd}</span>?</p>:<p className="m-0">Do you have promo code?</p>}
                     <i className="bi bi-chevron-right"></i>
                  </div>
               </a>
               <div className="bg-white rounded-4 p-3 border">
                  <h6 className="pb-1 mb-0 fs-6">How would you like to pay?</h6>
                  <div>

                     <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" 
                        checked={paymentMode=="Online" && true}
                              onClick={()=>{
                                 setPaymentMode("Online")
                                }}
                        /> 
                        <label className="form-check-label label-custom-boot" for="flexRadioDefault2"
         
                        >
                        Pay Online
                        </label>
                     </div>
                     <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" 
                                 checked={paymentMode=="Offline" && true}
                                 onClick={()=>{
                                    setPaymentMode("Offline")
                                   }}
                        />
                        <label className="form-check-label label-custom-boot" for="flexRadioDefault2">
                        Pay Offline
                        </label>
                        {
                           paymentMode == "Offline" &&   <p style={{
                              color:"red"
                           }}>Amount to be paid at hospital</p>
                        }
                      
                     </div>
                  </div>
               </div>
            </form>
         </div>
         <div className="footer mt-auto p-3">
     
            <PaymentComponent orderDetails={orderDetails} payButtonRef={payButtonRef} setData={setData}/>
            <a 
            onClick={()=>{
               if(paymentMode == "Online"){
                  paymentOrderFunction()

               }
               else{
                  confirmBooking()
               }
            }
            } 
            
            className="btn btn-info btn-lg w-100 rounded-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom"
               aria-controls="offcanvasBottom">Book Now</a>
         </div>
      </div>
      <Modal
          open={cancle}
          okText={couponApplied ? "Remove" : "Apply"}
          title="Apply Coupon"
          onOk={handleCoupons}
          
          onCancel={()=>{
            setCancle(false)
          }} 
        >
         
            <div className="modal-body">
              <div className="text-center">

                <div className="mt-4">
                  {couponApplied ? <p>Are you want to remove the applied coupon?</p> : 
                   <input placeholder="Enter your coupon code here" className='form-control mt-2'
                   value={couponAdd}
                   onChange={(e)=>{
                    setCouponAdd(e.target.value)
                   }}
                   />
                  }
                

                  
                </div>
              </div>
            </div>
          
        </Modal>
    
</>  )
}

export default OverviewBooking