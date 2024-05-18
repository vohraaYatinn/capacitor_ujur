import React, { useEffect, useState } from 'react'
import { useRouter } from '../hooks/use-router';
import { updateNavbar } from '../redux/reducers/functionalities.reducer';
import { useDispatch } from 'react-redux';
import BottomNav from './BottomNav';
import useAxios from '../network/useAxios';
import { fetchFavDoctor, fetchFavDoctorAddRemove } from '../urls/urls';
import { test_url_images } from '../config/environment';
import { Popup } from 'antd-mobile';
import transition from '../transition';

const FavDoctor = () => {
   const router = useRouter();
   const dispatch = useDispatch();
   const [ favDoctors, setFavDoctors ] = useState();
   const [sselectedDoctor, setSelectedDoctor] = useState()
   
   //useAxios
   const [favDoctorResponse, favDoctorError, favDoctorLoading, favDoctorFetch] = useAxios();
   const [favDoctorActionResponse, favDoctorActionError, favDoctorActionLoading, favDoctorActionFetch] = useAxios();
   const [visible1, setVisible1] = useState(false)

   //functions
  const fetchFavDoctorsFunc = () => {
   favDoctorFetch(fetchFavDoctor({patientId:1}));
   };
  const removeFavDoctor = () => {
   favDoctorActionFetch(fetchFavDoctorAddRemove({doctorId:sselectedDoctor?.doctor?.id, patientId:1, action:"remove"}));
   };


   //useEffects
   useEffect(()=>{
     if(1){
      fetchFavDoctorsFunc()
     }
   },[1])
   useEffect(()=>{
      if(favDoctorResponse?.result == "success"){
         setFavDoctors(favDoctorResponse?.data)
      }
    },[favDoctorResponse])
    useEffect(()=>{
      if(favDoctorActionResponse?.result == "success"){
         setVisible1(false)
         fetchFavDoctorsFunc()
      }
    },[favDoctorActionResponse])

  return (
<>
<div class="favorite-doctor d-flex flex-column vh-100" style={{paddingBottom: "40px"}}>
         <div class="d-flex align-items-center justify-content-between mb-auto p-3 bg-white shadow-sm osahan-header">
            <a onClick={()=>router.back()} class="text-dark bg-white shadow rounded-circle icon">
                  <span class="mdi mdi-arrow-left mdi-18px"></span></a>
            <h6 class="mb-0 ms-3 me-auto fw-bold">Favorite Doctor</h6>
            <div class="d-flex align-items-center gap-3">
               <a class="toggle d-flex align-items-center justify-content-center fs-5 bg-white shadow rounded-circle icon" 
                     onClick={()=>{
                        dispatch(updateNavbar())
                      }} 
               ><i class="bi bi-list"></i></a>
            </div>
         </div>
         <div class="vh-100 my-auto overflow-auto body-fix-osahan-footer">
            {favDoctors?.map((each)=>{return(
        <div class="d-flex align-items-center gap-3 bg-white p-3 my-1 shadow-sm">
        <img src={test_url_images + each?.doctor?.profile_picture} alt="" class="img-fluid rounded-circle favorite-img" />
        <div>
           <h6 class="mb-1 fs-14 fw-bold">Dr. {each?.doctor?.full_name}</h6>
           <div class="d-flex align-items-center gap-1 small">
              <span class="mdi mdi-star text-warning"></span>
              <span class="mdi mdi-star text-warning"></span>
              <span class="mdi mdi-star text-warning"></span>
              <span class="mdi mdi-star text-warning"></span>
              <span class="mdi mdi-star text-warning"></span>
              <span class="text-warning">4.9</span>
              <span>(5,380)</span>
           </div>
           <small class="text-muted">{each?.doctor?.hospital?.name}</small>
        </div>
        <div class="ms-auto">
           <a >
              <div class="lighter-bg-primary-opacity rounded-circle icon"
              onClick={()=>{
               setSelectedDoctor(each)
               setVisible1(true)
              }}
              >
                 <span class="mdi mdi-cards-heart-outline mdi-18px text-primary"></span>
              </div>
           </a>
        </div>
     </div>
            )})}
    
         </div>
        <BottomNav path="fav" />
      </div>
      <Popup
              visible={visible1}
              onMaskClick={() => {
               setVisible1(false)
                          }}
              onClose={() => {
               setVisible1(false)

            }}
            >
      
         <div class="offcanvas-body">
            <div class="d-flex align-items-center gap-3 bg-white rounded-4 shadow-sm p-3 mb-3">
               <img src={test_url_images + sselectedDoctor?.doctor?.profile_picture} alt="" class="img-fluid rounded-circle favorite-img" />
               <div>
                  <h6 class="mb-1 fw-bold">Dr. {sselectedDoctor?.doctor?.full_name}</h6>
                  <div class="d-flex align-items-center gap-1 small">
                     <span class="mdi mdi-star text-warning"></span>
                     <span class="mdi mdi-star text-warning"></span>
                     <span class="mdi mdi-star text-warning"></span>
                     <span class="mdi mdi-star text-warning"></span>
                     <span class="mdi mdi-star text-warning"></span>
                     <span class="text-warning">4.9</span>
                     <span>(5,380)</span>
                  </div>
                  <small class="text-muted">{sselectedDoctor?.doctor?.education}- {sselectedDoctor?.doctor?.hospital?.name}</small>
               </div>
               <div class="ms-auto">
                  <div class="bg-danger rounded-circle icon">
                     <span class="mdi mdi-cards-heart-outline mdi-18px text-white"></span>
                  </div>
               </div>
            </div>
            <h6 class="text-center text-info m-0"
            onClick={()=>{}}
            >Remove from favorite?</h6>
         </div>
         <div class="offcanvas-footer d-flex gap-3">
            <a  class="btn btn-outline-info btn-lg col" data-bs-dismiss="offcanvas"
               aria-label="Close"
               onClick={()=>{
                  setVisible1(false)

               }}
               >Cancel</a>
            <a  class="btn btn-info btn-lg col" data-bs-dismiss="offcanvas" aria-label="Close"
            onClick={()=>{
               removeFavDoctor()
            }}
            >Yes,
            Remove</a>
         </div>

      </Popup>
</>
    )
}

export default transition(FavDoctor)