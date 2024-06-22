import React, { useEffect, useState } from 'react'
import { useRouter } from '../hooks/use-router';
import BackNavbar from './BackNavbar';
import BottomNav from './BottomNav';
import { Link, useParams } from 'react-router-dom';
import { FaLocationDot, FaUpload } from "react-icons/fa6";
import { Button } from 'antd-mobile';
import useAxios from '../network/useAxios';
import { fetchAppointmentDetails, uploadCustomerLabReport, cancelAppointmentPatient } from '../urls/urls';
import moment from 'moment';
import { test_url_images } from '../config/environment';
// import convertToPDF from '../utils/convertToPdf';
import PrescriptionHistory from './PrescriptionHistory';
import { Modal, Progress } from 'antd';
import convertToPDF from '../utils/convertToPdf';
import { Alert } from "antd";
import PatientHistoryComponent from './PatientHistoryComponent';
import "./styles/newcss.css"

const AppointmentDetails = () => {
   const router = useRouter();
  let [cancle, setCancle] = useState(false);
  const [uploadLabReportResponse, uploadLabReportError, uploadLabReportLoading, uploadLabReportFetch] = useAxios();
  const [cancelBookingResponse, cancelBookingError, cancelBookingLoading, cancelBookingFetch] = useAxios();
  //useState
  const [message, setMessage] = useState({
   message: "",
   isShow: false,
   type:"success"
 });
   const { appointmentId } = useParams();
   const [ appointmentDetails, setAppointmentDetails ] = useState();
   const [ slotDetails, setSlotDetails ] = useState();
   const [ slotNumber, setTotalSlots ] = useState();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [percentageDownload, setPercentageDownload] = useState(0)
   const [percentageIsError, setPercentageIsError] = useState(false)
   const uploadLabReport = () =>{
      uploadLabReportFetch(uploadCustomerLabReport(formValues))
   }
   const cancelAppointment = () =>{
    cancelBookingFetch(cancelAppointmentPatient(formValues))
   }
   const showModal = () => {
     setIsModalOpen(true);
   };
   const handleUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log("Selected file:", file);
        setFormValues((prev) => ({
          ...prev,
         labReport: file,
        }));
        const reader = new FileReader();
        reader.onload = function (e) {
          setUploadedFile(e.target.result);
        };
        reader.readAsDataURL(file);
        setIsUploaded(true);
      }
    };
    const fileInputRef = React.useRef(null);
  const openFile = () => {
    fileInputRef.current.click();
  };
    const handleRemove = () => {
      setIsUploaded(false);
      console.log("Remove button clicked");
      setFormValues((prev) => ({
        ...prev,
      labReport: "",
      }));
    };
    const [uploadedFile, setUploadedFile] = useState(null);
    const [formValues, setFormValues] = useState({
      appointmentId:appointmentId
   });
   const [isUploaded, setIsUploaded] = useState(false);

   const handleOk = () => {
      convertToPDF(appointmentDetails?.pdf_content, "prescription")
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
      if(uploadLabReportResponse?.result == "success"){
         setMessage({
            message: uploadLabReportResponse?.message,
            isShow: true,
            type:"success"
          });
         setCancle(false)
      }
    },[uploadLabReportResponse])
    useEffect(()=>{
      if(cancelBookingResponse?.result == "success"){
         setMessage({
            message: cancelBookingResponse?.message,
            isShow: true,
            type:"success"
          });
          fetchLatestAppointment()
      }
    },[cancelBookingResponse])
    useEffect(()=>{
      if(uploadLabReportError){
         setMessage({
            message: uploadLabReportError?.response?.data,
            isShow: true,
            type:"error"
          });
         setCancle(false)
      }
    },[uploadLabReportError])
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
<input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleUpload}
        />
