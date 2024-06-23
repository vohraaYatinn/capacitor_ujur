import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BackNavbar from './BackNavbar';

import useAxios from '../network/useAxios';
import { fetchSingleHospital, getAllDoctor } from '../urls/urls';
import { test_url_images } from '../config/environment';
import { FaLocationDot } from 'react-icons/fa6';

const AllDoctorsFetch = () => {
    const [selectedTab, setSelectedTab] = useState(2);
    const { hospitalId } = useParams();
    const [hospitalData, setHospitalData] = useState({});
    const [doctors, setDoctors] = useState([]);
    const [showAllNumber, setShowNumber] = useState(1)

    //useAxios
    const [allDoctorResponse, allDoctorError, allDoctorLoading, allDoctorFetch] = useAxios();

    //functions
   const fetchNearbyHospital = () => {
    allDoctorFetch(getAllDoctor({hospitalId:hospitalId, pageNumber:showAllNumber}));
    };

    //useEffects
    useEffect(()=>{
      if(true){
        fetchNearbyHospital()
      }
    },[showAllNumber])
    useEffect(()=>{
     if(allDoctorResponse?.result == "success"){
      console.log(allDoctorResponse?.data)
      setDoctors(allDoctorResponse?.data)
     }
    },[allDoctorResponse])
   
  return (

<div style={{
  overflowX:"hidden"
}}>
  <div className="doctor-profile d-flex flex-column vh-100">
    <BackNavbar name={"View All Doctors"} />
    {/* body */}
    <div className="vh-100 my-auto overflow-auto">

 
      {/* tabs */}
      <div className="bg-white shadow-sm border-top">
        <ul
          className="nav doctor-profile-tabs gap-1 p-0"
          id="pills-tab"
          role="tablist"
        >
      
          {/* <li className="nav-item col" role="presentation">
            <button
              className={`nav-link w-100 ${selectedTab == 3 && "active"}`}
              id="pills-review-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-review"
              type="button"
              role="tab"
              aria-controls="pills-review"
              aria-selected="false"
              onClick={()=>{
                setSelectedTab(3)
              }}
            >
              Review
            </button>
          </li> */}
        </ul>
      </div>
      <div className="mb-3">
        <div className="tab-content" id="pills-tabContent">
          {/* about */}
          <div
            className={`tab-pane fade p-1 ${selectedTab == 1 && "show active"}`}
            id="pills-info"
            role="tabpanel"
            aria-labelledby="pills-info-tab"
            style={{
              overflow:"hidden"
            }}
            tabIndex={0}
          >
            <h6 className="pb-2 mb-0">About Hospital</h6>
            <p className="text-muted">
{hospitalData?.description}
            </p>
          </div>
          {/* experience */}
          <div
            className={`tab-pane fade p-1 ${selectedTab == 2 && "show active"}`}
            id="pills-experience"
            role="tabpanel"
            aria-labelledby="pills-experience-tab"
            style={{
              marginTop:"1rem",
              overflow:"hidden"
            }}
            tabIndex={0}
          >
         <div className='row' >
          {doctors?.map((data)=>{
            return (
              <div className="top-doctor-item col-6" style={{
                margin:"0rem",
                marginBottom:"1rem"
              }}>
              <Link to={`/about-doctor/${data.id}`} className="link-dark">
                <div className="card bg-white border-0 rounded-4 shadow-sm overflow-hidden">
                <div className="position-absolute m-2">
                    {data?.is_active ? (
                      <span className="badge text-bg-success rounded-pill float-end">
                        Available
                      </span>
                    ) : (
                      <span className="badge text-bg-warning rounded-pill float-end">
                        Offline
                      </span>
                    )}
                  </div>
                  <img
                    src={test_url_images+data.profile_picture}
                    className="card-img-top top-doctor-img"
                    alt="..."
                    style={{
                      height: "8rem",
                      
                      objectFit: "cover"
                    }}
                  />
                  <div className="card-body small p-3 osahan-card-body">
                    <p className="card-title fw-semibold mb-0 text-truncate fs-14">
                      Dr. {data?.full_name}
                    </p>
                    <p style={{
                      marginBottom:"0rem",
                      fontWeight:600
                    }}>{data?.hospital?.name}</p>

                    <p className="card-text text-muted small m-0">
                    {data?.education && data.education.length > 11 ? data.education.substring(0, 12) + '...' : data.education}
                    </p>
                    <span class="bg-white rounded-pill px-1 small text-orange"><i class="mdi mdi-star"></i> 4.9</span>

                  </div>
                </div>
              </Link>
            </div>   
            )
          })}
   
 
              
               </div>
               <div onClick={()=>{
                setShowNumber(showAllNumber+1)
               }}> 
                <p 
                
                style={{
                  textAlign:"center",
                  color:"blue",
                  marginTop:"1rem"
                }}>Load More</p>
                </div>
          </div>
          
          {/* review */}
          <div
            className={`tab-pane fade p-3 ${selectedTab == 3 && "show active"}`}
            id="pills-review"
            role="tabpanel"
            aria-labelledby="pills-review-tab"
            tabIndex={0}
          >
            <h6 className="pb-3 px-3 pt-3 mb-0">Review (2350)</h6>
            <div className="bg-white shadow-sm d-flex align-items-center gap-2 py-2 px-3 border-bottom">
              <img
                src="img/review/profile-1.jpg"
                alt=""
                className="img-fluid rounded-pill review-profile"
              />
              <div>
                <p className="mb-0 fw-bold">Sadia</p>
                <p className="text-muted small m-0">Oct 31, 2023</p>
              </div>
              <div className="ms-auto text-center">
                <div className="d-flex align-items-center gap-1 small text-warning">
                  <span className="mdi mdi-star" />
                  <span className="mdi mdi-star" />
                  <span className="mdi mdi-star" />
                  <span className="mdi mdi-star" />
                  <span className="mdi mdi-star" />
                  <span className="badge rounded-pill text-bg-warning ms-1">
                    4.9
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-sm d-flex align-items-center gap-2 py-2 px-3 border-bottom">
              <img
                src="img/review/profile-2.jpg"
                alt=""
                className="img-fluid rounded-pill review-profile"
              />
              <div>
                <p className="mb-0 fw-bold">Mahabuba</p>
                <p className="text-muted small m-0">Oct 31, 2023</p>
              </div>
              <div className="ms-auto text-center">
                <div className="d-flex align-items-center gap-1 small text-warning">
                  <span className="mdi mdi-star" />
                  <span className="mdi mdi-star" />
                  <span className="mdi mdi-star" />
                  <span className="mdi mdi-star" />
                  <span className="mdi mdi-star" />
                  <span className="badge rounded-pill text-bg-warning ms-1">
                    4.9
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-sm d-flex align-items-center gap-2 py-2 px-3 border-bottom">
              <img
                src="img/review/profile-3.jpg"
                alt=""
                className="img-fluid rounded-pill review-profile"
              />
              <div>
                <p className="mb-0 fw-bold">Faiza</p>
                <p className="text-muted small m-0">Oct 31, 2023</p>
              </div>
              <div className="ms-auto text-center">
                <div className="d-flex align-items-center gap-1 small text-warning">
                  <span className="mdi mdi-star" />
                  <span className="mdi mdi-star" />
                  <span className="mdi mdi-star" />
                  <span className="mdi mdi-star" />
                  <span className="mdi mdi-star" />
                  <span className="badge rounded-pill text-bg-warning ms-1">
                    4.9
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-sm d-flex align-items-center gap-2 py-2 px-3 border-bottom">
              <img
                src="img/review/profile-4.jpg"
                alt=""
                className="img-fluid rounded-pill review-profile"
              />
              <div>
                <p className="mb-0 fw-bold">Nipa</p>
                <p className="text-muted small m-0">Oct 31, 2023</p>
              </div>
              <div className="ms-auto text-center">
                <div className="d-flex align-items-center gap-1 small text-warning">
                  <span className="mdi mdi-star" />
                  <span className="mdi mdi-star" />
                  <span className="mdi mdi-star" />
                  <span className="mdi mdi-star" />
                  <span className="mdi mdi-star" />
                  <span className="badge rounded-pill text-bg-warning ms-1">
                    4.9
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-sm d-flex align-items-center gap-2 py-2 px-3 border-bottom">
              <img
                src="img/review/profile-5.jpg"
                alt=""
                className="img-fluid rounded-pill review-profile"
              />
              <div>
                <p className="mb-0 fw-bold">Rumpa</p>
                <p className="text-muted small m-0">Oct 31, 2023</p>
              </div>
              <div className="ms-auto text-center">
                <div className="d-flex align-items-center gap-1 small text-warning">
                  <span className="mdi mdi-star" />
                  <span className="mdi mdi-star" />
                  <span className="mdi mdi-star" />
                  <span className="mdi mdi-star" />
                  <span className="mdi mdi-star" />
                  <span className="badge rounded-pill text-bg-warning ms-1">
                    4.9
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center mt-3">
              <a
                href="#"
                className="text-decoration-underline text-primary fw-bold"
              >
                Tab here to see all reviews
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* footer */}
    <div className="footer d-grid mt-auto p-3">
      <div className="d-flex gap-2">
      
       
      </div>
    </div>
  </div>
  <div
    className="offcanvas offcanvas-bottom"
    tabIndex={-1}
    id="offcanvasshare"
    aria-labelledby="offcanvasshareLabel"
    style={{ height: "40vh" }}
  >
    <div className="offcanvas-header d-flex justify-content-center">
      <h5 className="offcanvas-title" id="offcanvasshareLabel">
        Share to
      </h5>
    </div>
    <div className="offcanvas-body">
      <div className="row row-cols-3 g-4">
        <div className="col">
          <a href="#" className="link-dark">
            <div className="text-center">
              <img
                src="img/social-icon/facebook.jpeg"
                alt=""
                className="img-fluid rounded-circle icon-lg d-block mx-auto"
              />
              <p className="pt-2 m-0">Facebook</p>
            </div>
          </a>
        </div>
        <div className="col">
          <a href="#" className="link-dark">
            <div className="text-center">
              <img
                src="img/social-icon/instagram.jpeg"
                alt=""
                className="img-fluid rounded-circle icon-lg d-block mx-auto"
              />
              <p className="pt-2 m-0">Instagram</p>
            </div>
          </a>
        </div>
        <div className="col">
          <a href="#" className="link-dark">
            <div className="text-center">
              <img
                src="img/social-icon/twitter.png"
                alt=""
                className="img-fluid rounded-circle icon-lg d-block mx-auto"
              />
              <p className="pt-2 m-0">Twitter</p>
            </div>
          </a>
        </div>
        <div className="col">
          <a href="#" className="link-dark">
            <div className="text-center">
              <img
                src="img/social-icon/whatsapp.jpg"
                alt=""
                className="img-fluid rounded-circle icon-lg d-block mx-auto"
              />
              <p className="pt-2 m-0">Whatsapp</p>
            </div>
          </a>
        </div>
        <div className="col">
          <a href="#" className="link-dark">
            <div className="text-center">
              <img
                src="img/social-icon/linkin.png"
                alt=""
                className="img-fluid rounded-circle icon-lg d-block mx-auto"
              />
              <p className="pt-2 m-0">Linkedin</p>
            </div>
          </a>
        </div>
        <div className="col">
          <a href="#" className="link-dark">
            <div className="text-center">
              <img
                src="img/social-icon/pinterest.png"
                alt=""
                className="img-fluid rounded-circle icon-lg d-block mx-auto"
              />
              <p className="pt-2 m-0">Pinterest</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

 )
}

export default AllDoctorsFetch