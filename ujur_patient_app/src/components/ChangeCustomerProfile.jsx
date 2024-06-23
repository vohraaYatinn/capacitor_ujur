import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRouter } from '../hooks/use-router';
import { useDispatch } from 'react-redux';
import { updateNavbar } from '../redux/reducers/functionalities.reducer';
import useAxios from '../network/useAxios';
import { changeProfileValues, fetchprofiles } from '../urls/urls';
import {districts} from '../demo/districts';
import { Button, Select } from 'antd';
import { Alert } from "antd";
import { DotLoading } from "antd-mobile";
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadOutlined } from '@ant-design/icons';

const ChangeCustomerProfile = () => {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState([]);
  const [profileDataToChange, setProfileDataToChange] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);

  const [date, setDate] = useState({
    year: null,
    month: null,
    day: null
  });
  const onChangeGender = (e) => {
   setProfileDataToChange((prev) => ({
      ...prev,
      gender: e.target.value,
    }));
  };
  const [message, setMessage] = useState({
    message: "",
    isShow: false,
  });

  const onChange = (value) => {
   setProfileDataToChange((prev) => ({
      ...prev,
      district: value,
    }));
  };
  const onChangeBlood = (value) => {
   setProfileDataToChange((prev) => ({
      ...prev,
      blood_group: value,
    }));
  };
  const onSearch = (value) => {
   console.log('search:', value);
   // Perform any search-related functionality if needed
 };
 const router = useRouter();

 const bloodGroups = [
   { label: 'A+', value: 'A+' },
   { label: 'A-', value: 'A-' },
   { label: 'B+', value: 'B+' },
   { label: 'B-', value: 'B-' },
   { label: 'AB+', value: 'AB+' },
   { label: 'AB-', value: 'AB-' },
   { label: 'O+', value: 'O+' },
   { label: 'O-', value: 'O-' }
 ];
  
  // useAxios
  const [profileResponse, profileError, profileLoading, profileFetch] = useAxios();
  const [EditprofileResponse, EditprofileError, EditprofileLoading, EditprofileFetch] = useAxios();

  // Function to fetch patient profile
  const fetchPatientProfile = () => {
    profileFetch(fetchprofiles({ patientId: 1 }));
  };
  const EditProfile = () =>{
   EditprofileFetch(changeProfileValues(profileDataToChange))

  }
