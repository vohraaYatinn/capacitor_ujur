import React, { useEffect, useState } from 'react'
import { useRouter } from '../hooks/use-router';
import useAxios from '../network/useAxios';
import { patientSignUp } from '../urls/urls';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateToken } from '../redux/reducers/functionalities.reducer';
import {districts} from '../demo/districts';
import { Button, Select } from 'antd';
import { Alert } from "antd";
import { DotLoading } from 'antd-mobile';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadOutlined } from '@ant-design/icons';

const Signup = () => {
//Constants & additionals
  const router = useRouter();
  const { phone } = useParams();
  const dispatch = useDispatch();
  const [isUploaded, setIsUploaded] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

    const handleUpload = (info) => {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    };
  
    const customRequest = ({ file, onSuccess, onError }) => {
      // const formData = new FormData();
      // formData.append('image', file);
      setFormValues((prev) => ({
        ...prev,
        document: file,
      }));
      onSuccess("ok");
    };


  //useAxios
  const [signUpResponse, signUpError, signUpLoading, signUpFetch] = useAxios();

  //useState
  const [message, setMessage] = useState({
    message: "",
    isShow: false,
  });
  const [showCPass, setShowCPass] = useState(false);

  // const handleUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     console.log("Selected file:", file);
  //     setFormValues((prev) => ({
  //       ...prev,
  //       document: file,
  //     }));
  //     setIsUploaded(true);
  //   }
  // };
  const [formValues, setFormValues] = useState({
    phoneNumber:"+91-",
    fullName:"",
    email:"",
    dob:"",
    gender:"M",
    district:districts.length > 0 ? districts[0] : ""
  });

  const onChange = (value) => {
    setFormValues((prev) => ({
      ...prev,
      district: value,
    }));
  };
  
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.email){
      errors.email = "Email is required";
    }
    else if (!regex.test(values.email)) {
      errors.email = "Email is invalid";
    }
    if(!values.firstName){
      errors.firstName = "First name is required"
    }
    if(!values.lastName){
      errors.lastName = "Last name is required"
    }
    if(!values.dob){
      errors.dob = "Date of Birth is required"
    }
    if(!values.district){
      errors.district = "District is required"
    }
    if(!values.block){
      errors.block = "Block is required"
    }
    if(!values.phoneNumber){
      errors.phoneNumber = "Phone number is required"
    }else if(values.phoneNumber.length < 14){
      errors.phoneNumber = "Number should be 10 Digits"
    }
    
    if(!values.password){
      errors.password = "Password is required"
    }else if(values.password.length < 6){
      errors.password = "Password must have more than 6 characters"
    }
    return errors;
  }

  const onSearch = (value) => {
    console.log('search:', value);
    // Perform any search-related functionality if needed
  };
  

  //functions
  const signupFunction = () => {
    const errors = validate(formValues)
    if(Object.keys(errors).length !== 0){
      setErrors(errors)
    }else{
      setErrors({})
    signUpFetch(patientSignUp(formValues));}
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
        message: signUpError?.response?.data?.message,
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
    {message.isShow && (
            <Alert
              style={{ marginBottom: "1rem" }}
              message={message?.message}
              type="error"
              showIcon
              closable
              onClose={() => {
                setMessage({
                  message: "",
                  isShow: false,
                });
              }}
            />
          )}
    <form>
    <div className="mt-3">
        <label htmlFor="exampleFormControlName" className="form-label mb-1">
          Profile Photo
        </label>
        <div
          className="input-group border bg-white rounded-3 py-1"
          id="exampleFormControlName"
          style={{
            alignItems: "center",
            display: "flex"
          }}
        >
          <span
            className="input-group-text bg-transparent rounded-0 border-0"
            id="name"
          >
            <span className="mdi mdi-account-circle-outline mdi-18px text-muted" />
          </span>
          <ImgCrop>
          <Upload
                maxCount={1}

      customRequest={customRequest}
      multiple={false}
    >
      <Button style={{
        background:"transparent",
        border:"0px solid"
      }} icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>  </ImgCrop>

          
        </div>
        <small className="text-muted">Accepted formats: JPEG, PNG</small>
      </div>

<div className='row'>
    <div className=" mt-3 col-6">
        <label htmlFor="exampleFormControlName" className="form-label mb-1">
          First Name
        </label>
        <div
          className="input-group border bg-white rounded-3 py-1"
          id="exampleFormControlName"
        >
          <span
            className="input-group-text bg-transparent rounded-0 border-0"
            id="name"
          >
            <span className="mdi mdi-account mdi-18px text-muted" />
          </span>
          <input
            type="text"
            className="form-control bg-transparent rounded-0 border-0 px-0"
            placeholder="First name"
            aria-label="Type your name"
            aria-describedby="name"
            value={formValues?.firstName}
            onChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                firstName: e.target.value,
              }));
            }}
          />
        </div>
        {
              errors.firstName && (<div className="text-danger text-start mt-1">{errors.firstName}</div>)
            }
      </div>
    <div className="mb-3 mt-3 col-6">
        <label htmlFor="exampleFormControlName" className="form-label mb-1">
          Last Name
        </label>
        <div
          className="input-group border bg-white rounded-3 py-1"
          id="exampleFormControlName"
        >
          <span
            className="input-group-text bg-transparent rounded-0 border-0"
            id="name"
          >
            <span className="mdi mdi-account-outline mdi-18px text-muted" />
          </span>
          <input
            type="text"
            className="form-control bg-transparent rounded-0 border-0 px-0"
            placeholder="Last name"
            aria-label="Type your name"
            aria-describedby="name"
            value={formValues?.lastName}
            onChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                lastName: e.target.value,
              }));
            }}
          />
        </div>
        {
              errors.lastName && (<div className="text-danger text-start mt-1">{errors.lastName}</div>)
            }
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
            placeholder="Type your email"
            aria-label="Type your email"
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
        {
              errors.email && (<div className="text-danger text-start mt-1">{errors.email}</div>)
            }
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlEmail" className="form-label mb-1">
          Password
        </label>
        <div
          className="input-group border bg-white rounded-3 py-1"
          id="exampleFormControlEmail"
        >
          <span
            className="input-group-text bg-transparent rounded-0 border-0"
            id="mail"
          >
            <span className="mdi mdi-lock mdi-18px text-muted" />
          </span>
          <input
              type={showCPass ? "text" : "password"}// Conditional type based on state
              className="form-control bg-transparent rounded-0 border-0 px-0"
              placeholder="Type your password"
              aria-label="Type your password"
              aria-describedby="pass"
              onChange={(e) => {
                setFormValues((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />
            <span onClick={() => setShowCPass(!showCPass)}>
                            {showCPass ? (
                                <IoEyeOutline
                                    style={{
                                        width: "2rem",
                                        padding: "5px",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "100%",
                                    }}
                                />
                            ) : (
                                <IoEyeOffOutline
                                    style={{
                                        width: "2rem",
                                        padding: "5px",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "100%",
                                    }}
                                />
                            )}
                        </span>
        </div>
        {
              errors.password && (<div className="text-danger text-start mt-1">{errors.password}</div>)
            }
         
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlEmail" className="form-label mb-1">
          Phone Number
        </label>
        <div
          className="input-group border bg-white rounded-3 py-1"
          id="exampleFormControlEmail"
        >
          <span
            className="input-group-text bg-transparent rounded-0 border-0"
            id="mail"
          >
            <span className="mdi mdi-phone mdi-18px text-muted" />
          </span>
          <input
  type="text"
  className="form-control bg-transparent rounded-0 border-0 px-0"
  placeholder="Type your Phone Number"
  aria-label="Type your email or phone"
  aria-describedby="mail"
  maxLength={14}
  value={formValues?.phoneNumber}
  onChange={(e) => {
    const value = e.target.value;
    const prefix = "+91-"; // Fixed prefix
    const numericPart = value.slice(4).replace(/[^0-9]/g, ''); // Extract the numeric part
    setFormValues((prev) => ({
      ...prev,
      phoneNumber: prefix + numericPart, // Update phone number with fixed prefix
    }));
  }}
  onKeyDown={(e) => {
    // Prevent backspace from deleting the prefix
    if (e.keyCode === 8 && e.target.selectionStart <= 4) {
      e.preventDefault();
    }
  }}

/>


        </div>
        {
              errors.phoneNumber && (<div className="text-danger text-start mt-1">{errors.phoneNumber}</div>)
            }
      </div>
      <div className="mb-3 mt-3">
        <label htmlFor="exampleFormControlName" className="form-label mb-1">
          Height (CM)
        </label>
        <div
          className="input-group border bg-white rounded-3 py-1"
          id="exampleFormControlName"
        >
          <span
            className="input-group-text bg-transparent rounded-0 border-0"
            id="name"
          >
            <span className="mdi mdi-ruler mdi-18px text-muted" />
          </span>
          <input type="text" class="form-control bg-transparent rounded-0 border-0 px-0"
                     placeholder="Enter Height" aria-label="Type your number" 
                     value={`${formValues?.height || ""}`} 
                     onChange={(e)=>{
                      setFormValues((prev) => ({
                           ...prev,
                           height: e.target.value,
                         }));
                     }}

                     
                     />
        </div>
      </div>
    <div className="mb-3 mt-3">
        <label htmlFor="exampleFormControlName" className="form-label mb-1">
          Weight (Kg)
        </label>
        <div
          className="input-group border bg-white rounded-3 py-1"
          id="exampleFormControlName"
        >
          <span
            className="input-group-text bg-transparent rounded-0 border-0"
            id="name"
          >
            <span className="mdi mdi-weight mdi-18px text-muted" />
          </span>
          <input type="text" class="form-control bg-transparent rounded-0 border-0 px-0"
                     placeholder="Enter Weight" aria-label="Type your number" 
                     value={`${formValues?.weight || ""}`} 
                     onChange={(e)=>{
                      setFormValues((prev) => ({
                           ...prev,
                           weight: e.target.value,
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
            <span className="mdi mdi-calendar mdi-18px text-muted" />
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
        {
              errors.dob && (<div className="text-danger text-start mt-1">{errors.dob}</div>)
            }
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
            <span className="mdi mdi-gender-male-female mdi-18px text-muted" />
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
  <option value="M">Male</option>
  <option value="F">Female</option>
  <option value="O">Others</option>
</select>

        </div>
        {
              errors.gender && (<div className="text-danger text-start mt-1">{errors.gender}</div>)
            }
      </div>
      <div className="mb-3 mt-3">
  <label htmlFor="district" className="form-label mb-1">
    District
  </label>
    <Select
      showSearch
      placeholder="Select District"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      value={formValues.district}
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
{
              errors.district && (<div className="text-danger text-start mt-1">{errors.district}</div>)
            }
</div>
<div className="mb-3 mt-3">
        <label htmlFor="exampleFormControlName" className="form-label mb-1">
          Block
        </label>
        <div
          className="input-group border bg-white rounded-3 py-1"
          id="exampleFormControlName"
        >
          <span
            className="input-group-text bg-transparent rounded-0 border-0"
            id="name"
          >
            <span className="mdi mdi-map-marker-outline mdi-18px text-muted" />
          </span>
          <input
            type="text"
            className="form-control bg-transparent rounded-0 border-0 px-0"
            placeholder="Type your block"
            aria-label="Type your block"
            aria-describedby="name"
            value={formValues?.block}
            onChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                block: e.target.value,
              }));
            }}
          />
        </div>
        {
              errors.block && (<div className="text-danger text-start mt-1">{errors.block}</div>)
            }
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
          {signUpLoading ? (
              <DotLoading style={{ color: "white" }} />
            ) : (
              "Create Account"
            )}
         
        </a>
        <p className="text-muted text-center small">
          Already have an account?{" "}
          <Link to={"/login-phone"} className="text-primary">
            Sign In
          </Link>
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