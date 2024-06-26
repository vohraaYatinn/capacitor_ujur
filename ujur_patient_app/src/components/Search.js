import React, { useEffect, useState } from 'react'
import { Swiper } from 'antd-mobile';
import { Link, useParams } from 'react-router-dom';
import BottomNav from './BottomNav';
import { useDispatch } from 'react-redux';
import { updateNavbar } from '../redux/reducers/functionalities.reducer';
import { searchPatientFeature } from '../urls/urls';
import useAxios from '../network/useAxios';
import { test_url, test_url_images } from '../config/environment';


const Search = () => {
    const dispatch = useDispatch();
    const [searchResponse, searchError, searchLoading, searchFetch] = useAxios();
    const { extra } = useParams();

    const [searchedData, setSearchDoctor] = useState([

    ])
    const [department, setDepartment] = useState([
    ])
    
    const [formValues, setFormValues] = useState({
      searchInput:""
    })
    useEffect(()=>{
      if(formValues?.searchInput.length > 0){
         searchFetch(searchPatientFeature(formValues))
      }
      else if(formValues?.searchInput.length == 0){
         setSearchDoctor("")
      }

    },[formValues])
    useEffect(()=>{
      if(extra){
         setFormValues((prev) => ({
            ...prev,
            searchInput: extra,
          }))
      }

    },[extra])
    useEffect(()=>{
      if(searchResponse?.result == "success"){
         setSearchDoctor(searchResponse?.data)
      }
    },[searchResponse])


  return (
    <div style={{paddingBottom: "40px"}}>
           <div className="select-area d-flex flex-column vh-100">
      <div className="bg-white shadow-sm">
         <div className="d-flex align-items-center justify-content-between mb-auto p-3 osahan-header">
            <div className="d-flex align-items-center gap-2 me-auto">
               <Link to="/home" className="text-dark bg-white shadow rounded-circle icon">
                  <span className="mdi mdi-arrow-left mdi-18px"></span>
               </Link>
            </div>
            <div className="d-flex align-items-center gap-3">
               <a className="toggle text-muted d-flex align-items-center justify-content-center fs-5 bg-white shadow rounded-circle icon" 
               onClick={()=>{
                  dispatch(updateNavbar())

               }}
               ><i
                     className="bi bi-list"></i></a>
            </div>
         </div>
         <div className="px-3 pb-3">
            <form>
               <div className="input-group rounded-4 shadow overflow-hidden border-0 py-1 ps-3 bg-light">
                  <span className="input-group-text bg-transparent text-muted border-0 p-0" id="search"><span className="mdi mdi-magnify mdi-24px text-primary"></span></span>
                  <input type="text"
                  value={formValues?.searchInput}
                  className="form-control bg-transparent text-muted border-0 px-3 fs-14" placeholder="Search" aria-label="Search" aria-describedby="search"
                                onChange={(e) => {
                                 setFormValues((prev) => ({
                                   ...prev,
                                   searchInput: e.target.value,
                                 }));
                               }}
                  />
               </div>
            </form>
         </div>
      </div>
      <div className="vh-100 my-auto overflow-auto body-fix-osahan-footer">
         <div className="py-3">
            <div>
            {searchedData?.length > 0 && <h6 className="mb-2 pb-1 px-3 fw-bold text-black">Search Result</h6>}
               {searchedData?.length > 0 && searchedData.map((each)=>{
                  return(
   <Link to={each?.batch == "doctor"? `/about-doctor/${each?.id}` : `/hospital-overview/${each?.id}`} class="link-dark">
   <div class="d-flex align-items-center gap-3 bg-white border-bottom shadow-sm p-3">
   {each?.img && <img src={test_url+"media/"+each?.img} alt="" class="img-fluid rounded-4 favorite-img" style={{
      height:"4rem", width:"4rem", objectFit:"cover"
   }}/>}
       <div class="small">
           <h6 class="mb-1 fs-14">{each?.name}</h6>
           {each?.rating &&
           <div class="d-flex align-items-center gap-1 small">
               <span class="mdi mdi-star text-warning"></span>
               <span class="mdi mdi-star text-warning"></span>
               <span class="mdi mdi-star text-warning"></span>
               <span class="mdi mdi-star text-warning"></span>
               <span class="mdi mdi-star text-warning"></span>
               <span class="text-warning">4.9</span>
               <span>(5,380)</span>
           </div>
           }
           <small class="text-muted">{each?.hospital}</small><br/>
           <small class="text-muted">{each?.batch}</small>
       </div>
   </div>
</Link>
               )})}
               {searchedData?.length == 0 && formValues?.searchInput?.length>0 &&

               <div className='pb-1 px-3 mt-4'>
                 <h3> No Result Found </h3>
                  </div>
                  
                  }
            {searchedData?.length == 0 && department.map((each)=>{
                  return(
   <a  class="link-dark"    
   onClick={(e) => {
      setFormValues((prev) => ({
        ...prev,
        searchInput: each?.name,
      }));
    }}>
   <div class="d-flex align-items-center gap-3 bg-white border-bottom shadow-sm p-3">
   {each?.img && <img src={test_url+"media/"+each?.img} alt="" class="img-fluid rounded-4 favorite-img" />}
       <div class="small">
           <h6 class="mb-1 fs-14">{each?.name}</h6>
           {each?.rating &&
           <div class="d-flex align-items-center gap-1 small">
               <span class="mdi mdi-star text-warning"></span>
               <span class="mdi mdi-star text-warning"></span>
               <span class="mdi mdi-star text-warning"></span>
               <span class="mdi mdi-star text-warning"></span>
               <span class="mdi mdi-star text-warning"></span>
               <span class="text-warning">4.9</span>
               <span>(5,380)</span>
           </div>
           }
           <small class="text-muted">{each?.batch}</small>
       </div>
   </div>
</a>
               )})}

             
            </div>
         </div>
      
      </div>
      <BottomNav path="search"/>

   </div>
    </div>
  )
}

export default Search