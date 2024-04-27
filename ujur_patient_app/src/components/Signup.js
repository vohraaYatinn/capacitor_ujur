import React, { useEffect, useState } from 'react'
import { useRouter } from '../hooks/use-router';
import useAxios from '../network/useAxios';
import { patientSignUp } from '../urls/urls';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateToken } from '../redux/reducers/functionalities.reducer';
import {districts} from '../demo/districts';
import { Select } from 'antd';


const Signup = () => {
//Constants & additionals
  const router = useRouter();
  const { phone } = useParams();
  const dispatch = useDispatch();

  
  //useAxios
  const [signUpResponse, signUpError, signUpLoading, signUpFetch] = useAxios();

  //useState
  const [message, setMessage] = useState({
    message: "",
    isShow: false,
  });
  const [formValues, setFormValues] = useState({
    phoneNumber:phone,
    fullName:"",
    email:"",
    dob:"",
    gender:"male",
    district:districts.length > 0 ? districts[0] : ""
  });

  const onChange = (value) => {
    console.log(`selected ${value}`);
    // Update the selected district in your formValues state
    setFormValues((prev) => ({
      ...prev,
      district: value,
    }));
  };
  
  const onSearch = (value) => {
    console.log('search:', value);
    // Perform any search-related functionality if needed
  };
  

  //functions
  const signupFunction = () => {
    signUpFetch(patientSignUp(formValues));
  };

  //useEffects
  useEffect(() => {
    if (signUpResponse?.result == "success") {
      localStorage.setItem('storedToken', signUpResponse?.token);

      dispatch(updateToken(signUpResponse?.token))
      router.push(`/home`);
    }
  }, [signUpResponse]);

  useEffect(() => {
    if (signUpError) {
      setMessage({
        message: signUpError?.response?.data,
        isShow: true,
      });
    }
  }, [signUpError]);


  return (
<>
  <div className="sign-in p-4">
    <div className="d-flex align-items-start justify-content-between mb-4">
      <div>
        <span className="mdi mdi-account-plus-outline display-1 text-primary" />
        <h2 className="my-3 fw-bold">Getting Started</h2>
        <p className="text-muted mb-0">Create an account to continue!</p>
      </div>

    </div>
    <form>
    <div className="mb-3 mt-3">
        <label htmlFor="exampleFormControlName" className="form-label mb-1">
          Full Name
        </label>
        <div
          className="input-group border bg-white rounded-3 py-1"
          id="exampleFormControlName"
        >
          <span
            className="input-group-text bg-transparent rounded-0 border-0"
            id="name"
          >
            <span className="mdi mdi-account-circle-outline mdi-18px text-muted" />
          </span>
          <input
            type="text"
            className="form-control bg-transparent rounded-0 border-0 px-0"
            placeholder="Type your name"
            aria-label="Type your name"
            aria-describedby="name"
            value={formValues?.fullName}
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
        <label htmlFor="exampleFormControlEmail" className="form-label mb-1">
          Email
        </label>
        <div
          className="input-group border bg-white rounded-3 py-1"
          id="exampleFormControlEmail"
        >
          <span
            className="input-group-text bg-transparent rounded-0 border-0"
            id="mail"
          >
            <span className="mdi mdi-email-outline mdi-18px text-muted" />
          </span>
          <input
            type="email"
            className="form-control bg-transparent rounded-0 border-0 px-0"
            placeholder="Type your email or phone"
            aria-label="Type your email or phone"
            aria-describedby="mail"
            value={formValues?.email}
            onChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
          />
        </div>
      </div>
      <div className="mb-3 mt-3">
        <label htmlFor="exampleFormControlName" className="form-label mb-1">
          Date of Birth
        </label>
        <div
          className="input-group border bg-white rounded-3 py-1"
          id="exampleFormControlName"
        >
          <span
            className="input-group-text bg-transparent rounded-0 border-0"
            id="name"
          >
            <span className="mdi mdi-account-circle-outline mdi-18px text-muted" />
          </span>
          <input
            type="date"
            className="form-control bg-transparent rounded-0 border-0 px-0"
            placeholder="Select Date of birth"
            aria-label="Select Date of birth"
            value={formValues?.dob}
            onChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                dob: e.target.value,
              }));
            }}
          />
        </div>
      </div>
      <div className="mb-3 mt-3">
        <label htmlFor="gender" className="form-label mb-1">
          Gender
        </label>
        <div
          className="input-group border bg-white rounded-3 py-1"
          id="gender"
        >
          <span
            className="input-group-text bg-transparent rounded-0 border-0"
            id="gender"
          >
            <span className="mdi mdi-account-circle-outline mdi-18px text-muted" />
          </span>
          <select
  className="form-control bg-transparent rounded-0 border-0 px-0"
  aria-label="Select your gender"
  aria-describedby="gender"
  value={formValues?.gender}
  onChange={(e) => {
    setFormValues((prev) => ({
      ...prev,
      gender: e.target.value,
    }));
  }}
