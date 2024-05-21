import React, { useEffect, useState } from 'react'
// import img1 from "../img/favorite/favorite-1.jpg"
import { useRouter } from '../hooks/use-router';
import { updateNavbar } from '../redux/reducers/functionalities.reducer';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import BottomNav from './BottomNav';
import useAxios from '../network/useAxios';
import { fetchReviews, fetchReviewsHospitals } from '../urls/urls';
import moment from 'moment';
import { Radio } from 'antd';

const DoctorReviews = () => {
   const router = useRouter();
   const dispatch = useDispatch();
   const [reviewData, setReviewData] = useState([])
   const [doctorsResponse, doctorsError, doctorsLoading, doctorsFetch] = useAxios();
   
   const fetchNearbyDoctors = () => {
      doctorsFetch(fetchReviews());
    };
   
   const fetchNearbyHospitals = () => {
      doctorsFetch(fetchReviewsHospitals());
    };
    const [value, setValue4] = useState("doctors")
    const onChange4 = ({ target: { value } }) => {
      console.log('radio4 checked', value);
      setValue4(value);
    };
   useEffect(()=>{
      if(value == "doctors"){
         fetchNearbyDoctors()
      }
      else{
         fetchNearbyHospitals()
      }
       },[value])
       useEffect(()=>{
         if(doctorsResponse?.result == "success"){
            setReviewData(doctorsResponse?.data)
         }
        },[doctorsResponse])
        const optionsWithDisabled = [
         {
           label: 'Doctors',
           value: 'doctors',
         },
         {
           label: 'Hospitals',
           value: 'hospitals',
         },

       ];
  return (
<>
<div class="favorite-doctor d-flex flex-column vh-100">
         <div class="d-flex align-items-center justify-content-between mb-auto p-3 bg-white shadow-sm osahan-header">
            <a onClick={()=>router.back()} class="text-dark bg-white shadow rounded-circle icon">
                  <span class="mdi mdi-arrow-left mdi-18px"></span></a>
            <h6 class="mb-0 ms-3 me-auto fw-bold">My Reviews</h6>
            <div class="d-flex align-items-center gap-3">
               <a class="toggle d-flex align-items-center justify-content-center fs-5 bg-white shadow rounded-circle icon" 
                     onClick={()=>{
                        dispatch(updateNavbar())
                      }} 
               ><i class="bi bi-list"></i></a>
            </div>
         </div>
         <div class="vh-100 my-auto overflow-auto body-fix-osahan-footer">
         <Radio.Group
        options={optionsWithDisabled}
        onChange={onChange4}
        value={value}
        size='large'
        optionType="button"
        buttonStyle="solid"
        style={{marginTop:"0.5rem", marginBottom:"0.5rem"}}
      />
            {reviewData.map((each)=>{
return(
   <Link className="link-dark">
   <div className="d-flex align-items-center gap-3 bg-white border-bottom shadow-sm p-3">

      {/* <img src={img1} alt="" className="img-fluid rounded-4 favorite-img" /> */}
      <div className="small">
 
         <h6 className="mb-1 fs-14">
            {value == "doctors" ? "Dr." +each?.doctor?.full_name : each?.hospital?.name}
            
            
            </h6>
         <div className="d-flex align-items-center gap-1 small">
           {Array(each?.reviews_star).fill(null).map(()=>{
            return(
               <span className="mdi mdi-star text-warning"></span>

            )
           })}
             
         </div>
         {value == "doctors" && <><small className="text-muted">{each?.doctor?.hospital?.name}</small>  <br/></>}
        
         <small className="text-muted">{moment(each?.created_at).format('DD MMMM YYYY')}</small>

      </div>
   </div>
</Link>
)
            })}
        

         </div>
         {/* <div class="footer mt-auto p-3 fix-osahan-footer">
            <div class="d-flex align-items-center justify-content-between rounded-4 shadow overflow-hidden bottom-nav-main">
               <a href="home.html" class="col footer-bottom-nav active">
               <span class="mdi mdi-home-variant-outline mdi-24px"></span>
               <span>Home</span>
               </a>
               <a href="search.html" class="col footer-bottom-nav">
               <span class="mdi mdi-magnify mdi-24px"></span>
               <span>Search</span>
               </a>
               <a href="video.html" class="col footer-bottom-nav">
               <span class="mdi mdi-video-outline mdi-24px"></span>
               <span>Video</span>
               </a>
               <a href="message.html" class="col footer-bottom-nav">
               <span class="mdi mdi-message-processing-outline mdi-24px"></span>
               <span>Chat</span>
               </a>
               <a href="my-profile.html" class="col footer-bottom-nav">
               <span class="mdi mdi-account-outline mdi-24px"></span>
               <span>Profile</span>
               </a>
            </div>
         </div> */}
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
      <BottomNav/>
</>
    )
}

export default DoctorReviews