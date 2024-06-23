import React, { useEffect, useState } from "react";
import { useRouter } from "../hooks/use-router";
import useAxios from "../network/useAxios";
import { phoneNumberOtp } from "../urls/urls";
import { DotLoading } from "antd-mobile";
import { Alert } from "antd";
import { Link, useAsyncError } from "react-router-dom";
import { updateToken, updateUser } from "../redux/reducers/functionalities.reducer";
import { useDispatch } from "react-redux";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const LoginPhone = () => {
  // Constants & additionals
  const router = useRouter();
  const dispatch = useDispatch();

  // useAxios
  const [phoneResponse, phoneError, phoneLoading, phoneFetch] = useAxios();

  // useState
  const [message, setMessage] = useState({
    message: "",
    isShow: false,
  });

  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors]= useState({
    email: "",
    password: ""
  });

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.email){
      errors.email = "Email is required";
    }
    if(!values.password){
      errors.password = "Password is required"
    }else if(values.password.length < 6){
      errors.password = "Password must have more than 6 characters"
    }
    return errors;
  }

  const submitForOtp = () => {
    const errors = validate(formValues)
    if(Object.keys(errors).length !== 0){
      setErrors(errors)
    }else{
      setErrors({})
      phoneFetch(phoneNumberOtp(formValues));
    }
  };

  useEffect(() => {
    if (phoneResponse?.result === 'success') {
      if (phoneResponse?.userType === 'user exists') {
        localStorage.setItem('storedToken', phoneResponse?.token);
        dispatch(updateToken(phoneResponse?.token));
        dispatch(updateUser(phoneResponse?.patient));
        router.push('/home');
      }
    } else if (phoneResponse?.result === 'failure') {
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
            Mobile No/Ujur ID
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
            {
              errors.email && (<div className="text-danger text-start mt-1">{errors.email}</div>)
            }
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlPassword"
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
              type={showPass ? "text" : "password"}
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
            <span onClick={() => setShowPass(!showPass)}>
              {
                showPass ? <IoEyeOutline style={{width: "2rem", padding:"5px", cursor:"pointer",display: "flex", alignItems: "center", justifyContent:"center", height:"100%"}} />
                :<IoEyeOffOutline style={{width: "2rem", padding:"5px", cursor:"pointer",display: "flex", alignItems: "center", justifyContent:"center", height:"100%"}} />
              }
            </span>
          </div>
          {
              errors.password && (<div className="text-danger text-start mt-1">{errors.password}</div>)
            }
          <p className="text-end mt-1"><Link to={`/forgot-password`}>forgot password?</Link></p>
        

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
          <button
            className="btn btn-info btn-lg w-100 rounded-4 mb-2"
            disabled={phoneLoading}
            onClick={(e) => {
              e.preventDefault(); // Prevent form submission
              submitForOtp();
            }}
          >
            {phoneLoading ? (
              <DotLoading style={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </button>
          <div
            className=""
            style={{
              display: "flex",
              fontSize: "16px",
              flexDirection: "column",
              marginTop: "0.4rem",
            }}
          >
            <p>
              New to UJUR? <Link to={`/sign-up`}>Sign Up Now</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPhone;