>
  <option value="male">Male</option>
  <option value="female">Female</option>
</select>

        </div>
      </div>
      <div className="mb-3 mt-3">
  <label htmlFor="district" className="form-label mb-1">
    District
  </label>
  <div className="input-group border bg-white rounded-3 py-1" id="district">
    <Select
      showSearch
      placeholder="Select District"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      value={formValues.district}
      style={{ width: '100%' }}
    >
      {districts.map((district, index) => (
        <Select.Option key={index} value={district}>
          {district}
        </Select.Option>
      ))}
    </Select>
  </div>
</div>


      <div>
        <a
          className="btn btn-info btn-lg w-100 rounded-4 mb-3"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasBottomCountry"
          aria-controls="offcanvasBottomCountry"
          onClick={()=>{
            signupFunction()
          }}
        >
          Create Account
        </a>
        <p className="text-muted text-center small">
          Already have an account?{" "}
          <a className="text-primary" href="sign-in.html">
            Sign In
          </a>
        </p>
      </div>
    </form>
  </div>

  <div
    className="offcanvas offcanvas-bottom bg-light overflow-hidden"
    tabIndex={-1}
    id="offcanvasBottomCountry"
    aria-labelledby="offcanvasBottomCountryLabel"
    style={{ height: "85%" }}
  >
    <form className="p-3 shadow-sm bg-white">
      <div className="input-group rounded-4 py-1 px-3 border bg-white">
        <span
          className="input-group-text bg-transparent text-muted border-0 p-0"
          id="search"
        >
          <span className="mdi mdi-magnify mdi-24px" />
        </span>
        <input
          type="text"
          className="form-control text-muted border-0 px-3"
          placeholder="Search country"
          aria-label="Search"
          aria-describedby="search"
        />
      </div>
    </form>
    <div className="offcanvas-body p-0">
      <div>
        <a href="verify.html" className="link-dark">
          <div className="d-flex align-items-center gap-3 border-bottom p-3 border-bottom">
            <img
              src="img/flags/bangladesh.png"
              alt=""
              className="img-fluid rounded-circle flag-img"
            />
            <div>Bangladesh</div>
            <p className="text-black fs-14 m-0 ms-auto">+880</p>
          </div>
        </a>
        <a href="verify.html" className="link-dark">
          <div className="d-flex align-items-center gap-3 border-bottom p-3 border-bottom">
            <img
              src="img/flags/india.png"
              alt=""
              className="img-fluid rounded-circle flag-img"
            />
            <div>India</div>
            <p className="text-black fs-14 m-0 ms-auto">+91</p>
          </div>
        </a>
        <a href="verify.html" className="link-dark">
          <div className="d-flex align-items-center gap-3 border-bottom p-3 border-bottom">
            <img
              src="img/flags/usa.png"
              alt=""
              className="img-fluid rounded-circle flag-img"
            />
            <div>USA</div>
            <p className="text-black fs-14 m-0 ms-auto">+1</p>
          </div>
        </a>
        <a href="verify.html" className="link-dark">
          <div className="d-flex align-items-center gap-3 border-bottom p-3 border-bottom">
            <img
              src="img/flags/south-arabica.png"
              alt=""
              className="img-fluid rounded-circle flag-img"
            />
            <div>South Arabica</div>
            <p className="text-black fs-14 m-0 ms-auto">+966</p>
          </div>
        </a>
        <a href="verify.html" className="link-dark">
          <div className="d-flex align-items-center gap-3 border-bottom p-3 border-bottom">
            <img
              src="img/flags/australia.png"
              alt=""
              className="img-fluid rounded-circle flag-img"
            />
            <div>Australia</div>
            <p className="text-black fs-14 m-0 ms-auto">+61</p>
          </div>
        </a>
        <a href="verify.html" className="link-dark">
          <div className="d-flex align-items-center gap-3 border-bottom p-3 border-bottom">
            <img
              src="img/flags/indonasia.png"
              alt=""
              className="img-fluid rounded-circle flag-img"
            />
            <div>Indonesia</div>
            <p className="text-black fs-14 m-0 ms-auto">+62</p>
          </div>
        </a>
        <a href="verify.html" className="link-dark">
          <div className="d-flex align-items-center gap-3 border-bottom p-3 border-bottom">
            <img
              src="img/flags/malaysia.png"
              alt=""
              className="img-fluid rounded-circle flag-img"
            />
            <div>Malaysia</div>
            <p className="text-black fs-14 m-0 ms-auto">+60</p>
          </div>
        </a>
        <a href="verify.html" className="link-dark">
          <div className="d-flex align-items-center gap-3 border-bottom p-3 border-bottom">
            <img
              src="img/flags/usa.png"
              alt=""
              className="img-fluid rounded-circle flag-img"
            />
            <div>USA</div>
            <p className="text-black fs-14 m-0 ms-auto">+1</p>
          </div>
        </a>
        <a href="verify.html" className="link-dark">
          <div className="d-flex align-items-center gap-3 border-bottom p-3 border-bottom">
            <img
              src="img/flags/south-arabica.png"
              alt=""
              className="img-fluid rounded-circle flag-img"
            />
            <div>South Arabica</div>
            <p className="text-black fs-14 m-0 ms-auto">+966</p>
          </div>
        </a>
        <a href="verify.html" className="link-dark">
          <div className="d-flex align-items-center gap-3 border-bottom p-3 border-bottom">
            <img
              src="img/flags/australia.png"
              alt=""
              className="img-fluid rounded-circle flag-img"
            />
            <div>Australia</div>
            <p className="text-black fs-14 m-0 ms-auto">+61</p>
          </div>
        </a>
        <a href="verify.html" className="link-dark">
          <div className="d-flex align-items-center gap-3 border-bottom p-3 border-bottom">
            <img
              src="img/flags/indonasia.png"
              alt=""
              className="img-fluid rounded-circle flag-img"
            />
            <div>Indonesia</div>
            <p className="text-black fs-14 m-0 ms-auto">+62</p>
          </div>
        </a>
        <a href="verify.html" className="link-dark">
          <div className="d-flex align-items-center gap-3 border-bottom p-3 border-bottom">
            <img
              src="img/flags/malaysia.png"
              alt=""
              className="img-fluid rounded-circle flag-img"
            />
            <div>Malaysia</div>
            <p className="text-black fs-14 m-0 ms-auto">+60</p>
          </div>
        </a>
      </div>
    </div>
  </div>

  {/* Bootstrap bundle js */}
  {/* Jquery js */}
  {/* Sidebar js */}
  {/* Custom js */}
</>
  )
}

export default Signup