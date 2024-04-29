import React, { useEffect, useState } from "react";
// import profileImg from "../img/review/profile-2.jpg";
import { useRouter } from "../hooks/use-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateNavbar, updateToken } from "../redux/reducers/functionalities.reducer";
import BottomNav from "./BottomNav";
import { Button, Modal } from "antd-mobile";
import { changeJwtOfPatient, fetchprofiles, patientAddNewProfile } from "../urls/urls";
import useAxios from "../network/useAxios";
import { Select } from 'antd';
import {districts} from '../demo/districts';

const CustomerProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [profileData, setprofileData] = useState([]);
  const [extraPatientsData, setExtraPatientsData] = useState([]);
  const [formValues, setFormValues] = useState({
    gender: "M",
  });

  //functions
  const changeLogin = (data) =>{
    if(data){
      changeJwtFunction(data)
    }
  }
  const changeJwtFunction = (id) => {
    changeJwtFetch(changeJwtOfPatient({
      patientId:id
    }));
  };
  const submitUserSignup = () => {
    patientSignupFetch(patientAddNewProfile(formValues));
  };
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
  const onChange = (value) => {
    setFormValues((prev) => ({
       ...prev,
       district: value,
     }));
   };
  useEffect(() => {
    fetchPatientprofile();
  }, []);
  useEffect(() => {
    if (profileResponse?.result == "success") {
      setprofileData(profileResponse?.data);
      setExtraPatientsData(profileResponse?.linked_patient)
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
      router.push(`/home`);

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
              <select
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
              
              
              </select>
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
        <Button
          className="mt-3"
          onClick={() => {
            Modal.alert({
              onConfirm: () => {
                submitUserSignup()
              },
              title: "Add New Profile",
              content: (
                <>
                  <div className="mb-3">
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
                      htmlFor="exampleFormControlFullName"
                      className="form-label mb-1 label-custom-boot"
                    >
                     Email
                    </label>
                    <div
                      className="input-group border bg-white rounded-3 py-1"
                      id="exampleFormControlFullName"
                    >
                      <span
                        className="input-group-text bg-transparent rounded-0 border-0"
                        id="fullName"
                      >
<span className="mdi mdi-email-outline mdi-18px text-muted" />
                      </span>
                      <input
                        type="text"
                        className="form-control bg-transparent rounded-0 border-0 px-0"
                        placeholder="Type your email"
                        aria-label="Type your email"
                        aria-describedby="email"
                        onChange={(e) => {
                          setFormValues((prev) => ({
                            ...prev,
                            email: e.target.value,
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
  <div className="input-group border bg-white rounded-3 py-1" id="district">
    <Select
      showSearch
      placeholder="Select District"
      optionFilterProp="children"
      onChange={onChange}
      // onSearch={onSearch}
      // value={profileDataToChange.district}
      style={{ width: '100%', border: "none", outline: "none" }}
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
              ),
              showCloseButton: true,
              confirmText: "Add Profile",
            });
          }}
        >
          Add New Profile
        </Button>
        <div class="vh-100 my-auto overflow-auto body-fix-osahan-footer">
          <div class="p-3">
            <div class="bg-white rounded-4 px-3 pt-3 overflow-hidden edit-profile-back shadow mb-3">
              <h6 class="pb-2">Personal Info</h6>
              <div class="d-flex">
                <div class="col">
                  <p>
                    <span class="text-muted small">Name</span>
                    <br />
                    {profileData?.full_name}
                  </p>
                </div>
                <div class="col">
                  <p>
                    <span class="text-muted small">Date of Birth</span>
                    <br />
                    {profileData?.date_of_birth}
                  </p>
                </div>
              </div>
              <div class="d-flex">
                <div class="col">
                  <p>
                    <span class="text-muted small">Gender</span>
                    <br />
                    {profileData?.gender == "M" ? "Male" : "Female"}
                  </p>
                </div>
                <div class="col">
                  <p>
                    <span class="text-muted small">Phone</span>
                    <br />
                    {profileData?.user?.phone}
                  </p>
                </div>
              </div>
              <div class="d-flex">
                <div class="col">
                  <p>
                    <span class="text-muted small">Email</span>
                    <br />
                    {profileData?.user?.email || "N/A"}
                  </p>
                </div>
                <div class="col">
                  <p>
                    <span class="text-muted small">District</span>
                    <br />
                    New Delhi
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
