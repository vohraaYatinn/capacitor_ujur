import React, { useEffect, useState }  from 'react'
import { useRouter } from '../hooks/use-router'
import useAxios from '../network/useAxios';
import { verifyOtpUrl } from '../urls/urls';
import { useParams } from 'react-router-dom';
import { Alert } from "antd";
import { useDispatch } from 'react-redux';
import { updateToken } from '../redux/reducers/functionalities.reducer';


const VerifyOtp = () => {
    //Constants & additionals
    const router =  useRouter()
    const { phone } = useParams();
    const dispatch = useDispatch();


    //useAxios
    const [otpResponse, otpError, otpLoading, otpFetch] = useAxios();

  //useState
  const [message, setMessage] = useState({
    message: "",
    isShow: false,
  });
    const [formValues, setFormValues] = useState({
      phoneNumber:phone,
      firstDigit:"",
      secondDigit:"",
      thirdDigit:"",
      fourthDigit:"",
      fifthDigit:"",
    });

    //functions
  const submitOtp = () => {
    otpFetch(verifyOtpUrl(formValues));
  };

    //useEffects
    useEffect(() => {
      if (otpResponse?.result == "success") {
        if(otpResponse?.userType == "user exists"){
          localStorage.setItem('storedToken', otpResponse?.token);

          dispatch(updateToken(otpResponse?.token))
          router.push('/home');

        }
        else if(otpResponse?.userType == "new user"){
          router.push('/sign-up/' + phone);
        }
      }
    }, [otpResponse]);
    useEffect(() => {
      if (otpError) {
        setMessage({
          message: otpError?.response?.data,
          isShow: true,
        });
      }
    }, [otpError]);
  return (
<>
<>
  <div className="verify p-4">
    <div className="d-flex align-items-start justify-content-between mb-4">
      <div>
        <span className="mdi mdi-account-check-outline display-1 text-primary" />
        <h2 
        style={{
            background: "transparent",
            color: "black",
            padding: "0",
            fontSize: "1.5rem",
            marginTop:"2rem"
        }}
        >Verification Code</h2>
        <p className="text-muted mb-0">Enter The Code We Send You?</p>
      </div>
    
    </div>
    <div className="d-flex gap-1 mb-2">
      <div className="col">
        <input
          type="text"
          className="form-control form-control-lg text-center py-3"
          value={formValues?.firstDigit}
          maxLength={1}
          onChange={(e)=>{
            setFormValues((prev)=>({...prev, firstDigit:e.target.value}))
          }}
        />
      </div>
      <div className="col">
        <input
          type="text"
          className="form-control form-control-lg text-center py-3"
          value={formValues?.secondDigit}
          maxLength={1}
          onChange={(e)=>{
            setFormValues((prev)=>({...prev, secondDigit:e.target.value}))
          }}
        />
      </div>
      <div className="col">
        <input
          type="text"
          className="form-control form-control-lg text-center py-3"
          value={formValues?.thirdDigit}
          maxLength={1}
          onChange={(e)=>{
            setFormValues((prev)=>({...prev, thirdDigit:e.target.value}))
          }}
        />
      </div>
      <div className="col">
        <input
          type="text"
          className="form-control form-control-lg text-center py-3"
          value={formValues?.fourthDigit}
          maxLength={1}
          onChange={(e)=>{
            setFormValues((prev)=>({...prev, fourthDigit:e.target.value}))
          }}
        />
      </div>
      <div className="col">
        <input
          type="text"
          className="form-control form-control-lg text-center py-3"
          value={formValues?.fifthDigit}
          maxLength={1}
          onChange={(e)=>{
            setFormValues((prev)=>({...prev, fifthDigit:e.target.value}))
          }}
        />
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
    <p className="text-muted text-center mt-4">
      Didn't receive it?{" "}
      <a  className="ml-2 text-primary">
        Resent Code
      </a>
    </p>
  </div>

  <div className="footer fixed-bottom m-4">
    <a
    onClick={()=>{
      submitOtp()
    }}
    className="btn btn-info btn-lg w-100 rounded-4">
      Confirm
    </a>
  </div>
</>

</>  )
}

export default VerifyOtp