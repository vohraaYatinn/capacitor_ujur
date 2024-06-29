import { Swiper } from "antd-mobile";
import React, { useEffect, useRef, useState } from "react";
import topDoctor1 from "../img/transparent/1.png";
import topDoctor2 from "../img/transparent/2.png";
import topDoctor3 from "../img/transparent/3.png";
import doctorImg1 from "../img/home/doctor.png";
import doctorImg2 from "../img/home/schedule.png";
import doctorImg3 from "../img/home/medicine.png";
import doctorImg4 from "../img/home/prescription.png";
import user from "../img/home/user.png";
import { Card, Modal, Select, Skeleton } from 'antd';
import {districts} from '../demo/districts';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateNavbar, updateToken, updateUser, userData } from "../redux/reducers/functionalities.reducer";
import BottomNav from "./BottomNav";
import useAxios from "../network/useAxios";
import {
  fetchCustomerDoctors,
  fetchCustomerlatestAppointment,
  fetchCustomerHospital,
  changeJwtOfPatient,
  patientAddNewProfile,
  fetchprofiles,
} from "../urls/urls";
import { useRouter } from "../hooks/use-router";
import { test_url_images } from "../config/environment";
import moment from "moment";
import logo from "../img/logo/logo.png";
import { RxCross2} from 'react-icons/rx'
import user99 from "../img/home/user.png"

