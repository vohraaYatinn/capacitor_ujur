import React, { useEffect, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxios from "../network/useAxios";
import { changePassword, forgotPasswordGetAccount } from "../urls/urls";
import { useRouter } from "../hooks/use-router";
import { Popup } from "antd-mobile";

const ForgotPassword = () => {
    const [changePasswordResponse, changePasswordError, changePasswordLoading, changePasswordFetch] = useAxios();
    const router = useRouter();

    const [showPass, setShowPass] = useState(false);
    const [showCPass, setShowCPass] = useState(false);
    const { userId } = useParams();
    const [visible1, setVisible1] = useState(false)
	useEffect(() => {
		if (changePasswordResponse && changePasswordResponse?.result == "success") {
			setVisible1(true)
		}
	  }, [changePasswordResponse]);
    const [formValues, setFormValues] = useState({
        password: "",
        confirmPassword: "",
        userId:userId
    });
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();

        const { password, confirmPassword } = formValues;

        let isValid = true;

        if (!password) {
            setPasswordError("Password is required.");
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (!confirmPassword) {
            setConfirmPasswordError("Confirm Password is required.");
            isValid = false;
        } else {
            setConfirmPasswordError("");
        }

        if (password && confirmPassword && password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            isValid = false;
        }

        if (isValid) {
            changePasswordFetch(changePassword(formValues));
            // navigate to another page if needed
        }
    };

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
                        Change Password
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
                            aria-label="Type your email or Password number"
                            aria-describedby="pass"
                            value={formValues.password}
                            onChange={(e) => {
                                setFormValues((prev) => ({
                                    ...prev,
                                    password: e.target.value,
                                }));
                            }}
                        />
                        <span onClick={() => setShowPass(!showPass)}>
                            {showPass ? (
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
                    {passwordError && (
                        <div className="text-danger mb-3">{passwordError}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="exampleFormControlConfirmPassword"
                        className="form-label mb-1 label-custom-boot"
                    >
                        Confirm Password
                    </label>
                    <div
                        className="input-group border bg-white rounded-3 py-1"
                        id="exampleFormControlConfirmPassword"
                    >
                        <span
                            className="input-group-text bg-transparent rounded-0 border-0"
                            id="cPass"
                        >
                            <span className="mdi mdi-eye-outline mdi-18px text-muted" />
                        </span>
                        <input
                            type={showCPass ? "text" : "password"}
                            className="form-control bg-transparent rounded-0 border-0 px-0"
                            placeholder="Type your confirm password"
                            aria-label="Type your email or Password number"
                            aria-describedby="cPass"
                            value={formValues.confirmPassword}
                            onChange={(e) => {
                                setFormValues((prev) => ({
                                    ...prev,
                                    confirmPassword: e.target.value,
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
                    {confirmPasswordError && (
                        <div className="text-danger mb-3">{confirmPasswordError}</div>
                    )}
                </div>
                <Popup
              visible={visible1}
              onMaskClick={() => {
               router.push(`/login-phone`)              }}
              onClose={() => {
               router.push(`/login-phone`)
            }}
              bodyStyle={{  paddingBottom: '50px'}}
            >
         <div className="offcanvas-body text-center d-flex align-items-center justify-content-center p-4">
            <div>
               <i className="bi bi-hand-thumbs-up text-primary display-1"></i>
               <h5 className="py-3">Your Password has been changed successfully</h5>
               <p className="text-muted fs-6" style={{
                marginBottom:"0rem"
               }}>Please Sign in with the new password</p>
            </div>
         </div>
         <div className="offcanvas-footer">
            <Link to="/view-appointments" className="btn btn-info btn-lg w-100 rounded-4">Login</Link>
         </div>
            </Popup>
                <button
                    onClick={handleClick}
                    className="btn btn-info btn-lg w-100 rounded-4 mb-2"
                >
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
