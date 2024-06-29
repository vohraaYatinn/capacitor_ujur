import React, { useEffect, useState } from 'react'
// import img1 from "../img/favorite/favorite-1.jpg"
import { useRouter } from '../hooks/use-router';
import { updateNavbar } from '../redux/reducers/functionalities.reducer';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import BackNavbar from './BackNavbar';
import { addReviewsPatient, fetchReviewsPatient } from '../urls/urls';
import useAxios from '../network/useAxios';
import { Alert } from "antd";

const WriteReview = () => {
   
   const router = useRouter();
   const { appointmentId } = useParams();
   const [formValues, setFormValues]= useState({
      appointmentId:appointmentId
   })
   const dispatch = useDispatch();
   const [rating, setRating] = useState(0);

   const handleRatingChange = (newRating) => {
      setFormValues((prev) => ({
         ...prev,
         rating: newRating,
       }))
   };
   const [message, setMessage] = useState({
      message: "",
      isShow: false,
    });

   const [reviewResponse, reviewError, reviewLoading, reviewFetch] = useAxios();
   const [reviewFetchResponse, reviewFetchError, reviewFetchLoading, reviewFetchFetch] = useAxios();
   const reviewSubmit = () => {
      reviewFetch(addReviewsPatient(formValues));
   }
   const fetchReview = () => {
      reviewFetchFetch(fetchReviewsPatient(formValues));
   }
   useEffect(()=>{
      fetchReview()
   },[])
   useEffect(()=>{
      if(reviewFetchResponse?.result == "success"){
         setFormValues({
            rating:reviewFetchResponse?.data?.reviews_star,
            comment:reviewFetchResponse?.data?.comment,
            appointmentId:appointmentId
         })
      }
   },[reviewFetchResponse])
   useEffect(()=>{
      if(reviewResponse?.result == "success"){
         setMessage({
            message: reviewResponse?.message,
            isShow: true,

          });
      }
   },[reviewResponse])

  return (
<>
<div class="review d-flex flex-column vh-100">
     <BackNavbar name="Write Review" />

         <div class="vh-100 my-auto overflow-auto p-3">
         {message.isShow && (
            <Alert
              style={{ marginBottom: "1rem" }}
              message={message?.message}
              type="success"
              showIcon
              closable
              onClose={() => {
                setMessage({
                  message: "",
                  isShow: false,
                });
              }}
            />
          )}
            <div class="text-center mb-5">
               <img src="img/favorite/favorite-4.jpg" alt="" class="img-fluid rounded-circle call-img mb-4 mt-4" />
               <div>
                  <h6 class="mb-2">How was your experience</h6>
                  <div class="d-flex align-items-center justify-content-center gap-2 fs-5 text-warning">
                   
                  <div>
      {[...Array(5)].map((_, index) => (
        <button
          key={index}
          onClick={() => handleRatingChange(index + 1)}
          style={{
            backgroundColor: index < formValues.rating ? 'gold' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '5px',
            marginRight: '5px',
          }}
        >
          <span class="mdi mdi-star" ></span>
        </button>
      ))}
    </div>
                  </div>
               </div>
            </div>
            <div>
               <div class="d-flex align-items-center justify-content-between mb-2">
                  <h6 class="m-0 fs-14">Write a comment (optional)</h6>
                  <p class="m-0 text-info">Max 250 word</p>
               </div>
               <form>
                  <textarea class="form-control text-muted p-3 fs-14" name="" id="" cols="30" rows="5" placeholder='Enter your text here...'
                  onChange={(e)=>{
                     setFormValues((prev) => ({
                        ...prev,
                        comment: e.target.value,
                      }))
                  }}
                  value={formValues?.comment}
                  ></textarea>
               </form>
            </div>
         </div>
         <div class="footer mt-auto p-3">
            <Link onClick={
               ()=>{
                  reviewSubmit()
               }
            } class="btn btn-info btn-lg w-100 rounded-4">Submit Review</Link>
         </div>
      </div>
      <div class="offcanvas offcanvas-bottom bg-light" tabindex="-1" id="offcanvasBottomRemove"
         aria-labelledby="offcanvasBottomRemoveLabel" style={{height:"40vh"}}>
         <div class="offcanvas-body">
            <div class="d-flex align-items-center gap-3 bg-white rounded-4 shadow-sm p-3 mb-3">
               {/* <img src={img1} alt="" class="img-fluid rounded-circle favorite-img" /> */}
               <div>
                  <h6 class="mb-1 fw-bold">Dr. Taylor Samaro</h6>
                  <div class="d-flex align-items-center gap-1 small">
                     <span class="mdi mdi-star text-warning"></span>
                     <span class="mdi mdi-star text-warning"></span>
                     <span class="mdi mdi-star text-warning"></span>
                     <span class="mdi mdi-star text-warning"></span>
                     <span class="mdi mdi-star text-warning"></span>
                     <span class="text-warning">4.9</span>
                      
                  </div>
                  <small class="text-muted">Dentist- Cumilla Medical Collage</small>
               </div>
               <div class="ms-auto">
                  <div class="bg-danger rounded-circle icon">
                     <span class="mdi mdi-cards-heart-outline mdi-18px text-white"></span>
                  </div>
               </div>
            </div>
            <h6 class="text-center text-info m-0">Remove from favorite?</h6>
         </div>
         <div class="offcanvas-footer d-flex gap-3">
            <a href="#" class="btn btn-outline-info btn-lg col" data-bs-dismiss="offcanvas"
               aria-label="Close">Cancel</a>
            <a href="#" class="btn btn-info btn-lg col" data-bs-dismiss="offcanvas" aria-label="Close">Yes,
            Remove</a>
         </div>
      </div>
</>
    )
}

export default WriteReview