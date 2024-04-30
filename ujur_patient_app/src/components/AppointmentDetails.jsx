import React, { useEffect, useState } from 'react'
import { useRouter } from '../hooks/use-router';
import BackNavbar from './BackNavbar';
import BottomNav from './BottomNav';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'antd-mobile';
import useAxios from '../network/useAxios';
import { fetchAppointmentDetails } from '../urls/urls';
import moment from 'moment';
import { test_url_images } from '../config/environment';
// import convertToPDF from '../utils/convertToPdf';
import PrescriptionHistory from './PrescriptionHistory';
import { Modal } from 'antd';

const AppointmentDetails = () => {
   const router = useRouter();
   const { appointmentId } = useParams();
   const [ appointmentDetails, setAppointmentDetails ] = useState();
   const [ slotDetails, setSlotDetails ] = useState();
   const [ slotNumber, setTotalSlots ] = useState();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const showModal = () => {
     setIsModalOpen(true);
   };
   const handleOk = () => {
     setIsModalOpen(false);
   };
   const handleCancel = () => {
     setIsModalOpen(false);
   };
   const [htmlData, setHtmlData] = useState();
    //useAxios
    const [appointmentResponse, appointmentError, appointmentLoading, appointmentFetch] = useAxios();

    //functions
   const fetchLatestAppointment = () => {
      appointmentFetch(fetchAppointmentDetails({appointmentId:appointmentId}));
    };

    //useEffects
    useEffect(()=>{
      if(appointmentId){
         fetchLatestAppointment()
      }
    },[appointmentId])
    useEffect(()=>{
     if(appointmentResponse?.result == "success"){
      console.log(appointmentResponse?.data)
      setAppointmentDetails(appointmentResponse?.data)
      setSlotDetails(appointmentResponse?.slot)
      setTotalSlots(appointmentResponse?.count)
      console.log(appointmentResponse?.data)
     }
    },[appointmentResponse])

  return (
<>
<div class="appointment-upcoming d-flex flex-column vh-100">
<BackNavbar name={"Appointment Details"}/>
         <div class="vh-100 my-auto overflow-auto body-fix-osahan-footer">
            <div class="p-3 bg-white shadow-sm">
               <div class="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
                  <img src={test_url_images + appointmentDetails?.doctor?.profile_picture} alt="" class="img-fluid rounded-4 voice-img" />
                  <div>
                     <h6 class="mb-1">Dr. {appointmentDetails?.doctor?.full_name}</h6>
                     <p class="text-muted mb-2">{appointmentDetails?.doctor?.department?.name}</p>
                     <p class="text-muted small m-0"><span class="mdi mdi-calendar-month text-primary me-1"></span>
                     {moment(appointmentDetails?.date_appointment).format('DD-MM-YYYY')}
                     </p>
                  </div>
                  <div class="ms-auto">
                     <div class="d-flex justify-content-end">

                     </div>
                     <span class="badge bg-success-subtle text-success fw-normal rounded-pill px-2">
                     {appointmentDetails?.status == "pending" && "PENDING"}
                        
                        
                        </span>
                  </div>
               </div>
               <div class="d-flex align-items-center justify-content-between">
       
                  <div class="d-flex align-items-center gap-3 col justify-content-center">
                     <span class="mdi mdi-star-outline mdi-24px text-info"></span>
                     <div>
                        <p class="mb-0 small text-muted">Review</p>
                        <p class="text-primary m-0 fw-bold">5.3K</p>
                     </div>
                  </div>
                  <div class="d-flex align-items-center gap-3 col ">
                     <span class="mdi mdi-medal-outline mdi-24px text-info"></span>
                     <div>
                        <p class="mb-0 small text-muted">Experience</p>
                        <p class="text-primary m-0 fw-bold">{appointmentDetails?.doctor?.experience} Years</p>
                     </div>
                  </div>
               </div>
            </div>
            {appointmentDetails?.status == "pending" ?
                   <div className="row row-cols-2 g-2 mt-3 p-3">
            
                   <div className="col">
                     <div className="bg-white text-center rounded-4 p-2 shadow-sm">
             
                     <Link className="link-dark">
                         <h1>{appointmentDetails?.appointment_slot}</h1>
                         <p className="text-truncate small pt-2 m-0">Token Number</p>
                       </Link>
                     </div>
                   </div>
                   
                   <div className="col">
                     <div className="bg-white text-center rounded-4 p-2 shadow-sm">
                       <Link className="link-dark">
                       <h1>{slotNumber}</h1>
                         <p className="text-truncate small pt-2 m-0">Total Patients</p>
                       </Link>
                     </div>
                   </div>
     
                 </div>
                 :
                 <div class="bg-white mt-1 p-3">

                 <Button style={{width:"100%", background:"#0d6efd", color:"white"}}
                 onClick={()=>{
                 
                    router.push("/write-reviews/"+appointmentId)
                 }}
                 >Add Review</Button>
                                  <Button style={{width:"100%", background:"#0d6efd", color:"white"}}
                 onClick={()=>{
                  setHtmlData(appointmentDetails?.pdf_content)
                  showModal()
                  // convertToPDF(appointmentDetails?.pdf_content, "prescription")
                 }}
                 >View Prescription</Button>
                 </div> 
               }
         
    
            <div class="p-3" style={{paddingTop:'0.5rem !important'}}>
          
                             <Modal title="Doctor's Prescription" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                             <PrescriptionHistory htmlContent={htmlData} />

      </Modal>
                            
               <div class="bg-white rounded-4 border p-3 mb-2">
                  <p class="mb-2 fs-14 fw-bold text-black">Visit Time</p>
                  <div class="d-flex align-items-center gap-4">
                     <div>
                        <p class="mb-1">Day</p>
                        <p class="mb-0">Visit Time</p>
                     </div>
                     <div>
                        <p class="mb-1">: {moment(appointmentDetails?.date_appointment).format("dddd, MMM D, YYYY")}</p>
                        <p class="mb-0">: {appointmentDetails?.slot.toUpperCase()} -  {appointmentDetails?.slot == "morning"? slotDetails?.morning_timings :appointmentDetails?.slot == "afternoon"?slotDetails?.afternoon_timings:appointmentDetails?.slot=="evening"?slotDetails?.evening_timings:<></>}</p>
                     </div>
                  </div>
               </div>
               <div class="bg-white rounded-4 border p-3 mb-2">
                  <p class="mb-2 fs-14 fw-bold text-black">Patient Info</p>
                  <div class="d-flex align-items-center gap-4">
                     <div>
                        <p class="mb-1">Full Name</p>
                        <p class="mb-1">DOB</p>
                        <p class="m-0">Gender</p>
                        {/* <p class="m-0">Phone</p> */}
                        <p class="m-0">Blood Group</p>
                        <p class="m-0">Weight</p>
                        <p class="m-0">Height</p>
                     </div>
                     <div>
                        <p class="mb-1">: MR {appointmentDetails?.patient?.full_name}</p>
                        <p class="mb-1">: {appointmentDetails?.patient?.date_of_birth}</p>
                        <p class="m-0">: {appointmentDetails?.patient?.gender == "M" ? "Male" :"Female"}</p>
                        {/* <p class="m-0">: {appointmentDetails?.patient?.}</p> */}
                        <p class="m-0">: {appointmentDetails?.patient?.blood_group}</p>
                        <p class="m-0">: {appointmentDetails?.patient?.weight || "N/A"} Kg</p>
                        <p class="m-0">: {appointmentDetails?.patient?.height || "N/A"} Cm</p>
                     </div>
                  </div>
               </div>
       
               {/* <a href="recording.html" class="btn btn-info btn-lg w-100 rounded-4">Call Now (Start at 2:00 PM)</a> */}
            </div>
         </div>
         <BottomNav path="profile"/>
      </div>
</>  )
}

export default AppointmentDetails