<BackNavbar name={"Appointment Details"}/>

         <div class="vh-100 my-auto overflow-auto body-fix-osahan-footer">
      
            <div class="p-3 bg-white shadow-sm">
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
               <div class="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
                  <img src={test_url_images + appointmentDetails?.doctor?.profile_picture} alt="" class="img-fluid rounded-4 voice-img" />
                  <div>
                     <h6 class="mb-1">Dr. {appointmentDetails?.doctor?.full_name}</h6>
                     <p class="text-muted mb-2">{appointmentDetails?.doctor?.department?.name}</p>
                     <p class="text-muted small m-0"><span class="mdi mdi-calendar-month text-primary me-1"></span>
                     {moment(appointmentDetails?.date_appointment).format("dddd, MMM D, YYYY")}
                     </p>
                  </div>
                  <div class="ms-auto">
                     <div class="d-flex justify-content-end">

                     </div>
                     <span class={`badge  ${appointmentDetails?.status == "pending" ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger" } fw-normal rounded-pill px-2`}>
                     {appointmentDetails?.status == "pending" ? "PENDING" : appointmentDetails?.status == "cancel" ? "CANCELLED" : ""}
                        
                        
                        </span>
                  </div>
               </div>
               <div class="d-flex align-items-center justify-content-between">
       
                  <div class="d-flex align-items-center gap-3 col ">
                     <span class="mdi mdi-medal-outline mdi-24px text-info"></span>
                     <div>
                        <p class="mb-0 small text-muted">Experience</p>
                        <p class="text-primary m-0 fw-bold">{appointmentDetails?.doctor?.experience} Years</p>
                     </div>
                  </div>
                  <div className="text-info" style={{
                     color:"blue"
                  }}>
                     <span style={{color:"#0C6DFD"}}>Location</span>{" "}
                  <FaLocationDot size={30}   style={{color:"#0C6DFD"}}
                  onClick={()=>{
                     window.location.href = appointmentDetails?.doctor?.hospital?.google_link;
                  }}
                  />
                  </div>
               </div>
            </div>
            {appointmentDetails?.status == "pending" ?
            <>
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
                 <div class="mt-1 p-3">

<Button style={{width:"100%", background:"#0d6efd", color:"white"}}
onClick={()=>{

  cancelAppointment()
  }}

  
>Cancel Booking</Button>

</div> 

                 </>
                 
                 :
                 appointmentDetails?.status != "cancel" &&
                 <div class="bg-white mt-1 p-3">

                 <Button style={{width:"100%", background:"#0d6efd", color:"white"}}
                 onClick={()=>{
                 
                  setCancle(!cancle)
                 }}
                 >Upload Lab Report</Button>
                                  <Button style={{width:"100%", background:"#0d6efd", color:"white"}}
onClick={()=>{
  cancelAppointment()
}}
>Download Invoice</Button>
                 <Button style={{width:"100%", background:"#0d6efd", color:"white"}}
                 onClick={()=>{
                 
                    router.push("/write-reviews/"+appointmentId)
                 }}
                 >Add Review</Button>
                 <Button style={{width:"100%", background:"#0d6efd", color:"white"}}
                 onClick={()=>{
                 
                    router.push("/write-reviews-hospital/"+appointmentId)
                 }}
                 >Add Hospital Review</Button>
{appointmentDetails?.payment_status == "Paid" &&
                                  <Button style={{width:"100%", background:"#0d6efd", color:"white"}}
                 onClick={()=>{
                  setPercentageIsError(false)
                  setPercentageDownload(0)
                  showModal()
                  
                  // setHtmlData(appointmentDetails?.pdf_content)
                  setTimeout(()=>{
                    setPercentageDownload(75)
                  },1000)
                  setTimeout(()=>{
                    convertToPDF(appointmentDetails?.pdf_content, "prescription", setPercentageDownload, setPercentageIsError)
                  },1050)
                 }}
                 >Download Prescription</Button>
}
                 </div> 
                
               }
         
    
            <div class="p-3" style={{paddingTop:'0.5rem !important'}}>
          
                             <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={"Download"} footer={<></>}>
                          <div style={{width:"100%",display:"flex", alignItems:"center", justifyContent:"center"}}>
                            <Progress type="circle" percent={percentageDownload} size={100} status={percentageIsError && "exception"} style={{marginTop:"1rem"}} />
                            </div>  
                            <p style={{textAlign:"center", marginTop:"1rem", fontSize:"1.1rem"}}>{percentageIsError ? "There is a error while downloading file" :percentageDownload == 100 && "Prescription has been downloaded successfully"}</p> 
                            <p style={{textAlign:"center", marginTop:"-1rem"}}>{(!percentageIsError && percentageDownload == 100) && "The file has been saved to the Documents folder on your device."}</p> 

      </Modal>
      <Modal
          open={cancle}
          okText="Upload"
          onOk={uploadLabReport}
          onCancel={()=>{
            setCancle(false)
          }} 
        >
         
            <div className="modal-body py-5">
              <div className="text-center">


                <span className="mb-0">
                  {!isUploaded && (
                    <button className='h1' onClick={openFile}><FaUpload/></button>
             

                  )}
                  {isUploaded && (
                    <button
                      className="btn btn-soft-primary ms-2 mt-2"
                      onClick={handleRemove}
                    >
                      Remove
                    </button>
                  )}
                </span>
                <div className="mt-4">
                  <h4>Upload Lab Report</h4>
                  <p className="para-desc mx-auto text-muted mb-0">
                    Are you sure , you want to upload lab report for the given appointment
                  </p>

                  
                </div>
              </div>
            </div>
          
        </Modal>
                  { appointmentDetails?.status == "cancel" &&          
               <div class="bg-white rounded-4 border p-3 mb-2">
                  <p class="mb-2 fs-14 fw-bold text-black">Appointment Status             <span class={`badge  ${appointmentDetails?.status == "pending" ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger" } fw-normal rounded-pill px-2`}>
                     {appointmentDetails?.status == "pending" ? "PENDING" : appointmentDetails?.status == "cancel" ? "CANCELLED" : ""}
                        
                        
                        </span></p>
                  <div class="d-flex align-items-center gap-4">
                     <div>
                        <p class="mb-1">Reson</p>
                     </div>
                     <div>
                        
                        <p class="mb-1">: {appointmentDetails?.cancel_reason}</p>
                     </div>
                  </div>
               </div>
               }
               <div class="bg-white rounded-4 border p-3 mb-2">
                  <p class="mb-2 fs-14 fw-bold text-black">Visit Time</p>
                  <div class="d-flex align-items-center gap-4">
                     <div>
                        <p class="mb-1">Hospital</p>
                        <p class="mb-1">Day</p>
                        <p class="mb-1">Visit</p>
                        <p class="mb-0">Time</p>
                     </div>
                     <div>
                        <p class="mb-1 " style={{
                          fontWeight:"700"
                        }}>: {appointmentDetails?.doctor?.hospital?.name}</p>
                        <p class="mb-1">: {moment(appointmentDetails?.date_appointment).format("dddd, MMM D, YYYY")}</p>
                        <p class="mb-1">: {appointmentDetails?.slot.charAt(0).toUpperCase() + appointmentDetails?.slot.slice(1)}</p>
                        <p class="mb-0">: {appointmentDetails?.slot == "morning"? slotDetails?.morning_timings :appointmentDetails?.slot == "afternoon"?slotDetails?.afternoon_timings:appointmentDetails?.slot=="evening"?slotDetails?.evening_timings:<></>}</p>
                     </div>
                  </div>
               </div>
               <div class="bg-white rounded-4 border p-3 mb-2">
                  <p class="mb-2 fs-14 fw-bold text-black">Patient Info</p>
                  <div class="d-flex align-items-center gap-4">
                     <div>
                        <p class="mb-1">Full Name</p>
                        <p class="mb-1">UJUR ID</p>
                        <p class="mb-1">DOB</p>
                        <p class="m-0">Gender</p>
                        {/* <p class="m-0">Phone</p> */}
                        <p class="m-0">Blood Group</p>
                        <p class="m-0">Weight</p>
                        <p class="m-0">Height</p>
                     </div>
                     <div>
                        <p class="mb-1">: {appointmentDetails?.patient?.gender == "M" ? "Mr" :"Ms/Mrs"} {appointmentDetails?.patient?.full_name}</p>
                        <p class="mb-1">: {appointmentDetails?.patient?.ujur_id}</p>
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