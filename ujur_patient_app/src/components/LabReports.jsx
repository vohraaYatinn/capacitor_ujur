import React, { useEffect, useState } from 'react'
import { useRouter } from '../hooks/use-router';
import { updateNavbar } from '../redux/reducers/functionalities.reducer';
import { useDispatch } from 'react-redux';
import useAxios from '../network/useAxios';
import { fetchLabReports } from '../urls/urls';
import moment from 'moment';
import { test_url_images } from '../config/environment';
import BottomNav from './BottomNav';
import BackNavbar from './BackNavbar';
import transition from '../transition';

const LabReports = () => {

   const [labReportsData, setLabReportsData] = useState([])
   
   //useAxios
   const [LabReportResponse, LabReportError, LabReportLoading, LabReportFetch] = useAxios();

   //functions
   const fetchPatientLabReport = () => {
      LabReportFetch(fetchLabReports({patientId:1}));
      };

   
      //useEffects
      useEffect(()=>{
         fetchPatientLabReport()
      },[])
      useEffect(()=>{
        if(LabReportResponse?.result == "success"){
         setLabReportsData(LabReportResponse?.data)
        }
      },[LabReportResponse])
  return (
<>
<div class="favorite-doctor d-flex flex-column vh-100" style={{paddingBottom: "40px"}}>
<BackNavbar name={"Lab Reports"}/>

         <div class="vh-100 my-auto overflow-auto body-fix-osahan-footer">
            {labReportsData.map((each)=>{
return(
   <div class="d-flex align-items-center gap-3 bg-white p-3 my-1 shadow-sm padding-custom-lab">
   <div>
      <h6 class="mb-1 fs-14 fw-bold">{each?.report_name}</h6>
      <div class="d-flex align-items-center gap-1 small">
      <span>                     {moment(each?.created_at).format('DD MMMM YYYY')}
</span>

      </div>
      <small class="text-muted">{each?.hospital?.name}</small>
   </div>
   <div class="ms-auto">
      <a href="#" class="link-dark" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottomRemove"
         aria-controls="offcanvasBottomRemove">
         <div class="lighter-bg-primary-opacity rounded-circle icon">
              <a href={test_url_images+each?.report} download={`filename.pdf`} class="mdi mdi-download mdi-18px text-primary"
              
              ></a> 
         </div>
      </a>
   </div>
</div>

)
            })}

         </div>
         <BottomNav path={"profile"}/>

      </div>
   
</>
    )
}

export default transition(LabReports)