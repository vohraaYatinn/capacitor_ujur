import React, { useEffect, useState } from 'react'
import BackNavbar from './BackNavbar';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useAxios from '../network/useAxios';
import { fetchFavDoctorAddRemove, fetchSingleDoctorDetails } from '../urls/urls';
import { test_url_images } from '../config/environment';


const AboutDoctor = () => {
   const { doctorId } = useParams();
   const [doctorData, setDoctorData] = useState();
   const [isFav, setIsFav] = useState();

    //useAxios
   const [doctorsResponse, doctorsError, doctorsLoading, doctorsFetch] = useAxios();
   const [favDoctorActionResponse, favDoctorActionError, favDoctorActionLoading, favDoctorActionFetch] = useAxios();


    //functions
   const fetchNearbyDoctors = () => {
      doctorsFetch(fetchSingleDoctorDetails({doctorId:doctorId}));
    };
    const addFavDoctor = () => {
      favDoctorActionFetch(fetchFavDoctorAddRemove({doctorId:doctorId, patientId:1, action:isFav?"remove":"add"}));
      };

    //useEffects
    useEffect(()=>{
      if(doctorId){
         fetchNearbyDoctors()
      }
    },[doctorId])
    useEffect(()=>{
     if(doctorsResponse?.result == "success"){
      setDoctorData(doctorsResponse?.data)
      setIsFav(doctorsResponse?.fav)
     }
    },[doctorsResponse])
    useEffect(()=>{
     if(favDoctorActionResponse?.result == "success"){
      fetchNearbyDoctors()
     }
    },[favDoctorActionResponse])

   

  return (
    <>
    <div class="appointment d-flex flex-column vh-100">
   <BackNavbar name={"Doctor Profile"}/>
    <div class="vh-100 my-auto overflow-auto p-3">
       <div class="overflow-hidden rounded-4 shadow-sm mb-4">
          <div class="px-3 appointment-banner">
             <div class="d-flex align-items-center gap-3" >
                <img src={test_url_images+doctorData?.profile_picture} alt="" class="img-fluid appointment-doctor-img" />
                <div>
                   <h5 class="mb-1">Dr. {doctorData?.full_name}</h5>
                   <p class="text-muted mb-2">{doctorData?.education}</p>
                </div>
             </div>
          </div>
            <div class="p-3 bg-white" style={{display: "flex",  }}>
             <a  class="col rounded-0 p-3"
             onClick={()=>{
               addFavDoctor()
             }}
             >
                <span class={`mdi ${isFav ? "mdi-heart" : "mdi-heart-outline"} h4 m-0 text-primary`}></span>
             </a>
                   <div class="d-flex align-items-center gap-1 text-warning small">
                      <span class="mdi mdi-star"></span>
                      <span class="mdi mdi-star"></span>
                      <span class="mdi mdi-star"></span>
                      <span class="mdi mdi-star"></span>
                      <span class="mdi mdi-star"></span>
                      <span>{doctorData?.avg_reviews ? doctorData?.avg_reviews.toFixed(1) : "N/A"}</span>
                      <span class="text-primary">({doctorData?.total_reviews})</span>
                   </div>
            
          </div>
       </div>
       <div class="body">
          <div class="mb-4">
             <h5 class="mb-1 text-black">{doctorData?.specialization}</h5>
             <p class="text-muted mb-2">{doctorData?.hospital?.name}, {doctorData?.department?.name}</p>
             {/* <div class="d-flex align-items-center gap-1 text-warning">
                <span class="mdi mdi-star"></span>
                <span class="mdi mdi-star"></span>
                <span class="mdi mdi-star"></span>
                <span class="mdi mdi-star"></span>
                <span class="mdi mdi-star"></span>
                <span class="badge rounded-pill text-bg-warning">{doctorData?.avg_reviews ? doctorData?.avg_reviews.toFixed(1) : "N/A"}</span>
             </div> */}
          </div>
          <div class="mb-4">
             <h6>About</h6>
             <p class="text-muted">{doctorData?.bio}
             </p>
          </div>
          <div class="d-flex align-items-center justify-content-between border rounded-4 overflow-hidden bg-white shadow-sm">
             <div class="text-center col px-2 py-3 border-start border-end">
                <p class="mb-1">Experience</p>
                <h5 class="text-primary m-0 fw-bold">{doctorData?.experience} Years</h5>
             </div>
             <div class="text-center col px-2 py-3">
                <p class="mb-1">Review</p>
                <h5 class="text-primary m-0 fw-bold">{doctorData?.total_reviews}</h5>
             </div>
          </div>
       </div>
    </div>
    <div class="footer osahan-footer mt-auto p-3">
       <Link to={"/request-appointment/"+doctorId} class="btn btn-info btn-lg w-100 rounded-4">Book on Appointment</Link>
    </div>
 </div>
 </>
   )
}

export default AboutDoctor