//   const handleUpload = (e) => {
//    const file = e.target.files[0];
//    if (file) {
//      console.log("Selected file:", file);
//      setProfileDataToChange((prev) => ({
//        ...prev,
//        document: file,
//      }));
//      setIsUploaded(true);
//    }
//  };
  // Function to set date from string
  const setDateFromString = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 
      'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const monthName = monthNames[parseInt(month) - 1];

    setDate({
      year: parseInt(year),
      month: monthName, 
      day: parseInt(day)
    });
  };

  // useEffect to fetch patient profile on component mount
  useEffect(() => {
    fetchPatientProfile();
  }, []);
  useEffect(() => {
    if(EditprofileResponse?.result == "success"){
      router.push(`/customer-profile`);

    }
  }, [EditprofileResponse]);

  // useEffect to handle profileResponse updates
  useEffect(() => {
    if (profileResponse?.result === "success") {
      setProfileData(profileResponse.data);
      console.log(profileResponse.data)
      setProfileDataToChange(profileResponse.data)
      // Update date based on fetched profile data
      setDateFromString(profileResponse.data.date_of_birth);
    }
  }, [profileResponse]);
    useEffect(() => {
    if (EditprofileError) {
      setMessage({
        message: EditprofileError?.response?.data?.message,
        isShow: true,
      });
    }
  }, [EditprofileError]);


  const customRequest = ({ file, onSuccess, onError }) => {
    // const formData = new FormData();
    // formData.append('image', file);
    setProfileDataToChange((prev) => ({
      ...prev,
      document: file,
    }));
    onSuccess("ok");
  };

  return (
<>
<div class="d-flex align-items-center justify-content-between mb-auto p-3 bg-white shadow-sm osahan-header">
         <a onClick={()=>router.back()} class="text-dark bg-white shadow rounded-circle icon">
            <span class="mdi mdi-arrow-left mdi-18px"></span></a>
         <h6 class="mb-0 ms-3 me-auto fw-bold">My Profile</h6>
         <div class="d-flex align-items-center gap-3">
            <a class="toggle d-flex align-items-center justify-content-center fs-5 bg-white shadow rounded-circle icon" 
                          onClick={()=>{
                           dispatch(updateNavbar())
                         }} 
            ><i
                  class="bi bi-list"></i></a>
         </div>
      </div>
<form style={{padding:"1rem"}}>
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
            <div class="">
               <label for="exampleFormControlName" class="form-label mb-1 label-custom-boot">Profile Photo</label>
               <div class="input-group border bg-white rounded-3 py-1" id="exampleFormControlName">
                  <ImgCrop>
          <Upload
          
      customRequest={customRequest}
      multiple={false}
    >
      <Button style={{
        background:"transparent",
        border:"0px solid"
      }} icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>  </ImgCrop>
               </div>
            </div>
            <div className='row'>
    <div className="mb-3 mt-3 col-6">
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
            value={profileDataToChange?.firstName || profileDataToChange?.full_name?.split(' ')[0]}
            onChange={(e) => {
              setProfileDataToChange((prev) => ({
                ...prev,
                firstName: e.target.value,
                lastName:" "
              }));
            }}
          />
        </div>
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
            value={profileDataToChange?.lastName || profileDataToChange?.full_name?.split(' ')[1]}
            onChange={(e) => {
              setProfileDataToChange((prev) => ({
                ...prev,
                lastName: e.target.value,
              }));
            }}
          />
        </div>
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
            value={ profileDataToChange?.email || profileDataToChange?.user?.email}
            onChange={(e) => {
              setProfileDataToChange((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
          />
        </div>
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
            type="password"
            className="form-control bg-transparent rounded-0 border-0 px-0"
            placeholder="Type your password"
            aria-label="Type your email or phone"
            aria-describedby="mail"
            value={profileDataToChange?.password || profileDataToChange?.user?.password}
            onChange={(e) => {
              setProfileDataToChange((prev) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
          />
        </div>
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

            value={profileDataToChange?.phoneNumber || profileDataToChange?.user?.phone}
            onChange={(e) => {
              const value = e.target.value;
              const prefix = "+91-"; // Fixed prefix
              const numericPart = value.slice(4).replace(/[^0-9]/g, ''); // Extract the numeric part
              setProfileDataToChange((prev) => ({
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
      </div>
        
      <div class="row">
            <div className='col-12'>
               <label for="exampleFormControlNumber" class="form-label mb-1 label-custom-boot mt-2">Height (CM)</label>
               <div class="input-group border bg-white rounded-3 py-1" id="exampleFormControlNumber">
                  <span
            className="input-group-text bg-transparent rounded-0 border-0"
            id="name"
          >
            <span className="mdi mdi-ruler mdi-18px text-muted" />
          </span>
                  <input type="text" class="form-control bg-transparent rounded-0 border-0 px-0"
                     placeholder="Enter Height" aria-label="Type your number" 
                     value={`${profileDataToChange?.height || ""}`} 
                     onChange={(e)=>{
                        setProfileDataToChange((prev) => ({
                           ...prev,
                           height: e.target.value,
                         }));
                     }}

                     
                     />
                     
               </div>
               
            </div>
        
            </div>
         <div class="row mb-3">
            <div className='col-12'>
               <label for="exampleFormControlNumber" class="form-label mb-1 label-custom-boot mt-2">Weight (KG)</label>
               <div class="input-group border bg-white rounded-3 py-1" id="exampleFormControlNumber">
                  <span class="input-group-text bg-transparent rounded-0 border-0" id="number"><span class="mdi mdi-scale-bathroom mdi-18px"></span>

               </span>
                  <input type="text" class="form-control bg-transparent rounded-0 border-0 px-0"
                     placeholder="Enter Weight" aria-label="Type your number" 
                     value={`${profileDataToChange?.weight || ""}`} 
                     onChange={(e)=>{
                        setProfileDataToChange((prev) => ({
                           ...prev,
                           weight: e.target.value,
                         }));
                     }}

                     
                     />
                     
               </div>
               
            </div>
            <div className='col-12'>
               <label for="exampleFormControlNumber" class="form-label mb-1 label-custom-boot mt-2">Blood Group</label>
                  {/* <span class="input-group-text bg-transparent rounded-0 border-0" id="number"><span class="mdi mdi-blood-bag mdi-18px"></span> */}

               {/* </span> */}
               <Select
      showSearch
      placeholder="Select Blood Group"
      optionFilterProp="children"
      onChange={onChangeBlood}
      value={profileDataToChange.blood_group}
      style={{ width: '100%', border: "none", outline: "none", height:"3rem" }}
    >
      {bloodGroups.map((district, index) => (
        
        <>
        <Select.Option value={district.value} style={{height:"3rem"}}>
          {district.value}
        </Select.Option>
        </>
      ))}
    </Select>
               
               
            </div>
            </div>
            <div class="mb-3">
               <label for="exampleFormControlName1" class="form-label mb-1 label-custom-boot">Date Of Birth</label>
               <div class="input-group border bg-white rounded-3 py-1">
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
            value={profileDataToChange?.date_of_birth}
            onChange={(e) => {
               setProfileDataToChange((prev) => ({
                ...prev,
                date_of_birth: e.target.value,
              }));
            }}
          />
               </div>
            </div>
            <div class="mb-3">
               <label for="exampleFormControlName1" class="form-label mb-1 label-custom-boot">Gender</label>
               <div class="input-group border bg-white rounded-3 py-1">
                  <label class="input-group-text bg-transparent rounded-0 border-0 label-custom-boot" for="inputGroupSelect01">
                     <span class="mdi mdi-account-group-outline mdi-18px"></span>
                  </label>
                  <select class="form-select bg-transparent rounded-0 border-0 px-0" id="inputGroupSelect01"
                        onChange={(e)=>{onChangeGender(e)}}

                  >
                     <option value="M" selected={profileDataToChange?.gender == "M"}>Male</option>
                     <option value="F" selected={profileDataToChange?.gender == "F"}>Female</option>
                     <option value="O" selected={profileDataToChange?.gender == "O"}>Other</option>
                  </select>
               </div>
            </div>


            <div className='col'>
            <label htmlFor="district" className="form-label mb-1">
    District
  </label>
    <Select
      showSearch
      placeholder="Select District"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}

      value={profileDataToChange.district}
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
            <div class="mt-3">
               <label for="exampleFormControlName" class="form-label mb-1 label-custom-boot">Block</label>
               <div class="input-group border bg-white rounded-3 py-1" id="exampleFormControlName">
                  <span class="input-group-text bg-transparent rounded-0 border-0" id="firstname">
                  <span class="mdi mdi-map-marker mdi-18px"></span>
                  </span>
                  <input type="text" class="form-control bg-transparent rounded-0 border-0 px-0"
                     placeholder="Type your block" aria-label="Type your first name" aria-describedby="firstname"
                     value={profileDataToChange?.block} 
                     onChange={(e)=>{
                        setProfileDataToChange((prev) => ({
                           ...prev,
                           block: e.target.value,
                         }));
                     }}
                     />
               </div>
            </div>
         </form>
      
      <div class="footer mt-auto p-3">
         <Link onClick={()=>{
            EditProfile()
         }} class="btn btn-info btn-lg w-100 rounded-4">
              {EditprofileLoading ? (
              <DotLoading style={{ color: "white" }} />
            ) : (
              "Save Change"
            )}
            </Link>
      </div>
</>  )
}

export default ChangeCustomerProfile