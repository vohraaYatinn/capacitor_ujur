import React from 'react'
import { useRouter } from '../hooks/use-router';
import { updateNavbar } from '../redux/reducers/functionalities.reducer';
import { useDispatch } from 'react-redux';
import BottomNav from './BottomNav';

const NotificationsCustomer = () => {
   const router = useRouter();
   const dispatch = useDispatch();

  return (
<>
<div class="notification d-flex flex-column vh-100">
         <div class="d-flex align-items-center justify-content-between mb-auto p-3 bg-white shadow-sm osahan-header">
            <a onClick={()=>router.back()} class="text-dark bg-white shadow rounded-circle icon">
                  <span class="mdi mdi-arrow-left mdi-18px"></span></a>
            <h6 class="mb-0 ms-3 me-auto fw-bold">Notification</h6>
            <div class="d-flex align-items-center gap-3">
               <a class="toggle bg-white shadow rounded-circle icon d-flex align-items-center justify-content-center fs-5" 
                               onClick={()=>{
                                 dispatch(updateNavbar())
                               }}  
               ><i class="bi bi-list"></i></a>
            </div>
         </div>
         <div class="vh-100 my-auto overflow-auto body-fix-osahan-footer">
            <div>
               <h6 class="border-bottom fw-bold text-black p-3 mb-0">Today 16 Nov, 2023</h6>
               <div class="d-flex gap-3 bg-white border-bottom p-3">
                  <div>
                     <span class="bg-info-subtle rounded-pill notification-icon">
                     <span class="mdi mdi-calendar-month text-info"></span>
                     </span>
                  </div>
                  <div>
                     <p class="text-muted mb-2">Your have appointment with mahuba islam at 9:00 pm today</p>
                     <a href="#">Just Now</a>
                  </div>
               </div>
               <div class="d-flex gap-3 bg-white border-bottom p-3">
                  <div>
                     <span class="light-bg-orange rounded-pill notification-icon">
                     <span class="mdi mdi-account-circle-outline text-orange"></span>
                     </span>
                  </div>
                  <div>
                     <p class="text-muted mb-2">Comlete your profile to be better health consult. <a
                        href="#">Complete Profile</a></p>
                     <span class="text-primary">25 Minutes ago</span>
                  </div>
               </div>
               <div class="d-flex gap-3 bg-white border-bottom p-3">
                  <div>
                     <span class="light-bg-warning rounded-pill notification-icon">
                     <span class="mdi mdi-calendar-range text-warning"></span>
                     </span>
                  </div>
                  <div>
                     <p class="text-muted mb-2">Your have appointment with Kawsar ahmed at 2:00am tomorrow</p>
                     <a href="#">Just Now</a>
                  </div>
               </div>
               <div class="d-flex gap-3 bg-white border-bottom p-3">
                  <div>
                     <span class="bg-success-subtle rounded-pill notification-icon">
                     <span class="mdi mdi-calendar-check text-success"></span>
                     </span>
                  </div>
                  <div>
                     <p class="text-muted mb-2">Your have appointment with islam at 8:00pm sunday</p>
                     <a href="#">Just Now</a>
                  </div>
               </div>
            </div>
            <div>
               <h6 class="border-bottom fw-bold text-black p-3 mb-0">Preview</h6>
               <div class="d-flex gap-3 bg-white border-bottom p-3">
                  <div>
                     <span class="light-bg-orange rounded-pill notification-icon">
                     <span class="mdi mdi-calendar-multiple text-orange"></span>
                     </span>
                  </div>
                  <div>
                     <p class="text-muted mb-2">Your have appointment with mahuba islam at 9:00 pm 5 days ago</p>
                     <a href="#">Just Now</a>
                  </div>
               </div>
               
               <div class="d-flex gap-3 bg-white border-bottom p-3">
                  <div>
                     <span class="bg-info-subtle rounded-pill notification-icon">
                     <span class="mdi mdi-calendar-month text-info"></span>
                     </span>
                  </div>
                  <div>
                     <p class="text-muted mb-2">Your have appointment with mahuba islam at 11:00 pm 20 days ago</p>
                     <a href="#">Just Now</a>
                  </div>
               </div>
               <div class="d-flex gap-3 bg-white border-bottom p-3">
                  <div>
                     <span class="light-bg-warning rounded-pill notification-icon">
                     <span class="mdi mdi-calendar-range text-warning"></span>
                     </span>
                  </div>
                  <div>
                     <p class="text-muted mb-2">Your have appointment with Kawsar ahmed at 10:00am 27 days ago</p>
                     <a href="#">Just Now</a>
                  </div>
               </div>
               <div class="d-flex gap-3 bg-white border-bottom p-3 mb-3">
                  <div>
                     <span class="bg-success-subtle rounded-pill notification-icon">
                     <span class="mdi mdi-calendar-check text-success"></span>
                     </span>
                  </div>
                  <div>
                     <p class="text-muted mb-2">Your have appointment with islam at 8:00pm 30 days ago</p>
                     <a href="#">Just Now</a>
                  </div>
               </div>
            </div>
         </div>
         <div class="footer mt-auto p-3 fix-osahan-footer">
         <BottomNav path={"search"} />
         </div>
      </div>
</>  )
}

export default NotificationsCustomer