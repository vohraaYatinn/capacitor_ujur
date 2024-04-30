import React, { useEffect, useState } from 'react'
import { useRouter } from '../hooks/use-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateNavbar } from '../redux/reducers/functionalities.reducer';
import BottomNav from './BottomNav';
import { fetchAppointments } from '../urls/urls';
import useAxios from '../network/useAxios';
import moment from 'moment';
import { test_url_images } from '../config/environment';

const ViewAppointments = () => {
   const router = useRouter();
   const dispatch = useDispatch();
   const [addNav, setAddNAv] = useState(0)
   const [appointments, setAppointment] = useState([])

   //useAxios
   const [fetchAppointmentResponse, fetchAppointmentError, fetchAppointmentLoading, fetchAppointmentFetch] = useAxios();

      //functions
  const fetchAppointmentsFunc = () => {
   let appointmentType = ""
   if(addNav == 0){
      appointmentType = "upcoming"
   }
   else if(addNav == 1){
      appointmentType = "completed"

   }
   fetchAppointmentFetch(fetchAppointments({patientId:1, appointmentType:appointmentType}));
   };

      //useEffects
      useEffect(()=>{
         if(1){
            fetchAppointmentsFunc()
         }
       },[1, addNav])
       useEffect(()=>{
          if(fetchAppointmentResponse?.result == "success"){
            console.log(fetchAppointmentResponse?.data)
            setAppointment(fetchAppointmentResponse?.data)
          }
        },[fetchAppointmentResponse])

  return (
<>
<div class="my-appointment d-flex flex-column vh-100" style={{paddingBottom: "40px"}}>
         <div class="d-flex align-items-center justify-content-between mb-auto p-3 bg-white shadow-sm border-bottom osahan-header">
            <a onClick={()=>router.back()} class="text-dark bg-white shadow rounded-circle icon">
                  <span class="mdi mdi-arrow-left mdi-18px"></span></a>
            <h6 class="mb-0 ms-3 me-auto fw-bold">My Appointment</h6>
            <div class="d-flex align-items-center gap-3">
               <a class="toggle d-flex align-items-center justify-content-center fs-5 bg-white shadow rounded-circle icon" 
                  onClick={()=>{
                     dispatch(updateNavbar())
                   }} 
               ><i class="bi bi-list"></i></a>
            </div>
         </div>
         <div class="vh-100 my-auto overflow-auto body-fix-osahan-footer">
            <ul class="nav doctor-profile-tabs mb-2 shadow-sm" id="pills-tab" role="tablist">
               <li class="nav-item col" role="presentation">
                  <button class={`nav-link w-100 ${addNav == 0 && "active"}`}
                         onClick={()=>{
                           setAddNAv(0)
                         }}
                  id="pills-upcoming-tab" data-bs-toggle="pill"
                     data-bs-target="#pills-upcoming" type="button" role="tab" aria-controls="pills-upcoming"
                     aria-selected="true">Upcoming</button>
               </li>
               <li class="nav-item col" role="presentation">
               <button class={`nav-link w-100 ${addNav == 1 && "active"}`}
               onClick={()=>{
                  setAddNAv(1)

               }}
               id="pills-past-tab" data-bs-toggle="pill"
                     data-bs-target="#pills-past" type="button" role="tab" aria-controls="pills-past"
                     aria-selected="false">Completed</button>
               </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
               <div class="tab-pane fade show active" id="pills-upcoming" role="tabpanel"
                  aria-labelledby="pills-upcoming-tab" tabindex="0">
                     {appointments.map((each)=>{
                        return (
                           <Link to={`/appointment-details/${each.id}`} class="link-dark">
                           <div class="bg-white d-flex align-items-center gap-3 p-3 mb-1 shadow-sm">
                              <img src={test_url_images + each?.doctor?.profile_picture} alt="" class="img-fluid rounded-4 voice-img" />
                              <div>
                                 <h6 class="mb-1">Dr. {each?.doctor?.full_name}</h6>
                                 <p class="text-muted mb-2">{each?.doctor?.education}</p>
                                 <p class="text-muted m-0"><span class="mdi mdi-calendar-month text-primary me-1"></span>
                                 {moment(each?.date_appointment).format('DD-MM-YYYY')}

                                 </p>
                              </div>
                              <div class="ms-auto">
                                 <div class="d-flex justify-content-end">
                                 </div>
                                {addNav==0 &&
                                                                 <span class="badge bg-success-subtle text-success fw-normal rounded-pill px-2">UPCOMING</span>

                                }

                              </div>
                           </div>
                        </Link>
                        )
                     })
                     
                     }


               </div>
               <div class="tab-pane fade" id="pills-past" role="tabpanel" aria-labelledby="pills-past-tab"
                  tabindex="0">
                  <a href="#" class="link-dark">
                     <div class="bg-white d-flex align-items-center gap-3 p-3 mb-1 shadow-sm">
                        <img src="img/video/available-doctor-4.jpg" alt="" class="img-fluid rounded-4 voice-img" />
                        <div>
                           <h6 class="mb-1">Dr. Mahububa Islam</h6>
                           <p class="text-muted mb-2">Gynecology</p>
                           <p class="text-muted m-0"><span class="mdi mdi-calendar-month text-primary me-1"></span>20 Nov
                              2023
                           </p>
                        </div>
                        <div class="ms-auto">
                           <div class="d-flex justify-content-end">
                              {/* <div class="bg-info-subtle rounded-circle icon mb-3">
                                 <span class="mdi mdi-phone-outline mdi-18px text-info"></span>
                              </div> */}
                           </div>
                           <span class="badge bg-success-subtle text-success fw-normal rounded-pill px-2">COMPLETE</span>
                        </div>
                     </div>
                  </a>
                  <a href="#" class="link-dark">
                     <div class="bg-white d-flex align-items-center gap-3 p-3 mb-1 shadow-sm">
                        <img src="img/video/available-doctor-5.jpg" alt="" class="img-fluid rounded-4 voice-img" />
                        <div>
                           <h6 class="mb-1">Dr. Morgan</h6>
                           <p class="text-muted mb-2">Dentist</p>
                           <p class="text-muted m-0"><span class="mdi mdi-calendar-month text-primary me-1"></span>18 Nov
                              2023
                           </p>
                        </div>
                        <div class="ms-auto">
                           <div class="d-flex justify-content-end">
                              {/* <div class="bg-info-subtle rounded-circle icon mb-3">
                                 <span class="mdi mdi-phone-outline mdi-18px text-info"></span>
                              </div> */}
                           </div>
                           <span class="badge bg-success-subtle text-success fw-normal rounded-pill px-2">COMPLETE</span>
                        </div>
                     </div>
                  </a>
                  <a href="#" class="link-dark">
                     <div class="bg-white d-flex align-items-center gap-3 p-3 mb-1 shadow-sm">
                        <img src="img/home/top-doctor-2.jpg" alt="" class="img-fluid rounded-4 voice-img" />
                        <div>
                           <h6 class="mb-1">Dr. Leabow</h6>
                           <p class="text-muted mb-2">Gynecology</p>
                           <p class="text-muted m-0"><span class="mdi mdi-calendar-month text-primary me-1"></span>15 Nov
                              2023
                           </p>
                        </div>
                        <div class="ms-auto">
                           <div class="d-flex justify-content-end">
                              {/* <div class="bg-info-subtle rounded-circle icon mb-3">
                                 <span class="mdi mdi-phone-outline mdi-18px text-info"></span>
                              </div> */}
                           </div>
                           <span class="badge bg-success-subtle text-success fw-normal rounded-pill px-2">COMPLETE</span>
                        </div>
                     </div>
                  </a>
                  <a href="#" class="link-dark">
                     <div class="bg-white d-flex align-items-center gap-3 p-3 mb-1 shadow-sm">
                        <img src="img/home/top-doctor-1.jpg" alt="" class="img-fluid rounded-4 voice-img" />
                        <div>
                           <h6 class="mb-1">Dr. Leabow</h6>
                           <p class="text-muted mb-2">Gynecology</p>
                           <p class="text-muted m-0"><span class="mdi mdi-calendar-month text-primary me-1"></span>10 Nov
                              2023
                           </p>
                        </div>
                        <div class="ms-auto">
                           <div class="d-flex justify-content-end">
                              {/* <div class="bg-info-subtle rounded-circle icon mb-3">
                                 <span class="mdi mdi-phone-outline mdi-18px text-info"></span>
                              </div> */}
                           </div>
                           <span class="badge bg-success-subtle text-success fw-normal rounded-pill px-2">COMPLETE</span>
                        </div>
                     </div>
                  </a>
               </div>
            </div>
         </div>
        <BottomNav path="appointments"/>
      </div>
</>  )
}

export default ViewAppointments