const Home = () => {
  const router = useRouter();
  const userDispatch = useSelector(userData);

  const [doctorsData, setDoctorsData] = useState([]);
  const [hospitalDetails, setHospitalDetails] = useState([]);
  const [latestAppointment, setLastestAppointment] = useState([]);
  const [extraPatientsData, setExtraPatientsData] = useState([]);
  const [profileData, setprofileData] = useState([]);
  const { changeId } = useParams();

  //useAxios
  const [
    fetchAppointmentResponse,
    fetchAppointmentError,
    fetchAppointmentLoading,
    fetchAppointmentFetch,
  ] = useAxios();
  const [
    patientSignupResponse,
    patientSignupError,
    patientSignupLoading,
    patientSignupFetch,
  ] = useAxios();
  const [hospitalsResponse, hospitalsError, hospitalsLoading, hospitalsFetch] =
    useAxios();
  const [doctorsResponse, doctorsError, doctorsLoading, doctorsFetch] =
    useAxios();

  //functions
  const fetchAppointmentsFunc = () => {
    fetchAppointmentFetch(fetchCustomerlatestAppointment());
  };
  const fetchHospitalsFunc = () => {
    hospitalsFetch(
      fetchCustomerHospital({
        pageNumber: 4,
      })
    );
  };
  const fetchDoctorsFunc = () => {
    doctorsFetch(
      fetchCustomerDoctors({
        pageNumber: 4,
      })
    );
  };
  const onChange = (value) => {
    setFormValues((prev) => ({
       ...prev,
       district: value,
     }));
   };
  //useEffects
  const fetchFunctions = () => {
    fetchAppointmentsFunc();
    fetchHospitalsFunc();
    fetchDoctorsFunc();
  }
  useEffect(() => {
    fetchAppointmentsFunc();
    fetchHospitalsFunc();
    fetchDoctorsFunc();
  }, []);
  const [
    changeJwtResponse,
    changeJwtError,
    changeJwtLoading,
    changeJwtFetch,
  ] = useAxios();
  const [formValues, setFormValues] = useState({
    gender: "M",
  });


  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    const preventLongPress = (event) => {
      event.preventDefault();
    };

    if (element) {
      element.addEventListener('contextmenu', preventLongPress);
    }

    // Clean up the event listener
    return () => {
      if (element) {
        element.removeEventListener('contextmenu', preventLongPress);
      }
    };
  }, []);

  const [profileResponse, profileError, profileLoading, profileFetch] =
  useAxios();
  const fetchPatientprofile = () => {
    profileFetch(fetchprofiles({ patientId: 1 }));
  };
  useEffect(() => {
    fetchPatientprofile();
  }, []);
  useEffect(() => {
    if (
      fetchAppointmentResponse?.result == "success" &&
      fetchAppointmentResponse?.data
    ) {
      console.log(fetchAppointmentResponse?.data);

      setLastestAppointment(fetchAppointmentResponse?.data);
    }
  }, [fetchAppointmentResponse]);
  useEffect(() => {
    if (changeJwtResponse?.result == "success") {
      setSelectPatientModalOpen(false);
      localStorage.removeItem('storedToken');
      localStorage.setItem('storedToken', changeJwtResponse?.token);
      dispatch(updateToken(changeJwtResponse?.token))
      window.location.reload();

    }
  }, [changeJwtResponse]);
  useEffect(() => {
    if (profileResponse?.result == "success") {
      setprofileData(profileResponse?.data);
      dispatch(updateUser(profileResponse?.data))

      setExtraPatientsData(profileResponse?.linked_patient)
      console.log(profileData)
    }
  }, [profileResponse]);
  useEffect(() => {
    if (hospitalsResponse?.result == "success") {
      console.log(hospitalsResponse?.data);

      setHospitalDetails(hospitalsResponse?.data);
    }
  }, [hospitalsResponse]);
  useEffect(() => {
    if (doctorsResponse?.result == "success") {
      console.log(doctorsResponse?.data);
      setDoctorsData(doctorsResponse?.data);
    }
  }, [doctorsResponse]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectPatientModalOpen, setSelectPatientModalOpen] = useState(false);
  useEffect(()=>{
    if(changeId){
      setTimeout(() => {
       
      }, 300);      
      console.log("hello")
      setSelectPatientModalOpen(true)
    }
  },[changeId])
  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const handleOk = () => {
    submitUserSignup()
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancelModals = () => {
    if(changeId){
      router.push("/home")
    }
    setSelectPatientModalOpen(false);
  };
  const changeJwtFunction = (id) => {
    changeJwtFetch(changeJwtOfPatient({
      patientId:id
    }));
  };
  const submitUserSignup = () => {
    console.log(formValues)
    patientSignupFetch(patientAddNewProfile(formValues));
  };
  useEffect(() => {
    if (patientSignupResponse?.result == "success") {
      router.push(`/`);
    }
  }, [patientSignupResponse]);
  const changeLogin = (data) =>{
    if(data=="new value"){
      showModal()
    }
    else if(data){
      changeJwtFunction(data)
    }
  }

  const dispatch = useDispatch();

  const topDoctor = [topDoctor1, topDoctor2, topDoctor3,];

  const topDoctors = topDoctor.map((color, index=1) => (
    <Swiper.Item key={index}>
      <div className="available-doctor-item" >
        <div className="btn-secondary text-white rounded-4 p-3 doctor-book-back" style={{
        background: "#122F97"
      }}>
          <h1 className="mb-1 doctor-book-back-title">
          {index === 0 ? 'Cardiologist' : index === 1 ? 'Dermatologist' : index === 2 ? 'Pediatrician' : ''}
          {/* {index === 0 ? 'Cardiologist:' : index === 1 ? 'Dermatologist:' : index ===3 ? 'Pediatrician'} */}
          {/* Cardiologist: */}
          <br />
            <span className="h4 text-warning overflow-hidden rounded-4 m-0">
              <b className="text-black px-1 rounded" style={{
                background:"#FF8212"
              }}>
                
                {/* Doctor for Your */}
                {index === 0 ? 'Nearby cardiologist' : index === 1 ? 'Nearby Dermatologist' : index === 2 ? 'Nearby Pediatrician' : ''}
              </b>
              <br/><b className="text-white">{" "}Needs!</b>
            </span>
          </h1>
          {/* <p className="mb-2 text-white small">Book Now and Get 30% OFF</p> */}
          <Link to={"/search-doctor/"+ (index === 0 ? 'Cardiologist' : index === 1 ? 'Dermatologist' : index === 2 ? 'Pediatrician' : '')} className="btn btn-sm btn-dark btn-book mt-2">
            SEARCH NOW <i className="bi bi-arrow-right" />
          </Link>
          <div className="doctor-book-img">
            <img src={color} alt="" className="img-fluid" />
          </div>
        </div>
      </div>
    </Swiper.Item>
  ));

  const topHospitalsLoader = Array(4).map((each, index) => (
    <Swiper.Item key={index}>
      <div className="top-doctor-item">
        <Link className="link-dark">
         <Skeleton />
        </Link>
      </div>
    </Swiper.Item>
  ));
  const topHospitals = hospitalDetails.map((each, index) => (
    <Swiper.Item key={index}>
      <div className="top-doctor-item">
        <Link to={`/hospital-overview/${each?.id}`} className="link-dark">
          <div className="card bg-white border-0 rounded-4 shadow-sm overflow-hidden">
            <img
              src={test_url_images + each?.hospital_image}
              className="card-img-top top-doctor-img"
              alt="..."
              style={{
                height: "8rem",
                objectFit: "cover",
              }}
            />
            <div className="card-body small  osahan-card-body">
              <p className="card-title fw-semibold  text-truncate fs-14">
                {each?.name}
              </p>

              <p className="card-text text-muted small m-0">
                {each?.address && each.address.length > 30
                  ? each.address.substring(0, 30) + "..."
                  : each.address}
              </p>
              <p className="mt-1">
              {each?.average_review_stars && Array(Math.floor(each?.average_review_stars) ).fill(null).map(()=>{
            return(
              <span className="mdi mdi-star text-warning me-1" />

            )
           })}
                {each?.average_review_stars?.toFixed(2)} ({each?.total_review_stars})
              </p>
            </div>
          </div>
        </Link>
      </div>
    </Swiper.Item>
  ));


  return (
    <>
      <div className="bg-white shadow-sm no-long-press" ref={ref}>

        <div className="d-flex align-items-center justify-content-between mb-auto p-3 osahan-header">
          <div className="d-flex align-items-center gap-2 me-auto">
            <a>
              <img
                src={userDispatch?.profile_picture ? test_url_images + userDispatch?.profile_picture : user99}
                onClick={()=>setSelectPatientModalOpen(true)}
                style={{
                  height:'1.8rem',
                  width:"1rem",
                  objectFit:"cover"
                }}
                alt=""
                className="img-fluid rounded-circle icon"
              />
            </a>
           
            <div
            
                style={{
                  fontSize: "1rem",
                  width: "8rem",
                  height: "1.5rem",
                  border: "transparent",
                  background:"transparent"
                }}
              >
{/* <option value=""> */}
                  <p class="mb-0 fw-bold">Hi{" "}<span className="fw-bold">{profileData?.full_name && profileData?.full_name?.split(' ')[0].replace(/\b\w/g, char => char.toUpperCase())}</span></p>
                {/* </option>
                {extraPatientsData.map((data)=>{
                return(
                  <option value={data.id}>
                  <p class="mb-0 fw-bold">{data?.full_name}</p>
                </option>
                
                )
                })}
                <option value={"new value"}>
                <Button type="primary" onClick={showModal} style={{background:"rgb(12,109,253)", color:"white"}}>
        Add New Profile
      </Button>
                </option> */}
              
              
              </div>
            <div className="ps-1"></div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Link
              to="/favorite-doctor"
              className="bg-white shadow rounded-circle icon"
            >
              <span className="mdi mdi-cards-heart-outline mdi-18px text-primary" />
            </Link>
            {/* <Link
              to="/notifications"
              className="bg-white shadow rounded-circle icon"
            >
              <span className="mdi mdi-bell-outline mdi-18px text-primary" />
            </Link> */}
            <a
              className="toggle bg-white shadow rounded-circle icon d-flex align-items-center justify-content-center"
              style={{ textDecoration: "none" }}
              onClick={() => {
                dispatch(updateNavbar());
              }}
            >
              <i className="bi bi-list text-primary fs-5 d-flex" />
            </a>
          </div>
        </div>

        <div className="px-3 pb-3">
          
          <form>
            <div className="input-group rounded-4 shadow py-1 px-3 bg-light">
              <span
                className="input-group-text bg-transparent text-muted border-0 p-0"
                id="search"
              >
                <span className="mdi mdi-magnify mdi-24px text-primary" />
              </span>
              <input
                type="text"
                className="form-control bg-transparent text-muted rounded-0 border-0 px-3"
                placeholder="Find your suitable doctor!"
                aria-label="Search"
                aria-describedby="search"
                onClick={() => {
                  router.push(`/search-doctor`);
                }}
              />
              <a
                href="#"
                className="input-group-text bg-transparent text-muted border-0 border-start pe-0"
                id="search"
                style={{ textDecoration: "none" }}
              >
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="mb-0 pt-3">
        <Swiper
          slideSize={90}
          trackOffset={15}
          loop
          stuckAtBoundary={false}
          indicator={() => null}
        >
          {topDoctors}
        </Swiper>
      </div>

      <div className="row row-cols-4 g-2 mt-4 doctor-icons-tabs" >
        <div className="col">
          <div className="bg-white text-center rounded-4 p-2 shadow-sm">
            <Link
              to="/all-doctors-fetch"
              className="link-dark"
              style={{ textDecoration: "none" }}
            >
              <img src={doctorImg1} alt="" className="img-fluid px-2" />
              <p className="text-truncate small pt-2 m-0">Doctor</p>
            </Link>
          </div>
        </div>
        <div className="col">
          <div className="bg-white text-center rounded-4 p-2 shadow-sm">
            <Link
              to="/view-appointments"
              className="link-dark"
              style={{ textDecoration: "none" }}
            >
              <img src={doctorImg2} alt="" className="img-fluid px-2" />
              <p className="text-truncate small pt-2 m-0">Appointment</p>
            </Link>
          </div>
        </div>
        <div className="col">
          <div className="bg-white text-center rounded-4 p-2 shadow-sm">
            <Link
              to="/lab-reports"
              className="link-dark"
              style={{ textDecoration: "none" }}
            >
              <img src={doctorImg4} alt="" className="img-fluid px-2" />
              <p className="text-truncate small pt-2 m-0">Lab Reports</p>
            </Link>
          </div>
        </div>
        <div className="col">
          <div className="bg-white text-center rounded-4 p-2 shadow-sm">
            <Link
              to="/favorite-doctor"
              className="link-dark"
              style={{ textDecoration: "none" }}
            >
              <img src={doctorImg3} alt="" className="img-fluid px-2" />
              <p className="text-truncate small pt-2 m-0">Favourite</p>
            </Link>
          </div>
        </div>
      </div>
      <Modal title="Add New Profile" open={isModalOpen} onOk={handleOk} okText={"Add"} onCancel={handleCancel} >
      <>
                  <div className="mb-3 mt-5">
                    <label
                      htmlFor="exampleFormControlFullName"
                      className="form-label mb-1 label-custom-boot"
                    >
                      Full Name
                    </label>
                    <div
                      className="input-group border bg-white rounded-3 py-1"
                      id="exampleFormControlFullName"
                    >
                      <span
                        className="input-group-text bg-transparent rounded-0 border-0"
                        id="fullName"
                      >
                        <span className="mdi mdi-account-circle-outline mdi-18px text-muted" />
                      </span>
                      <input
                        type="text"
                        className="form-control bg-transparent rounded-0 border-0 px-0"
                        placeholder="Type your full name"
                        aria-label="Type your full name"
                        aria-describedby="fullName"
                        onChange={(e) => {
                          setFormValues((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlDOB"
                      className="form-label mb-1 label-custom-boot"
                    >
                      Date of Birth
                    </label>
                    <div
                      className="input-group border bg-white rounded-3 py-1"
                      id="exampleFormControlDOB"
                    >
                      <span
                        className="input-group-text bg-transparent rounded-0 border-0"
                        id="dob"
                      >
                        <span className="mdi mdi-calendar mdi-18px text-muted" />
                      </span>
                      <input
                        type="date"
                        className="form-control bg-transparent rounded-0 border-0 px-0"
                        placeholder="Select your date of birth"
                        aria-label="Select your date of birth"
                        aria-describedby="dob"
                        onChange={(e) => {
                          setFormValues((prev) => ({
                            ...prev,
                            dob: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlGender"
                      className="form-label mb-1 label-custom-boot"
                    >
                      Gender
                    </label>
                    <div
                      className="input-group border bg-white rounded-3 py-1"
                      id="exampleFormControlGender"
                    >
                      <span
                        className="input-group-text bg-transparent rounded-0 border-0"
                        id="gender"
                      >
                        <span className="mdi mdi-gender-male-female mdi-18px text-muted" />
                      </span>
                      <select
                        className="form-select bg-transparent rounded-0 border-0"
                        aria-label="Select your gender"
                        aria-describedby="gender"
                        onChange={(e) => {
                          setFormValues((prev) => ({
                            ...prev,
                            gender: e.target.value,
                          }));
                        }}
                      >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                      </select>
                    </div>
                  </div>


                  <div className="mb-3">
                  <label htmlFor="district" className="form-label mb-1 mt-1">
    District
  </label>
    <Select
      showSearch
      placeholder="Select District"
      optionFilterProp="children"
      
      onChange={onChange}
      // onSearch={onSearch}
      // value={profileDataToChange.district}
      style={{ width: '100%', border: "none", outline: "none", height:"3rem" }}
    >
      {Object.keys(districts).map((district, index) => (
        
        <>
        <Select.Option disabled={true} style={{height:"3rem"}}>
          {district}
        </Select.Option>
        {districts[district].map((district, index) => (
        <Select.Option key={index} value={district}>
          {district}
        </Select.Option>))}
        </>
      ))}
    </Select>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlFullName"
                      className="form-label mb-1 label-custom-boot"
                    >
                      Block
                    </label>
                    <div
                      className="input-group border bg-white rounded-3 py-1"
                      id="exampleFormControlFullName"
                    >
                      <span
                        className="input-group-text bg-transparent rounded-0 border-0"
                        id="fullName"
                      >
<span className="mdi mdi-map-marker-outline mdi-18px text-muted" />
                      </span>
                      <input
                        type="text"
                        className="form-control bg-transparent rounded-0 border-0 px-0"
                        placeholder="Enter Block"
                        aria-label="Enter Block"
                        aria-describedby="fullName"
                        onChange={(e) => {
                          setFormValues((prev) => ({
                            ...prev,
                            block: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>
                </>
      </Modal>
      <Modal
  title="Change User Profile"
  open={selectPatientModalOpen}
  onOk={showModal}
  okText={"Add New Profile"}
  onCancel={handleCancelModals}
  cancelButtonProps={{ style: { display: 'none' } }}  // Remove the Close button
  okButtonProps={{
    style: { width: 'auto', margin: '0 auto', display: 'block' },
    disabled: extraPatientsData?.length >= 5 && true,
  }}
  closeIcon={<span style={{ fontWeight: 'bold', color: "black" }}><RxCross2 size={26}/></span>}  // Make the cross icon bold
>
  <>
    {extraPatientsData.map((data) => {
      return (
        <Card
          bordered={true}
          style={{ marginBottom: "0.3rem" }}
          key={data.id} // Add a key for better performance
        >
          <div
            value={data.id}
            onClick={() => {
              changeLogin(data.id);
            }}
            style={{
              display: "flex",
              gap: "1rem",
              width: "100%",
              padding: "0.5rem",
            }}
          >
            <div>
              <img
                width={60}
                height={60}
                style={{
                  border: "1px solid transparent",
                  borderRadius: "100%",
                }}
                src={data?.profile_picture ? test_url_images + data?.profile_picture : user}
                alt="Profile"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <p className="mb-0 fw-bold" style={{ fontSize: "1.1rem" }}>{data?.full_name}</p>
              <small className="mb-0">{data?.ujur_id} | {data?.gender}</small>
            </div>
          </div>
        </Card>
      );
    })}
  </>
</Modal>



      <div className="p-3 mb-2">
        {latestAppointment?.id && (
          <Link
            to={`/appointment-details/${latestAppointment.id}`}
            class="link-dark"
            style={{ textDecoration: "none" }}
          >
            <div class="bg-white d-flex align-items-center gap-3 p-3 mb-1 shadow-sm">
              <img
                src={
                  test_url_images + latestAppointment?.doctor?.profile_picture
                }
                alt=""
                class="img-fluid rounded-4 voice-img"
              />
              <div>
                <h6 class="mb-1">Dr. {latestAppointment?.doctor?.full_name}</h6>
                <p class="text-muted mb-2">
                  {latestAppointment?.doctor?.education}
                </p>
                <p class="text-muted m-0">
                  <span class="mdi mdi-calendar-month text-primary me-1"></span>
                  {moment(latestAppointment?.date_appointment).format(
                    "DD-MM-YYYY"
                  )}
                </p>
              </div>
              <div class="ms-auto">
                <div class="d-flex justify-content-end">
                  {/* <div class="bg-info-subtle rounded-circle icon mb-3">
                  </div> */}
                </div>
                {latestAppointment?.status == "pending" ? (
                  <>
                  <span class="badge bg-success-subtle text-success fw-normal rounded-pill px-2 mb-2">
                    UPCOMING
                  </span>
                  <p style={{
                    fontWeight:800,
                    fontSize:"0.9rem"
                  }}>Token No. {latestAppointment?.appointment_slot}</p>
                  </>
                ) : latestAppointment?.status == "cancel" ?
                <span class="badge bg-danger-subtle text-danger fw-normal rounded-pill px-2 mb-2">
                CANCELLED
              </span>:""
              
              }
              </div>
            </div>
          </Link>
        )}
      </div>

      <div className="mb-3">
        <div style={{
          display:"flex",
          alignItems:"center",
          justifyContent:"space-between"
        }}>
        <h6 className="mb-2 pb-1 fw-bold px-3 text-black">Top Hospitals</h6>
        <p className="px-3" 
          onClick={()=>{
            router.push(`/all-hospital-fetch`);
          }}
        style={{
          color:"blue"
        }}>{"View All >"}</p>
        </div>
        <Swiper
          slideSize={90}
          trackOffset={15}
          loop
          stuckAtBoundary={false}
          indicator={() => null}
        >
          {hospitalsLoading?topHospitalsLoader: topHospitals}
        </Swiper>
      </div>
      <div className="p-3">
        <div style={{
      display:"flex",
          alignItems:"center",
          justifyContent:"space-between"
        }}>
        <h6 className="mb-2 pb-1 fw-bold text-black">Available Doctor</h6>
        <p className="px-3" 
        onClick={()=>{
          router.push(`/all-doctors-fetch`);
        }}
        style={{
          color:"blue"
        }}>{"View All >"}</p>
        </div>
        <div className="row row-cols-2 g-3" style={{marginBottom:"6rem"}}>
        {doctorsLoading ?
        <>
        <div className="col" >
                <div
                  className="card rounded-4 border-0 position-relative shadow-sm overflow-hidden"
                >
                  <Skeleton />
                </div>
              </div>
        <div className="col" >
                <div
                  className="card rounded-4 border-0 position-relative shadow-sm overflow-hidden"
                >
                  <Skeleton />
                </div>
              </div>
        <div className="col" >
                <div
                  className="card rounded-4 border-0 position-relative shadow-sm overflow-hidden"
                >
                  <Skeleton />
                </div>
              </div>
        <div className="col" >
                <div
                  className="card rounded-4 border-0 position-relative shadow-sm overflow-hidden"
                >
                  <Skeleton />
                </div>
              </div>
              </>
  :
       
          (doctorsData.map((each) => {
            console.log(each)
            return (
              <div className="col" >
                <div
                  className="card rounded-4 border-0 position-relative shadow-sm overflow-hidden"
                  onClick={() => {
                    router.push(`/about-doctor/${each.id}`);
                  }}
                >
                  <div className="position-absolute m-2">
                    {each?.is_active ? (
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
                    src={test_url_images + each?.profile_picture}
                    style={{height:"9rem", objectFit:"cover"}}
                    alt=""
                    className="card-img-top top-doctor-img"
                  />
                  <div className="card-body small p-3 osahan-card-body" style={{
                        height: "11rem"
                  }}>
                    <h6 className="card-title fs-14 mb-1">
                      Dr. {each?.full_name}
                    </h6>
                    <p className="card-text text-muted mb-1">
                      {each?.specialization}
                    </p>
                    <div className="d-flex align-items-center gap-3 small mb-3">
                      <div>
                        <span className="mdi mdi-star text-warning me-1" />
                        {each?.avg_reviews ? each?.avg_reviews : "N/A"} (
                        {each?.total_reviews && each?.total_reviews})
                      </div>
                      <div>
                        <span className="mdi mdi-medical-bag text-primary me-1" />
                        {each?.experience}+ Years
                      </div>
                    </div>
                    <h6 className="mb-0">
                      Rs {each?.doctor_slots[0]?.morning_slots_price}
                      <span className="text-muted small ms-1">Inc.Gst</span>
                    </h6>
                  </div>
                </div>
              </div>
            );
            }))}
        </div>

      </div>
      <BottomNav path="home" />

    </>
  );
};

export default Home;
