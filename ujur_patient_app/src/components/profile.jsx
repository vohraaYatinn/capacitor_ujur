import React, { useEffect, useState } from "react";
// import profileImg from "../img/review/profile-2.jpg";
import { useRouter } from "../hooks/use-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateNavbar, updateToken } from "../redux/reducers/functionalities.reducer";
import BottomNav from "./BottomNav";
import { Button } from "antd-mobile";
import { changeJwtOfPatient, fetchprofiles, patientAddNewProfile } from "../urls/urls";
import useAxios from "../network/useAxios";
import { Image, Modal, Select } from 'antd';
import {districts} from '../demo/districts';
import { test_url_images } from "../config/environment";
import user from "../img/home/user.png";

const CustomerProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [profileData, setprofileData] = useState([]);
  const [formValues, setFormValues] = useState({
    gender: "M",
  });


  //functions


  useEffect(()=>{console.log(formValues)},[formValues])
  const fetchPatientprofile = () => {
    profileFetch(fetchprofiles({ patientId: 1 }));
  };

  //useState
  const [message, setMessage] = useState({
    message: "",
    isShow: false,
  });

  //useAxios
  const [
    patientSignupResponse,
    patientSignupError,
    patientSignupLoading,
    patientSignupFetch,
  ] = useAxios();
  const [
    changeJwtResponse,
    changeJwtError,
    changeJwtLoading,
    changeJwtFetch,
  ] = useAxios();
  const [profileResponse, profileError, profileLoading, profileFetch] =
    useAxios();

  //useEffects

  useEffect(() => {
    fetchPatientprofile();
  }, []);
  useEffect(() => {
    if (profileResponse?.result == "success") {
      setprofileData(profileResponse?.data);

    }
  }, [profileResponse]);
  useEffect(() => {
    if (patientSignupResponse?.result == "success") {
      router.push(`/home`);
    }
  }, [patientSignupResponse]);
  useEffect(() => {
    if (patientSignupError) {
      setMessage({
        message: patientSignupError?.response?.data,
        isShow: true,
      });
    }
  }, [patientSignupError]);
  useEffect(() => {
    if (changeJwtResponse?.result == "success") {
      localStorage.removeItem('storedToken');
      localStorage.setItem('storedToken', changeJwtResponse?.token);
      dispatch(updateToken(changeJwtResponse?.token))

    }
  }, [changeJwtResponse]);

  return (
    <>
      <div class="my-profile d-flex flex-column vh-100">
        <div class="d-flex align-items-center justify-content-between mb-auto p-3 bg-white shadow-sm osahan-header">
          <a
            onClick={() => router.back()}
            class="text-dark bg-white shadow rounded-circle icon"
          >
            <span class="mdi mdi-arrow-left mdi-18px"></span>
          </a>
          <div class="d-flex align-items-center gap-2 ms-3 me-auto">
            <a>
      
            </a>

            <div>
              {/* <select
              onChange={(e)=>{
                changeLogin(e.target.value)
              }}
                style={{
                  fontSize: "1rem",
                  width: "8rem",
                  height: "1.5rem",
                  border: "transparent",
                }}
              >
<option value="">
                  <p class="mb-0 fw-bold">Self</p>
                </option>
                {extraPatientsData.map((data)=>{
                return(
                  <option value={data.id}>
                  <p class="mb-0 fw-bold">{data?.full_name}</p>
                </option>
                
                )
                })}
                <option>
                <Button type="primary" onClick={showModal} style={{background:"rgb(12,109,253)", color:"white"}}>
        Add New Profile
      </Button>
                </option>
              
              
              </select> */}
            </div>
          </div>
          <div class="d-flex align-items-center gap-3">
            <a
              class="toggle d-flex align-items-center justify-content-center fs-5 bg-white shadow rounded-circle icon hc-nav-trigger hc-nav-1"
              onClick={() => {
                dispatch(updateNavbar());
              }}
              role="button"
              aria-controls="hc-nav-1"
            >
              <i class="bi bi-list"></i>
            </a>
          </div>
        </div>


        {/* <Button
          className="mt-3"
          onClick={() => {
            Modal.alert({
              onConfirm: () => {
                console.log(formValues)
                submitUserSignup(formValues)
              },
              title: "Add New Profile",
              content: (
              
              ),
              showCloseButton: true,
              confirmText: "Add Profile",
            });
          }}
        >
          Add New Profile
        </Button> */}
    
      
        <div class="vh-100 my-auto overflow-auto body-fix-osahan-footer">
          <div class="p-3">
            <div class="bg-white rounded-4 px-3 pt-3 overflow-hidden edit-profile-back shadow mb-3">
              <h6 class="pb-2">Personal Info</h6>
              <div style={{display:"flex", alignItems:"center", justifyContent:"center", width:"100%", marginBottom:"2rem"}}>
              <Image
    src={ profileData.profile_picture ? test_url_images + profileData.profile_picture : user}
    style={{border:"1px solid transparent", borderRadius:"100px", height:"10rem", width:"10rem"}}
  />
  </div>
           
              <div class="d-flex">
              <div class="col">
                  <p>
                    <span class="text-muted small">Ujur Id</span>
                    <br />
                    {profileData?.ujur_id}
                  </p>
                </div>
                <div class="col">
                  <p>
                    <span class="text-muted small">Name</span>
                    <br />
                    {profileData?.full_name}
                  </p>
                </div>

              </div>
              <div class="d-flex">
                <div class="col">
                  <p>
                    <span class="text-muted small">Gender</span>
                    <br />
                    {profileData?.gender == "male" ? "Male" : "Female"}
                  </p>
                </div>
                <div class="col">
                  <p>
                    <span class="text-muted small">Height</span>
                    <br />
                    {profileData?.height} Cm
                  </p>
                </div>
              </div>

              <div class="d-flex">
                <div class="col">
                  <p>
                    <span class="text-muted small">Blood Group</span>
                    <br />
                    {profileData?.blood_group}
                  </p>
                </div>
                <div class="col">
                  <p>
                    <span class="text-muted small">Weight</span>
                    <br />
                    {profileData?.weight} KG
                  </p>
                </div>
              </div>
              <div class="d-flex">
              <div class="col">
                  <p>
                    <span class="text-muted small">Date of Birth</span>
                    <br />
                    {profileData?.date_of_birth}
                  </p>
                </div>
                <div class="col">
                  <p>
                    <span class="text-muted small">Email</span>
                    <br />
                    {profileData?.user?.email || "N/A"}
                  </p>
                </div>
            
                </div>
                <div class="d-flex">

                <div class="col">
                  <p>
                    <span class="text-muted small">District</span>
                    <br />
                    {profileData?.district}
                  </p>
                </div>
                <div class="col">
                  <p>
                    <span class="text-muted small">Block</span>
                    <br />
                    {profileData?.block}
                  </p>
                </div>
              </div>
              <Link to="/change-profile" className="link-dark">
                <div className="edit-profile-icon bg-primary text-white">
                  <span className="mdi mdi-square-edit-outline h2 m-0 pt-3 pe-2" />
                </div>
              </Link>
            </div>
            <div class="rounded-4 shadow overflow-hidden" style={{marginBottom: "3rem"}}>
              <Link to="/view-appointments" class="link-dark">
                <div class="bg-white d-flex align-items-center justify-content-between p-3 border-bottom">
                  <h6 class="m-0">My Appointment</h6>
                  <span class="mdi mdi-chevron-right mdi-24px icon shadow rounded-pill"></span>
                </div>
              </Link>
              <Link to="/lab-reports" class="link-dark">
                <div class="bg-white d-flex align-items-center justify-content-between p-3 border-bottom">
                  <h6 class="m-0">Lab Reports</h6>
                  <span class="mdi mdi-chevron-right mdi-24px icon shadow rounded-pill"></span>
                </div>
              </Link>
              <Link to="/favorite-doctor" class="link-dark">
                <div class="bg-white d-flex align-items-center justify-content-between p-3" >
                  <h6 class="m-0">Favorite Doctor</h6>
                  <span class="mdi mdi-chevron-right mdi-24px icon shadow rounded-pill"></span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <BottomNav path={"profile"} />
      </div>
    </>
  );
};

export default CustomerProfile;
