import { Swiper } from "antd-mobile";
import React, { useEffect, useState } from "react";
import topDoctor1 from "../img/transparent/1.png";
import topDoctor2 from "../img/transparent/2.png";
import topDoctor3 from "../img/transparent/3.png";
import doctorImg1 from "../img/home/doctor.png";
import doctorImg2 from "../img/home/schedule.png";
import doctorImg3 from "../img/home/medicine.png";
import doctorImg4 from "../img/home/prescription.png";
import doctorImg5 from  "../img/home/svg1.jpg";
import doctorImg6 from  "../img/home/heart_svg.png";

import { Link, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateNavbar } from "../redux/reducers/functionalities.reducer";
import BackNavbar from "./BackNavbar";
import BottomNav from "./BottomNav";
import useAxios from "../network/useAxios";
import {
  fetchCustomerDoctors,
  fetchCustomerlatestAppointment,
  fetchCustomerHospital,
} from "../urls/urls";
import { useRouter } from "../hooks/use-router";
import { test_url_images } from "../config/environment";
import moment from "moment";
import logo from "../img/logo/logo.png";

const Home = () => {
  const router = useRouter();
  const [doctorsData, setDoctorsData] = useState([]);
  const [hospitalDetails, setHospitalDetails] = useState([]);
  const [latestAppointment, setLastestAppointment] = useState([]);

  //useAxios
  const [
    fetchAppointmentResponse,
    fetchAppointmentError,
    fetchAppointmentLoading,
    fetchAppointmentFetch,
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

  //useEffects
  useEffect(() => {
    fetchAppointmentsFunc();
    fetchHospitalsFunc();
    fetchDoctorsFunc();
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

  const dispatch = useDispatch();

  const topDoctor = [topDoctor1, topDoctor2, topDoctor3,];

  const topDoctors = topDoctor.map((color, index) => (
    <Swiper.Item key={index}>
      <div className="available-doctor-item">
        <div className="btn-secondary text-white rounded-4 p-3 doctor-book-back">
          <h1 className="mb-1 doctor-book-back-title">
          {index === 0 ? 'Cardiologist' : index === 1 ? 'Dermatologist' : index === 2 ? 'Pediatrician' : ''}
          {/* {index === 0 ? 'Cardiologist:' : index === 1 ? 'Dermatologist:' : index ===3 ? 'Pediatrician'} */}
          {/* Cardiologist: */}
          <br />
            <span className="h4 text-warning overflow-hidden rounded-4 m-0">
              <b className="bg-warning text-black px-1 rounded">
                {/* Doctor for Your */}
                {index === 0 ? 'Nearby cardiologist' : index === 1 ? 'Nearby Dermatologist' : index === 2 ? 'Nearby Pediatrician' : ''}
              </b>
              <br/><b className="text-black">{" "}Needs!</b>
            </span>
          </h1>
          {/* <p className="mb-2 text-white small">Book Now and Get 30% OFF</p> */}
          <a href="#" className="btn btn-sm btn-dark btn-book mt-2">
            SEARCH NOW <i className="bi bi-arrow-right" />
          </a>
          <div className="doctor-book-img">
            <img src={color} alt="" className="img-fluid" />
          </div>
        </div>
      </div>
    </Swiper.Item>
  ));

  const topHospitals = hospitalDetails.map((each, index) => (
    <Swiper.Item key={index}>
      <div className="top-doctor-item">
        <Link to={`/hospital-overview/${each?.id}`} className="link-dark">
          <div className="card bg-white border-0 rounded-4 shadow-sm overflow-hidden">
            <img
              src={test_url_images + each?.logo}
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
                {each?.description && each.description.length > 30
                  ? each.description.substring(0, 30) + "..."
                  : each.description}
              </p>
              <p className="mt-1">
                <span className="mdi mdi-star text-warning me-1" />
                4.9 (5,380)
              </p>
            </div>
          </div>
        </Link>
      </div>
    </Swiper.Item>
  ));

  return (
    <>
      <div className="bg-white shadow-sm">
        <div className="d-flex align-items-center justify-content-between mb-auto p-3 osahan-header">
          <div className="d-flex align-items-center gap-2 me-auto">
            <a>
              <img
                src={logo}
                alt=""
                className="img-fluid rounded-circle icon"
              />
            </a>
            <div className="ps-1"></div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Link
              to="/favorite-doctor"
              className="bg-white shadow rounded-circle icon"
            >
              <span className="mdi mdi-cards-heart-outline mdi-18px text-primary" />
            </Link>
            <Link
              to="/notifications"
              className="bg-white shadow rounded-circle icon"
            >
              <span className="mdi mdi-bell-outline mdi-18px text-primary" />
            </Link>
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
                <span className="mdi mdi-filter-outline mdi-18px" />
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
              to="/search-doctor"
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
                {latestAppointment?.status == "pending" && (
                  <span class="badge bg-success-subtle text-success fw-normal rounded-pill px-2">
                    UPCOMING
                  </span>
                )}
              </div>
            </div>
          </Link>
        )}
      </div>

      <div className="mb-3">
        <h6 className="mb-2 pb-1 fw-bold px-3 text-black">Top Hospitals</h6>
        <Swiper
          slideSize={90}
          trackOffset={15}
          loop
          stuckAtBoundary={false}
          indicator={() => null}
        >
          {topHospitals}
        </Swiper>
      </div>
      <div className="p-3">
        <h6 className="mb-2 pb-2 fw-bold text-black">Available Doctor</h6>
        <div className="row row-cols-2 g-3">
          {doctorsData.map((each) => {
            return (
              <div className="col" style={{marginBottom: "8rem"}}>
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
                      {each?.education}
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
          })}
        </div>

        <BottomNav path="home" />
      </div>
    </>
  );
};

export default Home;
