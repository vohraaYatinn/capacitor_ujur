import React, { useEffect, useState } from "react";
import { useRouter } from "../hooks/use-router";
import useAxios from "../network/useAxios";
import { phoneNumberOtp } from "../urls/urls";
import { DotLoading } from "antd-mobile";
import { Alert } from "antd";
import { Link } from "react-router-dom";
import { updateToken } from "../redux/reducers/functionalities.reducer";
import { useDispatch } from "react-redux";

const LoginPhone = () => {
  //Constants & additionals
  const router = useRouter();
  
  const dispatch = useDispatch();

  //useAxios
  const [phoneResponse, phoneError, phoneLoading, phoneFetch] = useAxios();

  //useState
  const [message, setMessage] = useState({
    message: "",
    isShow: false,
  });
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });


  //functions
  const submitForOtp = () => {
    phoneFetch(phoneNumberOtp(formValues));
  };


  useEffect(() => {
    if (phoneResponse?.result === 'success') {
      if (phoneResponse?.userType === 'user exists') {
        localStorage.setItem('storedToken', phoneResponse?.token);
        dispatch(updateToken(phoneResponse?.token));
        router.push('/home');
      }
    }
    else if(phoneResponse?.result === 'failure'){
      setMessage({
        message: phoneResponse?.message,
        isShow: true,
      });
    }
  }, [phoneResponse]);

  useEffect(() => {
    if (phoneError) {
      setMessage({
        message: phoneError?.response?.data,
        isShow: true,
      });
    }
  }, [phoneError]);

  return (
    <div className="sign-in p-4">
      <div className="d-flex align-items-start justify-content-between mb-4">
        <div>
          <span className="mdi mdi-account-circle-outline display-1 text-primary" />
          <h2
            style={{
              background: "transparent",
              color: "black",
              padding: "0",
              fontSize: "1.5rem",
              marginTop: "2rem",
            }}
          >
            Let's Sign in
          </h2>
          <p className="text-muted mb-0">
            Welcome Back, You've
            <br />
            been missed!
          </p>
        </div>
      </div>
      <form>
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlEmail"
            className="form-label mb-1 label-custom-boot"
          >
            Email/Ujur ID
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
            // i change the type = number to "text"
              type="text"
              className="form-control bg-transparent rounded-0 border-0 px-0"
              placeholder="Type your email / Id"
              aria-label="Type your email or phone number"
              aria-describedby="mail"
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
            htmlFor="exampleFormControlEmail"
            className="form-label mb-1 label-custom-boot"
          >
            Password
          </label>
          <div
            className="input-group border bg-white rounded-3 py-1"
            id="exampleFormControlPassword"
          >
            <span
              className="input-group-text bg-transparent rounded-0 border-0"
              id="pass"
            >
              <span className="mdi mdi-eye-outline mdi-18px text-muted" />
            </span>
            <input
            // i change the type = number to "text"
              type="password"
              className="form-control bg-transparent rounded-0 border-0 px-0"
              placeholder="Type your password"
              aria-label="Type your email or Password number"
              aria-describedby="pass"
              onChange={(e) => {
                setFormValues((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />
          </div>
        </div>
    
        <div>
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
          <a
            className="btn btn-info btn-lg w-100 rounded-4 mb-2"
            disabled={true}
            onClick={() => {
              submitForOtp();
            }}
          >
            {phoneLoading ? (
              <DotLoading style={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </a>
          <div className="" style={{display: "flex", fontSize: "20px",flexDirection:"column", marginTop:"1rem"}}>

         <p>New to UJUR? <Link to={`/sign-up`}>Sign Up Now</Link></p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPhone;
