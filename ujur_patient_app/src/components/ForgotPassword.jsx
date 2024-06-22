import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
	const [formValues, setFormValues] = useState({
		email: "",
		phone: "",
		dob: "",
	});
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const validate = (values) => {
		const errors = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		if (!values.email) {
			errors.email = "Email is required";
		}
		if(!values.phone){
			errors.phone = "Mobile Number is required"
		  }else if(values.phone.length < 14){
			errors.phone = "Number should be 10 Digits"
		}
		if(!values.dob){
			errors.dob = "Date of Birth is required"
		  }
		  return errors;
		}


	const handleClick = (e) => {
		e.preventDefault();
		const errors = validate(formValues);
		if (Object.keys(errors).length !== 0) {
			setErrors(errors);
		} else {
			setErrors({});
			if (formValues.dob === "2024-06-21") {
				navigate("/change-password");
			} else {
				alert("Enter correct DOB");
			}
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
						}}>
						Forgot Password
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
						className="form-label mb-1 label-custom-boot">
						Email
					</label>
					<div
						className="input-group border bg-white rounded-3 py-1"
						id="exampleFormControlEmail">
						<span
							className="input-group-text bg-transparent rounded-0 border-0"
							id="mail">
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
					{
              errors.email && (<div className="text-danger text-start mt-1">{errors.email}</div>)
            }
				</div>
				<div className="mb-3">
					<label
						htmlFor="exampleFormControlEmail"
						className="form-label mb-1 label-custom-boot">
						Mobile No.
					</label>
					<div
						className="input-group border bg-white rounded-3 py-1"
						id="exampleFormControlEmail">
						<span
							className="input-group-text bg-transparent rounded-0 border-0"
							id="mail">
							<span className="mdi mdi-email-outline mdi-18px text-muted" />
						</span>
						<input
  type="text"
  className="form-control bg-transparent rounded-0 border-0 px-0"
  placeholder="Type your Mobile Number"
  maxLength={14}
  value={formValues?.phone}
  onChange={(e) => {
    const value = e.target.value;
    const prefix = "+91-"; // Fixed prefix
    const numericPart = value.slice(4).replace(/[^0-9]/g, ''); // Extract the numeric part
    setFormValues((prev) => ({
      ...prev,
      phone: prefix + numericPart, // Update phone number with fixed prefix
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
              errors.phone && (<div className="text-danger text-start mt-1">{errors.phone}</div>)
            }
				</div>
				<div className="mb-3 mt-3">
					<label htmlFor="exampleFormControlName" className="form-label mb-1">
						Date of Birth
					</label>
					<div
						className="input-group border bg-white rounded-3 py-1"
						id="exampleFormControlName">
						<span
							className="input-group-text bg-transparent rounded-0 border-0"
							id="name">
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
				<button
					onClick={handleClick}
					className="btn btn-info btn-lg w-100 rounded-4 mb-2">
					Continue
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;
