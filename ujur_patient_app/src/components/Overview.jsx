import React, { useEffect, useState } from 'react'
import { updateNavbar, userData } from '../redux/reducers/functionalities.reducer'
import { useDispatch, useSelector } from 'react-redux';
import { Popup } from 'antd-mobile';
import BackNavbar from './BackNavbar';
import { useParams } from 'react-router-dom';
import { fetchBookingConfirmationPagePrice, fetchBookingConfirmationStatus } from '../urls/urls';
import useAxios from '../network/useAxios';
import Moment from 'moment';
import { useRouter } from '../hooks/use-router';

const OverviewBooking = () => {
   const dispatch = useDispatch();
   const [visible1, setVisible1] = useState(false)
   const { bookingId } = useParams();
   const [bookingPrice, setBookingPrice] = useState(false)
   const [paymentMode, setPaymentMode] = useState(false)
   const [afterBookingData, setAfterBookingData] = useState(false)
   const user = useSelector(userData)

   //useAxios
  const [
   fetchFinalPriceResponse,
   fetchFinalPriceError,
   fetchFinalPriceLoading,
   fetchFinalPriceFetch,
 ] = useAxios();
 const [
   bookingConfirmationResponse,
   bookingConfirmationError,
   bookingConfirmationLoading,
   bookingConfirmationFetch,
 ] = useAxios();
 const router = useRouter();

   //functions
   const getBookingAmount = () => {
      fetchFinalPriceFetch(fetchBookingConfirmationPagePrice({bookingId:bookingId}));
   };
   const confirmBooking = () => {
      if(paymentMode == "payathospital"){
      bookingConfirmationFetch(fetchBookingConfirmationStatus({bookingId:bookingId, paymentMode:paymentMode}))
   }
   }

   useEffect(()=>{
      getBookingAmount()
   },[])
   useEffect(() => {
      if (fetchFinalPriceResponse?.result == "success") {
         setBookingPrice(parseInt(fetchFinalPriceResponse?.price))
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
               <p className="text-muted fs-6">You Booked an appointment with dr. {afterBookingData?.doctor?.full_name} on {Moment(afterBookingData?.date_appointment).format('DD MMMM YYYY')}</p>
            </div>
         </div>
         <div className="offcanvas-footer">
            <a href="/customer-profile" className="btn btn-info btn-lg w-100 rounded-4">Go to my account</a>
         </div>
            </Popup>
<div className="overview d-flex flex-column vh-100">
        <BackNavbar name={"Confirm Booking"}/>



         <div className="vh-100 my-auto overflow-auto p-3">
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
                        <div>Consultation Fee (inc. GST)</div>
                        <div>Rs {bookingPrice}/-</div>
                     </div>

                     <div className="d-flex align-items-center justify-content-between text-muted">
                        <div>Booking Fee</div>
                        <div>Rs 40.00</div>
                     </div>
                  </div>
                  <h6 className="d-flex align-items-center justify-content-between border-top pt-3 mb-0">
                     <div className="fw-normal">Total Payable</div>
                     <div className="fw-bold">Rs {bookingPrice+40}/-</div>
                  </h6>
               </div>

               <a href="#" className="link-dark">
                  <div className="bg-white border rounded-4 d-flex align-items-center justify-content-between p-3 mb-3">
                     <p className="m-0">Do you have promo code?</p>
                     <i className="bi bi-chevron-right"></i>
                  </div>
               </a>
               <div className="bg-white rounded-4 p-3 border">
                  <h6 className="pb-1 mb-0 fs-6">How would you like to pay?</h6>
                  <div>

                     <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" 
                        checked={true}
                              onClick={()=>{
                                 setPaymentMode("upi")
                                }}
                        />
                        <label className="form-check-label label-custom-boot" for="flexRadioDefault2"
         
                        >
                        Pay Online
                        </label>
                     </div>
                     <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" 
                                 onClick={()=>{
                                    setPaymentMode("payathospital")
                                   }}
                        />
                        <label className="form-check-label label-custom-boot" for="flexRadioDefault2">
                        Pay at Hospital
                        </label>
                     </div>
                  </div>
               </div>
            </form>
         </div>
         <div className="footer mt-auto p-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
               <div>Total Payable <span className="text-muted">(Include GST)</span></div>
               <div className="text-primary">Rs 22.80/-</div>
            </div>
            <a onClick={()=>confirmBooking()} className="btn btn-info btn-lg w-100 rounded-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom"
               aria-controls="offcanvasBottom">Click Here to Pay</a>
         </div>
      </div>
    
</>  )
}

export default OverviewBooking